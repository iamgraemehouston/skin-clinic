# Skin Clinic Ecommerce Demo

This is a demo ecommerce frontend built with **Next.js + TypeScript**.
It was created as part of a coding exercise to demonstrate **accessible, performant, and maintainable React development** with a focus on:

- **Storybook-first workflow**
- **Accessibility (WCAG 2.1 AA)** as a baseline requirement
- **Visual regression testing with Chromatic**
- **Clean GitLab issue/branch workflow** to simulate real-world collaboration
- **Headless ecommerce patterns** (data pulled from [Dummy JSON](https://dummyjson.com/))

---

## What’s Implemented

- **Core pages**
  - `/` Home – minimal landing
  - `/products` – product grid (responsive, keyboard navigable, skeleton loading)
  - `/products/[id]` – product details (semantic structure, alt text, accessible image gallery)
  - `/cart` – cart with add/remove/update, `aria-live` announcements, persisted state (Zustand)

- **Design system slice**
  - Accessible primitives: `Button`, `Heading`, `Link`, `Text`
  - Ecommerce components: `ProductCard`, `ProductGrid`, `ProductDetails`, `CartItem`, `CartSummary`

- **Tooling & quality**
  - TypeScript strict mode
  - ESLint + Prettier + Husky (commit hooks)
  - Storybook with a11y addon & test runner
  - Chromatic CI for visual regression testing
  - Lighthouse a11y score ≥ 90

---

## What’s Not In Scope (Deliberately)

To keep the demo **focused and achievable in a few days**, the following were **not implemented**:

- Authentication / user accounts
- Checkout or payments
- Advanced PWA features beyond installability/offline fallback
- Full design system (only a small slice provided)

This lets reviewers focus on **code quality, structure, accessibility, and workflow**, not completeness of ecommerce features.

---


## Root Structure

```
/
├── docs/                 # Documentation files (Markdown)
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Next.js app router pages
│   ├── components/       # Shared UI components
│   ├── features/         # Feature-based modules
│   └── lib/              # Shared utilities and hooks
├── .storybook/           # Storybook configuration
└── [config files]        # Configuration files
```