import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "../components/product-card";
import type { ProductItem } from "../types/product.types";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ width: "400px" }}>{children}</div>
);

const meta: Meta<typeof ProductCard> = {
  title: "Features/Products/ProductCard",
  component: ProductCard,
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
    product: {
      description: "Product object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const redLipstick: ProductItem = {
  id: 4,
  title: "Red Lipstick",
  description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
  category: "beauty",
  price: 12.99,
  discountPercentage: 12.16,
  rating: 4.36,
  stock: 91,
  tags: ["beauty", "lipstick"],
  brand: "Chic Cosmetics",
  sku: "BEA-CHI-LIP-004",
  weight: 1,
  dimensions: {
    width: 18.11,
    height: 28.38,
    depth: 22.17
  },
  warrantyInformation: "3 year warranty",
  shippingInformation: "Ships in 1 week",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 4,
      comment: "Great product!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Liam Garcia",
      reviewerEmail: "liam.garcia@x.dummyjson.com"
    },
    {
      rating: 5,
      comment: "Great product!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Ruby Andrews",
      reviewerEmail: "ruby.andrews@x.dummyjson.com"
    },
    {
      rating: 5,
      comment: "Would buy again!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Clara Berry",
      reviewerEmail: "clara.berry@x.dummyjson.com"
    }
  ],
  returnPolicy: "7 days return policy",
  minimumOrderQuantity: 40,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "9467746727219",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
  },
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"
  ],
  thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  slug: "red-lipstick"
};

const redNailPolish: ProductItem = {
  id: 5,
  title: "Red Nail Polish",
  description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
  category: "beauty",
  price: 8.99,
  discountPercentage: 11.44,
  rating: 4.32,
  stock: 79,
  tags: ["beauty", "nail polish"],
  brand: "Nail Couture",
  sku: "BEA-NAI-NAI-005",
  weight: 8,
  dimensions: {
    width: 21.63,
    height: 16.48,
    depth: 29.84
  },
  warrantyInformation: "1 month warranty",
  shippingInformation: "Ships overnight",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 2,
      comment: "Poor quality!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Benjamin Wilson",
      reviewerEmail: "benjamin.wilson@x.dummyjson.com"
    },
    {
      rating: 5,
      comment: "Great product!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Liam Smith",
      reviewerEmail: "liam.smith@x.dummyjson.com"
    },
    {
      rating: 1,
      comment: "Very unhappy with my purchase!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Clara Berry",
      reviewerEmail: "clara.berry@x.dummyjson.com"
    }
  ],
  returnPolicy: "No return policy",
  minimumOrderQuantity: 22,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "4063010628104",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
  },
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"
  ],
  thumbnail: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
  slug: "red-nail-polish"
};

const ckOne: ProductItem = {
  id: 6,
  title: "Calvin Klein CK One",
  description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
  category: "fragrances",
  price: 49.99,
  discountPercentage: 1.89,
  rating: 4.37,
  stock: 29,
  tags: ["fragrances", "perfumes"],
  brand: "Calvin Klein",
  sku: "FRA-CAL-CAL-006",
  weight: 7,
  dimensions: {
    width: 29.36,
    height: 27.76,
    depth: 20.72
  },
  warrantyInformation: "1 week warranty",
  shippingInformation: "Ships overnight",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 2,
      comment: "Very disappointed!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Layla Young",
      reviewerEmail: "layla.young@x.dummyjson.com"
    },
    {
      rating: 4,
      comment: "Fast shipping!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Daniel Cook",
      reviewerEmail: "daniel.cook@x.dummyjson.com"
    },
    {
      rating: 3,
      comment: "Not as described!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Jacob Cooper",
      reviewerEmail: "jacob.cooper@x.dummyjson.com"
    }
  ],
  returnPolicy: "90 days return policy",
  minimumOrderQuantity: 9,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "2451534060749",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
  },
  images: [
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp"
  ],
  thumbnail: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  slug: "calvin-klein-ck-one"
};

export const Default: Story = {
  args: {
    product: redLipstick,
  },
};

export const ExpensiveItem: Story = {
  args: {
    product: ckOne,
  },
};

export const LowRated: Story = {
  args: {
    product: {
      ...redNailPolish,
      rating: 2.1
    },
  },
};

export const WithDiscount: Story = {
  args: {
    product: {
      ...redLipstick,
      discountPercentage: 25
    },
  },
};

export const LongTitle: Story = {
  args: {
    product: {
      ...redLipstick,
      title:
        "This is a very long product title that should test how the component handles text overflow and wrapping in various layouts and screen sizes",
    },
  },
};

export const NoImage: Story = {
  args: {
    product: {
      ...redNailPolish,
      thumbnail: "",
    },
  },
};
