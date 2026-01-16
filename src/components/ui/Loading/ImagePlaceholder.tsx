"use client";

import { Skeleton } from "./Skeleton";

interface ImagePlaceholderProps {
  width?: string | number;

  height?: string | number;

  aspectRatio?: "1:1" | "16:9" | "4:3" | "3:2";

  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";

  className?: string;

  showIcon?: boolean;
}

export function ImagePlaceholder({
  width,
  height,
  aspectRatio = "16:9",
  rounded = "md",
  className = "",
  showIcon = false,
}: ImagePlaceholderProps) {
  const aspectRatioClass = {
    "1:1": "aspect-square",
    "16:9": "aspect-video",
    "4:3": "aspect-4/3",
    "3:2": "aspect-3/2",
  }[aspectRatio];

  return (
    <div
      className={`relative ${aspectRatioClass} ${className}`}
      style={{ width, height }}
    >
      <Skeleton className="h-full w-full" rounded={rounded} />

      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
    </div>
  );
}
