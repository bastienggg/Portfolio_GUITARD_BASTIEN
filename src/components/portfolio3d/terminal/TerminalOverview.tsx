"use client";

import type { Project } from "@/types";

interface TerminalOverviewProps {
  onActivate: () => void;
}

/**
 * Composant Terminal en mode Overview (présentation initiale)
 */
export function TerminalOverview({ onActivate }: TerminalOverviewProps) {
  return (
    <div
      className="p-6 md:p-10 h-full flex flex-col justify-center font-mono text-[#0F0F0F] relative cursor-pointer transition-colors"
      onClick={onActivate}
      title="Cliquer pour ouvrir le terminal interactif"
    >
      <div className="mb-6 md:mb-8">
        <span className="text-[#4A4A4A] text-sm font-bold">
          &gt; SYSTEM_ONLINE
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-[#0F0F0F] mb-2 tracking-wider uppercase">
        BASTIEN GUITARD
      </h1>
      <div className="pencil-line mb-6 md:mb-8 w-full"></div>

      <div className="mb-4">
        <span className="text-[#4A4A4A] font-bold">&gt; role:</span>
        <span className="text-[#0F0F0F] ml-2 text-sm md:text-base">
          DÉVELOPPEUR FULL-STACK & CRÉATIF
        </span>
      </div>

      <div className="mb-6 md:mb-8">
        <span className="text-[#4A4A4A] font-bold">&gt; message:</span>
        <p className="text-[#2A2A2A] mt-2 leading-relaxed text-sm md:text-base">
          Bienvenue dans mon univers ! Explorez mes projets à travers ce système
          solaire interactif. Chaque planète représente une création unique
          mêlant technologie et créativité.
        </p>
      </div>

      <div className="text-[#4A4A4A] text-xs md:text-sm space-y-2">
        <div className="animate-pulse">
          <span className="font-bold">
            &gt; Scroll ou Click sur les titres pour explorer_
          </span>
        </div>
        <div className="text-[#9A9A8A] text-xs mt-2">
          <span>[Cliquez sur le terminal pour le mode interactif]</span>
        </div>
      </div>
    </div>
  );
}
