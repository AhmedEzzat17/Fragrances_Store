"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, price, quantity }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={price}
          image={product.images[0]}
          selectedOptions={selectedOptions}
          quantity={quantity}
          label={`Add to cart / $${price}`}
          className="h-[35px] w-full rounded-[3px] bg-[#1a1a1a] py-2 text-[10px] uppercase hover:bg-[#3b3631]"
        />
      )}
    />
  );
}
