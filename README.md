# portfolio-v4

Personal portfolio site built with SvelteKit. Includes a sticky TOC, presence
tracking (site-wide + per-page), and a blog "coming soon" page.

## Tech

- SvelteKit + Svelte 5
- Vite
- TypeScript (typechecking via svelte-check)

## Project Structure

- `src/routes` - SvelteKit routes and API handlers
- `src/lib/components` - shared UI components
- `src/lib/data` - static data for the home page and navigation
- `src/routes/api/presence` - presence endpoint used by the home page

## Setup

Install dependencies:

```sh
pnpm install
```

Start dev server:

```sh
pnpm dev
```

Typecheck:

```sh
pnpm check
```

Build + preview:

```sh
pnpm build
pnpm preview
```

## Notes

- Static assets live in `static/`.
- The home page polls `/api/presence` every 15 seconds.
