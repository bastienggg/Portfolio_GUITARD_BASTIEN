import { useState, useEffect, useRef } from "react";

/**
 * Hook pour la musique d'ambiance (lancée sur un geste utilisateur)
 */
export function useBackgroundMusic(src: string, volume: number = 0.3) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, volume]);

  // Lance la musique (retourne une fois la tentative terminée, même en cas d'échec)
  const start = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Erreur lecture audio:", error);
    }
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return { isPlaying, start, toggle };
}
