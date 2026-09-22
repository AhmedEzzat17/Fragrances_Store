"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductCompanions } from "@/features/products/components/ProductCompanions";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { ProductPurchaseControls } from "@/features/products/components/ProductPurchaseControls";
import { ProductScentAnatomy } from "@/features/products/components/ProductScentAnatomy";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  price: number;
  quantity: number;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const productsQuery = useProducts({});
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [giftWrap, setGiftWrap] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  const volumes = product?.volumes ?? [
    { label: "30 ml", price: Math.max(0, (product?.price ?? 0) - 80) },
    { label: "50 ml", price: Math.max(0, (product?.price ?? 0) - 40) },
    { label: "100 ml", price: product?.price ?? 0 },
  ];
  const [selectedVolumeLabel, setSelectedVolumeLabel] = useState<string | null>(
    null,
  );
  const currentVolume =
    volumes.find((volume) => volume.label === selectedVolumeLabel) ??
    volumes[volumes.length - 1];

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs currentProduct={product.name} />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-16 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-11 lg:px-20 lg:pb-24 lg:pt-2">
        <ProductImages product={product} />
        <div className="flex flex-col justify-center py-2 lg:py-10">
          <ProductDetails product={product} price={currentVolume.price} />
          <div className="mt-6">
            <ProductPurchaseControls
              product={product}
              selectedVolume={currentVolume}
              onVolumeChange={(volume) => setSelectedVolumeLabel(volume.label)}
              giftWrap={giftWrap}
              onGiftWrapChange={setGiftWrap}
              quantity={quantity}
              onQuantityChange={setQuantity}
              action={actions?.({
                product,
                selectedOptions: {
                  ...resolvedOptions,
                  volume: currentVolume.label,
                  giftWrap: giftWrap ? "true" : "false",
                },
                price: currentVolume.price,
                quantity,
              })}
            />
            <ProductOptions
              product={product}
              selectedOptions={resolvedOptions}
              onChange={(optionId, value) =>
                setSelectedOptions((current) => ({
                  ...current,
                  [optionId]: value,
                }))
              }
            />
            <ProductScentAnatomy product={product} />
          </div>
        </div>
      </div>
      <ProductCompanions
        products={(productsQuery.data?.items ?? []).filter(
          (companion) => companion.id !== product.id,
        )}
      />
    </section>
  );
}
