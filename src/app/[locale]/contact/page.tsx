'use client';
import { useEffect } from 'react';
import { use } from 'react';
import { useTranslation } from 'react-i18next';

import ContactForm from '@/components/sections/Contact/';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default function ContactPage({ params }: Props) {
  const resolvedParams = use(params);
  const { locale } = resolvedParams;
  const { t, i18n } = useTranslation('contact');

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
