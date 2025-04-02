import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { InitOptions } from "i18next";

const i18nConfig: InitOptions = {
  fallbackLng: "de",
  supportedLngs: ["de", "en"],
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  ns: ["common", "home", "projects", "about", "contact", "hero", "command"],
  defaultNS: "common",
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  detection: {
    order: ["path", "cookie", "navigator"],
    lookupFromPathIndex: 0,
    caches: ["cookie"],
  },
  react: {
    useSuspense: false,
    transWrapTextNodes: "",
    transSupportBasicHtmlNodes: false,
    transKeepBasicHtmlNodesFor: [],
  },
};

const isBrowser = typeof window !== "undefined";

if (isBrowser && !i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig)
    .catch((error) => {
      console.error("i18next initialization error:", error);
    });
}

export default i18n;
