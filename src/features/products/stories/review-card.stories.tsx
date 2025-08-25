import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReactNode } from "react";

import ReviewCard from "../components/review-card";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ maxWidth: "500px", width: "100%" }}>{children}</div>
);

const meta: Meta<typeof ReviewCard> = {
  title: "Features/Products/ReviewCard",
  component: ReviewCard,
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
    review: {
      description: "Review object",
    },
    verified: {
      description: "Whether the review is from a verified purchase",
      control: "boolean",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleReview = {
  rating: 4,
  comment:
    "This product exceeded my expectations! The quality is excellent and it works exactly as described. Would definitely recommend to anyone looking for this type of product.",
  date: "2022-01-01",
  reviewerName: "John Doe",
  reviewerEmail: "john.doe@example.com",
};

export const Verified: Story = {
  args: {
    review: sampleReview,
    verified: true,
  },
};

export const Unverified: Story = {
  args: {
    review: sampleReview,
    verified: false,
  },
};
