'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  navItems: Array<{ href: string; label: string }>;
  onClose: () => void;
}

export default function MobileNav({ navItems, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-[65px] z-50 h-screen bg-white/80 backdrop-blur-md dark:bg-gray-900/80 md:hidden"
    >
      <nav className="container mx-auto px-6 py-8">
        <ul className="space-y-6">
          {navItems.map(({ href, label }) => (
            <motion.li
              key={href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Link
                href={href}
                onClick={onClose}
                className={cn(
                  'block text-lg font-medium transition-colors hover:text-primary',
                  pathname === href
                    ? 'text-primary'
                    : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
