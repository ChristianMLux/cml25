'use client';

import { motion } from 'framer-motion';

import { ProjectCardSkeleton } from './ProjectCardSkeleton';

interface ProjectsGridSkeletonProps {
  count?: number;
  stagger?: boolean;
}

export function ProjectsGridSkeleton({
  count = 6,
  stagger = true,
}: ProjectsGridSkeletonProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} variants={item}>
          <ProjectCardSkeleton animate={false} />
        </motion.div>
      ))}
    </motion.div>
  );
}
