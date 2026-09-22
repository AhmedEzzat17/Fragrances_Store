"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CartToast } from "@/components/shared/CartToast";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  quantity?: number;
  label?: string;
};

export function AddToCartButton({
  className,
  quantity = 1,
  label = "Add to cart +",
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <>
      <Button
        className={className}
        style={{ cursor: "pointer" }}
        onClick={() => {
          for (let index = 0; index < quantity; index += 1) {
            addItem(props);
          }
          setToastVisible(true);
        }}
      >
        {label}
      </Button>
      <CartToast
        message="Added to cart"
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}
