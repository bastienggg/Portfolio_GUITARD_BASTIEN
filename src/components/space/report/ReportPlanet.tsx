"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { GlbModel } from "../scene/GlbModel";

const PI = Math.PI;

function Spinning({ url }: { url: string }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(0.05, delta) * 0.3;
  });
  return (
    <group ref={ref} rotation={[0.25, 0, 0]}>
      <GlbModel url={url} radius={1} />
    </group>
  );
}

/** Le modèle .glb du projet qui tourne sur lui-même, en tête du rapport de mission */
export function ReportPlanet({ url, active }: { url: string; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      flat
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 38, position: [0, 0, 3.8] }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Mêmes lumières que la scène principale */}
      <ambientLight intensity={0.62 * PI} />
      <directionalLight intensity={0.55 * PI} position={[-12, 30, 18]} />
      <directionalLight color="#fff1cc" intensity={0.5 * PI} position={[6, 0, 4]} />
      <Suspense fallback={null}>
        <Spinning url={url} />
      </Suspense>
    </Canvas>
  );
}
