/**
 * Filtre SVG global pour les bordures gribouillées (utilisé via filter: url(#rough-border))
 */
export function RoughBorderFilter() {
  return (
    <svg className="svg-filters" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="rough-border" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
