/**
 * @component ProjectsFilter
 * @description Category filter buttons with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Tactile Maximalism" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible, tactile button states, animated transitions.
 */

"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Alle" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (category: string) => {
    router.push(`${pathname}?${createQueryString("category", category)}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const isActive = currentCategory === category.id;
        return (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-spring",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-cyber-neon text-black shadow-lg"
                : "bg-glass-low backdrop-blur-md border border-glass-border text-muted-foreground hover:text-foreground hover:border-cyber-neon/50",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {category.label}
            {/* Active indicator glow */}
            {isActive && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-cyber-neon -z-10 blur-md opacity-50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
