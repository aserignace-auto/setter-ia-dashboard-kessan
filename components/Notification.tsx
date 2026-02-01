'use client';

import { useEffect, useState } from 'react';
import { X, Bell } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 400);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-4 bg-white border border-gold rounded-2xl shadow-lg ${
        isVisible ? 'animate-slide-in' : 'animate-slide-out'
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
        <Bell className="w-5 h-5 text-white" />
      </div>
      <p className="text-sm font-medium text-brown-dark pr-4">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 400);
        }}
        className="absolute top-2 right-2 p-1 text-taupe hover:text-brown-dark transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
