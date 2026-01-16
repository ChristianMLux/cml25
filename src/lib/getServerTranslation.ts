import fs from "fs";
import path from "path";

import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

const translationCache = new Map();

export async function getServerTranslation(locale: string, namespace: string) {
  const cacheKey = `${locale}:${namespace}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const i18nInstance = createInstance();

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      locale,
      `${namespace}.json`,
    );
    const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));

    await i18nInstance.use(initReactI18next).init({
      lng: locale,
      ns: [namespace],
      defaultNS: namespace,
      resources: {
        [locale]: {
          [namespace]: translations,
        },
      },
      interpolation: {
        escapeValue: false,
      },
    });

    const t = i18nInstance.getFixedT(locale, namespace);
    translationCache.set(cacheKey, t);

    return t;
  } catch (error) {
    console.error(
      `Fehler beim Laden der Übersetzungen für ${locale}/${namespace}:`,
      error,
    );
    return (key: string) => key;
  }
}
