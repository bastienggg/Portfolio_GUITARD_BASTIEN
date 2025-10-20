"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Image as ImageIcon } from "lucide-react";

interface Album {
  name: string;
  slug: string;
  coverImage: string;
  photoCount: number;
  description: string;
  category: string;
}

interface AlbumCardProps {
  album: Album;
  index: number;
  onClick: (slug: string) => void;
}

export default function AlbumCard({ album, index, onClick }: AlbumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <motion.div
        className="cursor-pointer"
        onClick={() => onClick(album.slug)}
      >
        <Card className="overflow-hidden group relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={album.coverImage}
              alt={album.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay avec animations */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badge catégorie */}
            <motion.div
              className="absolute top-4 left-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm text-foreground font-sans"
              >
                <Camera className="h-3 w-3 mr-1" />
                {album.category}
              </Badge>
            </motion.div>

            {/* Compteur de photos */}
            <motion.div
              className="absolute top-4 right-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="outline"
                className="bg-background/90 backdrop-blur-sm border-foreground/20 text-foreground font-mono"
              >
                <ImageIcon className="h-3 w-3 mr-1" />
                {album.photoCount}
              </Badge>
            </motion.div>
          </div>

          <CardContent className="p-6">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-bold text-foreground font-sans group-hover:text-primary transition-colors duration-300">
                {album.name}
              </h3>
              <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                {album.description}
              </p>

              <motion.div
                className="flex items-center text-xs text-foreground/50 font-mono pt-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Voir l'album →</span>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
