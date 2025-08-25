import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReactNode } from "react";
import { expect, userEvent, within } from "@storybook/test";

import { QuantitySelector } from "../components/quantity-selector";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ width: "300px" }}>{children}</div>
);

const meta: Meta<typeof QuantitySelector> = {
  title: "Features/Products/QuantitySelector",
  component: QuantitySelector,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    maxQuantity: {
      description: "Maximum allowed quantity",
      control: { type: "number" },
    },
    minQuantity: {
      description: "Minimum allowed quantity",
      control: { type: "number" },
    },
    step: {
      description: "Step value for increment/decrement",
      control: { type: "number" },
    },
    initialQuantity: {
      description: "Initial quantity value",
      control: { type: "number" },
    },
    onQuantityChange: {
      description: "Callback when quantity changes",
      action: "quantity changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    step: 1,
    initialQuantity: 1,
  },
};

export const CustomInitialValue: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    initialQuantity: 5,
  },
};

export const StartAtTwo: Story = {
  args: {
    maxQuantity: 5,
    minQuantity: 1,
    initialQuantity: 2,
  },
};

export const CustomStep: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    step: 2,
    initialQuantity: 1,
  },
};

export const AtMinimumValue: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    initialQuantity: 1,
  },
};

export const AtMaximumValue: Story = {
  args: {
    maxQuantity: 5,
    minQuantity: 1,
    initialQuantity: 5,
  },
};

export const WithCustomName: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    initialQuantity: 1,
    name: "product-quantity",
  },
};

export const WithCallback: Story = {
  args: {
    maxQuantity: 10,
    minQuantity: 1,
    initialQuantity: 1,
    onQuantityChange: (quantity: number) =>
      console.log(`Quantity changed to: ${quantity}`),
  },
};

export const WithInteraction: Story = {
  args: { maxQuantity: 8, minQuantity: 1, initialQuantity: 1 },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = await c.findByTestId("quantity-selector-input");
    const increment = await c.findByTestId("quantity-selector-increase-button");
    const decrement = await c.findByTestId("quantity-selector-decrease-button");

    await expect(decrement).toBeDisabled();

    await userEvent.click(increment);
    await userEvent.click(increment);
    await userEvent.click(increment);

    await expect(input).toHaveValue(4);

    await userEvent.click(increment);
    await userEvent.click(increment);
    await userEvent.click(increment);
    await userEvent.click(increment);

    await expect(input).toHaveValue(8);
    await expect(increment).toBeDisabled();

    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);

    await expect(input).toHaveValue(1);
    await expect(decrement).toBeDisabled();
  },
};
