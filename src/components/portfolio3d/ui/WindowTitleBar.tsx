"use client";

const SIZES = {
  md: {
    bar: "h-10 px-4 visible-sketch-border",
    dots: "gap-2",
    dot: "w-2 h-2",
    firstDot: "sketch-shadow-sm",
    title: "text-xs",
    showArrow: true,
  },
  sm: {
    bar: "h-6 md:h-8 px-2 md:px-3",
    dots: "gap-1 md:gap-1.5",
    dot: "w-1 h-1 md:w-1.5 md:h-1.5",
    firstDot: "",
    title: "text-[8px] md:text-[10px]",
    showArrow: false,
  },
};

interface WindowTitleBarProps {
  title: string;
  size?: keyof typeof SIZES;
}

/**
 * Barre de titre de fenêtre style croquis (3 boutons + titre)
 */
export function WindowTitleBar({ title, size = "md" }: WindowTitleBarProps) {
  const s = SIZES[size];

  return (
    <div
      className={`${s.bar} bg-gradient-to-r from-[#FFFEF5] via-[#F7F7E1] to-[#FFFEF5] border-b-2 border-[#0F0F0F]/40 flex items-center relative`}
    >
      <div className="absolute inset-0 pencil-line opacity-10"></div>
      <div className={`flex ${s.dots} z-10`}>
        <div className={`${s.dot} bg-[#0F0F0F] rounded-sm ${s.firstDot}`}></div>
        <div className={`${s.dot} bg-[#4A4A4A] rounded-sm`}></div>
        <div className={`${s.dot} bg-[#9A9A8A] rounded-sm`}></div>
      </div>
      <div className="flex-1 text-center z-10">
        <span
          className={`text-[#0F0F0F] ${s.title} font-mono tracking-widest font-bold`}
        >
          {title}
        </span>
      </div>
      {s.showArrow && (
        <div className="text-[#4A4A4A] text-xs font-mono z-10">▼</div>
      )}
    </div>
  );
}
