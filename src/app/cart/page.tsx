"use client";

import { JSX } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/buttons/button";
import { useCart } from "@/features/cart/hooks/use-cart";
import { formatPrice } from "@/features/cart/utils/cart-utils";
import { useRouter } from "next/navigation";
import { Trash2, Tag } from "lucide-react";
import { CartEmptyState } from "@/features/cart/components";
import clsx from "clsx";
import { QuantitySelector } from "@/features/products/components/quantity-selector";

export default function CartPage(): JSX.Element {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discountedSubtotal,
    isEmpty,
    closeDrawer,
  } = useCart();
  const router = useRouter();

  const totalSavings = subtotal - discountedSubtotal;
  const hasSavings = totalSavings > 0;
  const delivery = 15;
  const total = discountedSubtotal + delivery;

  return (
    <main>
      <h1 className="mb-6 text-[40px] font-extrabold font-integral">
        YOUR CART
      </h1>

      {isEmpty ? (
        <CartEmptyState onClose={closeDrawer} />
      ) : (
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ul
              role="list"
              className="flex flex-col gap-4 border border-black/10 p-6 rounded-xl"
            >
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={clsx(
                    "p-4",
                    index !== items.length - 1 && "border-b border-black/10"
                  )}
                >
                  <article className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-md bg-white">
                      <Image
                        src={
                          item.thumbnail || "/assets/no-image-placeholder.png"
                        }
                        alt=""
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/no-image-placeholder.png";
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="font-medium text-xl">{item.title}</h2>
                      <p className="text-base text-neutral-600 capitalize">
                        {item.category}
                      </p>
                      <p className="mt-1 font-semibold text-2xl">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-3">
                      <button
                        type="button"
                        className="ml-2 text-red-600 mb-6"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 />
                      </button>
                      <QuantitySelector
                        maxQuantity={item.stock}
                        minQuantity={1}
                        initialQuantity={item.quantity}
                      />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <aside
            className="col-span-12 lg:col-span-4 rounded-xl border border-black/10 p-6"
            aria-labelledby="order-summary"
          >
            <h2 id="order-summary" className="mb-4 font-semibold text-2xl">
              Order Summary
            </h2>

            <dl className="space-y-2 text-lg">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              {hasSavings && (
                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd className="font-bold text-red-500">
                    −{formatPrice(totalSavings)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Delivery Fee</dt>
                <dd className="font-medium">{formatPrice(delivery)}</dd>
              </div>
              <div className="mt-3 border-t pt-3 flex justify-between text-lg">
                <dt>Total</dt>
                <dd className="font-extrabold text-2xl">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <form className="mt-5 flex gap-2">
              <label htmlFor="promo" className="sr-only">
                Add promo code
              </label>
              <div className="flex-1 rounded-full px-4 py-2 bg-gray-200  text-black/60 flex items-center justify-start">
                <Tag color="#ABADB0" className="ml-2" />
                <input
                  id="promo"
                  className="outline-none ml-2"
                  placeholder="Add promo code"
                />
              </div>
              <Button type="button" className="rounded-full border px-4 py-2">
                Apply
              </Button>
            </form>

            <Button
              className="mt-4 w-full"
              icon={<ArrowRight />}
              iconPosition="right"
              onClick={() => router.push("/checkout")}
            >
              Go to Checkout
            </Button>
          </aside>
        </section>
      )}
    </main>
  );
}
