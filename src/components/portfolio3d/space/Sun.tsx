"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GroupRef } from "@/types";

/**
 * Composant Soleil au centre du système solaire
 */
export function Sun() {
  const groupRef = useRef<GroupRef>(null);
  const { scene } = useGLTF("/projects/soleil.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={scene.clone()} scale={4} />
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FFA500" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
