import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/lib/store/themeStore";
import { usePathname } from "@/lib/i18n-navigation";
import { useLanguageSwitch } from "@/hooks/useLanguageSwitch";

export function useNavigation() {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  const { theme, setTheme } = useThemeStore();
  const { switchLanguage } = useLanguageSwitch();

  const navItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/projects", label: t("navigation.projects") },
    { href: "/about", label: t("navigation.about") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  const currentLocale = i18n.language;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    navItems,
    pathname,
    currentLocale,
    theme,
    toggleTheme,
    switchLanguage,
    t,
  };
}
