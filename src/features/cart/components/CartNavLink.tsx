"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link
      href={cartPaths.cart}
      aria-label={`Cart${quantity > 0 ? `, ${quantity} items` : ""}`}
      className="relative flex items-center hover:text-[#1a1a1a]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
      >
        <path d="M3 5.5h10l-.55 7.25H3.55L3 5.5Z" stroke="currentColor" />
        <path
          d="M5.5 5.5V4.25a2.5 2.5 0 0 1 5 0V5.5"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
      {quantity > 0 ? (
        <span className="absolute -right-3 -top-2 flex size-3 items-center justify-center rounded-full bg-[#c5a880] text-[7px] text-white">
          {quantity}
        </span>
      ) : null}
    </Link>
  );
}
