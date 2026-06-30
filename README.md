# NUWA AI UI

A lightweight premium AI landing page inspired by cinematic UI references: large typography, muted neutral surfaces, gold particles, symbol-based navigation, and smooth carousel motion.

## Tech stack

- Vite
- React
- TypeScript
- Framer Motion
- Plain CSS, no heavy UI framework

## Local development

```bash
cd D:\AI\nuwa-ai-ui
npm install
npm run dev
```

Open the printed local URL, usually:

```txt
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```txt
nuwa-ai-ui/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    └── styles.css
```

## Design notes

- Brand mark: `(NUWA_AI)`
- Four hero states: A/B/C/D
- Lightweight CSS particles instead of heavy Canvas redraw loops
- Responsive layout for desktop and mobile
- Keyboard navigation: Left / Right arrows
