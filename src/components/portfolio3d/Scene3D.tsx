"use client";

import { useState, useEffect } from "react";
import { Sun, GalaxyParticles, FloatingParticles, SceneLights } from "./space";
import { PlanetGLB, PlanetSphere, PlanetLabel } from "./planets";
import { CameraController } from "./camera";
import { calculatePlanetPositions } from "@/lib/three";
import type { MousePosition, Project } from "@/types";

// Couleur des planètes sans modèle GLB
const PLANET_COLOR = "#FFFFFF";

interface Scene3DProps {
  scrollProgress: number;
  mousePosition: MousePosition;
  projects: Project[];
  onNavigateToPlanet: (index: number) => void;
}

/**
 * Composant Scene 3D principal
 */
export function Scene3D({
  scrollProgress,
  mousePosition,
  projects,
  onNavigateToPlanet,
}: Scene3DProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const planetPositions = calculatePlanetPositions(projects.length, time);

  const currentIndex = Math.max(0, Math.round(scrollProgress));

  return (
    <>
      <SceneLights />

      {/* Éléments spatiaux */}
      <GalaxyParticles />
      <FloatingParticles />
      <Sun />

      {/* Planètes avec labels */}
      {projects.map((project, index) => {
        const isActive = index === currentIndex;
        const showLabel = scrollProgress < 0 || !isActive;
        const hasModel = project.modelPath !== undefined;

        return (
          <group key={project.id}>
            {hasModel ? (
              <PlanetGLB
                position={planetPositions[index]}
                isActive={isActive}
                modelPath={project.modelPath!}
              />
            ) : (
              <PlanetSphere
                position={planetPositions[index]}
                color={PLANET_COLOR}
                size={3}
                isActive={isActive}
              />
            )}
            <PlanetLabel
              position={planetPositions[index]}
              title={project.title}
              isVisible={showLabel}
              planetIndex={index}
              onNavigate={onNavigateToPlanet}
            />
          </group>
        );
      })}

      {/* Contrôleur de caméra */}
      <CameraController
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
        projectsLength={projects.length}
      />
    </>
  );
}
