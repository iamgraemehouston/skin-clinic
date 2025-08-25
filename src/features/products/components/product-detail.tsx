"use client";

import clsx from "clsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductGallery from "./product-media-gallery";
import { Rating } from "@/components/ui/meter/rating";
import { fetchProduct } from "@/lib/api";
import { formatPrice } from "../utils/transforms";
import { ProductItem } from "../types/product.types";
import { JSX, Suspense, useState } from "react";
import Button from "@/components/ui/buttons/button";
import { QuantitySelector } from "./quantity-selector";
import { ProductReccomendations } from "./product-reccomendations";
import ProductGridLoader from "@/components/ui/loaders/product-grid-loader";
import ProductTabs from "./product-tabs";
import { useCart } from "../../cart/hooks/use-cart";

type ProductDetailProps = {
  id: number;
  category?: string;
  className?: string;
  currency?: string;
};

export function ProductDetail({
  id,
  category,
  className,
  currency,
}: ProductDetailProps): JSX.Element {
  const { data: product } = useSuspenseQuery<ProductItem>({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });

  const { addItem, isLoading, error, clearError } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const currencyCode = currency ?? "USD";

  const hasDiscount = product.discountPercentage > 0;
  const discounted = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const titleId = `product-title-${product.id}`;
  const priceId = `product-price-${product.id}`;
  const descId = `product-desc-${product.id}`;

  const availabilityHref =
    product.stock !== undefined && product.stock <= 0
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";

  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    clearError();

    try {
      const success = await addItem(product, selectedQuantity);
      if (success) {
        setSelectedQuantity(1);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  return (
    <div>
      <main className={clsx("flex flex-col md:flex-row gap-6", className)}>
        <article
          itemScope
          itemType="https://schema.org/Product"
          aria-labelledby={titleId}
          className="contents"
        >
          <ProductGallery
            images={product.images}
            thumbnail={product.thumbnail}
            title={product.title}
          />
          <meta itemProp="image" content={product.thumbnail} />

          <section className="w-full md:w-6/12">
            <header className="mb-2">
              <h1
                id={titleId}
                itemProp="name"
                className="text-[40px] font-integral-extra"
              >
                {product.title}
              </h1>
              {category ? (
                <meta itemProp="category" content={category} />
              ) : null}
            </header>

            <div aria-label="Customer rating">
              <Rating
                value={product.rating}
                count={product.reviews.length}
                aria-label={`${product.rating.toFixed(
                  1
                )} out of 5 stars based on ${product.reviews.length} reviews`}
              />
              <div
                itemProp="aggregateRating"
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <meta
                  itemProp="ratingValue"
                  content={product.rating.toFixed(1)}
                />
                <meta
                  itemProp="reviewCount"
                  content={String(product.reviews.length)}
                />
              </div>
            </div>

            <section aria-labelledby={`${priceId}-label`} className="my-4">
              <h2 id={`${priceId}-label`} className="sr-only">
                Price
              </h2>

              <div id={priceId} className="flex items-center gap-3">
                {hasDiscount ? (
                  <>
                    <p className="font-bold text-[32px]">
                      <ins className="no-underline">
                        {formatPrice(discounted, currencyCode)}
                      </ins>
                    </p>
                    <p className="font-bold text-[32px] text-neutral-400">
                      <del>{formatPrice(product.price, currencyCode)}</del>
                    </p>
                    <span
                      className="rounded-full bg-red-100 px-3 py-1 text-red-600 font-medium"
                      aria-label={`${Math.round(
                        product.discountPercentage
                      )} percent off`}
                    >
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  </>
                ) : (
                  <p className="font-bold text-[32px]">
                    <ins className="no-underline">
                      {formatPrice(product.price, currencyCode)}
                    </ins>
                  </p>
                )}
              </div>

              <div
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content={currencyCode} />
                <meta
                  itemProp="price"
                  content={String(hasDiscount ? discounted : product.price)}
                />
                <link itemProp="availability" href={availabilityHref} />
                <meta
                  itemProp="itemCondition"
                  content="https://schema.org/NewCondition"
                />
              </div>
            </section>

            <p
              id={descId}
              itemProp="description"
              className="text-xl text-black/60"
            >
              {product.description}
            </p>

            {error && (
              <div
                role="alert"
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700"
              >
                {error.message}
              </div>
            )}

            <form
              className="mt-6 flex items-center gap-6"
              aria-describedby={`${titleId} ${priceId}`}
              onSubmit={handleAddToCart}
            >
              <QuantitySelector
                maxQuantity={product.stock || 99}
                initialQuantity={selectedQuantity}
                onQuantityChange={handleQuantityChange}
              />
              <Button
                type="submit"
                disabled={
                  isAdding ||
                  isLoading ||
                  (product.stock !== undefined && product.stock <= 0)
                }
                className={clsx(
                  "transition-all duration-200",
                  showFeedback && "bg-green-600 hover:bg-green-700",
                  error && "bg-red-600 hover:bg-red-700"
                )}
                isLoading={isAdding || isLoading}
              >
                {showFeedback
                  ? "Added to cart!"
                  : error
                  ? "Try again"
                  : "Add to cart"}
              </Button>
            </form>
          </section>
        </article>
      </main>
      <section className="mt-16">
        <ProductTabs product={product} />
        <Suspense fallback={<ProductGridLoader count={4} />}>
          <ProductReccomendations category={product.category} />
        </Suspense>
      </section>
    </div>
  );
}
