"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, type Points } from "three";
import { INK, outerOrbit } from "../sceneState";
import { seeded } from "./lowPoly";

const COUNT = 1600;

/** Ceinture de poussière au-delà de la dernière orbite */
export function DustBelt() {
  const ref = useRef<Points>(null);

  const geo = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const rnd = seeded(42);
    const rIn = outerOrbit + 3.5;
    for (let k = 0; k < COUNT; k++) {
      const t = rnd() * Math.PI * 2;
      const rr = rIn + rnd() * 5 + Math.sin(t * 3) * 0.8;
      arr[k * 3] = Math.cos(t) * rr;
      arr[k * 3 + 1] = (rnd() - 0.5) * 0.9;
      arr[k * 3 + 2] = Math.sin(t) * rr;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(arr, 3));
    return g;
  }, []);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(0.05, delta) * 0.006;
  });

  return (
    <points ref={ref} geometry={geo} raycast={() => null}>
      <pointsMaterial color={INK} size={0.09} transparent opacity={0.55} />
    </points>
  );
}
