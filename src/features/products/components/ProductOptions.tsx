"use client";

import { Select } from "@/components/ui/Select";
import type { Product } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  if (product.options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {product.options.map((option) => (
        <label key={option.id} className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#605a54]">
            {option.name}
          </span>
          <Select
            value={selectedOptions[option.id] ?? option.values[0]}
            onChange={(event) => onChange(option.id, event.target.value)}
            className="rounded-none border-[#d9d0c5] bg-transparent px-4 py-3 text-[13px]"
          >
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </label>
      ))}
    </div>
  );
}
