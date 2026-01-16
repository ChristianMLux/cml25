'use client';

import { motion } from 'framer-motion';

import { LocalizedLink } from '@/lib/i18n-navigation';

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <LocalizedLink href={href} className="inline-block">
      <motion.span
        className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {label}
      </motion.span>
    </LocalizedLink>
  );
}
