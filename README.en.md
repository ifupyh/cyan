# Forgotten Realm

> All things return to dust; only stories cross the dark.

Forgotten Realm (遗忘王域) is the source code of Cyan's personal blog, built on Astro static generation. It brings together embedded-systems practice, technical exploration, project records, friend links, and small tools in one maintainable codebase, with a Souls-like aesthetic (Elden Ring, Dark Souls) as its visual theme.

## About the author

Cyan is an embedded software engineer. His stack covers C / C++ / Qt / Linux / LVGL, FreeRTOS / STM32, T113-S3, and OTA. He has worked on a smart multimedia advertising machine and a Buildroot + LVGL embedded desktop display terminal. In his spare time he enjoys Souls-like games and various AAA titles.

## What is included

- Articles, archives, categories, tags, and full-text search
- About, friend links, RSS snapshots, guestbook, and tools
- Galleries, anime tracking, Lottie animations, and article media
- Responsive layouts, dark mode, page transitions, and configurable sidebars
- Waline comment client and public Umami metrics
- A Chinese-first multilingual interface

## Local development

Requirements:

- Node.js >= 22
- pnpm >= 9

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Common commands:

```bash
pnpm check       # Astro type and template checks
pnpm build       # Build the static site, search index, and optimized assets
pnpm preview     # Preview the production build
pnpm new-post    # Create a post
pnpm post-studio # Start the local post editor
```

## Repository layout

```text
src/config/       Site, navigation, sidebar, comment, and analytics config
src/content/      Posts and special-page content
src/components/   Astro / Svelte components
src/pages/        Pages and API routes
src/data/         Friend-feed snapshots and changelog data
public/           Static assets published directly
scripts/          Build and content utilities
```

Site configuration lives in `src/config/`. Posts use Markdown or MDX and new posts belong in `src/content/posts/`.

## Public snapshot boundary

This repository contains only public site source, content, and static assets. Deployment-provider configuration, server operations, comment-service server code, mail templates, host details, and credentials are intentionally kept outside the public snapshot. Provide integration secrets through server-side environment configuration.

## License

This project is distributed under the [MIT License](LICENSE). Refer to the repository `LICENSE` file for the applicable copyright and license notices.
