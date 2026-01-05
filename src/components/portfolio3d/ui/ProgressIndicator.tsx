"use client";

interface ProgressIndicatorProps {
  projectsLength: number;
  currentIndex: number;
  isOverviewMode: boolean;
}

/**
 * Composant indicateur de progression
 */
export function ProgressIndicator({
  projectsLength,
  currentIndex,
  isOverviewMode,
}: ProgressIndicatorProps) {
  if (isOverviewMode) return null;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: projectsLength }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm transition-all sketch-shadow-sm ${
            index === currentIndex
              ? "bg-[#0F0F0F] scale-125"
              : "bg-[#9A9A8A]/50"
          }`}
        />
      ))}
    </div>
  );
}
