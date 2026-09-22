"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";
import { mockProducts } from "@/features/products/services/products.mock-data";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
    >
      <circle cx="8" cy="5" r="2.25" stroke="currentColor" />
      <path
        d="M3.75 13c.45-2.05 1.9-3.1 4.25-3.1s3.8 1.05 4.25 3.1"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = mockProducts.filter((product) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.notes.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });

    return matches.slice(0, 5);
  }, [query]);

  return (
    <header className="bg-[#faf8f5]">
      <div className="flex h-[15px] items-center justify-center bg-[#1a1918] px-4 text-[7px] uppercase tracking-[0.02em] text-white">
        Complimentary signature gift wrapping on all orders above $150
      </div>
      <div className="relative mx-auto flex h-[58px] w-full items-center justify-between border-b border-[#e8e1d7] px-4 sm:px-6 md:px-10 lg:px-[72px]">
        <nav className="flex items-center gap-5 text-[9px] uppercase text-[#605a54] sm:gap-7">
          <Link href={productPaths.list} className="hover:text-[#1a1a1a]">
            Home
          </Link>
          <Link href={productPaths.list} className="hover:text-[#1a1a1a]">
            Shop
          </Link>
          <Link
            href={productPaths.list}
            className="hidden hover:text-[#1a1a1a] sm:inline"
          >
            Categories
          </Link>
          <Link
            href={productPaths.list}
            className="hidden hover:text-[#1a1a1a] sm:inline"
          >
            The Atelier
          </Link>
        </nav>
        <Link
          href={productPaths.list}
          className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-instrument-serif)] text-[23px] tracking-[0.18em] text-[#1a1a1a]"
        >
          ODORATUS
        </Link>
        <nav className="flex items-center gap-4 text-[10px] text-[#605a54] sm:gap-5">
          <div className="relative hidden sm:block">
            <div className="flex h-7 w-[138px] items-center gap-2 rounded-full border border-[#e8e1d7] bg-[#fffdfb] px-3">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setIsOpen(false), 120);
                }}
                aria-label="Search fragrances"
                placeholder="Search fragrances..."
                className="min-w-0 flex-1 bg-transparent text-[9px] outline-none placeholder:text-[#8c8379]"
              />
            </div>

            {isOpen && suggestions.length > 0 ? (
              <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[220px] overflow-hidden rounded-xl border border-[#e8e1d7] bg-[#fffdfb] shadow-[0_16px_40px_rgba(17,12,8,0.08)]">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                      router.push(productPaths.detail(product.id));
                    }}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[10px] text-[#1a1a1a] transition hover:bg-[#f3efe9]"
                  >
                    <span className="truncate">{product.name}</span>
                    <span className="text-[9px] uppercase tracking-[0.12em] text-[#8c8379]">
                      {product.category.replace("-", " ")}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href={productPaths.list}
            aria-label="Account"
            className="leading-none"
          >
            <AccountIcon />
          </Link>
          <CartNavLink />
        </nav>
      </div>
    </header>
  );
}
