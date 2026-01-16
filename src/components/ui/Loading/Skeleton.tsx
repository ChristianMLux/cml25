"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "pulse" | "shimmer" | "none";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({
  className,
  width,
  height,
  rounded = "md",
  animation = "pulse",
  isLoading = true,
  children,
  style,
  ...props
}: SkeletonProps) {
  const animationClass =
    animation === "pulse"
      ? "animate-pulse"
      : animation === "shimmer"
        ? "animate-shimmer"
        : "";

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        roundedClasses[rounded],
        animationClass,
        className,
      )}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shimmer {
      0% {
        background-position: -500px 0;
      }
      100% {
        background-position: 500px 0;
      }
    }
    .animate-shimmer {
      background: linear-gradient(
        90deg, 
        rgba(0, 0, 0, 0), 
        rgba(255, 255, 255, 0.1), 
        rgba(0, 0, 0, 0)
      );
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  `;
  document.head.appendChild(style);
}
