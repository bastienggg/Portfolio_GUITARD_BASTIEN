"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  BackSide,
  BufferGeometry,
  DoubleSide,
  Line,
  LineDashedMaterial,
  Vector3,
  type Group,
} from "three";
import type { Project } from "@/types/project";
import { INK, orbitRadius, planetRadius, planetWorld, sceneState } from "../sceneState";
import { GlbModel } from "./GlbModel";
import { lowPolyGeometry, outlineGeometry, OUTLINE_SCALE } from "./lowPoly";

interface PlanetProps {
  project: Project;
  index: number;
  onHover: (index: number) => void;
  onSelect: (index: number) => void;
}

/** Les planètes ne peuvent être survolées/cliquées que dans la vue système en mode 3D */
const interactive = () => sceneState.view === "system" && sceneState.mode === "3d";

export function Planet({ project, index, onHover, onSelect }: PlanetProps) {
  const holder = useRef<Group>(null);
  const body = useRef<Group>(null);
  const gl = useThree((s) => s.gl);

  const r = orbitRadius(index);
  const size = planetRadius(project.planet.size);
  const speed = 0.26 / Math.sqrt(r);
  const angle = useRef((index * 2.399) % (Math.PI * 2));
  const scaleTarget = useMemo(() => new Vector3(1, 1, 1), []);

  const { color, spot, ring, model } = project.planet;
  const geo = useMemo(
    () => lowPolyGeometry(size, 1, color, spot, 11 + index * 31, 0.28),
    [size, color, spot, index]
  );
  const outline = useMemo(() => outlineGeometry(size, 1), [size]);

  // Orbite en pointillés
  const orbit = useMemo(() => {
    const pts: Vector3[] = [];
    for (let a = 0; a <= 160; a++) {
      const t = (a / 160) * Math.PI * 2;
      pts.push(new Vector3(Math.cos(t) * r, 0, Math.sin(t) * r));
    }
    const line = new Line(
      new BufferGeometry().setFromPoints(pts),
      new LineDashedMaterial({
        color: INK,
        dashSize: 0.35,
        gapSize: 0.45,
        transparent: true,
        opacity: 0.42 - index * 0.04,
      })
    );
    line.computeLineDistances();
    line.raycast = () => null;
    return line;
  }, [r, index]);

  useEffect(
    () => () => {
      geo.dispose();
      outline.dispose();
      orbit.geometry.dispose();
      (orbit.material as LineDashedMaterial).dispose();
    },
    [geo, outline, orbit]
  );

  useFrame((_, delta) => {
    const dt = Math.min(0.05, delta);
    const { view, hovered } = sceneState;
    if (view === "system" || view === "intro") {
      angle.current += dt * speed * (hovered === index ? 0.12 : 1);
    }
    const h = holder.current;
    const b = body.current;
    if (!h || !b) return;
    h.position.set(Math.cos(angle.current) * r, 0, Math.sin(angle.current) * r);
    planetWorld[index].copy(h.position);
    b.rotation.y += dt * (0.25 + index * 0.04);
    b.rotation.x = 0.25;
    scaleTarget.setScalar(hovered === index ? 1.22 : 1);
    h.scale.lerp(scaleTarget, 0.15);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive()) return;
    e.stopPropagation();
    onHover(index);
    gl.domElement.style.cursor = "pointer";
  };
  const out = () => {
    gl.domElement.style.cursor = "default";
    if (sceneState.view === "system") onHover(-1);
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive()) return;
    e.stopPropagation();
    onSelect(index);
  };

  return (
    <>
      <primitive object={orbit} />
      <group ref={holder}>
        <group ref={body}>
          {model ? (
            // Le modèle .glb du projet ; pas de planète affichée tant qu'il charge
            <Suspense fallback={null}>
              <GlbModel url={model} radius={size} onPointerOver={over} onPointerOut={out} onClick={click} />
            </Suspense>
          ) : (
            <>
              <mesh geometry={outline} scale={OUTLINE_SCALE} raycast={() => null}>
                <meshBasicMaterial color={INK} side={BackSide} />
              </mesh>
              <mesh geometry={geo} onPointerOver={over} onPointerOut={out} onClick={click}>
                <meshLambertMaterial vertexColors />
              </mesh>
            </>
          )}
        </group>
        {ring && (
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]} raycast={() => null}>
            <ringGeometry args={[size * 1.5, size * 1.75, 48]} />
            <meshBasicMaterial color={INK} side={DoubleSide} />
          </mesh>
        )}
      </group>
    </>
  );
}
