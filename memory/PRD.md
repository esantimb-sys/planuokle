# PRD — 5op.lt Vitaminų ir papildų vartojimo laiko planuoklis

## Original Problem Statement
Standalone Lithuanian single-page full-width tool (e.g. 5op.lt/planuoklis) — a vitamin & supplement intake-timing planner with advertising-partnership and e-commerce potential. Premium minimalist light e-health/biohacking design, fully mobile-responsive.

## Architecture
- Frontend-only (React 19 + Vite + Tailwind v4 + shadcn/ui). No auth, no backend usage.
- State persisted & shared entirely via URL query param `?p=` (base64-encoded JSON).
- PDF/PNG export in-browser via `html2canvas-pro` + `jspdf`.
- Key files: `src/planner/PlannerPage.jsx` (all UI + state), `src/planner/data.js` (supplements, doses, time blocks, warnings, sources).

## User Personas
- Adults (men/women) optimizing supplement timing; parents planning for children (6+); athletes/biohackers.

## Core Requirements (static)
- Legal disclaimer (top + footer).
- Profile: Vyras / Moteris / Vaikas (6+) + digestive-sensitivity toggle (moves irritants after food).
- 24 supplements in 2 categories + custom supplement input.
- Dynamic recommended doses per profile; child-blocked supplements excluded + warning.
- Daily schedule across 6 time blocks with dose, stomach rule, scientific rationale, partner "where to buy" link.
- Interaction warnings engine (Iron+Calcium, Iron+Magnesium, Iron+Zinc, Zinc/copper, caffeine timing, creatine consistency, child safety).
- Scientific sources block (real PubMed/DOI links).
- Export PDF/PNG; copy shareable URL; footer with partnership email + e-shop CTA to https://5op.lt.

## Implemented (2026-06)
- All core requirements above. Verified by testing agent (12/12 flows) + Playwright share-link round-trip.

## Backlog / Remaining
- P1: Real partner product data + affiliate links (currently placeholders).
- P2: Weekly/periodized schedule, print-optimized layout, supplement search/filter, i18n (EN).

## Next Tasks
- Await user feedback; wire real partner offers when available.
