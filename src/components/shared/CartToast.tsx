"use client";

import { useEffect } from "react";

type CartToastProps = {
  message: string;
  visible: boolean;
  onClose?: () => void;
  duration?: number;
};

export function CartToast({
  message,
  visible,
  onClose,
  duration = 1800,
}: CartToastProps) {
  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [duration, onClose, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70] rounded-full border border-[#e8e1d7] bg-[#1a1a1a] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#f8f4ef] shadow-[0_18px_40px_rgba(15,10,8,0.18)]">
      {message}
    </div>
  );
}
