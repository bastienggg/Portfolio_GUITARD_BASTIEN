"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { calculateCameraPosition, calculatePlanetPositions } from "@/lib/three";
import type { MousePosition, Position3D } from "@/types";

interface CameraControllerProps {
  scrollProgress: number;
  mousePosition: MousePosition;
  projectsLength: number;
}

/**
 * Composant qui gère l'animation de la caméra basée sur le scroll
 */
export function CameraController({
  scrollProgress,
  mousePosition,
  projectsLength,
}: CameraControllerProps) {
  const controlsRef = useRef<any>(null);
  const [time, setTime] = useState(0);
  const cameraLightRef = useRef<THREE.PointLight>(null);

  // Animation du temps pour les orbites
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Calculer les positions des planètes
  const planetPositions: Position3D[] = calculatePlanetPositions(
    projectsLength,
    time
  );

  // Mettre à jour la position de la caméra
  useEffect(() => {
    if (controlsRef.current) {
      const { cameraPosition, targetPosition } = calculateCameraPosition(
        scrollProgress,
        planetPositions,
        mousePosition,
        projectsLength
      );

      controlsRef.current.object.position.copy(cameraPosition);
      controlsRef.current.target.copy(targetPosition);
      controlsRef.current.update();
    }
  }, [scrollProgress, planetPositions, mousePosition, projectsLength]);

  // Mettre à jour la position de la lumière de la caméra
  useFrame(({ camera }) => {
    if (cameraLightRef.current) {
      cameraLightRef.current.position.copy(camera.position);
    }
  });

  return (
    <>
      {/* Lumière qui suit la caméra */}
      <pointLight
        ref={cameraLightRef}
        intensity={5}
        color="#FFFEF5"
        distance={100}
        decay={1}
      />

      {/* Contrôles de caméra désactivés (parallax souris uniquement) */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}
