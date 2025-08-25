import { ProductItem } from "@/features/products/types/product.types";
import { CartItem } from "../types/cart-drawer.types";

export const transformProductToCartItem = (
  product: ProductItem,
  quantity = 1
): CartItem => ({
  id: product.id,
  title: product.title,
  price: product.price,
  discountPercentage: product.discountPercentage,
  thumbnail: product.thumbnail,
  category: product.category,
  stock: product.stock,
  quantity: quantity,
});

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  if (discountPercentage <= 0) return price;
  return price * (1 - discountPercentage / 100);
};

export const calculateItemTotal = (item: CartItem): number => {
  return item.price * item.quantity;
};

export const calculateDiscountedItemTotal = (item: CartItem): number => {
  const discountedPrice = calculateDiscountedPrice(
    item.price,
    item.discountPercentage
  );
  return discountedPrice * item.quantity;
};

export const calculateItemSavings = (item: CartItem): number => {
  const originalTotal = calculateItemTotal(item);
  const discountedTotal = calculateDiscountedItemTotal(item);
  return originalTotal - discountedTotal;
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
};

export const calculateDiscountedSubtotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + calculateDiscountedItemTotal(item),
    0
  );
};

export const calculateTotalSavings = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + calculateItemSavings(item), 0);
};

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const formatPrice = (price: number, currency = "$"): string => {
  return `${currency}${price.toFixed(2)}`;
};

export const validateQuantity = (quantity: number, stock: number): boolean => {
  return quantity > 0 && quantity <= stock;
};

export const getMaxQuantity = (item: CartItem): number => {
  return item.stock;
};
