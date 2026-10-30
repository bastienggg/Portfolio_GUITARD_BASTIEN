# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js + Turbopack) on http://localhost:3000
npm run build    # Production build (Turbopack)
npm run start    # Serve the production build
```

There is no lint or test script configured in this repo (no ESLint config, no test framework).

## Architecture

A **3D portfolio** styled as a "space logbook": a solar system where each planet is a project, rendered with React Three Fiber, with ink-on-paper "windows" layered on top. It is a port of `portfolio-reference.html` (the original standalone mock-up, kept at the repo root as the visual reference).

### Routing

All pages live in the `src/app/(space)/` route group, whose `layout.tsx` renders `SpaceShell` (`src/components/space/SpaceShell.tsx`). The shell — 3D canvas, top bar, bottom HUD, panels, intro — **stays mounted across navigations**, so the camera animates between views. The pages themselves return `null` and only provide URLs + metadata:

- `/` → system view (the "ENTRER" intro shows only when landing directly on `/`)
- `/planete/[slug]` → planet focus view
- `/projets/[slug]` → "rapport de mission" (project detail, rendered server-side too for SEO)

`SpaceShell` derives `view` (`intro | system | focus | report`) and the current project index from `usePathname()`, and sets `data-view` / `data-mode` on `#app`; show/hide transitions are pure CSS keyed on those attributes (`globals.css`). `/portfolio3d` redirects to `/` (`next.config.ts`).

### Data flow

- `src/data/projects.json` is the single source of truth (typed by `src/types/project.ts`, helpers in `src/lib/projects.ts`). Adding an entry adds a planet, a list row, a HUD step and a report page; `"enabled": false` hides a project everywhere (filtered in `lib/projects.ts`, its URLs 404). Each planet renders its `.glb` model from `planet.model` (in `public/projects/`, auto-scaled to `planet.size` by `scene/GlbModel.tsx`, also shown spinning at the top of the report); without a model it falls back to a generated low-poly sphere using `planet.color`/`spot`. `color` is still used for the list dots (and as fallback in the "next mission" block). The sun is `public/projects/soleil.glb`; empty `preview`/`cover`/`gallery` entries render hatched placeholders, empty `links.demo`/`links.github` render disabled buttons.
- `src/data/profile.ts` holds personal info (email, GitHub, LinkedIn) used by the hero and the JSON-LD in `layout.tsx`.

### Components (`src/components/space/`)

- `sceneState.ts` — mutable state shared between React and the render loop (`sceneState`, `planetWorld`, `overlayEls`) so `useFrame` reads it without re-renders. Also orbit constants.
- `scene/` — `SpaceCanvas` (Canvas, lights ×π to match the legacy three r128 intensities), `Sun`, `Planet` (orbit line, GLB or low-poly body, hover/click), `GlbModel` (loads + normalises a .glb), `DustBelt`, `CameraRig` (lerp toward overview/focus target + `setViewOffset` to shift framing), `OverlaySync` (projects planet positions to place HTML labels/hover card each frame), `lowPoly.ts` (faceted geometry generator). `CameraRig` and `OverlaySync` must stay after the planets in the JSX so they read the current frame's positions.
- `ui/` — `TopBar`, `Hud`, `Hero`, `ProjectList`, `FocusPanel` (+ preview window, orbit note), `PlanetOverlays` (labels + hover card), `IntroScreen`, `bits.tsx` (status dot/pill, placeholder image, link button).
- `report/MissionReport.tsx` — the project detail page; `report/ReportPlanet.tsx` is its small canvas showing the project's .glb.

### Hooks

- `useBackgroundMusic` — the mp3 ambience (`public/mysterious-futuristic-ambience-375832.mp3`), started by the "ENTRER" click.
- `useSpaceNavigation` — keyboard (← → Esc, Enter on intro), wheel and swipe navigation between system and planets.

## Conventions

- Client components (`"use client"`) for anything interactive/3D; keep server-only concerns (metadata, etc.) in `layout.tsx`.
- React Three Fiber: `useFrame` for per-frame animation, `useRef` for mesh refs, `useMemo` for geometries (dispose them on unmount).
- Visual style is a squared-paper space logbook: paper `--paper #F3EFE3`, ink `--ink #141414`, single accent `--accent #2E3BDB`, sun yellow `#F2C94C`; fonts Archivo (display, variable width), JetBrains Mono, Schoolbell (handwritten notes) loaded via `next/font`. Styles are plain CSS classes in `globals.css` (ported from the reference); responsive breakpoint is `max-width: 900px`.
- Git commit messages in this repo are written in French.
