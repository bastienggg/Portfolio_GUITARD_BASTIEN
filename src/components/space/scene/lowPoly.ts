import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  IcosahedronGeometry,
} from "three";

/** Générateur pseudo-aléatoire déterministe (même rendu à chaque chargement) */
export function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * Icosaèdre à facettes : chaque face prend la couleur de base ou celle des taches.
 * Les pôles ont plus de chances d'être tachés.
 */
export function lowPolyGeometry(
  radius: number,
  detail: number,
  base: string,
  spot: string,
  seed: number,
  spotRatio: number
) {
  let g: BufferGeometry = new IcosahedronGeometry(radius, detail);
  if (g.index) g = g.toNonIndexed();
  g.computeVertexNormals();

  const pos = g.attributes.position;
  const colors: number[] = [];
  const rnd = seeded(seed);
  const cBase = new Color(base);
  const cSpot = new Color(spot);

  for (let f = 0; f < pos.count / 3; f++) {
    const y = pos.getY(f * 3) / radius;
    const isSpot = rnd() < spotRatio + Math.max(0, Math.abs(y) - 0.7) * 0.4;
    const c = isSpot ? cSpot : cBase;
    for (let k = 0; k < 3; k++) colors.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return g;
}

/** Contour encré : la même forme vue de l'intérieur, légèrement agrandie */
export const OUTLINE_SCALE = 1.075;
export const outlineGeometry = (radius: number, detail: number) =>
  new IcosahedronGeometry(radius, detail);
