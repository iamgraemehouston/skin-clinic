import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb from "./index";
import { BreadcrumbItem } from "./types";

const meta: Meta<typeof Breadcrumb> = {
  title: "Layout/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    showHome: {
      control: "boolean",
      description: "Show home icon and link",
    },
    maxItems: {
      control: "number",
      description: "Maximum number of items to show before collapsing",
    },
    collapseFrom: {
      control: "select",
      options: ["start", "middle"],
      description: "Where to collapse items from when maxItems is exceeded",
    },
    separator: {
      description: "Custom separator element between breadcrumb items",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the breadcrumb",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const customItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones", href: "/products/electronics/smartphones" },
  {
    label: "iPhone 15",
    href: "/products/electronics/smartphones/iphone-15",
    isCurrentPage: true,
  },
];

export const Default: Story = {
  args: {
    customItems,
  },
};

export const CustomSeparator: Story = {
  args: {
    customItems,
    separator: <span className="mx-2 text-gray-400">/</span>,
  },
};

export const Collapsed: Story = {
  args: {
    customItems,
    maxItems: 3,
  },
};

export const LongPath: Story = {
  args: {
    customItems: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/subcategory" },
      { label: "Product Type", href: "/category/subcategory/product-type" },
      { label: "Brand", href: "/category/subcategory/product-type/brand" },
      {
        label: "Model",
        href: "/category/subcategory/product-type/brand/model",
      },
      {
        label: "Variant",
        href: "/category/subcategory/product-type/brand/model/variant",
      },
      {
        label: "Details",
        href: "/category/subcategory/product-type/brand/model/variant/details",
        isCurrentPage: true,
      },
    ],
    maxItems: 4,
  },
};

export const CustomStyling: Story = {
  args: {
    customItems,
    className: "bg-gray-50 p-4 rounded-lg border",
  },
};
