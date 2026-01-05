"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useScrollProgress } from "@/hooks";
import {
  Scene3D,
  Terminal,
  ContactWindow,
  ProgressIndicator,
  MusicControl,
  EnterScreen,
} from "@/components/portfolio3d";
import projects from "@/data/projects.json";
import type { Project, MousePosition } from "@/types";

/**
 * Composant principal du portfolio 3D en système solaire
 */
export default function SolarSystemScene() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hook custom pour gérer le scroll progress
  const { scrollProgress, navigateTo } = useScrollProgress(-1, projects.length);

  // Calculs dérivés
  const currentPlanetIndex = Math.max(0, Math.floor(scrollProgress + 0.5));
  const isOverviewMode = scrollProgress <= -0.95;
  const currentProject: Project | null =
    (projects as Project[])[currentPlanetIndex] || null;

  // Gestion de la musique de fond
  useEffect(() => {
    audioRef.current = new Audio("/mysterious-futuristic-ambience-375832.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Fonction pour entrer dans le portfolio (lance la musique)
  const handleEnter = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setHasEntered(true);
      } catch (error) {
        console.error("Erreur lecture audio:", error);
        setHasEntered(true);
      }
    } else {
      setHasEntered(true);
    }
  };

  // Toggle musique
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Gestion du mouvement de la souris pour parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Écran d'entrée */}
      {!hasEntered && <EnterScreen onEnter={handleEnter} />}

      {/* Portfolio principal */}
      <div className="w-full h-screen flex flex-col md:flex-row paper-texture">
        {/* Bouton de contrôle audio */}
        <MusicControl isMusicPlaying={isMusicPlaying} onToggle={toggleMusic} />

        {/* SVG Filters pour bordures gribouillées */}
        <svg className="svg-filters" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter
              id="rough-border"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="3"
                result="noise"
                seed="2"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {/* Fenêtre Terminal - Mobile: en bas | Desktop: à gauche 30% */}
        <div className="w-full h-1/2 md:w-[30%] md:h-full order-2 md:order-1 bg-[#F7F7E1] relative overflow-hidden">
          {/* Bordure visible dessinée à la main */}
          <div
            className="absolute top-0 md:top-0 md:right-0 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#0F0F0F] via-[#2A2A2A] to-[#0F0F0F] opacity-70 z-50"
            style={{ filter: "url(#rough-border)" }}
          ></div>
          <div
            className="absolute top-0.5 md:top-0 md:right-0.5 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#4A4A4A] via-[#0F0F0F] to-[#4A4A4A] opacity-50 z-50"
            style={{ filter: "url(#rough-border)" }}
          ></div>

          {/* Barre de titre sketch */}
          <div className="h-10 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-4 relative visible-sketch-border">
            <div className="absolute inset-0 pencil-line opacity-10"></div>
            <div className="flex gap-2 z-10">
              <div className="w-2 h-2 bg-[#0F0F0F] rounded-sm sketch-shadow-sm"></div>
              <div className="w-2 h-2 bg-[#4A4A4A] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#9A9A8A] rounded-sm"></div>
            </div>
            <div className="flex-1 text-center z-10">
              <span className="text-[#0F0F0F] text-xs font-mono tracking-widest font-bold">
                {isOverviewMode
                  ? "[ SYSTEM ]"
                  : `[ ${currentProject?.title.toUpperCase() || "PROJECT"} ]`}
              </span>
            </div>
            <div className="text-[#4A4A4A] text-xs font-mono z-10">▼</div>
          </div>

          {/* Contenu du terminal */}
          <div className="h-[calc(100%-2.5rem)] overflow-hidden relative">
            <Terminal
              isOverviewMode={isOverviewMode}
              currentProject={currentProject}
              projects={projects as Project[]}
              onNavigate={navigateTo}
            />
          </div>
        </div>

        {/* Fenêtre Canvas 3D - Mobile: en haut | Desktop: à droite 70% */}
        <div className="w-full h-1/2 md:w-[70%] md:h-full order-1 md:order-2 bg-[#F7F7E1] relative overflow-hidden paper-texture">
          {/* Barre de titre sketch */}
          <div className="h-10 bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center px-4 relative visible-sketch-border">
            <div className="absolute inset-0 pencil-line opacity-10"></div>
            <div className="flex gap-2 z-10">
              <div className="w-2 h-2 bg-[#0F0F0F] rounded-sm sketch-shadow-sm"></div>
              <div className="w-2 h-2 bg-[#4A4A4A] rounded-sm"></div>
              <div className="w-2 h-2 bg-[#9A9A8A] rounded-sm"></div>
            </div>
            <div className="flex-1 text-center z-10">
              <span className="text-[#0F0F0F] text-xs font-mono tracking-widest font-bold">
                [ SOLAR SYSTEM 3D ]
              </span>
            </div>
            <div className="text-[#4A4A4A] text-xs font-mono z-10">▼</div>
          </div>

          {/* Canvas 3D */}
          <div className="h-[calc(100%-2.5rem)] relative bg-[#F7F7E1]">
            <Canvas
              camera={{ position: [120, 80, 120], fov: 75 }}
              style={{ background: "#F7F7E1" }}
            >
              <Scene3D
                scrollProgress={scrollProgress}
                mousePosition={mousePosition}
                projects={projects as Project[]}
                onNavigateToPlanet={navigateTo}
              />
            </Canvas>

            {/* Indicateur de progression */}
            <ProgressIndicator
              projectsLength={projects.length}
              currentIndex={currentPlanetIndex}
              isOverviewMode={isOverviewMode}
            />

            {/* Fenêtre de preview/contact */}
            <ContactWindow
              isOverviewMode={isOverviewMode}
              currentProject={currentProject}
            />
          </div>
        </div>

        {/* Style global */}
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
}
