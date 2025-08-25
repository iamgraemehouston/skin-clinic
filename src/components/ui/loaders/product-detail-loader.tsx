import { JSX } from "react";

export default function ProductDetailLoader(): JSX.Element {
  return (
    <main className="flex flex-col md:flex-row gap-6 animate-pulse">
      <ProductGalleryLoader />

      <div className="w-full md:w-6/12">
        <div className="h-12 bg-neutral-200 rounded w-3/4 mb-4"></div>

        <div className="h-5 bg-neutral-200 rounded w-1/4 mb-4"></div>

        <div className="h-10 bg-neutral-200 rounded w-1/3 mb-6"></div>

        <div className="space-y-3 mb-8">
          <div className="h-5 bg-neutral-200 rounded w-full"></div>
          <div className="h-5 bg-neutral-200 rounded w-11/12"></div>
          <div className="h-5 bg-neutral-200 rounded w-4/5"></div>
        </div>

        <div className="h-12 bg-neutral-200 rounded w-1/3"></div>
      </div>
    </main>
  );
}

function ProductGalleryLoader(): JSX.Element {
  return (
    <div className="w-full md:w-6/12 flex flex-col md:flex-row gap-2">
      <div className="flex md:flex-col gap-3 md:w-1/5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`thumb-${i}`}
            className="relative aspect-square w-full rounded-md bg-neutral-200"
          />
        ))}
      </div>

      <div className="relative flex-1 aspect-square md:aspect-auto border border-black/10 rounded-xl bg-neutral-200"></div>
    </div>
  );
}
