import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductItem } from "../../products/types/product.types";
import type { CartItem } from "../types/cart-drawer.types";
import {
  calculateTotalItems,
  calculateSubtotal,
  calculateDiscountedSubtotal,
} from "../utils/cart-utils";

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

type CartStore = {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: ProductItem, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;

  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountedSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: ProductItem, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id
          );

          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity <= product.stock) {
              updatedItems[existingItemIndex] = {
                ...existingItem,
                quantity: newQuantity,
              };
              return { items: updatedItems };
            }
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: product.stock,
            };
            return { items: updatedItems };
          } else {
            const cartItem = transformProductToCartItem(
              product,
              Math.min(quantity, product.stock)
            );
            return { items: [...state.items, cartItem] };
          }
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }

          const updatedItems = state.items.map((item) => {
            if (item.id === productId) {
              const validQuantity = Math.min(quantity, item.stock);
              return { ...item, quantity: validQuantity };
            }
            return item;
          });

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openDrawer: () => {
        set({ isOpen: true });
      },

      closeDrawer: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        const { items } = get();
        return calculateTotalItems(items);
      },

      getSubtotal: () => {
        const { items } = get();
        return calculateSubtotal(items);
      },

      getDiscountedSubtotal: () => {
        const { items } = get();
        return calculateDiscountedSubtotal(items);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
