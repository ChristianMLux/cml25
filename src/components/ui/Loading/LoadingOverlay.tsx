'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  fullPage?: boolean;
  message?: string;
}

export function LoadingOverlay({
  fullPage = true,
  message,
}: LoadingOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className={`${
        fullPage
          ? 'fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
          : 'absolute inset-0 z-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-[2px]'
      } flex items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600 dark:border-t-blue-400 dark:border-r-blue-400 animate-spin" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-600/30 dark:border-blue-400/30" />
        </div>

        {message && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
}
