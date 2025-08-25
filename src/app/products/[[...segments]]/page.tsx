import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import { ProductDetail } from "@/features/products/components/product-detail";
import ProductGrid from "@/features/products/components/product-grid";
import {
  ProductRouteKind,
  resolveProductRoute,
} from "@/features/products/routing/products";
import { Suspense } from "react";
import ProductGridLoader from "@/components/ui/loaders/product-grid-loader";
import ProductDetailLoader from "@/components/ui/loaders/product-detail-loader";

type Params = {
  params: Promise<{ segments?: string[] }>;
};

function CategoryLayout({
  children,
  categoryName,
}: {
  children: React.ReactNode;
  categoryName?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-3/12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Product Filters</h2>

        <p className="text-sm text-black/50">Not implemented yet</p>
      </aside>
      <main className="w-full md:w-9/12">
        <div className="flex items-center justify-between mb-6">
          {categoryName && (
            <h1 className="text-[32px] font-bold">{categoryName}</h1>
          )}

          <p className="text-sm text-black/50">Showing 1-10 of 100 Products</p>
        </div>
        {children}
      </main>
    </div>
  );
}

function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default async function ProductCategoryPage({ params }: Params) {
  const { segments } = await params;
  const route = resolveProductRoute(segments ?? []);

  if (!route) return notFound();

  const isCategoryView =
    route.kind === ProductRouteKind.All ||
    route.kind === ProductRouteKind.Category;

  let content;

  switch (route.kind) {
    case ProductRouteKind.All: {
      content = (
        <Suspense fallback={<ProductGridLoader />}>
          <ProductGrid />
        </Suspense>
      );
      break;
    }

    case ProductRouteKind.Category: {
      content = (
        <Suspense fallback={<ProductGridLoader />}>
          <ProductGrid category={route.categorySlug} />
        </Suspense>
      );
      break;
    }

    case ProductRouteKind.Product: {
      const product = await fetchProduct(route.id);
      if (!product) return notFound();
      content = (
        <Suspense fallback={<ProductDetailLoader />}>
          <ProductDetail id={product.id} />
        </Suspense>
      );

      break;
    }

    case ProductRouteKind.ProductInCategory: {
      const product = await fetchProduct(route.id);
      if (!product) return notFound();
      content = (
        <Suspense fallback={<ProductDetailLoader />}>
          <ProductDetail id={product.id} category={route.categorySlug} />
        </Suspense>
      );
      break;
    }
  }

  if (isCategoryView) {
    const categoryName =
      route.kind === ProductRouteKind.Category
        ? route.categorySlug.charAt(0).toUpperCase() +
          route.categorySlug.slice(1).replace(/-/g, " ")
        : "All Products";
    return (
      <CategoryLayout categoryName={categoryName}>{content}</CategoryLayout>
    );
  } else {
    return <ProductDetailLayout>{content}</ProductDetailLayout>;
  }
}
