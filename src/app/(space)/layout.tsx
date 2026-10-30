import type { ReactNode } from "react";
import { SpaceShell } from "@/components/space/SpaceShell";

/** Toutes les pages du groupe partagent la même scène 3D (elle reste montée entre les navigations) */
export default function SpaceLayout({ children }: { children: ReactNode }) {
  return <SpaceShell>{children}</SpaceShell>;
}
