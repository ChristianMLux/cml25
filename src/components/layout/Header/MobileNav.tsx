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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <nav className="relative z-50 flex flex-col h-full py-16 px-6 w-full max-w-sm mx-auto bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {navItems.map(({ href, label }) => (
            <LocalizedLink
              key={href}
              href={href}
              className={cn(
                "text-lg font-medium hover:text-primary transition-colors",
                pathname === href ? "text-primary" : "text-foreground/60"
              )}
              onClick={onClose}
            >
              {label}
            </LocalizedLink>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ">
          <div className="flex flex-col space-y-4 ">
            <div className="flex space-x-4 items-center justify-between">
              <span className="text-sm font-medium">
                {t("changeLanguage")}:
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
              <span className="text-sm font-medium">{t("toggleTheme")}:</span>
              <button
                onClick={() => toggleTheme()}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={t("toggleTheme")}
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
      </nav>
    </motion.div>
  );
}
