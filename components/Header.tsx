'use client';

interface HeaderProps {
  isConnected: boolean;
  isLoading: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold italic gold-gradient-text">
          SETTER IA.
        </h1>
        <p className="text-taupe mt-1 text-sm sm:text-base">
          By Aser
        </p>
      </div>

      <div className="flex items-center gap-4">
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
