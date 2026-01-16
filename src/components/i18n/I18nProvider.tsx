'use client';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
}

export default function I18nProvider({ children, locale }: I18nProviderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale).catch((error) => {
        console.error('Fehler beim Ändern der Sprache:', error);
      });
    }

    setMounted(true);
  }, [locale]);

  if (!mounted) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
