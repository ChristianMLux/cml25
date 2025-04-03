"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/Button/button";
import { useTranslation } from "react-i18next";
import { Project } from "@/types";

interface ProjectsProps {
  locale: string;
}

export default function Projects({ locale }: ProjectsProps) {
  const { t, i18n } = useTranslation("projects");
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const categories = [
    { id: "All", label: t("categories.all", "All") },
    { id: "Web", label: t("categories.web", "Web") },
    { id: "Mobile", label: t("categories.mobile", "Mobile") },
    { id: "Design", label: t("categories.design", "Design") },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const projectsData: Project[] = [
    {
      id: "1",
      title: t("projects.spn.title"),
      description: t("projects.spn.description"),
      imageUrl: "/assets/images/projects/projects_spn_landing.jpg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        ".NET/C#",
        "Azure",
      ],
      tags: ["Frontend", "Backend", "DevOps"],
      category: "Web",
      link: "https://www.sparepartsnow.de/",
      images: [
        "/assets/images/projects/projects_spn_landing.jpg",
        "/assets/images/projects/projects_spn_product_example.jpg",
      ],
    },
    {
      id: "2",
      title: t("projects.cml25.title"),
      description: t("projects.cml25.description"),
      imageUrl: "/assets/images/projects/projects_cml25_landing.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      tags: ["Frontend", "Backend"],
      category: "Web",
      link: "https://cml25.netlify.app/",
      images: [
        "/assets/images/projects/projects_cml25_landing.jpg",
        "/assets/images/projects/projects_cml25_about.jpg",
      ],
    },
  ];

  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t("description")}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
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
                    | "web"
                    | "mobile"
                    | "design",
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
