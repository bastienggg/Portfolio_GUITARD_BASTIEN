import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Heart, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez ma galerie photo : paysages, moments capturés et créations visuelles.",
};

// Données exemple pour la galerie (à remplacer par vos vraies photos)
const galleryImages = [
  {
    id: 1,
    src: "/gallery/photo-1.jpg",
    alt: "Paysage montagneux au coucher du soleil",
    category: "Paysages",
    title: "Coucher de soleil en montagne",
    description: "Vue panoramique depuis les hauteurs",
  },
  {
    id: 2,
    src: "/gallery/photo-2.jpg",
    alt: "Architecture moderne en noir et blanc",
    category: "Architecture",
    title: "Lignes contemporaines",
    description: "Jeu de lumières et de formes",
  },
  {
    id: 3,
    src: "/gallery/photo-3.jpg",
    alt: "Portrait créatif avec éclairage dramatique",
    category: "Portraits",
    title: "Éclairage dramatique",
    description: "Exploration des contrastes",
  },
  {
    id: 4,
    src: "/gallery/photo-4.jpg",
    alt: "Nature macro - détail de fleur",
    category: "Macro",
    title: "Détails naturels",
    description: "La beauté dans les petits détails",
  },
  {
    id: 5,
    src: "/gallery/photo-5.jpg",
    alt: "Paysage urbain de nuit",
    category: "Urbain",
    title: "Ville nocturne",
    description: "Lumières et reflets urbains",
  },
  {
    id: 6,
    src: "/gallery/photo-6.jpg",
    alt: "Forêt brumeuse au petit matin",
    category: "Paysages",
    title: "Brume matinale",
    description: "Atmosphère mystérieuse en forêt",
  },
  {
    id: 7,
    src: "/gallery/photo-7.jpg",
    alt: "Architecture historique",
    category: "Architecture",
    title: "Patrimoine historique",
    description: "Beauté des édifices anciens",
  },
  {
    id: 8,
    src: "/gallery/photo-8.jpg",
    alt: "Portrait spontané en lumière naturelle",
    category: "Portraits",
    title: "Lumière naturelle",
    description: "Spontanéité et authenticité",
  },
  {
    id: 9,
    src: "/gallery/photo-9.jpg",
    alt: "Détail architectural moderne",
    category: "Macro",
    title: "Textures modernes",
    description: "Matériaux et textures",
  },
];

const categories = [
  "Tous",
  "Paysages",
  "Architecture",
  "Portraits",
  "Macro",
  "Urbain",
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Galerie Photo
              </h1>
              <p className="text-xl lg:text-2xl text-foreground/60">
                Captures et créations visuelles
              </p>
            </div>

            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Au-delà du développement, la photographie est une passion qui
              nourrit ma créativité et affine mon regard sur les détails et la
              composition.
            </p>

            <div className="flex items-center justify-center space-x-8 text-foreground/60">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Photographie</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Passion</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Créativité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note d'information */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    📸 Comment personnaliser cette galerie
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Pour remplacer les images placeholder par vos photos :
                    </p>
                    <ol className="mt-2 list-decimal list-inside space-y-1">
                      <li>
                        Ajoutez vos photos dans le dossier{" "}
                        <code className="bg-blue-200 px-1 rounded">
                          /public/gallery/
                        </code>
                      </li>
                      <li>
                        Nommez-les{" "}
                        <code className="bg-blue-200 px-1 rounded">
                          photo-1.jpg
                        </code>
                        ,{" "}
                        <code className="bg-blue-200 px-1 rounded">
                          photo-2.jpg
                        </code>
                        , etc.
                      </li>
                      <li>
                        Modifiez les titres et descriptions dans{" "}
                        <code className="bg-blue-200 px-1 rounded">
                          src/app/galerie/page.tsx
                        </code>
                      </li>
                      <li>
                        Optimisez vos images en format WebP pour de meilleures
                        performances
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres de catégories */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "Tous" ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille de photos */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <Card
                  key={image.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* Image placeholder avec motif géométrique */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10"></div>
                      <div className="relative text-center space-y-2">
                        <Camera className="h-12 w-12 text-foreground/30 mx-auto" />
                        <div className="text-xs text-foreground/40 font-mono">
                          {image.src}
                        </div>
                      </div>
                    </div>

                    {/* Overlay avec informations */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white w-full">
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {image.category}
                          </Badge>
                          <h3 className="font-semibold text-sm">
                            {image.title}
                          </h3>
                          <p className="text-xs text-gray-200">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* À propos de ma photographie */}
      <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              La photographie, une passion créative
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Regard artistique
                </h3>
                <p className="text-foreground/70">
                  La photographie affine mon sens de la composition et du
                  détail, compétences que je transpose naturellement dans mes
                  projets de développement et de design d'interfaces.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Exploration visuelle
                </h3>
                <p className="text-foreground/70">
                  Capturer l'instant, jouer avec la lumière et les perspectives
                  nourrit ma créativité et enrichit ma vision des projets
                  numériques que je développe.
                </p>
              </div>
            </div>
            <p className="text-foreground/60 italic">
              "Chaque photo raconte une histoire, chaque projet de développement
              résout un problème."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
