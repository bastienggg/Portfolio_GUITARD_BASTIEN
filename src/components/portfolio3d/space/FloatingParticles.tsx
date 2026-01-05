"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  createFloatingParticlesGeometry,
  updateFloatingParticles,
} from "@/lib/three";
import type { PointsRef } from "@/types";

/**
 * Composant Particules flottantes aléatoires
 */
export function FloatingParticles() {
  const particlesRef = useRef<PointsRef>(null);
  const { geometry, velocities } = useMemo(
    () => createFloatingParticlesGeometry(),
    []
  );

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      updateFloatingParticles(positions, velocities);
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
