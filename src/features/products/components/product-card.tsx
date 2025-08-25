import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { JSX, useState } from "react";
import { ProductItem } from "../types/product.types";
import { Rating } from "@/components/ui/meter/rating";
import { formatPrice, toProductPath } from "../utils/transforms";
import Button from "@/components/ui/buttons/button";
import { useCart } from "@/features/cart/hooks/use-cart";

type ProductCardProps = {
  product: ProductItem;
  currency?: string;
};

export function ProductCard({
  product,
  currency = "GBP",
}: ProductCardProps): JSX.Element {
  const {
    title,
    price,
    thumbnail,
    rating,
    reviews,
    id,
    category,
    discountPercentage,
  } = product;
  const imageUrl = thumbnail || null;
  const ratingCount = reviews.length;
  const href = toProductPath({ id, title, category });

  const { addItem, isLoading, error, clearError } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    clearError();
    const success = await addItem(product, 1);

    if (success) {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  return (
    <article className="font-satoshi">
      <Link href={href} className="block focus:outline-none">
        {imageUrl ? (
          <div className="rounded-[20px] overflow-hidden bg-[#F0EEED]">
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <Image
            src="/assets/no-image-placeholder.png"
            alt="No image available"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        )}
        <div className="p-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <Rating value={rating} count={ratingCount} size="small" />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl">
              {discountPercentage > 0 ? (
                <>
                  <span className="font-semibold">
                    {formatPrice(
                      price * (1 - discountPercentage / 100),
                      currency
                    )}
                  </span>
                  <span className="text-neutral-400 line-through">
                    {formatPrice(price, currency)}
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                    -{Math.round(discountPercentage)}%
                  </span>
                </>
              ) : (
                <span className="font-semibold">
                  {formatPrice(price, currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          isLoading={isLoading}
          className={clsx(
            "transition-all duration-200",
            showFeedback && "bg-green-600 hover:bg-green-700",
            error && "bg-red-600 hover:bg-red-700"
          )}
        >
          {showFeedback
            ? "Added to cart!"
            : error
            ? "Try again"
            : "Add to cart"}
        </Button>
        {error && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {error.message}
          </p>
        )}
      </div>
    </article>
  );
}
