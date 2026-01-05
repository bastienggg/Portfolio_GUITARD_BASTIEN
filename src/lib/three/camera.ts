import * as THREE from "three";
import type { Position3D, MousePosition } from "@/types";

/**
 * Calcule les positions des planètes en orbite autour du soleil
 */
export function calculatePlanetPositions(
  projectsLength: number,
  time: number
): Position3D[] {
  return Array.from({ length: projectsLength }, (_, index) => {
    const planetIndex = projectsLength - 1 - index;
    const orbitRadius = 20 + planetIndex * 18;
    const baseAngle = planetIndex * Math.PI * 0.4 + Math.PI / 4;
    const orbitSpeed = 0.1 / (planetIndex + 1);
    const angle = baseAngle + time * orbitSpeed;
    const height = Math.sin(planetIndex * 0.5) * 2;

    return [
      Math.cos(angle) * orbitRadius,
      height,
      Math.sin(angle) * orbitRadius,
    ];
  });
}

/**
 * Calcule la position de la caméra avec interpolation smooth
 */
export function calculateCameraPosition(
  scrollProgress: number,
  planetPositions: Position3D[],
  mousePosition: MousePosition,
  projectsLength: number
): { cameraPosition: THREE.Vector3; targetPosition: THREE.Vector3 } {
  const maxScroll = projectsLength - 1;
  const normalizedProgress = Math.max(-1, Math.min(scrollProgress, maxScroll));

  let currentCameraPos: THREE.Vector3;
  let currentTarget: THREE.Vector3;
  let nextCameraPos: THREE.Vector3;
  let nextTarget: THREE.Vector3;
  let t: number;

  if (normalizedProgress < 0) {
    // Transition overview -> première planète
    const progress = normalizedProgress + 1;

    currentCameraPos = new THREE.Vector3(120, 80, 120);
    currentTarget = new THREE.Vector3(0, 0, 0);

    const firstPlanetPos = new THREE.Vector3(...planetPositions[0]);
    const directionFromSun = new THREE.Vector3(
      firstPlanetPos.x,
      0,
      firstPlanetPos.z
    ).normalize();
    nextCameraPos = new THREE.Vector3(
      firstPlanetPos.x + directionFromSun.x * 12,
      firstPlanetPos.y + 6,
      firstPlanetPos.z + directionFromSun.z * 12
    );
    nextTarget = firstPlanetPos;

    t = progress;
  } else {
    // Transitions entre planètes
    const currentIndex = Math.floor(normalizedProgress);
    const nextIndex = Math.min(currentIndex + 1, maxScroll);
    t = normalizedProgress - currentIndex;

    const currentPlanetPos = new THREE.Vector3(
      ...planetPositions[currentIndex]
    );
    const currentDirection = new THREE.Vector3(
      currentPlanetPos.x,
      0,
      currentPlanetPos.z
    ).normalize();
    currentCameraPos = new THREE.Vector3(
      currentPlanetPos.x + currentDirection.x * 12,
      currentPlanetPos.y + 3,
      currentPlanetPos.z + currentDirection.z * 12
    );
    currentTarget = currentPlanetPos;

    const nextPlanetPos = new THREE.Vector3(...planetPositions[nextIndex]);
    const nextDirection = new THREE.Vector3(
      nextPlanetPos.x,
      0,
      nextPlanetPos.z
    ).normalize();
    nextCameraPos = new THREE.Vector3(
      nextPlanetPos.x + nextDirection.x * 12,
      nextPlanetPos.y + 3,
      nextPlanetPos.z + nextDirection.z * 12
    );
    nextTarget = nextPlanetPos;
  }

  const cameraPosition = new THREE.Vector3().lerpVectors(
    currentCameraPos,
    nextCameraPos,
    t
  );

  // Arc parabolique pendant la transition
  if (t > 0 && t < 1) {
    const arcHeight = 8 * Math.sin(t * Math.PI);
    cameraPosition.y += arcHeight;
  }

  const targetPosition = new THREE.Vector3().lerpVectors(
    currentTarget,
    nextTarget,
    t
  );

  // Effet parallax avec la souris
  const parallaxOffset = new THREE.Vector3(
    mousePosition.x * 4,
    mousePosition.y * 3,
    0
  );
  cameraPosition.add(parallaxOffset);

  return { cameraPosition, targetPosition };
}
