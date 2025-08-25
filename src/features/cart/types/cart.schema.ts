import { z } from "zod";

export const CartProductItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  discountPercentage: z.number(),
  discountedTotal: z.number(),
  thumbnail: z.string(),
});

export const CartItemSchema = z.object({
  id: z.number(),
  products: z.array(CartProductItemSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});

export const CartResponseSchema = z.object({
  carts: z.array(CartItemSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const SingleCartSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  products: z.array(CartProductItemSchema),
  total: z.number().optional(),
  discountedTotal: z.number().optional(),
  totalProducts: z.number().optional(),
  totalQuantity: z.number().optional(),
});
