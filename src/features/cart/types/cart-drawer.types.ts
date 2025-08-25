import type { ProductItem } from "../../products/types/product.types";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  quantity: number;
  category: string;
  stock: number;
};

export type CartItemProps = {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
};

export type CartSummaryProps = {
  totalItems: number;
  subtotal: number;
  discountedSubtotal: number;
};

export type CartEmptyStateProps = {
  onClose: () => void;
};
