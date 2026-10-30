"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { profile } from "@/data/profile";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { useSpaceNavigation } from "@/hooks/useSpaceNavigation";
import { getProjectIndex, planetHref, projects } from "@/lib/projects";
import { MissionReport } from "./report/MissionReport";
import { SpaceCanvas } from "./scene/SpaceCanvas";
import { sceneState, type DisplayMode, type View } from "./sceneState";
import { FocusPanel } from "./ui/FocusPanel";
import { Hero } from "./ui/Hero";
import { Hud } from "./ui/Hud";
import { IntroScreen } from "./ui/IntroScreen";
import { PlanetOverlays } from "./ui/PlanetOverlays";
import { ProjectList } from "./ui/ProjectList";
import { TopBar } from "./ui/TopBar";

const MUSIC_SRC = "/mysterious-futuristic-ambience-375832.mp3";

type Route = { kind: "system" } | { kind: "focus" | "report"; index: number };

/** "/planete/dot-txt" → { kind: "focus", index: 0 } */
function parseRoute(pathname: string): Route {
  const m = pathname.match(/^\/(planete|projets)\/([^/]+)\/?$/);
  if (m) {
    const index = getProjectIndex(decodeURIComponent(m[2]));
    if (index >= 0) return { kind: m[1] === "planete" ? "focus" : "report", index };
  }
  return { kind: "system" };
}

/**
 * Coquille commune à toutes les pages : la scène 3D et l'interface restent montées
 * entre les navigations, la vue est déduite de l'URL. Les états visuels passent
 * par data-view / data-mode sur #app (voir globals.css).
 */
export function SpaceShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const route = parseRoute(pathname);

  // L'intro ne s'affiche que si on arrive directement sur l'accueil
  const [introGone, setIntroGone] = useState(pathname !== "/");
  const view: View = route.kind === "system" ? (introGone ? "system" : "intro") : route.kind;

  // Dernière planète visitée : garde le contenu pendant les transitions de sortie
  const [lastIndex, setLastIndex] = useState(route.kind === "system" ? 0 : route.index);
  const [reportIndex, setReportIndex] = useState<number | null>(
    route.kind === "report" ? route.index : null
  );
  if (route.kind !== "system" && route.index !== lastIndex) setLastIndex(route.index);
  if (route.kind === "report" && route.index !== reportIndex) setReportIndex(route.index);
  const cur = route.kind === "system" ? lastIndex : route.index;

  const [mode, setModeState] = useState<DisplayMode>("3d");
  const [hovered, setHovered] = useState(-1);
  const [toastMsg, setToastMsg] = useState("");
  const [toastShown, setToastShown] = useState(false);

  const music = useBackgroundMusic(MUSIC_SRC);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const reportRef = useRef<HTMLElement>(null);

  // La boucle 3D lit ces valeurs à chaque frame
  sceneState.view = view;
  sceneState.cur = cur;
  sceneState.mode = mode;

  const setHover = useCallback((i: number) => {
    sceneState.hovered = i;
    setHovered(i);
  }, []);

  const go = useCallback(
    (href: string) => {
      if (href !== pathname) router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  const setMode = useCallback(
    (m: DisplayMode) => {
      setModeState(m);
      setHover(-1);
    },
    [setHover]
  );

  const leaveIntro = useCallback(
    (withSound: boolean) => {
      if (withSound) music.start();
      setIntroGone(true);
      setTimeout(() => exploreRef.current?.focus({ preventScroll: true }), 700);
    },
    [music]
  );

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShown(true);
  }, []);
  useEffect(() => {
    if (!toastShown) return;
    const t = setTimeout(() => setToastShown(false), 1800);
    return () => clearTimeout(t);
  }, [toastShown, toastMsg]);

  const copyMail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast("Adresse copiée");
    } catch {
      toast(profile.email);
    }
  }, [toast]);

  // Chaque changement de page efface le survol
  useEffect(() => setHover(-1), [pathname, setHover]);

  // Nouveau rapport : on remonte en haut
  useEffect(() => {
    if (view === "report") reportRef.current?.scrollTo({ top: 0 });
  }, [view, cur]);

  // Focus sur ENTRER à l'arrivée
  useEffect(() => {
    if (introGone) return;
    const t = setTimeout(() => enterRef.current?.focus({ preventScroll: true }), 300);
    return () => clearTimeout(t);
  }, []);

  // Parallaxe : position de la souris de -0.5 à 0.5
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      sceneState.pointer.x = e.clientX / window.innerWidth - 0.5;
      sceneState.pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useSpaceNavigation({ view, cur, mode, go, setMode, leaveIntro });

  const selectPlanet = useCallback((i: number) => go(planetHref(projects[i])), [go]);

  return (
    <div id="app" data-view={view} data-mode={mode}>
      <SpaceCanvas paused={view === "report"} onHover={setHover} onSelect={selectPlanet} />
      <PlanetOverlays hovered={hovered} onHover={setHover} go={go} />

      <TopBar view={view} cur={cur} musicOn={music.isPlaying} onToggleMusic={music.toggle} go={go} />

      <Hero ref={exploreRef} go={go} onShowList={() => setMode("list")} onCopyMail={copyMail} />
      <span className="hint">scroll ou survole une planète ↓</span>
      <ProjectList go={go} />

      <FocusPanel cur={cur} go={go} />

      <Hud view={view} cur={cur} mode={mode} setMode={setMode} onHover={setHover} go={go} />

      <article className="report" id="report" aria-label="Rapport de mission" ref={reportRef}>
        {reportIndex !== null && <MissionReport index={reportIndex} active={view === "report"} go={go} />}
      </article>

      {children}

      <IntroScreen ref={enterRef} gone={introGone} onEnter={leaveIntro} />

      <div className={`toast${toastShown ? " show" : ""}`} role="status">
        {toastMsg}
      </div>
    </div>
  );
}
