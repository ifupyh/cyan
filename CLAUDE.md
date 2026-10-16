# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cyan is a personal blog site built on **Astro 7** with **Svelte 5** for interactive components. It is maintained as a Chinese-first public site with i18n for en, zh_TW, ja, and ru. The repository contains the site's writing, project records, friend-feed snapshots, tools, galleries, and reusable UI.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Production build (icons → LQIPs → Astro build → font subsets → Pagefind indexing) |
| `pnpm preview` | Preview production build |
| `pnpm check` | `astro check` for type/error checking |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` |
| `pnpm lint` | Biome lint + auto-fix |
| `pnpm format` | Biome format |
| `pnpm new-post <filename>` | Scaffold a new blog post |
| `pnpm post-studio` | Launch local post editing tool |

Package manager is **pnpm** (enforced via `preinstall`). Node.js >= 22 required.

## Architecture

### Astro + Svelte Hybrid

- `.astro` components for static content and layouts
- `.svelte` components for interactive UI (search, settings, pagination, archive) — mounted with `client:load` or `client:visible`
- Swup.js handles SPA-like page transitions with multiple container targets; `/portfolio/` and `/music/` are full-bleed layouts that deliberately bypass Swup (see the `ignore` option in `astro.config.mjs`)

### Configuration-Driven

All features are toggled/configured via TypeScript files in `src/config/`, exported through the barrel at `src/config/index.ts`. Key configs:

- `siteConfig.ts` — core site settings, theme, pagination, site_url
- `sidebarConfig.ts` — sidebar layout (left/right/both, widget ordering)
- `commentConfig.ts`, `analyticsConfig.ts`, `fontConfig.ts`, etc.

Types live in `src/types/` and must stay aligned with `src/config/`.

### Fonts (Astro Fonts API)

Font definitions live in `fontConfig.ts` (`fontsList` + `fontConfig`). `astro.config.mjs` filters the list to only fonts actually referenced by `fontConfig.selected` and region fields (via `collectUsedFontCssVars`), then maps each to its provider (local / fontsource / google / etc.). Local font files are in `public/assets/fonts/`; `scripts/subset-fonts.ts` further subsets local fonts during build.

### Layout System

- `Layout.astro` — base HTML shell (head, body, theme init, analytics, Swup hooks)
- `MainGridLayout.astro` — full page grid with sidebar(s), navbar, wallpaper, footer

### Content Collections

Defined in `src/content.config.ts`:
- `posts` — blog posts (`.md`/`.mdx`) with frontmatter: title, published, tags, category, draft, pinned, password, comment, etc.
- `spec` — special pages (about, guestbook)

### Key Directories

- `src/components/` — organized by domain: `analytics/`, `comment/`, `common/`, `controls/`, `features/`, `layout/`, `misc/`, `pages/`, `widget/`
- `src/plugins/` — 15 custom remark/rehype plugins (Mermaid, PlantUML, KaTeX, GitHub cards, reading time, etc.)
- `src/i18n/` — translation keys in `i18nKey.ts`, language files in `languages/*.ts`, lookup via `translation.ts`
- `src/utils/` — content sorting, crypto (encrypted posts), date formatting, image processing/LQIP, TOC generation
- `src/pages/` — Astro file-based routing
- `scripts/` — build-time utilities (`generate-icons.js`, `generate-lqips.ts`, `new-post.js`)

### Path Aliases (tsconfig.json)

`@components/*`, `@assets/*`, `@constants/*`, `@utils/*`, `@i18n/*`, `@layouts/*` → `./src/<dir>/*`; `@/*` → `./src/*`

## Code Style

- **Biome** enforces: tab indentation, double quotes, recommended lint rules
- Relaxed rules for `.svelte`/`.astro` files (useConst off, noUnusedVariables off)
- Naming: components `PascalCase` (`PostCard.astro`), config modules `camelCase` ending in `Config.ts`, utilities kebab-case (`date-utils.ts`)
- Commit convention: **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.)
- No unit-test framework is configured; validate changes with `pnpm check`, `pnpm type-check`, and `pnpm build`

## Build Pipeline

Multi-step: `scripts/generate-icons.js` → `scripts/generate-lqips.ts` → `astro build` → `scripts/subset-fonts.ts` → `pagefind --site dist`

Icons/LQIP data are generated into `src/constants/` and committed. Regenerate with `pnpm icons` or `pnpm lqips`.

## Deployment

- Static output to `dist/`, deployed to **Cloudflare Pages** (project `cyan-7g4`; site_url in `siteConfig.ts`).
- `astro.config.mjs` enables the Cloudflare adapter **only when the `CF_WORKERS` env var is set**; otherwise it remains pure static. Do not set `CF_WORKERS` unless SSR is intended.
- Deploy via Cloudflare Pages Git integration: build command `pnpm build` (full pipeline, not `astro build`), output directory `dist`, env `NODE_VERSION=22`.
- Keep credentials/host-specific files out of this public snapshot; use platform environment variables instead.

## Known Gaps

- Comment system: `commentConfig.ts` sets `type: "waline"` but `serverURL` is empty, so comments do not work until a Waline backend is configured or `type` is switched to `giscus` (giscus params are already filled in).
