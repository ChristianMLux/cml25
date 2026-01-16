import { notFound } from "next/navigation";
import { getProjectById, getRelatedProjects } from "@/lib/data";
import BackButton from "@/components/ui/Button/BackButton";
import GalleryWrapper from "@/components/ui/GalleryWrapper";
import Image from "next/image";
import { getServerTranslation } from "@/lib/getServerTranslation";

interface PageParams {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { id, locale } = await params;
  const t = await getServerTranslation(locale, "projects");

  try {
    const project = await getProjectById(id, locale);

    if (!project) {
      return {
        title: "Projekt nicht gefunden",
      };
    }

    return {
      title: `${project.title} | Portfolio`,
      description: project.description,
    };
  } catch (error) {
    console.error("Fehler beim Laden der Metadaten:", error);
    return {
      title: "Fehler",
    };
  }
}

export default async function ProjectPage({ params }: PageParams) {
  try {
    const { id, locale } = await params;
    const t = await getServerTranslation(locale, "projects");
    const project = await getProjectById(id, locale);

    if (!project) {
      return notFound();
    }

    const relatedProjects = await getRelatedProjects(
      project.category,
      project.id,
      locale,
    );

    const projectImages = [project.imageUrl, ...(project.images || [])].filter(
      Boolean,
    );

    return (
      <div className="container mx-auto px-4 py-8 mt-10">
        <BackButton href="/projects" label="Zurück zu Projekten" />

        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-6">{project.description}</p>

          <div className="mb-8">
            <GalleryWrapper images={projectImages} />
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Technologien</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.content && (
            <div className="mb-8 prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Repository
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Ähnliche Projekte</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <div
                    key={relatedProject.id}
                    className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <Image
                        fill={true}
                        src={relatedProject.imageUrl}
                        alt={relatedProject.title}
                        className="w-[10rem] h-[10rem] object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{relatedProject.title}</h3>
                      <a
                        href={`/${locale}/projects/${relatedProject.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm inline-flex items-center mt-2"
                      >
                        Projekt ansehen
                        <svg
                          className="w-4 h-4 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Fehler beim Rendern der Projektseite:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Fehler beim Laden des Projekts
        </h1>
        <p>
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später
          erneut.
        </p>
        <BackButton href="/projects" label="Zurück zu Projekten" />
      </div>
    );
  }
}
