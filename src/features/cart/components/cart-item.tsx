"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { JSX, useCallback, useId, useState } from "react";
import { QuantitySelector } from "../../products/components/quantity-selector";
import { useCart } from "../hooks/use-cart";
import type { CartItem as CartItemType } from "../types/cart-drawer.types";
import {
  calculateDiscountedPrice,
  calculateItemTotal,
  calculateDiscountedItemTotal,
  formatPrice,
} from "../utils/cart-utils";

export type CartItemProps = { item: CartItemType };

export default function CartItem({ item }: CartItemProps): JSX.Element {
  const { updateQuantity, removeItem, error, clearError } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const lineId = useId();

  const originalPrice = item.price;
  const hasDiscount = item.discountPercentage > 0;
  const discountedPrice = calculateDiscountedPrice(
    originalPrice,
    item.discountPercentage
  );
  const itemTotal = calculateItemTotal(item);
  const discountedItemTotal = calculateDiscountedItemTotal(item);

  const quantityInputId = `cart-item-quantity-${item.id}`;

  const handleQuantityChange = useCallback(
    (newQty: number): void => {
      if (newQty === item.quantity) return;
      setIsUpdating(true);
      clearError();

      const ok =
        newQty === 0 ? removeItem(item.id) : updateQuantity(item.id, newQty);

      if (!ok) {
        // error live region will speak
      }
      setIsUpdating(false);
    },
    [item.id, item.quantity, updateQuantity, removeItem, clearError]
  );

  const handleRemove = useCallback((): void => {
    clearError();
    const ok = removeItem(item.id);
    if (!ok) {
      // error live region will speak
    }
  }, [item.id, removeItem, clearError]);

  const itemError = error?.productId === item.id ? error : null;

  return (
    <article
      id={lineId}
      className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0"
      aria-busy={isUpdating ? "true" : "false"}
      aria-labelledby={`${lineId}-title`}
    >
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
        {imgOk ? (
          <Image
            src={item.thumbnail}
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <Image
            src="/assets/no-image-placeholder.png"
            alt=""
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-2 flex items-start justify-between">
          <div className="min-w-0 pr-4">
            <h3
              id={`${lineId}-title`}
              className="truncate text-lg font-medium text-gray-900"
            >
              {item.title}
            </h3>
            <p className="mt-1 text-base capitalize text-black">
              {item.category}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={isUpdating}
            className="flex-shrink-0 rounded p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Remove ${item.title} from cart`}
            aria-controls={lineId}
            data-testid={`remove-item-${item.id}`}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2" aria-label="Unit price">
          {hasDiscount ? (
            <>
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-base text-black/50 line-through">
                {formatPrice(originalPrice)}
              </span>
              <span
                className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600"
                aria-label={`${Math.round(
                  item.discountPercentage
                )} percent off`}
              >
                -{Math.round(item.discountPercentage)}%
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QuantitySelector
              id={quantityInputId}
              name={`quantity-${item.id}`}
              maxQuantity={item.stock}
              initialQuantity={item.quantity}
              onQuantityChange={handleQuantityChange}
            />

            <span aria-live="polite" className="text-base text-black/50">
              {isUpdating ? "Updating…" : ""}
            </span>
          </div>

          <div className="text-right">
            {hasDiscount ? (
              <>
                <output
                  htmlFor={quantityInputId}
                  aria-label="Line total after discount"
                  className="text-lg font-semibold text-gray-900"
                >
                  {formatPrice(discountedItemTotal)}
                </output>
                <div className="text-base text-black/50 line-through">
                  {formatPrice(itemTotal)}
                </div>
              </>
            ) : (
              <output
                htmlFor={quantityInputId}
                aria-label="Line total"
                className="text-lg font-semibold text-gray-900"
              >
                {formatPrice(itemTotal)}
              </output>
            )}
          </div>
        </div>

        {itemError ? (
          <div
            className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-base text-red-600"
            role="alert"
            aria-live="assertive"
          >
            {itemError.message}
          </div>
        ) : null}

        {item.stock <= 5 && item.stock > 0 ? (
          <p className="mt-2 text-base text-amber-600" aria-live="polite">
            Only {item.stock} left in stock
          </p>
        ) : null}
      </div>
    </article>
  );
}
