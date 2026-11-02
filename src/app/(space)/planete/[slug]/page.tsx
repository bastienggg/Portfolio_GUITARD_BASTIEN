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
  return {
    title: `${p.title} · ${p.kind}`,
    description: p.summary,
    alternates: { canonical: `/projets/${p.slug}` },
  };
}

/** Vue planète : affichée par SpaceShell, cette page ne fournit que l'URL et les métadonnées */
export default async function PlanetPage({ params }: { params: Params }) {
  if (!getProjectBySlug((await params).slug)) notFound();
  return null;
}
