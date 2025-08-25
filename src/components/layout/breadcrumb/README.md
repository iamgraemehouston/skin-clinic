# Breadcrumb Component

A flexible and accessible breadcrumb navigation component for Next.js 15 applications.

## Features

- 🚀 **Next.js 15 Compatible**: Uses the latest `usePathname` hook from `next/navigation`
- 🎨 **Customizable**: Support for custom items, icons, separators, and styling
- ♿ **Accessible**: Proper ARIA labels and semantic HTML structure
- 📱 **Responsive**: Automatic collapsing for long breadcrumb trails
- 🔧 **TypeScript**: Full TypeScript support with proper type definitions
- 🏠 **Auto-generation**: Automatically generates breadcrumbs from the current pathname

## Installation

The component uses Heroicons for default icons. Make sure you have it installed:

```bash
npm install @heroicons/react
# or
yarn add @heroicons/react
```

## Basic Usage

### Auto-generated from pathname

```tsx
import Breadcrumb from "@/components/layout/breadcrumb";

export default function Page() {
  return (
    <div>
      <Breadcrumb />
      {/* Will automatically generate breadcrumbs based on current URL */}
    </div>
  );
}
```

### Custom breadcrumb items

```tsx
import Breadcrumb from "@/components/layout/breadcrumb";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const customItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", icon: ShoppingCartIcon },
  { label: "Electronics", href: "/products/electronics" },
  {
    label: "iPhone 15",
    href: "/products/electronics/iphone-15",
    isCurrentPage: true,
  },
];

export default function ProductPage() {
  return (
    <div>
      <Breadcrumb customItems={customItems} />
    </div>
  );
}
```

## Props

| Prop           | Type                  | Default                | Description                                                                      |
| -------------- | --------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `customItems`  | `BreadcrumbItem[]`    | `undefined`            | Custom breadcrumb items. If not provided, items are auto-generated from pathname |
| `showHome`     | `boolean`             | `true`                 | Whether to show the home link                                                    |
| `homeIcon`     | `React.ComponentType` | `HomeIcon`             | Icon component for the home link                                                 |
| `separator`    | `React.ReactElement`  | `<ChevronRightIcon />` | Separator element between breadcrumb items                                       |
| `className`    | `string`              | `''`                   | Additional CSS classes                                                           |
| `maxItems`     | `number`              | `undefined`            | Maximum number of items before collapsing                                        |
| `collapseFrom` | `'start' \| 'middle'` | `'middle'`             | Where to collapse items when maxItems is exceeded                                |

## Types

```tsx
type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrentPage?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};
```

## Examples

### With custom separator

```tsx
<Breadcrumb separator={<span className="text-gray-300">/</span>} />
```

### With item limit and collapsing

```tsx
<Breadcrumb maxItems={4} collapseFrom="middle" />
```

### Without home link

```tsx
<Breadcrumb showHome={false} />
```

### With custom styling

```tsx
<Breadcrumb className="bg-gray-50 p-4 rounded-lg border" />
```

### With icons

```tsx
import { UserIcon, CogIcon } from "@heroicons/react/24/outline";

const items = [
  { label: "Home", href: "/" },
  { label: "Account", href: "/account", icon: UserIcon },
  {
    label: "Settings",
    href: "/account/settings",
    icon: CogIcon,
    isCurrentPage: true,
  },
];

<Breadcrumb customItems={items} />;
```

## Accessibility

The component follows accessibility best practices:

- Uses semantic `<nav>` and `<ol>` elements
- Includes proper ARIA labels (`aria-label="Breadcrumb"`)
- Marks current page with `aria-current="page"`
- Separators are marked with `aria-hidden="true"`

## Styling

The component uses Tailwind CSS classes by default. You can customize the appearance by:

1. Passing a `className` prop for the container
2. Modifying the default classes in the component
3. Using CSS modules or styled-components for more complex styling

## Utilities

The component exports utility functions that you can use independently:

```tsx
import {
  generateBreadcrumbItems,
  segmentToLabel,
} from "@/components/layout/breadcrumb";

// Generate items from a pathname
const items = generateBreadcrumbItems("/products/electronics/phones", true);

// Convert URL segment to readable label
const label = segmentToLabel("user-profile"); // "User Profile"
```
