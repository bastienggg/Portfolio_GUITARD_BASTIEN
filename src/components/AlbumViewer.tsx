"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Photo {
  id: string;
  src: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
}

interface AlbumViewerProps {
  albumSlug: string;
  onClose: () => void;
}

export default function AlbumViewer({ albumSlug, onClose }: AlbumViewerProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(true); // Ouvrir par défaut
  const [albumInfo, setAlbumInfo] = useState<{
    name: string;
    description: string;
    category: string;
  }>({ name: "", description: "", category: "" });

  useEffect(() => {
    // Charger les vraies photos de l'album via l'API
    const loadAlbumPhotos = async () => {
      setIsLoading(true);

      try {
        // Appeler notre API pour récupérer les photos réelles
        const response = await fetch(`/api/albums/${albumSlug}`);
        if (response.ok) {
          const { album, photos: realPhotos } = await response.json();
          setPhotos(realPhotos);
          setAlbumInfo({
            name:
              album?.name ||
              albumSlug.charAt(0).toUpperCase() + albumSlug.slice(1),
            description:
              album?.description || `Collection de photographies ${albumSlug}`,
            category: album?.category || "Nature",
          });
        } else {
          // Fallback en cas d'erreur d'API
          setPhotos([]);
          setAlbumInfo({
            name: albumSlug.charAt(0).toUpperCase() + albumSlug.slice(1),
            description: `Collection de photographies ${albumSlug}`,
            category: "Nature",
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'album:", error);
        // Fallback en cas d'erreur
        setPhotos([]);
        setAlbumInfo({
          name: albumSlug.charAt(0).toUpperCase() + albumSlug.slice(1),
          description: `Collection de photographies ${albumSlug}`,
          category: "Nature",
        });
      }

      setIsLoading(false);
    };

    loadAlbumPhotos();
  }, [albumSlug]);

  const nextPhoto = useCallback(() => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  }, [photos.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ne pas empêcher le comportement par défaut de toutes les touches
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowRight":
        case "Right":
          e.preventDefault();
          nextPhoto();
          break;
        case "ArrowLeft":
        case "Left":
          e.preventDefault();
          prevPhoto();
          break;
        case "i":
        case "I":
          e.preventDefault();
          setShowInfo((prev) => !prev);
          break;
        default:
          // Laisser le comportement par défaut pour les autres touches
          break;
      }
    },
    [onClose, nextPhoto, prevPhoto]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white font-sans">Chargement de l'album...</p>
        </div>
      </motion.div>
    );
  }

  if (photos.length === 0) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-bold mb-2 text-white font-sans">
            Album vide
          </h3>
          <p className="text-white/60 mb-6 font-sans">
            Cet album ne contient pas encore de photos.
          </p>
          <Button onClick={onClose} variant="outline">
            Retour
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  const currentPhoto = photos[currentIndex];

  // Protection contre les index invalides
  if (!currentPhoto) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Header */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between text-white">
          <div>
            <h2 className="text-xl font-bold font-sans">{albumInfo.name}</h2>
            <p className="text-sm text-white/60 font-sans">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              className="text-white hover:bg-white/10"
            >
              <Info className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div className="flex h-full" onClick={(e) => e.stopPropagation()}>
        {/* Zone photo */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Boutons de navigation */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPhoto}
                className="absolute left-4 z-10 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextPhoto}
                className="absolute right-4 z-10 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
          {/* Photo principale */}
          <div className="relative w-full h-full flex items-center justify-center p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                  priority
                  onError={(e) => {
                    // Fallback pour les images manquantes
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.svg";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>{" "}
          {/* Miniatures */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-sm rounded-full p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex gap-2 max-w-xs overflow-x-auto scrollbar-hide">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-primary scale-110"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-image.svg";
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Panneau d'informations */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              className="w-80 bg-background border-l h-full overflow-y-auto"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2 font-sans">
                    {currentPhoto.title}
                  </h3>
                  {currentPhoto.description && (
                    <p className="text-foreground/60 text-sm font-sans leading-relaxed">
                      {currentPhoto.description}
                    </p>
                  )}
                </div>

                {currentPhoto.date && (
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Calendar className="h-4 w-4" />
                    <span className="font-mono">{currentPhoto.date}</span>
                  </div>
                )}

                {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 font-sans">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {currentPhoto.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-foreground/40 font-mono">
                  <div>Album: {albumInfo.name}</div>
                  <div>Catégorie: {albumInfo.category}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
