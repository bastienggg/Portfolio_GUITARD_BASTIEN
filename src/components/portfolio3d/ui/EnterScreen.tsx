"use client";

interface EnterScreenProps {
  onEnter: () => void;
}

/**
 * Composant écran d'entrée
 */
export function EnterScreen({ onEnter }: EnterScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#F7F7E1] flex items-center justify-center paper-texture">
      <div className="text-center space-y-8 md:space-y-12 p-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0F0F0F] tracking-wider uppercase">
            BASTIEN
            <br />
            GUITARD
          </h1>
          <div className="pencil-line w-full"></div>
          <p className="text-[#4A4A4A] text-sm md:text-base font-mono tracking-wide">
            DÉVELOPPEUR FULL-STACK & CRÉATIF
          </p>
        </div>

        <button
          onClick={onEnter}
          className="group relative px-12 py-4 md:px-16 md:py-6 bg-transparent border-4 border-[#0F0F0F] text-[#0F0F0F] text-xl md:text-2xl font-bold uppercase hover:bg-[#0F0F0F] hover:text-[#F7F7E1] transition-all duration-300 sketch-shadow"
        >
          <span className="relative z-10">ENTRER</span>
          <div className="absolute inset-0 bg-[#0F0F0F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>

        <div className="text-[#9A9A8A] text-xs md:text-sm font-mono flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-[#0F0F0F]">[</span>
          <span className="text-[#4A4A4A]">Expérience audio recommandée</span>
          <span className="text-lg font-bold text-[#0F0F0F]">]</span>
        </div>
      </div>
    </div>
  );
}
