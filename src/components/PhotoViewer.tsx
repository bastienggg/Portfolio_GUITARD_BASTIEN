"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Photo {
  id: string;
  src: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
}

interface PhotoViewerProps {
  photo: Photo;
  albumInfo: {
    name: string;
    category: string;
  };
  onClose: () => void;
}

export default function PhotoViewer({
  photo,
  albumInfo,
  onClose,
}: PhotoViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

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
            <h2 className="text-xl font-bold font-sans">{photo.title}</h2>
            <p className="text-sm text-white/60 font-sans">
              Album: {albumInfo.name}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* Contenu principal - Layout responsive */}
      <div
        className="flex flex-col lg:flex-row h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Zone photo */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-image.svg";
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Panneau d'informations - Responsive: côté droit sur desktop, en bas sur mobile */}
        <motion.div
          className="w-full lg:w-80 bg-background border-t lg:border-t-0 lg:border-l max-h-60 lg:max-h-none lg:h-full overflow-y-auto"
          initial={{ opacity: 0, y: 300, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{
            duration: 0.3,
            y: { duration: 0.4 },
          }}
        >
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            <div>
              <h3 className="text-base lg:text-lg font-bold mb-2 font-sans">
                {photo.title}
              </h3>
              {photo.description && (
                <p className="text-foreground/60 text-xs lg:text-sm font-sans leading-relaxed">
                  {photo.description}
                </p>
              )}
            </div>

            {photo.date && (
              <div className="flex items-center gap-2 text-xs lg:text-sm text-foreground/60">
                <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="font-mono">{photo.date}</span>
              </div>
            )}

            {photo.tags && photo.tags.length > 0 && (
              <div>
                <h4 className="text-xs lg:text-sm font-semibold mb-2 font-sans">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1">
                  {photo.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
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
      </div>
    </motion.div>
  );
}
