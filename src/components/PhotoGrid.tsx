"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PhotoViewer from "./PhotoViewer";

interface Photo {
  id: string;
  src: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
}

interface Album {
  name: string;
  slug: string;
  coverImage: string;
  photoCount: number;
  description: string;
  category: string;
}

interface PhotoGridProps {
  album: Album;
  photos: Photo[];
}

export default function PhotoGrid({ album, photos }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseViewer = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* En-tête avec navigation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/galerie">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la galerie
              </Button>
            </Link>

            <div className="text-center mb-8">
              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {album.name}
              </motion.h1>

              <motion.p
                className="text-lg text-foreground/60 max-w-2xl mx-auto font-sans leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {album.description}
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge variant="secondary" className="font-sans">
                  <Tag className="h-3 w-3 mr-1" />
                  {album.category}
                </Badge>
                <Badge variant="outline" className="font-mono">
                  {photos.length} photos
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* Grille de photos avec masonry layout */}
          <motion.div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="group cursor-pointer break-inside-avoid mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={400}
                    height={0}
                    style={{ height: "auto", width: "100%" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />

                  {/* Overlay avec titre */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-medium text-sm truncate">
                        {photo.title}
                      </h3>
                      {photo.date && (
                        <p className="text-white/80 text-xs mt-1">
                          {photo.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Message si aucune photo */}
          {photos.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2 text-foreground font-sans">
                Album vide
              </h3>
              <p className="text-foreground/60 font-sans">
                Cet album ne contient pas encore de photos.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Viewer de photo (sans navigation) */}
      {selectedPhoto && (
        <PhotoViewer
          photo={selectedPhoto}
          albumInfo={{
            name: album.name,
            category: album.category,
          }}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
}
