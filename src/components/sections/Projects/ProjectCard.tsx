"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { LocalizedLink } from "@/lib/i18n-navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation("projects");

  const [descriptionLength, setDescriptionLength] = useState<
    "short" | "medium" | "long"
  >("medium");

  useEffect(() => {
    const lengths = ["short", "medium", "long"] as const;
    const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
    setDescriptionLength(randomLength);
  }, []);

  if (!project) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-4">
        <p>{t("projects.ui.loadError")}</p>
      </div>
    );
  }

  const getDescription = () => {
    const fullDescription =
      project.description || t("projects.ui.noDescription");

    switch (descriptionLength) {
      case "short":
        return (
          fullDescription.substring(0, 60) +
          (fullDescription.length > 60 ? "..." : "")
        );
      case "long":
        return fullDescription;
      default:
        return fullDescription;
    }
  };

  const getImageHeight = () => {
    switch (descriptionLength) {
      case "short":
        return "aspect-video";
      case "medium":
        return "aspect-[4/3]";
      case "long":
        return "aspect-square";
      default:
        return "aspect-video";
    }
  };

  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <LocalizedLink href={`/projects/${project.id}`}>
        <div className={`relative ${getImageHeight()}`}>
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.title || t("projects.ui.unnamedProject")}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              placeholder={project.blurDataUrl ? "blur" : "empty"}
              blurDataURL={project.blurDataUrl}
            />
          )}
          {project.category && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {t(`projects.categories.${project.category}`)}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {project.title || t("projects.ui.unnamedProject")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            {getDescription()}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags
                .slice(0, descriptionLength === "short" ? 2 : 4)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </LocalizedLink>
    </motion.div>
  );
}
