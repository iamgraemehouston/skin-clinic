"use client";

import { fetchProducts } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductItem } from "../types/product.types";
import { ProductCard } from "./product-card";

export default function ProductGrid({ category }: { category?: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts({ category }),
  });

  return (
    <ul
      role="list"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.products.map((product: ProductItem) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
