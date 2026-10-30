"use client";

import { useState } from "react";
import { useScrollProgress, useBackgroundMusic, useMousePosition } from "@/hooks";
import { TerminalPanel, ScenePanel } from "./layout";
import { MusicControl, EnterScreen, RoughBorderFilter } from "./ui";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];

/**
 * Composant principal du portfolio 3D en système solaire
 */
export function SolarSystemScene() {
  const [hasEntered, setHasEntered] = useState(false);
  const music = useBackgroundMusic("/mysterious-futuristic-ambience-375832.mp3");
  const mousePosition = useMousePosition();
  const { scrollProgress, navigateTo } = useScrollProgress(-1, projects.length);

  // Calculs dérivés
  const currentPlanetIndex = Math.max(0, Math.floor(scrollProgress + 0.5));
  const isOverviewMode = scrollProgress <= -0.95;
  const currentProject = projects[currentPlanetIndex] || null;

  // Entrer dans le portfolio (lance la musique sur le geste utilisateur)
  const handleEnter = async () => {
    await music.start();
    setHasEntered(true);
  };

  return (
    <>
      {!hasEntered && <EnterScreen onEnter={handleEnter} />}

      <div className="w-full h-screen flex flex-col md:flex-row paper-texture">
        <MusicControl isMusicPlaying={music.isPlaying} onToggle={music.toggle} />
        <RoughBorderFilter />

        <TerminalPanel
          isOverviewMode={isOverviewMode}
          currentProject={currentProject}
          projects={projects}
          onNavigate={navigateTo}
        />

        <ScenePanel
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          projects={projects}
          currentIndex={currentPlanetIndex}
          isOverviewMode={isOverviewMode}
          currentProject={currentProject}
          onNavigate={navigateTo}
        />
      </div>
    </>
  );
}
