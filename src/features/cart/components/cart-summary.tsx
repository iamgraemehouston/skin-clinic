"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/buttons/button";
import type { CartSummaryProps } from "../types/cart-drawer.types";
import { formatPrice } from "../utils/cart-utils";
import { useCart } from "../hooks/use-cart";
import { JSX } from "react";

export default function CartSummary({
  totalItems,
  subtotal,
  discountedSubtotal,
}: CartSummaryProps): JSX.Element {
  const totalSavings = subtotal - discountedSubtotal;
  const hasSavings = totalSavings > 0;
  const router = useRouter();
  const { closeDrawer } = useCart();

  const itemsLabel = `${totalItems} ${
    totalItems === 1 ? "item" : "items"
  } in cart`;

  return (
    <section
      className="mt-4 pt-4"
      aria-labelledby="order-summary-heading"
      role="region"
    >
      <h2 id="order-summary-heading" className="mb-4 text-xl font-semibold">
        Order Summary
      </h2>

      <p className="mb-2 text-lg text-black/60">{itemsLabel}</p>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="font-medium">{formatPrice(discountedSubtotal)}</dd>
        </div>

        {hasSavings ? (
          <>
            <div className="flex justify-between text-black/50">
              <dt>Original price</dt>
              <dd className="line-through">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-green-700">
              <dt>You save</dt>
              <dd className="font-medium">-{formatPrice(totalSavings)}</dd>
            </div>
          </>
        ) : null}

        <div className="mt-3 border-t pt-3 flex justify-between text-lg">
          <dt>Total</dt>
          <dd className="font-extrabold">{formatPrice(discountedSubtotal)}</dd>
        </div>
      </dl>

      <Button
        aria-label="Proceed to checkout"
        className="mt-4 w-full"
        onClick={() => {
          closeDrawer();
          router.push("/cart");
        }}
      >
        Proceed to Checkout
      </Button>
    </section>
  );
}
