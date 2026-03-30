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
- Logic → `hooks/`, `utils/`
- Page orchestration → `pages/`
- External config → `lib/`

---

## Folder Structure

```txt
src/
  api/
  components/ (atoms, molecules, organisms, templates)
  pages/
  routes/
  hooks/
  utils/
  constants/
  types/
  contexts/
  reducers/
  lib/
  styles/
  assets/
```

---

## API Rules

- No `services/`, use `api/`
- Split by domain: `api/Product`, `api/Review`, ...
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

## Components (Atomic)

- atoms → basic UI
- molecules → small combos
- organisms → complex UI
- templates → layouts

➡️ Prefer composition

---

## Hooks & Utils

- hooks → reusable logic (`useX`)
- utils → pure functions only

---

## Lib

- axios, interceptors, external setup

---

## Styling

- SCSS + BEM
- Each component has its own SCSS

---

## Naming

- components/pages → PascalCase
- api/utils/hooks → lowercase
- entry files → `index.tsx`

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

- No API calls inside components (except pages/hooks)
- No mixing UI + business logic
- Keep files small and reusable

---

## Package Manager

```bash
yarn install
yarn dev
yarn build
```
