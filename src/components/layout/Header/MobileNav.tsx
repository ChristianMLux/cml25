"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { LocalizedLink } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/useNavigation";

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
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xs flex-col bg-white px-6 pb-6 pt-20 shadow-xl dark:bg-gray-900 overflow-y-auto"
      >
        <div className="flex flex-col space-y-6">
          {navItems.map(({ href, label }) => (
            <LocalizedLink
              key={href}
              href={href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-foreground/60",
              )}
              onClick={onClose}
            >
              {label}
            </LocalizedLink>
          ))}
        </div>
        <div className="mt-auto flex-grow" />
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm font-medium">
                {t("mobileNav.changeLanguage", "Sprache wechseln")}:
              </span>
              <div className="flex items-center space-x-2">
                <a
                  href={`/de${pathname}`}
                  className={`text-sm ${locale === "de" ? "font-bold" : "opacity-70 hover:opacity-100"}`}
                  onClick={onClose}
                >
                  DE
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href={`/en${pathname}`}
                  className={`text-sm ${locale === "en" ? "font-bold" : "opacity-70 hover:opacity-100"}`}
                  onClick={onClose}
                >
                  EN
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {t("mobileNav.toggleTheme", "Theme wechseln")}:
              </span>
              <button
                onClick={() => toggleTheme()}
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={t("theme.toggle")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-white " />
                ) : (
                  <Moon className="h-5 w-5 text-gray-800" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}
