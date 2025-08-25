import { JSX } from "react";
import clsx from "clsx";

export default function ProductGridLoader({
  count = 6,
}: {
  count?: number;
}): JSX.Element {
  const skeletonItems = Array.from({ length: count }, (_, i) => i);

  const gridClass = clsx("grid gap-6 mt-10", {
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": count === 6,
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": count === 4,
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-2": count === 2,
    "grid-cols-1 md:grid-cols-3 lg:grid-cols-3": count === 3,
    "grid-cols-1 md:grid-cols-4 lg:grid-cols-5": count === 5,
    "grid-cols-1 md:grid-cols-1 lg:grid-cols-1": count === 1,
  });

  return (
    <ul role="list" className={gridClass}>
      {skeletonItems.map((index) => (
        <li key={index}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

function ProductCardSkeleton(): JSX.Element {
  return (
    <article className="font-satoshi animate-pulse">
      <div className="rounded-[20px] overflow-hidden bg-[#F0EEED]  h-[292px] aspect-square" />

      <div className="p-3">
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2" />

        <div className="h-4 bg-neutral-200 rounded w-1/3" />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 bg-neutral-200 rounded w-20" />

            <div className="h-5 bg-neutral-200 rounded w-16" />

            <div className="h-5 bg-neutral-200 rounded-full w-12" />
          </div>
        </div>
      </div>

      <div className="p-3 pt-0">
        <div className="h-10 bg-neutral-200 rounded w-full" />
      </div>
    </article>
  );
}
