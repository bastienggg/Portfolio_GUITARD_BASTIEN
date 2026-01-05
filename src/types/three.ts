import * as THREE from "three";

/**
 * Types pour les positions 3D
 */
export type Position3D = [number, number, number];

/**
 * Props pour les composants avec position 3D
 */
export interface Position3DProps {
  position: Position3D;
}

/**
 * Props pour les composants avec état actif
 */
export interface ActiveStateProps {
  isActive: boolean;
}

/**
 * Props pour la navigation
 */
export interface NavigationProps {
  onNavigate: (index: number) => void;
}

/**
 * Type pour la position de la souris
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Type pour les références de groupe Three.js
 */
export type GroupRef = THREE.Group | null;

/**
 * Type pour les références de mesh Three.js
 */
export type MeshRef = THREE.Mesh | null;

/**
 * Type pour les références de points Three.js
 */
export type PointsRef = THREE.Points | null;
