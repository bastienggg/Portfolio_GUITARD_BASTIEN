import SolarSystemScene from "@/components/SolarSystemScene";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio 3D Interactif - Explorez l'Univers de Bastien Guitard",
  description:
    "Naviguez dans un système solaire interactif en 3D pour découvrir mes projets web : Dot TXT (collaboration temps réel), Let Him Quizz (jeu VR éducatif), et plus. Portfolio immersif créé avec React Three Fiber.",
  keywords: [
    "portfolio 3D",
    "système solaire interactif",
    "Three.js",
    "React Three Fiber",
    "WebGL",
    "expérience immersive",
    "projets web 3D",
  ],
  openGraph: {
    title: "Portfolio 3D Interactif - Bastien Guitard",
    description:
      "Explorez mes projets dans un système solaire 3D unique. Chaque planète représente un projet innovant.",
    type: "website",
  },
  alternates: {
    canonical: "https://bastienguitard.fr/portfolio3d",
  },
};

export default function Portfolio3DPage() {
  return (
    <main className="w-full h-screen bg-black">
      <SolarSystemScene />
    </main>
  );
}
