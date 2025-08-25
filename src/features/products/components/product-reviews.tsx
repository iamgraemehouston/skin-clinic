import { Rating } from "@/components/ui/meter/rating";
import { Review } from "../types/product.types";
import { SlidersHorizontal } from "lucide-react";
import ReviewCard from "./review-card";

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section aria-labelledby="reviews-heading" className="mt-8">
      <div className="flex items-center justify-between">
        <h2 id="reviews-heading" className="text-xl text-[24px] font-bold">
          All Reviews{" "}
          <span className="text-black/60 text-base">({reviews.length})</span>
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full h-[48px] flex items-center justify-center bg-[#F0F0F0] aspect-square"
            aria-label="Filter reviews"
          >
            <SlidersHorizontal strokeWidth={2.5} className="rotate-90" />
          </button>
          <label className="sr-only" htmlFor="sort-reviews">
            Sort reviews
          </label>
          <select
            id="sort-reviews"
            className="rounded-full px-5 py-2 h-[48px] bg-[#F0F0F0] font-medium"
          >
            <option>Latest</option>
            <option>Highest rated</option>
            <option>Lowest rated</option>
          </select>
          <button
            type="button"
            className="rounded-full px-10 py-2 h-[48px] bg-black text-white font-medium"
          >
            Write a Review
          </button>
        </div>
      </div>

      <ul role="list" className="mt-6 grid gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <li key={index}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button type="button" className="rounded-full border px-5 py-2 text-sm">
          Load More Reviews
        </button>
      </div>
    </section>
  );
}
