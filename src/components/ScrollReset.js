"use client";
import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Disable scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
