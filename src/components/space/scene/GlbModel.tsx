"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import type { ThreeEvent } from "@react-three/fiber";

interface GlbModelProps {
  url: string;
  /** Rayon voulu dans la scène : le modèle est mis à l'échelle pour l'atteindre */
  radius: number;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

/** Modèle .glb centré et redimensionné à un rayon donné (les .glb n'ont pas tous la même taille) */
export function GlbModel({ url, radius, ...events }: GlbModelProps) {
  const { scene } = useGLTF(url);

  const { object, scale } = useMemo(() => {
    const object = scene.clone(true);
    const box = new Box3().setFromObject(object);
    const half = Math.max(...box.getSize(new Vector3()).toArray()) / 2;
    object.position.sub(box.getCenter(new Vector3()));
    return { object, scale: radius / (half || 1) };
  }, [scene, radius]);

  return (
    <group scale={scale} {...events}>
      <primitive object={object} />
    </group>
  );
}
