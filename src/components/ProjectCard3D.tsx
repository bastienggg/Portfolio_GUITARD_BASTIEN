"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Html } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import * as THREE from "three";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  onClick: () => void;
}

export default function ProjectCard3D({
  project,
  position,
  onClick,
}: ProjectCard3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animation de rotation au survol
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation douce au survol
      const targetRotationY = hovered ? Math.PI * 0.1 : 0;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );

      // Animation de flottement subtile
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2.8, 3.5, 0.3]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Matériau glassmorphism */}
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Bordure glassmorphism */}
      <RoundedBox
        args={[2.85, 3.55, 0.35]}
        radius={0.11}
        smoothness={4}
        position={[0, 0, -0.05]}
      >
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          wireframe={false}
        />
      </RoundedBox>

      {/* Contenu HTML en overlay */}
      <Html
        transform
        occlude
        position={[0, 0, 0.16]}
        style={{
          width: "260px",
          height: "340px",
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        <div className="w-full h-full p-4 flex flex-col justify-between">
          {/* Image du projet */}
          {project.imageUrl && (
            <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          )}

          {/* Titre */}
          <h3 className="text-white font-bold text-lg mb-2 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-xs mb-3 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded text-white text-[10px] border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
