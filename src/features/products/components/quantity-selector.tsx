"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useId, useState, KeyboardEvent, JSX } from "react";

export type QuantitySelectorProps = {
  maxQuantity: number;
  minQuantity?: number;
  step?: number;
  initialQuantity?: number;
  id?: string;
  name?: string;
  onQuantityChange?: (quantity: number) => void;
};

export function QuantitySelector({
  maxQuantity,
  minQuantity = 1,
  step = 1,
  initialQuantity = 1,
  id,
  name = "quantity",
  onQuantityChange,
}: QuantitySelectorProps): JSX.Element {
  const clamp = (n: number): number =>
    Math.max(minQuantity, Math.min(maxQuantity, n));
  const [qty, setQty] = useState<number>(() => clamp(initialQuantity));
  const generatedId = useId();
  const inputId: string = id ?? generatedId;

  useEffect(() => {
    onQuantityChange?.(qty);
  }, [qty, onQuantityChange]);

  const inc = (): void => setQty((q) => clamp(q + step));
  const dec = (): void => setQty((q) => clamp(q - step));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      inc();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      dec();
    } else if (e.key === "Home") {
      e.preventDefault();
      setQty(minQuantity);
    } else if (e.key === "End") {
      e.preventDefault();
      setQty(maxQuantity);
    }
  };

  return (
    <div
      role="group"
      aria-label="Quantity selector"
      className="max-w-[170px] w-full rounded-full bg-gray-200 px-3 py-2 flex items-center gap-2"
    >
      <button
        type="button"
        data-testid="quantity-selector-decrease-button"
        onClick={dec}
        disabled={qty <= minQuantity}
        className="rounded-full p-2 text-black/60 disabled:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Decrease quantity"
        aria-controls={inputId}
      >
        <Minus aria-hidden="true" />
      </button>

      <label htmlFor={inputId} className="sr-only">
        Quantity
      </label>
      <input
        id={inputId}
        name={name}
        type="number"
        inputMode="numeric"
        data-testid="quantity-selector-input"
        min={minQuantity}
        max={maxQuantity}
        step={step}
        value={qty}
        onChange={(e) => setQty(clamp(Number(e.target.value) || minQuantity))}
        onKeyDown={onKeyDown}
        className="w-full text-center bg-transparent outline-none"
      />

      <button
        type="button"
        data-testid="quantity-selector-increase-button"
        onClick={inc}
        disabled={qty >= maxQuantity}
        className="rounded-full p-2 text-black/60 disabled:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Increase quantity"
        aria-controls={inputId}
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
