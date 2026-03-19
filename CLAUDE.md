# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint
npm run format       # Prettier (writes in place)
npm run typecheck    # TypeScript check (no emit)
```

## Git Workflow

Three long-lived branches: `dev` → `staging` → `prod`. Feature branches are cut from `dev` and merged back via PR.

Staging environment: https://weeb.nicolasmaitre.dev

## Architecture

**Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui

### Directory structure

- `app/` — Next.js App Router pages and root layout
- `components/layout/` — Header, footer, mobile nav
- `components/home/` — Homepage section components
- `components/contact/` — Contact form
- `components/ui/` — Reusable UI and animation components (shadcn/ui + custom)
- `hooks/` — `useMediaQuery` (breakpoints + dimensions), `useScroll` (threshold detection)
- `lib/utils.ts` — `cn()` classname merger

### Styling

Tailwind CSS v4 via PostCSS. Design tokens defined as CSS custom properties in `app/globals.css` using OKLch color space. Dark mode is class-based via `next-themes`. Component variants use CVA (class-variance-authority).

### UI Components

shadcn/ui is configured with the `radix-nova` style and `mauve` base color. Custom animation components live in `components/ui/` (BlurFade, TextAnimate, ContainerScroll, Spotlight, InfiniteSlider, etc.). Additional component registries: `@aceternity`, `@eldoraui`, `@magicui`, `@efferd`.

### Forms

TanStack React Form with Zod validation. Toast feedback via Sonner.

### Code style

- Prettier: double quotes, 80-char line width, trailing commas (ES5), `prettier-plugin-tailwindcss` for class sorting
- ESLint: Next.js Core Web Vitals rules
