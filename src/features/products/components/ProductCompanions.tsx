import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types/product.types";

type ProductCompanionsProps = {
  products: Product[];
};

export function ProductCompanions({ products }: ProductCompanionsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[#e8e1d7] px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#c5a880]">
              Discover more
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-[42px] leading-none text-[#1a1a1a] sm:text-[52px]">
              Olfactory Companions
            </h2>
          </div>
          <span className="hidden text-[11px] uppercase tracking-[0.14em] text-[#8c8379] sm:block">
            Curated for your collection
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}