import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";
import { ShoppingCart } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "Button title",
    },
    disabled: {
      description: "Button disabled state",
    },
    isLoading: {
      description: "Button loading state",
    },
    icon: {
      description: "Button icon",
    },
  },
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Add to Cart",
  },
};

export const Loading = {
  args: {
    children: "Add to Cart",
    isLoading: true,
  },
};

export const Disabled = {
  args: {
    children: "Add to Cart",
    disabled: true,
  },
};

export const WithIcon = {
  args: {
    children: "Add to Cart",
    icon: <ShoppingCart size={16} />,
  },
};

export const IsFocused = {
  args: {
    children: "Add to Cart",
    icon: <ShoppingCart size={16} />,
  },
  parameters: {
    pseudo: { focus: true },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const button = canvasElement.querySelector("button");
    if (button) {
      button.focus();
    }
  },
};
