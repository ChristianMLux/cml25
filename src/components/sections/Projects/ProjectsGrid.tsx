/**
 * @component ProjectsGrid
 * @description Masonry grid for displaying project cards with filtering.
 * @author Christian M. Lux
 * @maintenance-pledge Skeleton loading, smooth transitions.
 */

'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { ProjectCardSkeleton } from '@/components/ui/Loading';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { useLoading } from '@/hooks/useLoading';
import { Project } from '@/types';

import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const { isLoading, setLoading, setSuccess } = useLoading({
    initialState: 'loading',
    minDisplayTime: 500,
  });

  useEffect(() => {
    setLoading();

    const timer = setTimeout(() => {
      if (category && category !== 'all') {
        const filtered = initialProjects.filter(
          (project) =>
            project.category.toLowerCase() === category.toLowerCase(),
        );
        setProjects(filtered);
      } else {
        setProjects(initialProjects);
      }
      setSuccess();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, initialProjects, setLoading, setSuccess]);

  const skeletonCount = Math.max(initialProjects.length, 6);

  return (
    <div className="mt-8">
      {isLoading ? (
        <MasonryGrid columnCount={3} gap={24} className="animate-pulse">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <ProjectCardSkeleton key={`skeleton-${i}`} animate={false} />
          ))}
        </MasonryGrid>
      ) : projects.length > 0 ? (
        <MasonryGrid columnCount={3} gap={24}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </MasonryGrid>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
        >
          <p className="text-muted-foreground">
            Keine Projekte in dieser Kategorie gefunden.
          </p>
        </motion.div>
      )}
    </div>
  );
}
