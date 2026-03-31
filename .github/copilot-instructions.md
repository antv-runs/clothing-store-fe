# Copilot Instructions (Short Version)

## Core Principles

- Clean, readable, maintainable code
- Functional components + hooks only
- Single responsibility per component
- Avoid duplication

---

## Architecture

- UI → `components/` (render only)
- API → `api/`
- Logic → `utils/`
- Page orchestration → `pages/`
- External config → `lib/`

---

## Folder Structure

```txt
src/
  api/ (split by domain: Category/, Product/, etc.)
  components/ (atoms, molecules, organisms, templates)
  pages/
  routes/
  utils/
  types/ (shared types + api/ subfolder)
  lib/
  styles/ (SCSS with abstracts/, base/)
```

---

## API Rules

- No `services/`, use `api/`
- Split by domain: `api/Category`, `api/Product`, ...
- Only handle HTTP (no UI logic)

---

## Types Rules

- `types/api/*` → API request/response
- `types/*` → shared/domain types
- Local-only types → keep near component/page
- Do NOT mix API + UI types

---

## Routing Rules

- All routes in `routes/`
- Structure:
  - `paths.ts` → constants
  - `routeConfig.tsx` → mapping
  - `index.tsx` → router

---

## Components (Atomic Design)

- atoms → basic UI (Button, Input, etc.)
- molecules → small combos (ProductCard, SearchBox, etc.)
- organisms → complex UI (Header, ProductGallery, etc.)
- templates → layouts (MainLayout)

➡️ Prefer composition

---

## Utils

- Pure functions only (formatters, helpers, selectors)
- No custom hooks (logic stays in components/pages)

---

## Lib

- axios, interceptors, external setup

---

## Styling

- SCSS + BEM
- Each component has its own SCSS file
- Global styles in `styles/`

---

## Naming

- components/pages → PascalCase
- api/utils/mappers → lowercase
- entry files → `index.tsx` or `index.ts`

---

## Import Rules (CRITICAL)

Use alias:

```ts
@/* → src/*
```

Correct:

```ts
import { Button } from "@/components/atoms/Button";
```

Forbidden:

```ts
import Button from "../../../components/Button";
```

---

## Code Rules

- No API calls inside components (use pages or utils)
- No mixing UI + business logic
- Keep files small and reusable

---

## Package Manager

```bash
yarn install
yarn dev
yarn build
```
