import z from "zod";
import {
  DimensionsSchema,
  MetaSchema,
  ProductItemSchema,
  ProductsResponseSchema,
  ReviewSchema,
} from "./product.schema";

export type Product = z.infer<typeof ProductsResponseSchema>;
export type ProductItem = z.infer<typeof ProductItemSchema>;
export type Dimensions = z.infer<typeof DimensionsSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Meta = z.infer<typeof MetaSchema>;
