"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createGalaxyGeometry } from "@/lib/three";
import type { PointsRef } from "@/types";

/**
 * Composant Particules de Galaxie en spirale
 */
export function GalaxyParticles() {
  const particlesRef = useRef<PointsRef>(null);
  const particlesGeometry = useMemo(() => createGalaxyGeometry(), []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.0002;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
