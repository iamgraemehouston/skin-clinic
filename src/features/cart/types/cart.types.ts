import { z } from "zod";
import {
  CartResponseSchema,
  CartItemSchema,
  CartProductItemSchema,
  SingleCartSchema,
} from "./cart.schema";

export type CartResponse = z.infer<typeof CartResponseSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type CartProductItem = z.infer<typeof CartProductItemSchema>;
export type SingleCart = z.infer<typeof SingleCartSchema>;
