"use client";

import { useRef } from "react";
import type {
  Position3DProps,
  ActiveStateProps,
  MeshRef,
  Project,
} from "@/types";

interface PlanetSphereProps extends Position3DProps, ActiveStateProps {
  color: string;
  size: number;
  project: Project;
}

/**
 * Composant Planète sphérique simple (fallback si pas de modèle 3D)
 */
export function PlanetSphere({
  position,
  color,
  size,
  isActive,
}: PlanetSphereProps) {
  const meshRef = useRef<MeshRef>(null);

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.5}
          emissive={color}
          emissiveIntensity={isActive ? 0.6 : 0.3}
        />
      </mesh>
      {/* Anneaux pour style comic */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[size * 1.5, size * 0.15, 16, 100]} />
        <meshStandardMaterial
          color={color}
          opacity={0.6}
          transparent
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
