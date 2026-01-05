import { useState, useEffect } from "react";

/**
 * Hook pour l'effet typewriter (animation d'écriture caractère par caractère)
 */
export function useTypewriter(text: string, speed: number = 5) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");

    let currentChar = 0;
    const typeInterval = setInterval(() => {
      if (currentChar < text.length) {
        setDisplayedText(text.slice(0, currentChar + 1));
        currentChar++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed]);

  return { displayedText, isTyping };
}
