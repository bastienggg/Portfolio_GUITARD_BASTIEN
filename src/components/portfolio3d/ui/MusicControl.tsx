"use client";

interface MusicControlProps {
  isMusicPlaying: boolean;
  onToggle: () => void;
}

/**
 * Composant bouton de contrôle audio
 */
export function MusicControl({ isMusicPlaying, onToggle }: MusicControlProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 md:w-12 md:h-12 bg-[#FFFEF5] border-2 border-[#0F0F0F] flex items-center justify-center hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all sketch-shadow group"
      title={isMusicPlaying ? "Couper la musique" : "Activer la musique"}
    >
      {isMusicPlaying ? (
        <span className="text-xl md:text-2xl font-bold">♫</span>
      ) : (
        <span className="text-xl md:text-2xl font-bold relative">
          <span>♫</span>
          <span className="absolute inset-0 flex items-center justify-center text-3xl">
            /
          </span>
        </span>
      )}
    </button>
  );
}
