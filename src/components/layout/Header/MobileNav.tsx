/**
 * @component MobileNav
 * @description A glassmorphic mobile navigation drawer with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Liquid Glass" navigation pattern.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible, full-height drawer, spring transitions.
 */

'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

import { useNavigation } from '@/hooks/useNavigation';
import { LocalizedLink } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  locale: string;
  onClose: () => void;
}

export default function MobileNav({ locale, onClose }: MobileNavProps) {
  const { navItems, pathname, currentLocale, theme, toggleTheme, t } =
    useNavigation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xs flex-col bg-background/95 backdrop-blur-2xl border-l border-glass-border px-6 pb-6 pt-20 shadow-2xl overflow-y-auto"
      >
        {/* Navigation Links */}
        <div className="flex flex-col space-y-4" role="menu">
          {navItems.map(({ href, label }) => (
            <LocalizedLink
              key={href}
              href={href}
              role="menuitem"
              className={cn(
                'text-lg font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-spring',
                pathname === href
                  ? 'text-cyber-neon bg-cyber-neon/10 border border-cyber-neon/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-glass-low',
              )}
              onClick={onClose}
            >
              {label}
            </LocalizedLink>
          ))}
        </div>

        {/* Spacer */}
        <div className="mt-auto flex-grow" />

        {/* Settings Section */}
        <div
          className="mt-8 border-t border-glass-border pt-6 space-y-6"
          role="group"
          aria-label="Settings"
        >
          {/* Language Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {t('mobileNav.changeLanguage', 'Sprache wechseln')}
            </span>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-glass-low border border-glass-border">
              <a
                href={`/de${pathname}`}
                className={cn(
                  'text-sm transition-colors duration-200',
                  locale === 'de'
                    ? 'text-cyber-neon font-bold'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={onClose}
              >
                DE
              </a>
              <span className="text-glass-border">|</span>
              <a
                href={`/en${pathname}`}
                className={cn(
                  'text-sm transition-colors duration-200',
                  locale === 'en'
                    ? 'text-cyber-neon font-bold'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={onClose}
              >
                EN
              </a>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {t('mobileNav.toggleTheme', 'Theme wechseln')}
            </span>
            <button
              onClick={() => toggleTheme()}
              className="rounded-full p-2 bg-glass-low border border-glass-border hover:border-cyber-neon/50 transition-all duration-200 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon"
              aria-label={t('theme.toggle')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-cyber-warning" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
