"use client";

import React, { useEffect, useCallback } from "react";
import { useCart } from "../hooks/use-cart";
import CartSummary from "./cart-summary";
import CartEmptyState from "./cart-empty-state";
import CartItem from "./cart-item";
import { X } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    totalItems,
    subtotal,
    discountedSubtotal,
    isEmpty,
    closeDrawer,
  } = useCart();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeDrawer();
      }
    },
    [isOpen, closeDrawer]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeDrawer();
      }
    },
    [closeDrawer]
  );

  const handleCloseClick = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 ease-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-96 md:w-[400px]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-describedby="cart-drawer-description"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            id="cart-drawer-title"
            className="text-lg font-integral font-bold text-[20px] text-black"
          >
            Shopping Cart
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-satoshi-medium text-black/60">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={handleCloseClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close cart drawer"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-start">
            <div id="cart-drawer-description" className="sr-only">
              {isEmpty
                ? "Your cart is empty"
                : `Your cart contains ${totalItems} ${
                    totalItems === 1 ? "item" : "items"
                  }`}
            </div>

            {isEmpty ? (
              <CartEmptyState onClose={closeDrawer} />
            ) : (
              <>
                <div className="space-y-4 w-full">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="sticky top-0 w-full mt-8 border-t border-gray-200 pt-4 bg-white">
                  <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    discountedSubtotal={discountedSubtotal}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
