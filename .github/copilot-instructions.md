# Copilot Instructions for React Project

## Project Goal

Build a clean, scalable React project with:

- Airbnb-style code
- Atomic Design
- Clear separation of concerns
- Reusable, maintainable components

---

## Core Principles

- Write **simple, readable code**
- Prefer **clarity over cleverness**
- Use **functional components + hooks only**
- Keep components **small, focused, single-responsibility**
- Avoid duplication (UI, logic, styles)

---

## Architecture Rules

- UI components → **render only**
- Data fetching → `services`
- Shared logic → `hooks` / `utils`
- Page orchestration → `pages`

---

## Component Design (Atomic Design)

- **atoms**: Button, Input, Icon
- **molecules**: SearchBox, QuantitySelector
- **organisms**: Header, ProductCard, ReviewList
- **pages**: HomePage, ProductDetailPage

➡️ Prefer **composition over large components**

---

## Folder Structure

```txt
src/
  components/
    atoms/
    molecules/
    organisms/
  pages/
  hooks/
  services/
  utils/
  constants/
  types/
  assets/
  routes/
```

---

## Package Manager

- Use **Yarn** for dependency management
- Install deps: `yarn install`
- Run dev: `yarn dev`
- Build project: `yarn build`
