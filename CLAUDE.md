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

This is a **single-page 3D portfolio**: a solar system where each planet represents a project. `src/app/page.tsx` shows a brief loading screen and redirects to `/portfolio3d`, which renders `SolarSystemScene` (`src/components/portfolio3d/SolarSystemScene.tsx`) — a thin orchestrator that wires hooks (scroll, music, mouse) to the two layout panels.

### Data flow

- `src/data/profile.ts` holds personal info (name, role, email, GitHub, LinkedIn) reused by the contact window and the JSON-LD in `layout.tsx`.
- `src/data/projects.json` is the single source of truth for projects (typed via `src/types/project.ts`). Adding a project = add an image to `public/projects/` + add an entry to `projects.json`; a new planet appears automatically.
- `useScrollProgress` (`src/hooks/useScrollProgress.ts`) drives navigation: `scrollProgress` is a float where `-1` = overview mode and each integer `n` = the planet/project at index `n`. `SolarSystemScene` derives `currentPlanetIndex` and `isOverviewMode` from it and passes the current `Project` down.

### Component layout (`src/components/portfolio3d/`)

- `SolarSystemScene.tsx` — entry component: `EnterScreen` gate, `MusicControl`, `RoughBorderFilter`, `TerminalPanel`, `ScenePanel`.
- `layout/` — `TerminalPanel` (left 30% / bottom on mobile) and `ScenePanel` (right 70% / top on mobile, holds the `<Canvas>`, `ProgressIndicator`, `ContactWindow`).
- `Scene3D.tsx` — the actual `<Canvas>` contents: sun, planets, particles, lights, camera coordination.
- `space/` — `Sun`, `GalaxyParticles`, `FloatingParticles`, `SceneLights`.
- `planets/` — `PlanetGLB` / `PlanetSphere` (mesh rendering) and `PlanetLabel` (billboard text via `quaternion.copy(camera.quaternion)`).
- `camera/CameraController.tsx` — eases the camera toward `planetPos + direction * 20`, elevation `planetPos.y + 3`, easing factor `0.08`, scroll debounce `800ms`, parabolic transition arc (`8 * sin(t * π)`).
- `terminal/` — `Terminal.tsx` switches between three modes: **Overview** (personal intro), **Project** (typewriter-animated project details), **Interactive** (shell with `ls`, `cd`, `help`, etc. — command logic is the pure `runCommand` in `terminal/commands.ts`). It's remounted via `key={currentProject.id}` to restart the typewriter animation on every project change — don't remove that key.
- `ui/` — `WindowTitleBar` (sketch title bar, `md`/`sm` sizes — reuse it for any new window), `ContactWindow` (+ `ContactLinks`, `ProjectPreview`), `ProgressIndicator`, `MusicControl`, `EnterScreen` (gates entry so the ambient audio track can start on a user gesture), `LoadingScreen`, `RoughBorderFilter` / `HandDrawnDivider` (SVG `#rough-border` filter and its usage).

### Supporting code

- `src/hooks/` — `useScrollProgress`, `useBackgroundMusic`, `useMousePosition`, `useTypewriter`.
- `src/lib/three/` — `camera.ts` (position/easing math) and `animations.ts` (particle animation) used by the 3D layer.
- `src/types/` — `project.ts` (Project interface), `three.ts` (Position3D, MousePosition, etc.).
- Path alias `@/*` maps to `src/*`.

## Conventions

- Client components (`"use client"`) for anything interactive/3D; keep server-only concerns (metadata, etc.) in `layout.tsx`.
- React Three Fiber: `useFrame` for per-frame animation, `useRef` for camera/mesh refs, `useMemo` for geometries to avoid recompute.
- Visual style is a hand-drawn paper sketch: paper background `#F7F7E1`/`#FFFEF5`, ink `#0F0F0F` with greys `#2A2A2A`/`#4A4A4A`/`#9A9A8A`, handwritten fonts (Schoolbell, Shadows Into Light), helper classes in `globals.css` (`paper-texture`, `pencil-line`, `sketch-shadow`, `visible-sketch-border`); responsive breakpoint is `md:` (768px), mobile-first.
- Git commit messages in this repo are written in French.
