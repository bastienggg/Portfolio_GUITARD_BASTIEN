import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getProjectBySlug((await params).slug);
  if (!p) return {};
  const description = `${p.tagline} ${p.taglineAccent} ${p.summary}`;
  return {
    title: `${p.title} · Rapport de mission`,
    description,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: {
      title: `${p.title} · Bastien Guitard`,
      description,
      type: "article",
      ...(p.cover ? { images: [p.cover] } : {}),
    },
  };
}

/** Rapport de mission : le contenu est rendu (aussi côté serveur) par SpaceShell */
export default async function ReportPage({ params }: { params: Params }) {
  if (!getProjectBySlug((await params).slug)) notFound();
  return null;
}
