"use client";

import { useId, useMemo, useRef, useState, KeyboardEvent, JSX } from "react";
import ProductDetails from "./product-details";
import ProductFAQs from "./product-faqs";
import ProductReviews from "./product-reviews";
import type { ProductItem } from "../types/product.types";

export enum TabId {
  Details = "details",
  Reviews = "reviews",
  Faqs = "faqs",
}

type TabDef = {
  id: TabId;
  label: string;
  render: () => JSX.Element;
};

export default function ProductTabs({
  product,
}: {
  product: ProductItem;
}): JSX.Element {
  const baseId = useId();
  const [active, setActive] = useState<TabId>(TabId.Reviews);

  const tabs: TabDef[] = useMemo(
    () => [
      {
        id: TabId.Details,
        label: "Product Details",
        render: () => <ProductDetails />,
      },
      {
        id: TabId.Reviews,
        label: "Rating & Reviews",
        render: () => <ProductReviews reviews={product.reviews} />,
      },
      { id: TabId.Faqs, label: "FAQs", render: () => <ProductFAQs /> },
    ],
    [product.reviews]
  );

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const indexOf = (id: TabId): number => tabs.findIndex((t) => t.id === id);
  const focusBtn = (i: number): void => btnRefs.current[i]?.focus();

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>): void => {
    const cur = indexOf(active);
    if (cur < 0) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (cur + 1) % tabs.length;
      setActive(tabs[next].id);
      focusBtn(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (cur - 1 + tabs.length) % tabs.length;
      setActive(tabs[prev].id);
      focusBtn(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(tabs[0].id);
      focusBtn(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = tabs.length - 1;
      setActive(tabs[last].id);
      focusBtn(last);
    }
  };

  return (
    <>
      <nav aria-label="Product sections" className="border-b">
        <ul
          role="tablist"
          className="flex gap-8 justify-between text-sm"
          onKeyDown={onKeyDown}
        >
          {tabs.map((t, i) => {
            const tabId = `${baseId}-tab-${t.id}`;
            const panelId = `${baseId}-panel-${t.id}`;
            const selected = active === t.id;

            return (
              <li key={t.id} role="presentation" className="w-1/3">
                <button
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  id={tabId}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={`py-4 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 w-full ${
                    selected
                      ? "border-b-2 border-black"
                      : "border-b-2 border-transparent"
                  }`}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8">
        {tabs.map((t) => {
          const panelId = `${baseId}-panel-${t.id}`;
          const tabId = `${baseId}-tab-${t.id}`;
          const selected = active === t.id;
          return (
            <section
              key={t.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              className={selected ? "block" : "hidden"}
            >
              {selected ? t.render() : null}
            </section>
          );
        })}
      </div>
    </>
  );
}
