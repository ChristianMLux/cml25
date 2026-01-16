"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

import { ProjectGallerySkeleton } from "@/components/ui/Loading";
import { useLoading } from "@/hooks/useLoading";

interface ProjectGalleryProps {
  images: string[];
  maxHeight?: number;
  aspectRatio?: string;
}

export default function ProjectGallery({
  images = [],
  maxHeight = 800,
  aspectRatio = "16/9",
}: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [validImages, setValidImages] = useState<string[]>([]);
  const { isLoading, setLoading, setSuccess } = useLoading({
    minDisplayTime: 500,
  });

  useEffect(() => {
    setMounted(true);
    setLoading();
    const filteredImages = images.filter(
      (img) => img && typeof img === "string",
    );
    if (filteredImages.length === 0) {
      setValidImages(["/placeholder-project.jpg"]);
    } else {
      setValidImages(filteredImages);
    }
    Promise.all(
      filteredImages.map((src) => {
        return new Promise((resolve) => {
          const img = document.createElement("img");
          img.onload = () => resolve(src);
          img.onerror = () => resolve("/placeholder-project.jpg");
          img.src = src;
        });
      }),
    ).then(() => {
      setSuccess();
    });
  }, [images, setLoading, setSuccess]);

  if (!mounted || isLoading) {
    return <ProjectGallerySkeleton dotsCount={images.length} />;
  }

  if (validImages.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500">Kein Bild verfügbar</p>
        </div>
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          aspectRatio: aspectRatio,
          maxHeight: `${maxHeight}px`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="relative h-full max-h-full flex justify-center">
              <Image
                src={validImages[currentIndex]}
                alt={`Projekt-Bild ${currentIndex + 1}`}
                width={1200}
                height={300}
                className="object-contain max-h-full w-auto"
                style={{ maxHeight: `${maxHeight}px` }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-project.jpg";
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Vorheriges Bild"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Nächstes Bild"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="flex justify-center mt-2 space-x-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Zu Bild ${index + 1} gehen`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
