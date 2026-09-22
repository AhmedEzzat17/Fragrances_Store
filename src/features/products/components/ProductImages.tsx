"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImageModal } from "@/components/shared/ProductImageModal";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const image = product.images[0];
  const galleryImages = product.images;

  if (!image) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setSelectedImage(image)}
          className="relative aspect-square overflow-hidden rounded-[5px] bg-[#f0ebe4] text-left transition duration-200 hover:opacity-95"
        >
          <Image
            src={image}
            alt={product.name}
            style={{ cursor: "pointer" }}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
          />
        </button>
        <div className="flex gap-3">
          {galleryImages.map((galleryImage, index) => (
            <button
              key={`${galleryImage}-${index}`}
              type="button"
              onClick={() => setSelectedImage(galleryImage)}
              className={`relative aspect-[1.8] w-[31.5%] overflow-hidden rounded-[3px] bg-[#f0ebe4] ${index === 0 ? "ring-1 ring-[#1a1a1a] ring-offset-1" : ""}`}
            >
              <Image
                src={galleryImage}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 15vw, 30vw"
              />
            </button>
          ))}
        </div>
      </div>
      {selectedImage ? (
        <ProductImageModal
          src={selectedImage}
          alt={product.name}
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
        />
      ) : null}
    </>
  );
}
