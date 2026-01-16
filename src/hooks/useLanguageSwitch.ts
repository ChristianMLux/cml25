import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageSwitch() {
  const router = useRouter();
  const { i18n } = useTranslation();

  /**
   * Switches to the specified language or toggles between de/en
   * @param targetLang Optional target language. If not specified, the system switches
   */
  const switchLanguage = useCallback(
    (targetLang?: string) => {
      const currentLang = i18n.language;
      const newLang = targetLang || (currentLang === 'de' ? 'en' : 'de');

      if (currentLang === newLang) return;

      try {
        const currentPath = window.location.pathname;

        const pathMatch = currentPath.match(/^\/[^\/]+(.*)$/);
        const pathWithoutLang = pathMatch ? pathMatch[1] : '';

        const newPath = `/${newLang}${pathWithoutLang}`;

        if (newPath !== currentPath) {
          setTimeout(() => {
            router.push(newPath);
          }, 0);
        }
      } catch (error) {
        console.error('Fehler beim Sprachwechsel:', error);
      }
    },
    [i18n.language, router],
  );

  return {
    currentLanguage: i18n.language,
    switchLanguage,
    isGerman: i18n.language === 'de',
    isEnglish: i18n.language === 'en',
  };
}
