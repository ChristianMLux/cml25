/**
 * @component Header
 * @description A glassmorphic navigation header with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Liquid Glass" navigation pattern.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible navigation, spring transitions.
 */

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

import MobileNav from "@/components/layout/Header/MobileNav";
import { useNavigation } from "@/hooks/useNavigation";
import { LocalizedLink } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";

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
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Skip Link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyber-neon focus:text-black focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <header
        role="banner"
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 ease-spring",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-glass-border shadow-lg"
            : "bg-transparent",
        )}
      >
        <nav
          className="container mx-auto px-6 py-4"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <LocalizedLink
              href="/"
              className="text-2xl font-bold tracking-tighter text-foreground hover:text-cyber-neon transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
            >
              Christian M. Lux
            </LocalizedLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ href, label }) => (
                <LocalizedLink
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-all duration-200 ease-spring relative focus-visible:outline-none focus-visible:text-cyber-neon",
                    pathname === href
                      ? "text-cyber-neon"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                  {/* Active indicator */}
                  {pathname === href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyber-neon rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </LocalizedLink>
              ))}

              {/* Language Switcher */}
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-glass-low border border-glass-border">
                <a
                  href={`/de${pathname}`}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    locale === "de"
                      ? "text-cyber-neon font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  DE
                </a>
                <span className="text-glass-border">|</span>
                <a
                  href={`/en${pathname}`}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    locale === "en"
                      ? "text-cyber-neon font-bold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  EN
                </a>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => toggleTheme()}
                className="rounded-full p-2 bg-glass-low border border-glass-border hover:border-cyber-neon/50 transition-all duration-200 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon"
                aria-label={t("theme.toggle")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-cyber-warning" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full bg-glass-low border border-glass-border hover:border-cyber-neon/50 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t("mobile.openMenu", "Menü öffnen")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="h-5 w-5 text-foreground" />
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
    </>
  );
}
