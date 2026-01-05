"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { Position3DProps, NavigationProps } from "@/types";

interface PlanetLabelProps extends Position3DProps, NavigationProps {
  title: string;
  isVisible: boolean;
  planetIndex: number;
}

/**
 * Composant Label flottant pour planète avec interaction
 */
export function PlanetLabel({
  position,
  title,
  isVisible,
  planetIndex,
  onNavigate,
}: PlanetLabelProps) {
  const textRef = useRef<any>(null);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  if (!isVisible) return null;

  return (
    <group position={[position[0], position[1] + 10, position[2]]}>
      {/* Trait noir vertical */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[0.08, 7, 0.08]} />
        <meshBasicMaterial color="#0F0F0F" />
      </mesh>
      {/* Point de connexion */}
      <mesh position={[0, -7.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0F0F0F" />
      </mesh>
      {/* Texte 3D cliquable */}
      <Text
        ref={textRef}
        position={[0, 0.5, 0]}
        fontSize={1.2}
        color="#0F0F0F"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#9A9A8A"
        fontWeight="bold"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(planetIndex);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {title.toUpperCase()}
      </Text>
    </group>
  );
}
