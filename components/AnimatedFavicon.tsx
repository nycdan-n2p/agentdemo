"use client";

import { useEffect } from "react";

export function AnimatedFavicon() {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;

    const worker = new Worker("/favicon-worker.js");
    worker.postMessage({ type: "init" });
    worker.onmessage = (e) => {
      if (e.data.type === "updateFavicon") link.href = e.data.dataUrl;
    };
    return () => worker.postMessage({ type: "stop" });
  }, []);
  return null;
}
