# Cozy Kitchen

A recipe browser built on [TheMealDB](https://www.themealdb.com/api.php): browse by category or ingredient, search by name, and get a random recipe suggestion.

[Live demo: add link after deploying] · [screenshot: add one here]

## Features

- Browse recipes by category and by ingredient (with live ingredient filtering)
- Search recipes by name, URL-driven and shareable
- "Surprise me" random recipe
- Pagination via `?page=`, with accessible navigation
- Per-page metadata, Recipe JSON-LD, `noindex` on search results

## Tech stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS v4

## Architecture notes

- **Data layer** (`app/_lib`): a thin API client with a timeout, and normalizers that convert raw API shapes into clean domain types.
- **Caching:** `"use cache"` + `cacheLife` on data functions, so pages are a static shell with streamed dynamic parts.
- **Validation:** route params are checked against cached lists before any upstream call, so arbitrary URLs can't fill the cache.
- **Errors:** failures propagate to `error.tsx`; "no results" uses `notFound()`.
- **Accessibility:** one `h1` per page, `aria-current` navigation, skip link, live region for the random meal.

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

## What I'd improve next

- Tests (Vitest for pagination/normalizers, Playwright for the search flow)
- CI (lint, type-check, build)
- Favorites
