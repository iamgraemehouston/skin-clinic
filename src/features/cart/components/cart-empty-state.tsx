"use client";

import { ShoppingBag } from "lucide-react";
import React from "react";
import type { CartEmptyStateProps } from "../types/cart-drawer.types";
import Button from "@/components/ui/buttons/button";

export default function CartEmptyState({ onClose }: CartEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag size={32} className="text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-sm text-black/50 mb-8 max-w-sm">
        Looks like you haven&apos;t added any items to your cart yet. Start
        shopping to fill it up!
      </p>

      <Button onClick={onClose} aria-label="Continue shopping">
        Continue Shopping
      </Button>
    </div>
  );
}
