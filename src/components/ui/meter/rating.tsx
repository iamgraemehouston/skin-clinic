import { JSX } from "react";
import Image from "next/image";
import { max } from "date-fns";

type RatingProps = {
  value?: number;
  count?: number;
  size?: "small" | "large";
  showCount?: boolean;
  max?: number;
};

export function Rating({
  value,
  count,
  size = "large",
  showCount = true,
  max = 5,
}: RatingProps): JSX.Element {
  if (value == null || count == null) {
    return <span className="text-xs text-neutral-500">No ratings</span>;
  }

  const STAR_SIZE = size === "small" ? 18 : 24;

  const clamped = Math.max(0, Math.min(5, value));
  const ratingLabel = Number(clamped.toFixed(1));
  const fillPercentage = (Number(ratingLabel) / 5) * 100;

  return (
    <div className="flex items-center my-3">
      <meter
        className="sr-only"
        min={0}
        max={5}
        value={ratingLabel}
        aria-label={`${ratingLabel} out of 5${
          count ? ` from ${count} reviews` : ""
        }`}
      />

      <span
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
        className="sr-only"
      >
        <meta itemProp="ratingValue" content={String(ratingLabel)} />
        <meta itemProp="bestRating" content={String(max)} />
      </span>

      <div className="relative flex items-center" aria-hidden="true">
        <div className="flex gap-[3px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={`empty-${i}`}
              src="/assets/star.svg"
              alt="Empty star"
              width={STAR_SIZE}
              height={STAR_SIZE}
              className="opacity-20"
            />
          ))}
        </div>

        <div
          className="absolute top-0 left-0 flex gap-[3px] overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={`filled-${i}`}
              src="/assets/star.svg"
              alt="Filled star"
              width={STAR_SIZE}
              height={STAR_SIZE}
            />
          ))}
        </div>
      </div>

      {showCount ? (
        <span className="text-neutral-500 ml-2">
          <span className="font-medium text-black">{ratingLabel}</span>
          <span>{`/${max}`}</span>
        </span>
      ) : null}
    </div>
  );
}
