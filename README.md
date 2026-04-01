# React Vite TypeScript Project

A clean and scalable frontend project built with:

- React + Vite + TypeScript
- Atomic Design
- Yarn package manager

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Run development server

```bash
yarn dev
```

## App will run at:

- [HomePage - http://localhost:5173](http://localhost:5173)
- [ProductDetailPage - http://localhost:5173/product/180](http://localhost:5173/product/180)
- [CartPage - http://localhost:5173/cart](http://localhost:5173/cart)

---

## 📦 Tech Stack

- React (Functional Components + Hooks)
- Vite (Fast dev/build tool)
- TypeScript (Type safety)
- SCSS (Styling)
- Yarn (Package manager)

---

## 📁 Project Structure

```txt
src/
  components/
    atoms/        # Small UI elements (Button, Input, Icon)
    molecules/    # Combined UI (SearchBox, QuantitySelector)
    organisms/    # Complex UI (Header, ProductCard, ReviewList)
  pages/          # Page-level components
  hooks/          # Custom hooks
  api/            # Data fetching / API logic
  utils/          # Helper functions
  const/          # App constants
  types/          # TypeScript types
  routes/         # Routing config
  lib/
  styles/
```

---

## 🎨 Component Design (Atomic)

- **atoms** → Button, Input, Icon
- **molecules** → SearchBox, QuantitySelector
- **organisms** → Header, ProductCard, ReviewList
- **pages** → HomePage, ProductDetailPage

➡️ Prefer composition over large components

---
