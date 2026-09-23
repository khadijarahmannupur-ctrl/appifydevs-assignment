"use client";

import { useEffect, RefObject } from "react";

export function useAutoResizeTextarea(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
  minHeight: number = 44,
  maxHeight: number = 200
) {
  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    // Reset height to calculate true scrollHeight
    textarea.style.height = `${minHeight}px`;
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight > minHeight) {
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
    } else {
      textarea.style.height = `${minHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, [ref, value, minHeight, maxHeight]);
}
