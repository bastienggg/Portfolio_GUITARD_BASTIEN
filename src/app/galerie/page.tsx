import type { Metadata } from "next";
import AlbumList from "@/components/AlbumList";
import { getAlbums } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez ma galerie photo organisée par albums : paysages, portraits, architecture et bien plus.",
};

export default async function GalleryPage() {
  const albums = await getAlbums();

  return <AlbumList albums={albums} />;
}
