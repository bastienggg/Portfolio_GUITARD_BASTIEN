"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, type PerspectiveCamera } from "three";
import { projects } from "@/lib/projects";
import {
  isMobileWidth,
  outerOrbit,
  planetRadius,
  planetWorld,
  sceneState,
} from "../sceneState";

/**
 * Caméra : vue d'ensemble ou cadrage sur la planète courante.
 * La position glisse vers sa cible (lissage indépendant du framerate) et
 * setViewOffset décale le cadrage pour laisser la place aux panneaux.
 */
export function CameraRig() {
  const cam = useMemo(
    () => ({
      pos: new Vector3(),
      look: new Vector3(),
      shiftX: 0,
      shiftY: 0,
      ready: false,
      tPos: new Vector3(),
      tLook: new Vector3(),
      tmp: new Vector3(),
    }),
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(0.05, delta);
    const camera = state.camera as PerspectiveCamera;
    const { width: w, height: h } = state.size;
    const mobile = isMobileWidth(w);
    const { view, cur, mode, pointer } = sceneState;

    let shiftX: number;
    let shiftY: number;
    if (view === "focus" || view === "report") {
      const wp = planetWorld[cur];
      const outward = cam.tmp.copy(wp).setY(0).normalize();
      const dist = 5.2 + planetRadius(projects[cur].planet.size) * 3.2;
      cam.tPos.copy(wp).addScaledVector(outward, dist);
      cam.tPos.y += dist * 0.35;
      cam.tLook.copy(wp);
      shiftX = mobile ? 0 : 0.21;
      shiftY = mobile ? 0.24 : 0.02;
    } else {
      const far = mobile ? 1.35 : 1;
      const extent = outerOrbit + 8;
      cam.tPos.set(0, extent * 0.95 * far, extent * 1.7 * far);
      cam.tLook.set(0, 0, 0);
      shiftX = mobile ? 0 : mode === "list" ? -0.12 : 0.16;
      shiftY = mobile ? -0.14 : 0;
    }

    if (!cam.ready) {
      cam.pos.copy(cam.tPos);
      cam.look.copy(cam.tLook);
      cam.shiftX = shiftX;
      cam.shiftY = shiftY;
      cam.ready = true;
    }

    const k = 1 - Math.pow(0.0015, dt);
    cam.pos.lerp(cam.tPos, k);
    cam.look.lerp(cam.tLook, k);
    cam.shiftX += (shiftX - cam.shiftX) * k;
    cam.shiftY += (shiftY - cam.shiftY) * k;

    const par = view === "system" ? 1.4 : 0.3;
    camera.position.set(cam.pos.x + pointer.x * par, cam.pos.y - pointer.y * par, cam.pos.z);
    camera.lookAt(cam.look);
    camera.setViewOffset(w, h, -cam.shiftX * w, cam.shiftY * h, w, h);
  });

  return null;
}
