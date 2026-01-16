/**
 * @component BackButton
 * @description A cyber-noir styled back navigation link.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible, animated hover state.
 */

"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { LocalizedLink } from "@/lib/i18n-navigation";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <LocalizedLink href={href} className="inline-block group">
      <motion.span
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-cyber-cyan bg-glass-low backdrop-blur-md border border-glass-border rounded-full transition-all duration-200 ease-spring hover:border-cyber-cyan/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon"
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {label}
      </motion.span>
    </LocalizedLink>
  );
}
