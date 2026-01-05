"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      setIsHovering(isClickable);
    };

    // Initialisation
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-8px, -8px) scale(${isHovering ? 1.2 : 1})`,
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <Image
        src="/pointer.svg"
        alt="cursor"
        width={34}
        height={48}
        className="w-[34px] h-[48px]"
        priority
      />
    </div>
  );
}
