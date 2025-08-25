import { fetchProducts } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductItem } from "../types/product.types";
import { ProductCard } from "./product-card";

export function ProductReccomendations({ category }: { category?: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["recommendations", category],
    queryFn: async () => {
      const response = await fetchProducts({ category, limit: 4 });
      return response.products || [];
    },
  });

  const recommendations = data || [];

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recommendations-heading" className="mt-16">
      <h3
        id="recommendations-heading"
        className="mb-[55px] text-[40px] font-extrabold font-integral text-center"
      >
        You might also like
      </h3>
      <ul role="list" className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {recommendations.map((product: ProductItem) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </section>
  );
}
