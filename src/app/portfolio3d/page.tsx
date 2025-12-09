import SolarSystemScene from "@/components/SolarSystemScene";

export const metadata = {
  title: "Portfolio 3D - Bastien Guitard",
  description: "Explorez mes projets dans un système solaire interactif en 3D",
};

export default function Portfolio3DPage() {
  return (
    <main className="w-full h-screen" style={{ backgroundColor: "#0a1929" }}>
      <SolarSystemScene />
    </main>
  );
}
