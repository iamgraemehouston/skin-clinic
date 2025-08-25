"use client";

import SearchForm from "@/components/ui/forms/search-form";
import { CircleUserRound, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PromoBanner from "../promo-banner";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCart } from "@/features/cart/hooks/use-cart";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems, openDrawer } = useCart();
  return (
    <header className="flex flex-col bg-white">
      <PromoBanner />
      <div
        className={clsx(
          "mx-auto w-[1240px] mt-6 flex items-center justify-between pb-6",
          { "border-b border-black/10": !isHome }
        )}
      >
        <Link href="/" className="flex-shrink-0" aria-label="Go to home page">
          <Image
            src="/assets/logo.svg"
            alt="Skin Clinic"
            width={198}
            height={25}
          />
        </Link>

        <nav aria-label="Main">
          <ul className="flex gap-6">
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                On Sale
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Brands
              </Link>
            </li>
          </ul>
        </nav>

        <SearchForm />

        <div className="flex gap-6">
          <button
            type="button"
            aria-label={`View cart${
              totalItems > 0 ? ` (${totalItems} items)` : ""
            }`}
            onClick={openDrawer}
            className="relative"
          >
            <ShoppingCart aria-hidden="true" />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]"
                aria-label={`${totalItems} items in cart`}
              >
                {totalItems}
              </span>
            )}
          </button>
          <button type="button" aria-label="User account">
            <CircleUserRound aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
