"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import type { Position3DProps, ActiveStateProps, GroupRef } from "@/types";

interface PlanetGLBProps extends Position3DProps, ActiveStateProps {
  modelPath: string;
}

/**
 * Composant Planète avec modèle 3D GLB
 */
export function PlanetGLB({ position, isActive, modelPath }: PlanetGLBProps) {
  const groupRef = useRef<GroupRef>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, groupRef);

  // Jouer toutes les animations
  useEffect(() => {
    const animationNames = [
      "IcosphèreAction",
      "Icosphère.001Action",
      "VolumeAction.001",
      "VolumeAction.002",
      "Icosphère.002Action",
      "Icosphère.003Action",
      "Icosphère.004Action",
      "Icosphère.006Action",
    ];

    animationNames.forEach((name) => {
      const action = actions[name];
      if (action) {
        action.reset().play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    });
  }, [actions]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene.clone()} scale={3} />
      {/* Lumières locales */}
      <pointLight
        position={[8, 8, 8]}
        intensity={isActive ? 2 : 1.5}
        color="#E8E8DC"
        distance={25}
        decay={2}
      />
      <pointLight
        position={[-8, 5, -8]}
        intensity={1.5}
        color="#F7F7E1"
        distance={20}
        decay={2}
      />
    </group>
  );
}
