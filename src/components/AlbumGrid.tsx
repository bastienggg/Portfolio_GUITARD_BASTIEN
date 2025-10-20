"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AlbumCard from "./AlbumCard";

interface Album {
  name: string;
  slug: string;
  coverImage: string;
  photoCount: number;
  description: string;
  category: string;
}

interface AlbumGridProps {
  albums: Album[];
}

export default function AlbumGrid({ albums }: AlbumGridProps) {
  const router = useRouter();

  const handleAlbumClick = (slug: string) => {
    router.push(`/galerie/${slug}`);
  };

  return (
    <>
      <motion.div
        className="min-h-screen py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec animations */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Galerie Photo
            </motion.h1>
            <motion.p
              className="text-lg text-foreground/60 max-w-2xl mx-auto font-sans leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Découvrez mes photographies organisées par thème. Chaque album
              raconte une histoire unique à travers mon objectif.
            </motion.p>
          </div>

          {/* Statistiques animées */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="text-center p-6 rounded-lg bg-card border"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl font-bold text-primary mb-2 font-mono"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {albums.length}
              </motion.div>
              <div className="text-sm text-foreground/60 font-sans">Albums</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-card border"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl font-bold text-primary mb-2 font-mono"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {albums.reduce((total, album) => total + album.photoCount, 0)}
              </motion.div>
              <div className="text-sm text-foreground/60 font-sans">Photos</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-card border"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-3xl font-bold text-primary mb-2 font-mono"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {new Set(albums.map((album) => album.category)).size}
              </motion.div>
              <div className="text-sm text-foreground/60 font-sans">
                Catégories
              </div>
            </motion.div>
          </motion.div>

          {/* Grille d'albums */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {albums.map((album, index) => (
              <AlbumCard
                key={album.slug}
                album={album}
                index={index}
                onClick={handleAlbumClick}
              />
            ))}
          </motion.div>

          {/* Message si aucun album */}
          {albums.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2 text-foreground font-sans">
                Aucun album trouvé
              </h3>
              <p className="text-foreground/60 font-sans">
                Les albums seront bientôt disponibles.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
