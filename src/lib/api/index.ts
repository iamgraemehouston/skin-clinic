import { Product, ProductItem } from "@/features/products/types/product.types";
import {
  ProductItemSchema,
  ProductsResponseSchema,
} from "@/features/products/types/product.schema";
import apisauce from "apisauce";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const API_BASE_URL = "https://dummyjson.com";

const api = apisauce.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function fetchProduct(id: number): Promise<ProductItem> {
  const res = await api.get(`/products/${id}`);
  if (!res.ok) throw new Error(res.problem || "Failed to fetch product");

  const validatedData = ProductItemSchema.parse(res.data);
  return validatedData;
}

export async function fetchProducts(options?: {
  category?: string;
  limit?: number;
}): Promise<Product> {
  let path = "/products";

  if (options?.category) {
    path += `/category/${options.category}`;
  }

  if (options?.limit) {
    path += `?limit=${options.limit}`;
  }

  const res = await api.get(path);
  if (!res.ok) throw new Error(res.problem || "Failed to fetch products");

  const validatedData = ProductsResponseSchema.parse(res.data);
  return validatedData;
}
