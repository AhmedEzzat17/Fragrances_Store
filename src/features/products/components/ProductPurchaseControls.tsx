"use client";

import type {
  Product,
  ProductVolume,
} from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductPurchaseControlsProps = {
  product: Product;
  selectedVolume: ProductVolume;
  onVolumeChange: (volume: ProductVolume) => void;
  giftWrap: boolean;
  onGiftWrapChange: (enabled: boolean) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  action: React.ReactNode;
};

const DEFAULT_VOLUMES = [
  { label: "30 ml", offset: -80 },
  { label: "50 ml", offset: -40 },
  { label: "100 ml", offset: 0 },
];

function getVolumes(product: Product): ProductVolume[] {
  return (
    product.volumes ??
    DEFAULT_VOLUMES.map(({ label, offset }) => ({
      label,
      price: Math.max(0, product.price + offset),
    }))
  );
}

export function ProductPurchaseControls({
  product,
  selectedVolume,
  onVolumeChange,
  giftWrap,
  onGiftWrapChange,
  quantity,
  onQuantityChange,
  action,
}: ProductPurchaseControlsProps) {
  const volumes = getVolumes(product);

  return (
    <div className="border-t border-[#e8e1d7] pt-6">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a]">
          Select volume
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {volumes.map((volume) => {
          const selected = volume.label === selectedVolume.label;
          return (
            <button
              style={{ cursor: "pointer" }}
              key={volume.label}
              type="button"
              aria-pressed={selected}
              className={`flex h-[42px] flex-col items-center justify-center border text-[11px] transition-colors ${
                selected
                  ? "border-[#1a1a1a] bg-white text-[#1a1a1a]"
                  : "border-[#e8e1d7] text-[#605a54] hover:border-[#8c8379]"
              }`}
              onClick={() => onVolumeChange(volume)}
            >
              <span>{volume.label}</span>
              <span className="text-[9px] text-[#8c8379]">
                {formatWholePrice(volume.price)}
              </span>
            </button>
          );
        })}
      </div>

      <label className="mt-5 flex items-center justify-between rounded bg-[#f3f0eb] px-3 py-3">
        <span>
          <span className="block text-[10px] font-medium text-[#1a1a1a]">
            Complimentary Signature Gift Wrapping
          </span>
          <span className="mt-1 block text-[9px] text-[#8c8379]">
            Encased in linen paper box with custom wax seal stamp.
          </span>
        </span>
        <input
          type="checkbox"
          checked={giftWrap}
          onChange={(event) => onGiftWrapChange(event.target.checked)}
          style={{ cursor: "pointer" }}
          className="relative h-[17px] w-[30px] shrink-0 appearance-none rounded-full bg-[#c9c0b5] transition-colors checked:bg-[#c5a880] after:absolute after:left-1 after:top-1/2 after:size-[11px] after:-translate-y-1/2 after:rounded-full after:bg-white after:transition-transform checked:after:translate-x-[13px]"
        />
      </label>

      <div className="mt-5 grid grid-cols-[64px_1fr] gap-3">
        <div className="flex h-[35px] items-center justify-between border border-[#e8e1d7] px-3 text-[11px]">
          <button
            type="button"
            style={{ cursor: "pointer" }}
            aria-label="Decrease quantity"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            style={{ cursor: "pointer" }}
            aria-label="Increase quantity"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        {action}
      </div>
    </div>
  );
}
