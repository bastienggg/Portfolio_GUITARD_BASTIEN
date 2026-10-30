/**
 * Séparateur dessiné à la main entre le terminal et la scène 3D
 * (horizontal en haut sur mobile, vertical à droite sur desktop)
 */
export function HandDrawnDivider() {
  return (
    <>
      <div
        className="absolute top-0 md:top-0 md:right-0 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#0F0F0F] via-[#2A2A2A] to-[#0F0F0F] opacity-70 z-50"
        style={{ filter: "url(#rough-border)" }}
      ></div>
      <div
        className="absolute top-0.5 md:top-0 md:right-0.5 w-full md:w-1 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-[#4A4A4A] via-[#0F0F0F] to-[#4A4A4A] opacity-50 z-50"
        style={{ filter: "url(#rough-border)" }}
      ></div>
    </>
  );
}
