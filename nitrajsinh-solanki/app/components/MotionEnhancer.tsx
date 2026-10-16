"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds progressive, viewport-triggered reveals without hiding server-rendered
 * content before JavaScript is ready. Visitors who prefer reduced motion see
 * every element immediately.
 */
export default function MotionEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ready");
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      return;
    }

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.revealed = "true";
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => {
      if (element.dataset.revealed !== "true") observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
