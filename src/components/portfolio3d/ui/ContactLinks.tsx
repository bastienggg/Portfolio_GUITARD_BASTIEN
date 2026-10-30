import { profile } from "@/data/profile";

const LINKS = [
  { icon: "@", label: "EMAIL", href: `mailto:${profile.email}`, external: false },
  { icon: "#", label: "GITHUB", href: profile.github, external: true },
  { icon: "in", label: "LINKEDIN", href: profile.linkedin, external: true },
];

/**
 * Contenu de la fenêtre Contact (mode overview)
 */
export function ContactLinks() {
  return (
    <div className="p-2 md:p-4 font-mono text-xs space-y-1.5 md:space-y-3">
      <div className="text-[#4A4A4A] text-[8px] md:text-xs">
        <span className="text-[#0F0F0F] font-bold">&gt;</span> contact.info
      </div>

      <div className="space-y-1 md:space-y-2">
        {LINKS.map(({ icon, label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="flex items-center gap-1.5 md:gap-2 text-[#0F0F0F] hover:text-[#4A4A4A] transition-colors group"
          >
            <span className="text-[#0F0F0F] text-xs md:text-base font-bold">
              {icon}
            </span>
            <span className="text-[8px] md:text-[10px] font-bold">{label}</span>
          </a>
        ))}
      </div>

      <div className="text-[#9A9A8A] text-[7px] md:text-[9px] mt-1.5 md:mt-3 border-t border-[#0F0F0F]/20 pt-1.5 md:pt-2">
        &gt; status: online_
      </div>
    </div>
  );
}
