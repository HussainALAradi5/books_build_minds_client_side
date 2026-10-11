"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { BOOK_CHANGED, JOIN_BOOK } from "@/constants/bookEvents";

export const useBookEvents = (slug: string, onChange: (resource: string) => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    const origin = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
    const socket = io(origin, { transports: ["websocket"], reconnection: true });
    socket.on("connect", () => socket.emit(JOIN_BOOK, { slug }));
    socket.on(BOOK_CHANGED, (event: { slug: string; resource: string }) => {
      if (event.slug === slug) onChange(event.resource);
    });
    return () => { socket.disconnect(); };
  }, [slug, onChange, enabled]);
};
