"use client";

import Image from "next/image";
import { useEffect } from "react";

type ProductImageModalProps = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

export function ProductImageModal({
  src,
  alt,
  open,
  onClose,
}: ProductImageModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f0e0d]/60 px-4 backdrop-blur-[1.5px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className="relative w-[min(90vw,760px)] max-h-[90vh] overflow-hidden rounded-[18px] border border-[#e8e1d7] bg-[#f5f2ee] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          style={{ cursor: "pointer" }}
          aria-label="Close image"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-[#e8e1d7] bg-white/80 text-lg text-[#1a1a1a] transition hover:bg-white"
        >
          ×
        </button>
        <div className="relative h-[100vh] max-h-[100vh] w-full bg-[#f5f2ee]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 760px"
          />
        </div>
      </div>
    </div>
  );
}
