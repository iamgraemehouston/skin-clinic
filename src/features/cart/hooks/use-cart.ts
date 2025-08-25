import { useCallback, useState } from "react";
import { useCartStore } from "../store/cart";
import type { ProductItem } from "../../products/types/product.types";
import { validateQuantity } from "../utils/cart-utils";

export type CartError = {
  type:
    | "STOCK_EXCEEDED"
    | "INVALID_QUANTITY"
    | "PRODUCT_NOT_FOUND"
    | "GENERAL_ERROR";
  message: string;
  productId?: number;
};

export const useCart = () => {
  const store = useCartStore();
  const [error, setError] = useState<CartError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const addItem = useCallback(
    async (product: ProductItem, quantity = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!product || !product.id) {
          throw new Error("Invalid product data");
        }

        if (!validateQuantity(quantity, product.stock)) {
          const errorMsg =
            quantity <= 0
              ? "Quantity must be greater than 0"
              : `Only ${product.stock} items available in stock`;

          setError({
            type: quantity <= 0 ? "INVALID_QUANTITY" : "STOCK_EXCEEDED",
            message: errorMsg,
            productId: product.id,
          });
          return false;
        }

        const existingItem = store.items.find((item) => item.id === product.id);
        const currentQuantity = existingItem?.quantity || 0;
        const totalQuantity = currentQuantity + quantity;

        if (totalQuantity > product.stock) {
          setError({
            type: "STOCK_EXCEEDED",
            message: `Cannot add ${quantity} items. Only ${
              product.stock - currentQuantity
            } more available.`,
            productId: product.id,
          });
          return false;
        }

        store.addItem(product, quantity);
        return true;
      } catch (err) {
        setError({
          type: "GENERAL_ERROR",
          message:
            err instanceof Error ? err.message : "Failed to add item to cart",
          productId: product.id,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [store]
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      setError(null);

      try {
        const item = store.items.find((item) => item.id === productId);

        if (!item) {
          setError({
            type: "PRODUCT_NOT_FOUND",
            message: "Product not found in cart",
            productId,
          });
          return false;
        }

        if (quantity < 0) {
          setError({
            type: "INVALID_QUANTITY",
            message: "Quantity cannot be negative",
            productId,
          });
          return false;
        }

        if (quantity > 0 && !validateQuantity(quantity, item.stock)) {
          setError({
            type: "STOCK_EXCEEDED",
            message: `Only ${item.stock} items available in stock`,
            productId,
          });
          return false;
        }

        store.updateQuantity(productId, quantity);
        return true;
      } catch (err) {
        setError({
          type: "GENERAL_ERROR",
          message:
            err instanceof Error ? err.message : "Failed to update quantity",
          productId,
        });
        return false;
      }
    },
    [store]
  );

  const removeItem = useCallback(
    (productId: number) => {
      setError(null);

      try {
        const item = store.items.find((item) => item.id === productId);

        if (!item) {
          setError({
            type: "PRODUCT_NOT_FOUND",
            message: "Product not found in cart",
            productId,
          });
          return false;
        }

        store.removeItem(productId);
        return true;
      } catch (err) {
        setError({
          type: "GENERAL_ERROR",
          message: err instanceof Error ? err.message : "Failed to remove item",
          productId,
        });
        return false;
      }
    },
    [store]
  );

  const openDrawer = useCallback(() => {
    try {
      store.openDrawer();
    } catch (err) {
      setError({
        type: "GENERAL_ERROR",
        message: "Failed to open cart drawer",
      });
    }
  }, [store]);

  const closeDrawer = useCallback(() => {
    try {
      store.closeDrawer();
    } catch (err) {
      setError({
        type: "GENERAL_ERROR",
        message: "Failed to close cart drawer",
      });
    }
  }, [store]);

  const clearCart = useCallback(() => {
    try {
      store.clearCart();
      setError(null);
    } catch (err) {
      setError({
        type: "GENERAL_ERROR",
        message: "Failed to clear cart",
      });
    }
  }, [store]);

  const getItem = useCallback(
    (productId: number) => {
      return store.items.find((item) => item.id === productId);
    },
    [store.items]
  );

  const hasItem = useCallback(
    (productId: number) => {
      return store.items.some((item) => item.id === productId);
    },
    [store.items]
  );

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = store.items.find((item) => item.id === productId);
      return item?.quantity || 0;
    },
    [store.items]
  );

  return {
    items: store.items,
    isOpen: store.isOpen,
    error,
    isLoading,

    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openDrawer,
    closeDrawer,

    clearError,

    totalItems: store.getTotalItems(),
    subtotal: store.getSubtotal(),
    discountedSubtotal: store.getDiscountedSubtotal(),

    isEmpty: store.items.length === 0,
    hasItems: store.items.length > 0,
    getItem,
    hasItem,
    getItemQuantity,
  };
};
