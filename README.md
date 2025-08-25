# Skin Clinic Ecommerce

A modern ecommerce frontend built with **Next.js 15 + TypeScript** showcasing best practices in frontend development with a focus on:

- **Component-driven development** with Storybook
- **Accessibility (WCAG 2.1 AA)** compliance
- **Visual regression testing** via Chromatic
- **Modern React patterns** (App Router, React Query, Zustand)
- **Type safety** with TypeScript and Zod validation

---

## Features

- **Product Browsing**
  - Responsive product grid with skeleton loading states
  - Product filtering by category
  - Product detail pages with image galleries
  - Search functionality

- **Shopping Experience**
  - Add/remove products to cart
  - Update quantities with accessible controls
  - Persistent cart state with Zustand
  - Checkout flow (basic implementation)

- **UI Components**
  - Accessible primitives: `Button`, `Rating`, `SearchForm`
  - Layout components: `Header`, `Footer`, `Breadcrumb`, `PromoBanner`
  - E-commerce components: Product cards, loaders, modals
  - Form components with validation

- **Technical Implementation**
  - Next.js App Router for routing and layouts
  - React Query for data fetching and caching
  - Zustand for state management
  - Zod for runtime type validation
  - TanStack Query for data fetching
  - Tailwind CSS for styling

---

## Quality Assurance

- **Accessibility**
  - Semantic HTML structure
  - ARIA attributes for dynamic content
  - Keyboard navigation support
  - Screen reader announcements for cart updates

- **Testing & Quality**
  - Component testing with Vitest
  - Storybook with a11y addon
  - Visual regression testing with Chromatic
---

## Project Structure

```
/
├── public/               # Static assets and fonts
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── cart/         # Cart page
│   │   ├── checkout/     # Checkout page
│   │   ├── products/     # Product listing and details
│   │   └── search/       # Search functionality
│   ├── components/       # Shared UI components
│   │   ├── layout/       # Layout components (header, footer, etc.)
│   │   └── ui/           # UI primitives and shared components
│   ├── features/         # Feature-based modules
│   │   ├── cart/         # Cart functionality
│   │   └── products/     # Product browsing functionality
│   └── lib/              # Shared utilities, hooks, and API
├── .storybook/           # Storybook configuration
└── [config files]        # Configuration files
```

---

## Data Integration

The application integrates with [DummyJSON](https://dummyjson.com/) for product data, demonstrating headless e-commerce patterns with:

- Type-safe API integration
- Data validation with Zod schemas
- Optimistic UI updates
- Error handling and fallbacks