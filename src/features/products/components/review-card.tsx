import { format } from "date-fns";
import { Check } from "lucide-react";
import { Rating } from "@/components/ui/meter/rating";
import type { Review } from "../types/product.types";
import { JSX } from "react";
import { Ellipsis } from "lucide-react";

type ReviewCardProps = {
  review: Review;
  verified?: boolean;
};

export default function ReviewCard({
  review,
  verified = true, // Default to true as product obj from dummy.json doesnt have this.
}: ReviewCardProps): JSX.Element {
  const dateISO = review.date;
  const humanDate = format(new Date(dateISO), "MMMM d, yyyy");

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      aria-labelledby={`review-${review.reviewerEmail}-heading`}
      className="rounded-xl border border-black/20 p-8 text-black/60 relative"
    >
      <header className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <Rating value={review.rating} count={5} showCount={false} />
          <button
            aria-label="Review options"
            className="rounded-full p-2 text-black/60 disabled:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <Ellipsis aria-hidden="true" />
          </button>
        </div>

        <h3
          id={`review-${review.reviewerEmail}-heading`}
          className="text-xl font-bold text-black flex items-center gap-2 my-2"
        >
          <span itemProp="author">{review.reviewerName}</span>
          {verified ? (
            <span
              className="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full bg-green-600 text-white"
              role="img"
              aria-label="Verified purchase"
              title="Verified purchase"
            >
              <Check strokeWidth={2.5} size={12} aria-hidden="true" />
            </span>
          ) : null}
        </h3>
      </header>

      {review.comment ? (
        <p itemProp="reviewBody" className="text-neutral-700">
          {review.comment}
        </p>
      ) : null}

      <footer className="mt-4 text-sm text-neutral-500">
        <time itemProp="datePublished" dateTime={dateISO}>
          Posted on {humanDate}
        </time>
      </footer>
    </article>
  );
}
