"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animation des points
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Redirection après 1.5 secondes
    const redirectTimer = setTimeout(() => {
      router.push("/portfolio3d");
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7F7E1] flex items-center justify-center relative overflow-hidden paper-texture">
      {/* Contenu */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo/Nom */}
        <div className="mb-12">
          <div className="text-6xl md:text-8xl font-bold text-[#0F0F0F] tracking-widest uppercase">
            BASTIEN GUITARD
          </div>
          <div className="pencil-line w-64 mx-auto mt-6" />
        </div>

        {/* Texte de chargement */}
        <div className="space-y-4">
          <p className="text-[#4A4A4A] text-sm md:text-base uppercase tracking-widest font-mono">
            Développeur Full-Stack & Créatif
          </p>
        </div>

        {/* Barre de progression - style sketch */}
        <div className="mt-12">
          <div className="w-64 h-1 bg-[#9A9A8A]/30 mx-auto overflow-hidden relative">
            <div className="h-full bg-[#0F0F0F] animate-loading-bar origin-left" />
          </div>
          <p className="text-[#0F0F0F] mt-6 text-sm font-mono font-bold">
            &gt; CHARGEMENT{dots}
          </p>
        </div>

        {/* Messages de chargement */}
        <div className="mt-8 text-xs text-[#4A4A4A] font-mono space-y-1">
          <p>&gt; Loading 3D Engine...</p>
          <p>&gt; Initializing Solar System...</p>
          <p>&gt; Ready_</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
