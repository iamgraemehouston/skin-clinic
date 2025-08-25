import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "@storybook/test";
import { CartEmptyState } from "../components";

const meta: Meta<typeof CartEmptyState> = {
  title: "Features/Cart/CartEmptyState",
  component: CartEmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Empty state component displayed when the cart has no items. Shows appropriate messaging and call-to-action to continue shopping.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description:
        "Callback function called when the continue shopping button is clicked",
      action: "onClose",
    },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default empty cart state with messaging and continue shopping button.",
      },
    },
  },
};

export const InDrawerContainer: Story = {
  args: {
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Empty cart state as it would appear within the cart drawer container.",
      },
    },
  },
};
