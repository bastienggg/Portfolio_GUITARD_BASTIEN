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
    <div className="min-h-screen bg-[#0a1929] flex items-center justify-center relative overflow-hidden">
      {/* Effet scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)",
        }}
      />

      {/* Cercles animés en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center font-mono space-y-8">
        {/* Logo/Initiales */}
        <div className="mb-12">
          <div className="text-8xl font-bold text-cyan-400 tracking-widest animate-pulse">
            BG
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Texte de chargement */}
        <div className="space-y-4">
          <p className="text-white text-2xl tracking-wide">BASTIEN GUITARD</p>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Développeur Fullstack
          </p>
        </div>

        {/* Barre de progression */}
        <div className="mt-12">
          <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-loading-bar origin-left" />
          </div>
          <p className="text-cyan-400 mt-6 text-sm">
            Initialisation du portfolio 3D{dots}
          </p>
        </div>

        {/* Code défilant */}
        <div className="mt-8 text-xs text-gray-600 font-mono">
          <p>&gt; Loading React Three Fiber...</p>
          <p>&gt; Initializing solar system...</p>
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
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
