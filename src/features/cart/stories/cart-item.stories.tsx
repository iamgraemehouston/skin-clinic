import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CartItem as CartItemType } from "../types/cart-drawer.types";
import { CartItem } from "../components";

const meta: Meta<typeof CartItem> = {
  title: "Features/Cart/CartItem",
  component: CartItem,
  decorators: [
    (Story) => (
      <div className="max-w-[900px] p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseCartItem: CartItemType = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  price: 9.99,
  discountPercentage: 7.17,
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  quantity: 2,
  category: "beauty",
  stock: 5,
};

export const Default: Story = {
  args: {
    item: baseCartItem,
  },
};

export const WithoutDiscount: Story = {
  args: {
    item: {
      ...baseCartItem,
      discountPercentage: 0,
    },
  },
};

export const LowStock: Story = {
  args: {
    item: {
      ...baseCartItem,
      stock: 2,
    },
  },
};

export const SingleQuantity: Story = {
  args: {
    item: {
      ...baseCartItem,
      quantity: 1,
    },
  },
};

export const HighDiscount: Story = {
  args: {
    item: {
      ...baseCartItem,
      discountPercentage: 50,
      price: 199.99,
    },
  },
};

export const LongTitle: Story = {
  args: {
    item: {
      ...baseCartItem,
      title:
        "This is a very long product title that should be truncated properly in the cart item display",
    },
  },
};

export const ExpensiveItem: Story = {
  args: {
    item: {
      ...baseCartItem,
      price: 1299.99,
      discountPercentage: 15,
      quantity: 1,
      title: "Premium Luxury Product",
      category: "electronics",
    },
  },
};
