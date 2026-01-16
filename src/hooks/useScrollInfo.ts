"use client";

import { useState, useEffect } from "react";

interface ScrollInfo {
  scrollY: number;
  scrollYProgress: number;
  direction: "up" | "down" | null;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollHeight: number;
  viewportHeight: number;
}

/**
 * Hook that provides detailed information about scroll position and direction
 */
export function useScrollInfo(): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollYProgress: 0,
    direction: null,
    isAtTop: true,
    isAtBottom: false,
    scrollHeight: 0,
    viewportHeight: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollInfo = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const maxScroll = scrollHeight - viewportHeight;
      const scrollYProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      setScrollInfo({
        scrollY,
        scrollYProgress,
        direction: scrollY > lastScrollY ? "down" : "up",
        isAtTop: scrollY <= 0,
        isAtBottom: Math.ceil(scrollY + viewportHeight) >= scrollHeight,
        scrollHeight,
        viewportHeight,
      });

      lastScrollY = scrollY;
    };

    updateScrollInfo();

    window.addEventListener("scroll", updateScrollInfo, { passive: true });
    window.addEventListener("resize", updateScrollInfo, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollInfo);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, []);

  return scrollInfo;
}

export default useScrollInfo;
