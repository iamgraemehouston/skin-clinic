"use client";

import { useMemo, useState, useEffect, JSX } from "react";
import Image from "next/image";
import clsx from "clsx";

type ProductGalleryProps = {
  images: string[];
  thumbnail: string;
  title: string;
};

export default function ProductGallery({
  images,
  thumbnail,
  title,
}: ProductGalleryProps): JSX.Element {
  const thumbnails: string[] = useMemo(() => {
    const uniq = Array.from(new Set(images.filter(Boolean)));
    const withoutHero = uniq.filter((src) => src !== thumbnail);
    return withoutHero.slice(0, 3);
  }, [images, thumbnail]);

  const [currentSrc, setCurrentSrc] = useState(thumbnail);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setCurrentSrc(thumbnail);
  }, [thumbnail]);

  const startFadeTo = (nextSrc: string): void => {
    if (nextSrc === currentSrc) return;
    setIsFading(true);
    window.setTimeout(() => {
      setCurrentSrc(nextSrc);
      requestAnimationFrame(() => setIsFading(false));
    }, 120);
  };

  return (
    <div className="w-full md:w-6/12 flex flex-col md:flex-row gap-2">
      <div className="flex md:flex-col gap-3 md:w-1/5">
        {thumbnails.map((src, index) => (
          <button
            key={`thumbnail-${index}`}
            className={clsx(
              "relative aspect-square w-full overflow-hidden rounded-md border cursor-pointer",
              src === currentSrc ? "border-black" : "border-black/10"
            )}
            onClick={() => startFadeTo(src)}
          >
            <Image
              src={src}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              sizes="(min-width: 768px) 20vw, 25vw"
              className="object-cover"
            />
          </button>
        ))}
        <button
          className={clsx(
            "relative aspect-square w-full overflow-hidden rounded-md border",
            thumbnail === currentSrc ? "border-black" : "border-black/10"
          )}
          onClick={() => startFadeTo(thumbnail)}
        >
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            fill
            sizes="(min-width: 768px) 20vw, 25vw"
            className="object-cover"
          />
        </button>
      </div>
      <div className="relative flex-1 aspect-square md:aspect-auto border border-black/10 rounded-xl">
        <Image
          src={currentSrc}
          alt={title}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className={clsx(
            "object-cover transition-opacity duration-150",
            isFading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
    </div>
  );
}
