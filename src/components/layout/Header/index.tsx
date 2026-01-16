'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

import MobileNav from '@/components/layout/Header/MobileNav';
import { useNavigation } from '@/hooks/useNavigation';
import { LocalizedLink } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const { navItems, pathname, currentLocale, theme, toggleTheme, t } =
    useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md dark:bg-gray-900/80'
          : 'bg-transparent',
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <LocalizedLink
            href="/"
            className="text-2xl font-bold tracking-tighter"
          >
            Christian M. Lux
          </LocalizedLink>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <LocalizedLink
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-foreground/60',
                )}
              >
                {label}
              </LocalizedLink>
            ))}

            <div className="flex items-center space-x-2">
              <a
                href={`/de${pathname}`}
                className={`text-sm ${locale === 'de' ? 'font-bold' : 'opacity-70 hover:opacity-100'}`}
              >
                DE
              </a>
              <span className="text-gray-400">|</span>
              <a
                href={`/en${pathname}`}
                className={`text-sm ${locale === 'en' ? 'font-bold' : 'opacity-70 hover:opacity-100'}`}
              >
                EN
              </a>
            </div>

            <button
              onClick={() => toggleTheme()}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              aria-label={t('theme.toggle')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t('mobile.openMenu', 'Menü öffnen')}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'menu'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <MobileNav
            navItems={navItems}
            locale={locale}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
