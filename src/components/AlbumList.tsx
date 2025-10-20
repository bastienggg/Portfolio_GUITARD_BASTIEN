"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, Image as ImageIcon } from "lucide-react";

interface Album {
  name: string;
  slug: string;
  coverImage: string;
  photoCount: number;
  description: string;
  category: string;
}

interface AlbumListProps {
  albums: Album[];
}

export default function AlbumList({ albums }: AlbumListProps) {
  const router = useRouter();

  const handleAlbumClick = (slug: string) => {
    router.push(`/galerie/${slug}`);
  };

  return (
    <motion.div
      className="min-h-screen py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Effet d'arrière-plan animé */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Galerie Photo
          </motion.h1>
          <motion.p
            className="text-lg text-foreground/60 max-w-2xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Découvrez mes albums photo organisés par thème
          </motion.p>
        </div>

        {/* Liste des albums - Pleine largeur avec animations depuis la gauche */}
        <motion.div
          className="w-full space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {albums.map((album, index) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: { duration: 0.2 },
              }}
              className="w-full"
            >
              <motion.div
                onClick={() => handleAlbumClick(album.slug)}
                className="w-full p-8 lg:p-10 border border-border rounded-xl hover:border-primary/50 transition-all duration-500 cursor-pointer group bg-card/30 hover:bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <motion.div
                      className="flex items-center gap-4 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {album.name}
                      </h3>
                      <motion.div
                        className="flex items-center gap-2 text-sm text-foreground/60 bg-background/50 px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span className="font-mono">
                          {album.photoCount} photos
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.p
                      className="text-foreground/70 text-base lg:text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                    >
                      {album.description}
                    </motion.p>
                  </div>
                  <motion.div
                    className="ml-8 opacity-60 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight className="h-6 w-6 lg:h-8 lg:w-8 text-foreground/50 group-hover:text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
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
  );
}
