import type { Product } from "@/features/products/types/product.types";

type ProductScentAnatomyProps = {
  product: Product;
};

export function ProductScentAnatomy({ product }: ProductScentAnatomyProps) {
  const notes = product.scentAnatomy ?? {
    top: product.notes,
    heart: product.description,
    base: product.scentFamily,
  };

  return (
    <section className="mt-6 border-t border-[#e8e1d7] pt-6">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[25px] text-[#1a1a1a]">
        Scent Anatomy
      </h2>
      <p className="mt-3 text-[11px] leading-5 text-[#605a54]">
        {product.description}
      </p>
      <dl className="mt-4">
        {[
          ["Top notes", notes.top],
          ["Heart notes", notes.heart],
          ["Base notes", notes.base],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-6 border-b border-[#e8e1d7] py-3 text-[10px]"
          >
            <dt className="font-semibold uppercase text-[#1a1a1a]">{label}</dt>
            <dd className="text-right text-[#8c8379]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
