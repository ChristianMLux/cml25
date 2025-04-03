import { Suspense } from "react";
import { getServerTranslation } from "@/lib/getServerTranslation";
import { getProjects } from "@/lib/data";
import ProjectsGrid from "@/components/sections/Projects/ProjectsGrid";
import ProjectsFilter from "@/components/sections/Projects/ProjectsFilter";
import { ProjectsGridSkeleton } from "@/components/ui/Loading";
import { LoadingProvider } from "@/components/ui/Loading";
import { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "common");

  return {
    title: `${t("metadata.baseTitle", "Portfolio")} | ${t("metadata.projectsTitleSuffix", "Projects")}`,
    description: t("metadata.projectsDescription", "Explore my projects..."),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects: Project[] = await getProjects(locale);

  return (
    <section className="mt-6">
      <div className="container mx-auto px-4 py-12">
        <ProjectsFilter />
        <LoadingProvider>
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsGrid initialProjects={projects} />
          </Suspense>
        </LoadingProvider>
      </div>
    </section>
  );
}
