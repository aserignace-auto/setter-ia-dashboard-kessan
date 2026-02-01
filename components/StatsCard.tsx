'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, delay = 0 }: StatsCardProps) {
  return (
    <div
      className="luxury-card p-6 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-taupe text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-brown-dark">{value}</p>
    </div>
  );
}
