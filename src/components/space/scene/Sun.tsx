"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace, type Group, type Sprite } from "three";
import { GlbModel } from "./GlbModel";

function haloTexture(alpha: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const x = c.getContext("2d")!;
  x.fillStyle = `rgba(242,201,76,${alpha})`;
  x.beginPath();
  x.arc(64, 64, 62, 0, Math.PI * 2);
  x.fill();
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

const HALO_SIZE = 8.2;
const SUN_MODEL = "/projects/soleil.glb";
const SUN_RADIUS = 2.6;

export function Sun() {
  const body = useRef<Group>(null);
  const halo = useRef<Sprite>(null);

  const haloInner = useMemo(() => haloTexture(0.3), []);
  const haloOuter = useMemo(() => haloTexture(0.14), []);

  useEffect(
    () => () => [haloInner, haloOuter].forEach((o) => o.dispose()),
    [haloInner, haloOuter]
  );

  useFrame((state, delta) => {
    if (body.current) body.current.rotation.y += Math.min(0.05, delta) * 0.08;
    const pulse = 1 + Math.sin((state.clock.elapsedTime * 1000) / 900) * 0.04;
    halo.current?.scale.set(HALO_SIZE * pulse, HALO_SIZE * pulse, 1);
  });

  return (
    <>
      <group ref={body}>
        <Suspense fallback={null}>
          <GlbModel url={SUN_MODEL} radius={SUN_RADIUS} />
        </Suspense>
      </group>
      <sprite scale={[11.5, 11.5, 1]} raycast={() => null}>
        <spriteMaterial map={haloOuter} transparent depthWrite={false} />
      </sprite>
      <sprite ref={halo} scale={[HALO_SIZE, HALO_SIZE, 1]} raycast={() => null}>
        <spriteMaterial map={haloInner} transparent depthWrite={false} />
      </sprite>
    </>
  );
}
