"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export default function PromoBanner() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <aside
      className="bg-black h-[38px] text-white flex items-center"
      aria-label="Promotional banner"
    >
      <div className="mx-auto w-[1240px] flex items-center">
        <p className="flex-1 flex-shrink-0 text-center text-sm">
          Sign up and get 20% off your first order.&nbsp;
          <Link href="#" className="font-bold underline">
            Sign Up Now
          </Link>
        </p>
        <button
          type="button"
          className="flex-shrink-0 ml-2"
          aria-label="Dismiss promotion"
          onClick={() => setShow(false)}
        >
          <X />
        </button>
      </div>
    </aside>
  );
}
