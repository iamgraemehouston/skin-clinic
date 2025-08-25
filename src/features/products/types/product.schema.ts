import slugify from "slugify";
import { z } from "zod";

export const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

export const MetaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string(),
});

export const ProductItemSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    stock: z.number(),
    tags: z.array(z.string()),
    brand: z.string().optional(),
    sku: z.string(),
    weight: z.number(),
    dimensions: DimensionsSchema,
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    availabilityStatus: z.string(),
    reviews: z.array(ReviewSchema),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number(),
    meta: MetaSchema,
    images: z.array(z.string()),
    thumbnail: z.string(),
  })
  .transform((product) => {
    const slug = `${product.id}-${slugify(product.title, {
      lower: true,
      strict: true,
    })}`;
    return { ...product, slug };
  });

export const ProductsResponseSchema = z.object({
  products: z.array(ProductItemSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
