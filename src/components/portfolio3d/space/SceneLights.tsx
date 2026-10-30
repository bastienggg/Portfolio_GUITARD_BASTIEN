"use client";

/**
 * Éclairage global de la scène
 */
export function SceneLights() {
  return (
    <>
      <hemisphereLight intensity={1.5} color="#F7F7E1" groundColor="#9A9A8A" />
      <ambientLight intensity={0.6} color="#E8E8DC" />
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color="#4A4A4A"
        distance={200}
        decay={1.5}
      />
      <directionalLight
        position={[-100, 50, 50]}
        intensity={1.5}
        color="#F7F7E1"
      />
      <directionalLight
        position={[100, 30, -50]}
        intensity={1}
        color="#D4D4C8"
      />
    </>
  );
}
