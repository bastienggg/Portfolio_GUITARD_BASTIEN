import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbumBySlug, getAlbums } from "@/lib/gallery";
import PhotoGrid from "@/components/PhotoGrid";

interface AlbumPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => ({
    slug: album.slug,
  }));
}

export async function generateMetadata({
  params,
}: AlbumPageProps): Promise<Metadata> {
  const { album } = await getAlbumBySlug(params.slug);

  if (!album) {
    return {
      title: "Album introuvable",
    };
  }

  return {
    title: `${album.name} - Galerie`,
    description: album.description,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { album, photos } = await getAlbumBySlug(params.slug);

  if (!album) {
    notFound();
  }

  return <PhotoGrid album={album} photos={photos} />;
}
