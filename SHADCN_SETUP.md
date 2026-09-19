# shadcn / React Setup Notes

This workspace currently uses a static `index.html`, `styles.css`, and `script.js` site. It does not yet include React, TypeScript, Tailwind CSS, or a shadcn config.

## Default Paths

- Component path created: `components/ui`
- Global styles today: `styles.css`
- Future Tailwind global styles usually live at `src/index.css`, `app/globals.css`, or `styles/globals.css`, depending on whether you use Vite, Next.js, or another framework.

The requested React reference components were added at:

- `components/ui/testimonials-columns-1.tsx`
- `components/ui/preloader.tsx`
- `components/ui/hero-designali.tsx`
- `components/ui/button.tsx`
- `lib/utils.ts`

The `/components/ui` folder matters because shadcn uses that convention for reusable UI primitives and import aliases like `@/components/ui/...`.

## Suggested Vite + shadcn Setup

Run these commands in a fresh React migration when `npm` or `pnpm` is available:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init
```

Then configure `tsconfig.json` and `vite.config.ts` so `@` points to the project source/root used by your app. If you keep components at the repo root, map `@/*` to `./*`. If you move them under `src`, map `@/*` to `./src/*`.

## Testimonials Component Dependency

The testimonials column component at `components/ui/testimonials-columns-1.tsx` requires:

```bash
npm install motion
```

The preloader component at `components/ui/preloader.tsx` requires:

```bash
npm install framer-motion
```

The hero component at `components/ui/hero-designali.tsx` and its demo require:

```bash
npm install react-typed @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```
