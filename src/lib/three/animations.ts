import * as THREE from "three";

/**
 * Crée la géométrie pour les particules de galaxie spirale
 */
export function createGalaxyGeometry() {
  const geometry = new THREE.BufferGeometry();
  const particlesCount = 15000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const branches = 3;
  const spinFactor = 4;
  const randomnessPower = 3;

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), 1.5) * 120;
    const spinAngle = radius * spinFactor * 0.015;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const angle = branchAngle + spinAngle;

    const randomX =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      (2 + radius * 0.05);
    const randomY =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      (1 + radius * 0.02);
    const randomZ =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      (2 + radius * 0.05);

    const x = Math.cos(angle) * radius + randomX;
    const y = randomY;
    const z = Math.sin(angle) * radius + randomZ;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    // Gradient de couleurs
    const mixedColor = new THREE.Color();
    const yellowColor = new THREE.Color("#FFD700");
    const lightGrayColor = new THREE.Color("#B8B8A8");
    const darkGrayColor = new THREE.Color("#6A6A6A");
    const blackColor = new THREE.Color("#1A1A1A");

    if (radius < 10) {
      mixedColor.copy(yellowColor);
      mixedColor.multiplyScalar(1.2);
    } else if (radius < 35) {
      mixedColor.copy(yellowColor);
    } else if (radius < 70) {
      const t = (radius - 35) / 35;
      mixedColor.lerpColors(yellowColor, lightGrayColor, t);
    } else if (radius < 100) {
      const t = (radius - 70) / 30;
      mixedColor.lerpColors(lightGrayColor, darkGrayColor, t);
    } else {
      const t = Math.min((radius - 100) / 20, 1);
      mixedColor.lerpColors(darkGrayColor, blackColor, t);
    }

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geometry;
}

/**
 * Crée la géométrie pour les particules flottantes
 */
export function createFloatingParticlesGeometry() {
  const geometry = new THREE.BufferGeometry();
  const particlesCount = 5000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const velocities = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;

    positions[i3] = (Math.random() - 0.5) * 300;
    positions[i3 + 1] = (Math.random() - 0.5) * 200;
    positions[i3 + 2] = (Math.random() - 0.5) * 300;

    velocities[i3] = (Math.random() - 0.5) * 0.05;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.03;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

    const brightness = Math.random() * 0.5 + 0.3;
    colors[i3] = brightness;
    colors[i3 + 1] = brightness;
    colors[i3 + 2] = brightness;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return { geometry, velocities };
}

/**
 * Met à jour les positions des particules flottantes
 */
export function updateFloatingParticles(
  positions: Float32Array,
  velocities: Float32Array
) {
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += velocities[i];
    positions[i + 1] += velocities[i + 1];
    positions[i + 2] += velocities[i + 2];

    if (Math.abs(positions[i]) > 150) positions[i] *= -1;
    if (Math.abs(positions[i + 1]) > 100) positions[i + 1] *= -1;
    if (Math.abs(positions[i + 2]) > 150) positions[i + 2] *= -1;
  }
}
