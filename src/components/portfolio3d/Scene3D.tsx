"use client";

import { useState, useEffect } from "react";
import { Sun, GalaxyParticles, FloatingParticles } from "./space";
import { PlanetGLB, PlanetSphere, PlanetLabel } from "./planets";
import { CameraController } from "./camera";
import { calculatePlanetPositions } from "@/lib/three";
import type { MousePosition, Project } from "@/types";

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
  const planetColors = [
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
  ];

  const currentIndex = Math.max(0, Math.round(scrollProgress));

  return (
    <>
      {/* Lumières globales */}
      <hemisphereLight intensity={1.5} color="#F7F7E1" groundColor="#9A9A8A" />
      <ambientLight intensity={0.6} color="#E8E8DC" />
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#4A4A4A"
        distance={200}
        decay={1.5}
      />
      <directionalLight
        position={[-100, 50, 50]}
        intensity={1.5}
        color="#F7F7E1"
      />
      <directionalLight
        position={[100, 30, -50]}
        intensity={1}
        color="#D4D4C8"
      />

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
                color={planetColors[index % planetColors.length]}
                size={3}
                project={project}
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
