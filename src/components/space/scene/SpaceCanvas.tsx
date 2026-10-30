"use client";

import { Canvas } from "@react-three/fiber";
import { projects } from "@/lib/projects";
import { CameraRig } from "./CameraRig";
import { DustBelt } from "./DustBelt";
import { OverlaySync } from "./OverlaySync";
import { Planet } from "./Planet";
import { Sun } from "./Sun";

interface SpaceCanvasProps {
  /** Coupe le rendu quand la scène est cachée (rapport de mission) */
  paused: boolean;
  onHover: (index: number) => void;
  onSelect: (index: number) => void;
}

// three r155+ utilise un éclairage physique : on multiplie par π pour retrouver
// le rendu des intensités « legacy » de la référence (three r128).
const PI = Math.PI;

export function SpaceCanvas({ paused, onHover, onSelect }: SpaceCanvasProps) {
  return (
    <Canvas
      id="scene"
      aria-label="Système solaire en 3D : chaque planète est un projet"
      frameloop={paused ? "never" : "always"}
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 38, near: 0.1, far: 600, position: [0, 30, 52] }}
      style={{ position: "absolute", inset: 0, touchAction: "none" }}
    >
      <ambientLight intensity={0.62 * PI} />
      <pointLight color="#fff1cc" intensity={0.9 * PI} decay={0} />
      <directionalLight intensity={0.55 * PI} position={[-12, 30, 18]} />

      <Sun />
      {projects.map((p, i) => (
        <Planet key={p.slug} project={p} index={i} onHover={onHover} onSelect={onSelect} />
      ))}
      <DustBelt />

      {/* Après les planètes : lit leurs positions de la frame courante */}
      <CameraRig />
      <OverlaySync />
    </Canvas>
  );
}
