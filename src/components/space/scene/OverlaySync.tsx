"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { projects } from "@/lib/projects";
import { overlayEls, planetWorld, sceneState } from "../sceneState";

const CARD_W = 260;

/**
 * Projette la position des planètes à l'écran et y place les éléments HTML
 * (étiquettes, carte de survol). Écrit directement dans le DOM.
 */
export function OverlaySync() {
  const v = useMemo(() => new Vector3(), []);

  useFrame(({ camera, size }) => {
    const { width: w, height: h } = size;
    const { hovered } = sceneState;

    projects.forEach((p, i) => {
      const el = overlayEls.labels[i];
      if (!el) return;
      v.copy(planetWorld[i]).project(camera);
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-v.y * 0.5 + 0.5) * h;
      const off = 14 + p.planet.size * 22;
      const lw = el.offsetWidth || 120;
      const lx = x > w * 0.82 ? x - off - lw : x + off;
      el.style.transform = `translate(${Math.round(lx)}px, ${Math.round(y - 14)}px)`;
      el.style.zIndex = String(Math.round((1 - v.z) * 1000));

      const card = overlayEls.card;
      if (i === hovered && card) {
        const ch = card.offsetHeight || 200;
        let cx = x > w * 0.6 ? x - CARD_W - off - 10 : x + off + 10;
        let cy = y - ch - 20;
        if (cy < 90) cy = y + 30;
        cx = Math.max(16, Math.min(w - CARD_W - 16, cx));
        cy = Math.max(84, Math.min(h - ch - 80, cy));
        card.style.left = `${cx}px`;
        card.style.top = `${cy}px`;
      }
    });
  });

  return null;
}
