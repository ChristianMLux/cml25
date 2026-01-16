/**
 * @component ProjectCard
 * @description A glassmorphic project card with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Tactile Maximalism" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible links, 3D hover effects, semantic structure.
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LocalizedLink } from '@/lib/i18n-navigation';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  const [descriptionLength, setDescriptionLength] = useState<
    'short' | 'medium' | 'long'
  >('medium');

  useEffect(() => {
    const lengths = ['short', 'medium', 'long'] as const;
    const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
    setDescriptionLength(randomLength);
  }, []);

  if (!project) {
    return (
      <article className="bg-glass-low backdrop-blur-md border border-glass-border rounded-xl overflow-hidden p-4">
        <p className="text-muted-foreground">{t('projects.ui.loadError')}</p>
      </article>
    );
  }

  const getDescription = () => {
    const fullDescription =
      project.description || t('projects.ui.noDescription');

    switch (descriptionLength) {
      case 'short':
        return (
          fullDescription.substring(0, 60) +
          (fullDescription.length > 60 ? '...' : '')
        );
      case 'long':
        return fullDescription;
      default:
        return fullDescription;
    }
  };

  const getImageHeight = () => {
    switch (descriptionLength) {
      case 'short':
        return 'aspect-video';
      case 'medium':
        return 'aspect-[4/3]';
      case 'long':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <motion.article
      className="bg-glass-low backdrop-blur-md border border-glass-border rounded-xl overflow-hidden transition-all duration-300 ease-spring hover:border-cyber-pink/50 hover:shadow-lg group"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <LocalizedLink href={`/projects/${project.id}`}>
        <div className={`relative ${getImageHeight()} overflow-hidden`}>
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.title || t('projects.ui.unnamedProject')}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
              placeholder={project.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={project.blurDataUrl}
            />
          )}
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.category && (
            <div className="absolute top-4 right-4 bg-cyber-neon/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {t(`projects.categories.${project.category}`)}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyber-neon transition-colors duration-200">
            {project.title || t('projects.ui.unnamedProject')}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {getDescription()}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags
                .slice(0, descriptionLength === 'short' ? 2 : 4)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-glass-medium border border-glass-border text-muted-foreground px-2 py-1 rounded-full transition-colors duration-200 hover:text-cyber-cyan hover:border-cyber-cyan/50"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </LocalizedLink>
    </motion.article>
  );
}
