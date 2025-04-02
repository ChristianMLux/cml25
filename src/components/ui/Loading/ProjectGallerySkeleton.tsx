"use client";

import { motion } from "framer-motion";
import { Skeleton } from "./Skeleton";

interface ProjectGallerySkeletonProps {
  dotsCount?: number;
  showNavigation?: boolean;
}

export function ProjectGallerySkeleton({
  dotsCount = 3,
  showNavigation = true,
}: ProjectGallerySkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative rounded-lg overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {showNavigation && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
            <div className="w-4 h-4" />
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full">
            <div className="w-4 h-4" />
          </div>
        </>
      )}

      {dotsCount > 0 && (
        <div className="flex justify-center mt-2 space-x-2">
          {Array.from({ length: dotsCount }).map((_, index) => (
            <Skeleton key={index} className="w-2 h-2" rounded="full" />
          ))}
        </div>
      )}
    </motion.div>
  );
}
