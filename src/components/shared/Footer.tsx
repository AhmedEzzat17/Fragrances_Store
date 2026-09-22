import Link from "next/link";
import { productPaths } from "@/features/products";

const navigation = [
  {
    title: "Collections",
    links: [
      "Le Maison",
      "Private Reserve",
      "Scented Candles",
      "Discovery Sets",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "Olfactory Consultation",
      "Shipping & Returns",
      "Atelier Appointments",
      "Care Guide",
    ],
  },
  {
    title: "About Us",
    links: [
      "Our Philosophy",
      "Sourcing Standards",
      "Sustainability Commitments",
      "Journal",
    ],
  },
];

function SocialIcon({ label }: { label: string }) {
  const icon =
    label === "Instagram" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
      >
        <rect x="3" y="3" width="10" height="10" rx="3" stroke="currentColor" />
        <circle cx="8" cy="8" r="2.25" stroke="currentColor" />
        <circle cx="11.25" cy="4.75" r="0.6" fill="currentColor" />
      </svg>
    ) : label === "Facebook" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="currentColor"
      >
        <path d="M9.1 13V8.7h1.45l.22-1.68H9.1V5.95c0-.49.14-.82.85-.82h.91V3.63a12 12 0 0 0-1.33-.07c-1.31 0-2.2.8-2.2 2.27v1.19H5.85V8.7h1.48V13H9.1Z" />
      </svg>
    ) : label === "WhatsApp" ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
      >
        <path
          d="M3.4 12.9 4.1 10.4A4.9 4.9 0 1 1 6 12.15l-2.6.75Z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 6.4c.12-.22.25-.23.43-.23h.24c.1 0 .2.03.26.18l.34.83c.05.12.03.22-.05.32l-.3.36c.35.7.9 1.2 1.6 1.5l.34-.3c.1-.08.2-.1.32-.04l.8.38c.15.07.17.17.16.29-.06.52-.4.78-.8.9-.4.12-1.3-.2-2.08-.75-.78-.55-1.45-1.43-1.58-2.02-.13-.59.08-1.2.32-1.42Z"
          fill="currentColor"
        />
      </svg>
    ) : null;

  return (
    <a
      href="#"
      aria-label={label}
      className="flex size-5 items-center justify-center rounded-full border border-[#5d5a56] text-[8px] text-[#b8b0a7] hover:border-[#f8f4ee] hover:text-[#f8f4ee]"
    >
      {icon}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#181818] px-4 py-12 font-manrope text-[#f8f4ee] sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_2fr]">
        <div>
          <Link
            href={productPaths.list}
            className="font-[family-name:var(--font-instrument-serif)] text-[28px] tracking-[0.16em]"
          >
            ODORATUS
          </Link>
          <p className="mt-5 max-w-[290px] text-[10px] leading-4 text-[#b8b0a7]">
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <div className="mt-6 flex gap-2">
            <SocialIcon label="Instagram" />
            <SocialIcon label="Facebook" />
            <SocialIcon label="WhatsApp" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {navigation.map((group) => (
            <div key={group.title}>
              <h3 className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#c5a880]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={productPaths.list}
                      className="text-[10px] text-[#b8b0a7] transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1440px] border-t border-[#343434] pt-4 text-[8px] text-[#77736e]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>© 2026 Odoratus. All rights reserved.</span>
          <span className="text-[#b8b0a7]">Made by Ahmed Ezzat</span>
          <span className="flex items-center gap-2 uppercase tracking-[0.08em]">
            Secured checkout with
            <span className="rounded border border-[#4a4845] px-1.5 py-0.5 text-[6px]">
              VISA
            </span>
            <span className="rounded border border-[#4a4845] px-1.5 py-0.5 text-[6px]">
              MASTERCARD
            </span>
            <span className="rounded border border-[#4a4845] px-1.5 py-0.5 text-[6px]">
              AMEX
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
