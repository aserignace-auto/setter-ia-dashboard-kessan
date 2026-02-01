'use client';

import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isConnected: boolean;
  isLoading: boolean;
}

export default function Header({ onRefresh, isConnected, isLoading }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold italic gold-gradient-text">
          SETTER IA.
        </h1>
        <p className="text-taupe mt-1 text-sm sm:text-base">
          L'excellence de l'automatisation de luxe
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-beige rounded-full
                     hover:border-gold hover:shadow-lg transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 text-gold ${isLoading ? 'animate-spin' : ''}`} />
          <span className="text-brown font-medium">Actualiser</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full">
          <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-sm font-medium text-brown">
            {isConnected ? 'Temps Réel' : 'Erreur'}
          </span>
        </div>
      </div>
    </header>
  );
}
