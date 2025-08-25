import { parseProductSlug } from "@/features/products/utils/transforms";

export enum ProductRouteKind {
  All = "all",
  Category = "category",
  Product = "product",
  ProductInCategory = "product-in-category",
}

export type ProductRoute =
  | { kind: ProductRouteKind.All }
  | { kind: ProductRouteKind.Category; categorySlug: string }
  | { kind: ProductRouteKind.Product; id: number; productSlug: string }
  | {
      kind: ProductRouteKind.ProductInCategory;
      id: number;
      categorySlug: string;
      productSlug: string;
    };

export function resolveProductRoute(segments: string[]): ProductRoute | null {
  switch (segments.length) {
    case 0:
      return { kind: ProductRouteKind.All };
    case 1: {
      const [segment] = segments;
      const parsed = parseProductSlug(segment);
      return parsed
        ? {
            kind: ProductRouteKind.Product,
            id: parsed.id,
            productSlug: segment,
          }
        : { kind: ProductRouteKind.Category, categorySlug: segment };
    }
    case 2: {
      const [categorySlug, productSlug] = segments;
      const parsed = parseProductSlug(productSlug);
      if (!parsed) return null;
      return {
        kind: ProductRouteKind.ProductInCategory,
        id: parsed.id,
        categorySlug,
        productSlug,
      };
    }
    default:
      return null;
  }
}
