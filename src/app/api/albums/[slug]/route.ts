import { NextRequest, NextResponse } from "next/server";
import { getAlbumBySlug } from "@/lib/gallery";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const { album, photos } = await getAlbumBySlug(slug);

    if (!album) {
      return NextResponse.json({ error: "Album non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ album, photos });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'album:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
