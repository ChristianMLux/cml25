/**
 * @component About
 * @description The about section showcasing skills and experience.
 * Implements the Neo-Victorian Software Standard's "Structural Integrity" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, glassmorphic experience cards.
 */

'use client';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button/button';
import { useRouter } from '@/lib/i18n-navigation';

import { SkillsShowcase } from './SkillsShowcase';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'ASP.Net', 'PostgreSQL', 'MongoDB/MariaDB', 'Python'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Azure', 'Kubernetes', 'Claude, GPT (GenAI)'],
  },
];

interface AboutProps {
  locale: string;
}

export default function About({ locale }: AboutProps) {
  const { t, i18n } = useTranslation(['common', 'about']);
  const router = useRouter();
  const experiences = [
    {
      title: 'Cloud Solution Architecture',
      company: 'VelpTec GmbH',
      period: '2024 - 2025',
      description: t('about:experience.velpTec'),
    },
    {
      title: 'Full-Stack Developer',
      company: 'SparePartsNow GmbH',
      period: '2021 - 2024',
      description: t('about:experience.spn'),
    },
    {
      title: 'Frontend Developer',
      company: 'Coding Bootcamps Europe',
      period: '2021',
      description: t('about:experience.cbe'),
    },
  ];
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              {t('about:aboutSection.title')}
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-lg text-muted-foreground">
                {t('about:aboutSection.paragraph1')}
              </p>
              <p className="text-lg text-muted-foreground">
                {t('about:aboutSection.paragraph2')}
              </p>
              <div className="flex gap-4 pt-2">
                <Button variant="cyber" asChild>
                  <a href="/assets/cv/LebenslaufCML25.pdf" download>
                    {t('common:buttons.downloadCV', 'Download CV')}
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push(locale + '/projects')}
                >
                  {t('common:buttons.viewProjects')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] overflow-hidden rounded-xl border border-glass-border"
          >
            <Image
              src="/assets/images/about_section_01.png"
              alt={t('imageAlt', 'About Me')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        <SkillsShowcase skills={skills} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold tracking-tighter text-foreground">
            {t('about:experience.title', 'Experience')}
          </h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-glass-low backdrop-blur-md border border-glass-border p-6 transition-all duration-300 ease-spring hover:border-cyber-pink/50 hover:shadow-lg"
              >
                <h4 className="text-lg font-semibold text-foreground">
                  {exp.title}
                </h4>
                <p className="mt-1 text-sm text-cyber-cyan">
                  {exp.company} <span className="text-muted-foreground">•</span>{' '}
                  <span className="text-muted-foreground">{exp.period}</span>
                </p>
                <p className="mt-4 text-muted-foreground">{exp.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
