# Copilot Instructions for React Project

## Project Goal

This project is built with React and should follow clean, scalable, team-friendly frontend architecture.

The codebase must follow:

- Airbnb-style clean coding principles
- Atomic Design mindset for UI composition
- Clear separation of UI, business logic, and data fetching
- Reusable, maintainable, readable components
- Consistent naming and folder structure

---

## Core Principles

### 1. Prefer clean, readable, maintainable code

- Write simple and explicit code
- Avoid overly clever solutions
- Favor readability over short code
- Keep components focused on one responsibility

### 2. Use functional components only

- Use function components
- Use React hooks for state and side effects
- Do not create class components unless explicitly requested

### 3. Follow component-based architecture

- Break UI into small reusable pieces
- Reuse existing components before creating new ones
- Avoid duplication in markup, logic, and styles

### 4. Keep UI and logic separated

- UI components should focus on rendering
- Data fetching should be placed in `services`
- Shared logic should be placed in `hooks` or `utils`
- Page-level orchestration should stay in page components or container-style components

---

## Component Design Rules

### 1. Follow Atomic Design

Use the following mental model when creating components:

- **atoms**: smallest reusable UI parts  
  Examples: Button, Input, Icon, Badge, Spinner

- **molecules**: small combinations of atoms  
  Examples: SearchBox, QuantitySelector, PriceDisplay

- **organisms**: larger composed UI blocks  
  Examples: Header, ProductCard, ProductGallery, ReviewList

- **pages**: route-level screens using real data  
  Examples: HomePage, ProductDetailPage, CartPage

### 2. Prefer composition over large components

- Do not create one huge component with too many responsibilities
- Split complex UI into smaller child components
- Keep components short and focused

### 3. One component = one clear purpose

- Avoid mixing unrelated UI responsibilities in the same file
- If a component becomes too large, split it into smaller parts

---

## Folder Structure

Use this structure unless the existing project already has an established pattern:

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
