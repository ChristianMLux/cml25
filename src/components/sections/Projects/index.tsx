/**
 * @component Projects
 * @description Projects showcase section with category filtering.
 * Implements the Neo-Victorian Software Standard's "Structural Integrity" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, animated grid transitions.
 */

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button/button';
import { Project } from '@/types';

import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  locale: string;
  projects: Project[];
}

export default function Projects({ locale, projects }: ProjectsProps) {
  const { t, i18n } = useTranslation('projects');
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const categories = [
    { id: 'All', label: t('categories.all', 'All') },
    { id: 'Web', label: t('categories.web', 'Web') },
    { id: 'Mobile', label: t('categories.mobile', 'Mobile') },
    { id: 'Design', label: t('categories.design', 'Design') },
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter((project) =>
    activeCategory === 'All'
      ? true
      : project.category.toLowerCase() === activeCategory.toLowerCase(),
  );

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'cyber' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="transition-all"
            >
              {category.label}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  imageUrl: project.imageUrl || project.images[0],
                  tags: project.tags || project.technologies,
                  link: project.link || project.link,
                  category: project.category.toLowerCase() as
                    | 'web'
                    | 'mobile'
                    | 'design',
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
