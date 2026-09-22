import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  price?: number;
};

/** US-04: product information. */
export function ProductDetails({
  product,
  price = product.price,
}: ProductDetailsProps) {
  return (
    <div className="max-w-xl">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[#f0ede8] px-2 py-1 text-[8px] uppercase text-[#605a54]">
          Scent family: {product.scentFamily}
        </span>
        <span className="rounded-full bg-[#f0ede8] px-2 py-1 text-[8px] uppercase text-[#605a54]">
          Occasion: {product.occasion}
        </span>
      </div>
      <h1 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-[42px] leading-[0.95] text-[#1a1a1a] sm:text-[52px]">
        {product.name}
      </h1>
      <p className="mt-4 text-[18px] font-semibold text-[#1a1a1a]">
        {formatPrice(price)}
      </p>
      <p className="mt-5 text-[10px] text-[#0ca678]">
        <span className="mr-1 inline-block size-1.5 rounded-full bg-[#0ca678]" />
        {product.availability ?? "Available in Atelier"}
      </p>
    </div>
  );
}
