import type { ReactNode } from "react";
import Link from "next/link";

/** Pages légales : simples pages de lecture, sans la scène 3D */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="legal">
      <header className="legal-top">
        <Link href="/" className="logo" aria-label="Retour au système">
          <span className="logo-mark">BG</span>
          <span className="logo-name">bastien.guitard</span>
        </Link>
        <Link href="/" className="legal-back">
          ← Retour au système
        </Link>
      </header>
      <main className="legal-main">{children}</main>
      <footer className="legal-foot">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/confidentialite">Confidentialité</Link>
      </footer>
    </div>
  );
}
