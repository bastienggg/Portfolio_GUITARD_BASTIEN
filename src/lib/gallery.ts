import fs from "fs";
import path from "path";

export interface Album {
  name: string;
  slug: string;
  coverImage: string;
  photoCount: number;
  description: string;
  category: string;
}

export interface Photo {
  id: string;
  src: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
}

interface AlbumMetadata {
  album: {
    name: string;
    description: string;
    category: string;
    cover?: string | null;
  };
  photos: Record<
    string,
    {
      title: string;
      description?: string;
      date?: string;
      tags?: string[];
    }
  >;
}

const GALLERY_PATH = path.join(process.cwd(), "public", "gallery");

// Extensions d'images supportées
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// Fonction pour lire les métadonnées d'un album depuis metadata.json
function readAlbumMetadata(albumPath: string): AlbumMetadata | null {
  const metadataPath = path.join(albumPath, "metadata.json");

  try {
    if (fs.existsSync(metadataPath)) {
      const metadataContent = fs.readFileSync(metadataPath, "utf-8");
      return JSON.parse(metadataContent) as AlbumMetadata;
    }
  } catch (error) {
    console.error(
      `Erreur lors de la lecture des métadonnées pour ${albumPath}:`,
      error
    );
  }

  return null;
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getAlbumPhotos(albumSlug: string): Photo[] {
  const albumPath = path.join(GALLERY_PATH, albumSlug);

  if (!fs.existsSync(albumPath)) {
    return [];
  }

  try {
    // Lire les métadonnées depuis metadata.json
    const metadata = readAlbumMetadata(albumPath);

    const files = fs.readdirSync(albumPath);
    const imageFiles = files.filter(isImageFile);

    return imageFiles.map((filename, index) => {
      const id = `${albumSlug}-${index + 1}`;
      const src = `/gallery/${albumSlug}/${filename}`;
      const name = path.parse(filename).name;

      // Utiliser les métadonnées personnalisées si disponibles
      const photoMetadata = metadata?.photos[filename];

      return {
        id,
        src,
        title: photoMetadata?.title || formatPhotoTitle(name),
        description:
          photoMetadata?.description || `Photographie de l'album ${albumSlug}`,
        date: photoMetadata?.date || new Date().getFullYear().toString(),
        tags: photoMetadata?.tags || [
          albumSlug,
          metadata?.album.category.toLowerCase() || "photo",
        ],
      };
    });
  } catch (error) {
    console.error(`Erreur lors de la lecture de l'album ${albumSlug}:`, error);
    return [];
  }
}

function formatPhotoTitle(filename: string): string {
  // Convertit "photo-fleur-1" en "Photo Fleur 1"
  return filename
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function getCoverImage(
  albumSlug: string,
  photos: Photo[],
  metadata: AlbumMetadata | null
): string {
  if (photos.length === 0) {
    return "/placeholder-album.svg";
  }

  // Utilise l'image de couverture définie dans metadata.json
  if (metadata?.album.cover) {
    const coverSrc = `/gallery/${albumSlug}/${metadata.album.cover}`;
    // Vérifie que l'image existe dans les photos
    const coverExists = photos.some((photo) => photo.src === coverSrc);
    if (coverExists) {
      return coverSrc;
    }
  }

  // Cherche une image qui pourrait être une couverture
  const coverPhoto = photos.find(
    (photo) =>
      photo.src.toLowerCase().includes("cover") ||
      photo.src.toLowerCase().includes("thumb") ||
      photo.src.toLowerCase().includes("preview")
  );

  // Sinon, prend la première photo
  return coverPhoto?.src || photos[0].src;
}

export async function getAlbums(): Promise<Album[]> {
  try {
    if (!fs.existsSync(GALLERY_PATH)) {
      console.warn("Le dossier gallery n'existe pas:", GALLERY_PATH);
      return [];
    }

    const entries = fs.readdirSync(GALLERY_PATH, { withFileTypes: true });
    const albumFolders = entries.filter((entry) => entry.isDirectory());

    const albums: Album[] = [];

    for (const folder of albumFolders) {
      const albumSlug = folder.name;
      const albumPath = path.join(GALLERY_PATH, albumSlug);
      const metadata = readAlbumMetadata(albumPath);
      const photos = getAlbumPhotos(albumSlug);

      if (photos.length === 0) {
        continue; // Ignore les dossiers vides
      }

      const config = metadata?.album || {
        name: formatPhotoTitle(albumSlug),
        description: `Collection de photographies ${albumSlug}`,
        category: "Divers",
      };

      const album: Album = {
        name: config.name,
        slug: albumSlug,
        coverImage: getCoverImage(albumSlug, photos, metadata),
        photoCount: photos.length,
        description: config.description,
        category: config.category,
      };

      albums.push(album);
    }

    // Trie les albums par nom
    return albums.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Erreur lors du scan des albums:", error);
    return [];
  }
}

export async function getAlbumBySlug(
  slug: string
): Promise<{ album: Album | null; photos: Photo[] }> {
  try {
    const albums = await getAlbums();
    const album = albums.find((a) => a.slug === slug);

    if (!album) {
      return { album: null, photos: [] };
    }

    const photos = getAlbumPhotos(slug);
    return { album, photos };
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'album ${slug}:`, error);
    return { album: null, photos: [] };
  }
}

// Fonction utilitaire pour vérifier si les images existent
export function validateAlbumImages(albumSlug: string): {
  valid: string[];
  missing: string[];
} {
  const photos = getAlbumPhotos(albumSlug);
  const valid: string[] = [];
  const missing: string[] = [];

  photos.forEach((photo) => {
    const imagePath = path.join(process.cwd(), "public", photo.src);
    if (fs.existsSync(imagePath)) {
      valid.push(photo.src);
    } else {
      missing.push(photo.src);
    }
  });

  return { valid, missing };
}

// Pour créer des albums de démo
export function createDemoAlbum(
  albumSlug: string,
  photoCount: number = 6
): void {
  const albumPath = path.join(GALLERY_PATH, albumSlug);

  if (!fs.existsSync(albumPath)) {
    fs.mkdirSync(albumPath, { recursive: true });
    console.log(`Album créé: ${albumPath}`);
  }

  // Crée un fichier README pour l'album
  const readmePath = path.join(albumPath, "README.md");
  const readmeContent = `# Album: ${albumSlug}

Ce dossier contient les photos de l'album "${albumSlug}".

## Instructions
- Placez vos photos (.jpg, .jpeg, .png, .webp, .gif) dans ce dossier
- Les images seront automatiquement détectées par l'application
- Pour définir une image de couverture, nommez-la avec "cover", "thumb" ou "preview"
- Ajoutez autant de photos que vous voulez

## Configuration
L'album peut être configuré dans \`src/lib/gallery.ts\` pour personnaliser :
- Le nom d'affichage
- La description
- La catégorie
`;

  fs.writeFileSync(readmePath, readmeContent, "utf8");
  console.log(`README créé pour l'album: ${readmePath}`);
}
