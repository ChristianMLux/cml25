'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { ProjectGallerySkeleton } from '@/components/ui/Loading';

const ProjectGallery = dynamic(
  () => import('@/components/sections/Projects/ProjectGallery'),
  {
    ssr: false,
    loading: () => <ProjectGallerySkeleton />,
  },
);

interface GalleryWrapperProps {
  images: string[];
}

export default function GalleryWrapper({ images }: GalleryWrapperProps) {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <Suspense
      fallback={<ProjectGallerySkeleton dotsCount={safeImages.length} />}
    >
      <ProjectGallery images={safeImages} />
    </Suspense>
  );
}
