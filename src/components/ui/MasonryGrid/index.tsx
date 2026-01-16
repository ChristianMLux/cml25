"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState, ReactNode } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface MasonryGridProps {
  children: ReactNode[];
  columnCount?: number;
  gap?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  columnCount = 3,
  gap = 24,
  className = "",
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<ReactNode[][]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const getResponsiveColumnCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return columnCount;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!children.length) return;

    const responsiveColumnCount = getResponsiveColumnCount();

    const newColumns: ReactNode[][] = Array.from(
      { length: responsiveColumnCount },
      () => [],
    );

    children.forEach((child, index) => {
      const columnIndex = index % responsiveColumnCount;
      newColumns[columnIndex].push(child);
    });

    setColumns(newColumns);
  }, [children, columnCount, windowWidth]);

  if (!children.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(3, getResponsiveColumnCount())} ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column.map((item, itemIndex) => (
            <motion.div
              key={itemIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                delay: itemIndex * 0.05,
                ease: "easeOut",
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
