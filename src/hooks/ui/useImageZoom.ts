"use client";

import { useState } from "react";

export const useImageZoom = () => {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const close = () => { setOpen(false); setScale(1); };
  const zoomIn = () => setScale((current) => Math.min(3, Math.round((current + 0.25) * 100) / 100));
  const zoomOut = () => setScale((current) => Math.max(1, Math.round((current - 0.25) * 100) / 100));
  return { open, scale, percent: Math.round(scale * 100), show: () => setOpen(true), close, zoomIn, zoomOut, reset: () => setScale(1) };
};
