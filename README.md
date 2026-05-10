# Niranj C N — System Architect Portfolio

This project is a bespoke portfolio artifact built with React 18, Vite, Tailwind CSS, and Framer Motion. The experience is a horizontal-scroll system with deep-dive overlays, a generative force graph, and custom interactions.

## Development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview build: `npm run preview`

## Design Notes

- Horizontal scroll engine maps vertical scroll to a 5-panel strip using Framer Motion.
- Panels 03 and 04 open full-screen overlays with vertical detail views.
- Panel 01 renders a live force-directed graph in Canvas and an SVG stroke-drawn name.
- A boot loader introduces the system before the panels render.
- A custom magnetic cursor, tab-title swap, and build log easter egg complete the artifact.

## Content Source

All display text is centralized in [src/data/content.js](src/data/content.js). Update content there to keep the visuals in sync.
