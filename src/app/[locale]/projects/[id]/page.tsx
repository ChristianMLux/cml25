/**
 * @page ProjectPage
 * @description Individual project detail page with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Digital Hospitality" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, accessible links, glassmorphic elements.
 */

import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import BackButton from '@/components/ui/Button/BackButton';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import { getProjectById, getRelatedProjects } from '@/lib/data';
import { getServerTranslation } from '@/lib/getServerTranslation';

interface PageParams {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { id, locale } = await params;
  const t = await getServerTranslation(locale, 'projects');

  try {
    const project = await getProjectById(id, locale);

    if (!project) {
      return {
        title: 'Projekt nicht gefunden',
      };
    }

    return {
      title: `${project.title} | Portfolio`,
      description: project.description,
    };
  } catch (error) {
    console.error('Fehler beim Laden der Metadaten:', error);
    return {
      title: 'Fehler',
    };
  }
}

export default async function ProjectPage({ params }: PageParams) {
  try {
    const { id, locale } = await params;
    const t = await getServerTranslation(locale, 'projects');
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

        <article className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>

          <div className="mb-8">
            <GalleryWrapper images={projectImages} />
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Technologien
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Content */}
          {project.content && (
            <section className="mb-8 prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-cyber-cyan prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </section>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-glass-low backdrop-blur-md border border-glass-border text-muted-foreground rounded-full text-sm transition-colors duration-200 hover:text-cyber-cyan hover:border-cyber-cyan/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-glass-low backdrop-blur-md border border-glass-border text-foreground rounded-full font-medium transition-all duration-200 ease-spring hover:border-cyber-neon/50 hover:text-cyber-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Repository
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-cyber-neon text-black rounded-full font-medium transition-all duration-200 ease-spring hover:shadow-lg hover:shadow-cyber-neon/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            )}
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="mt-16 pt-8 border-t border-glass-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Ähnliche Projekte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <article
                    key={relatedProject.id}
                    className="bg-glass-low backdrop-blur-md border border-glass-border rounded-xl overflow-hidden transition-all duration-300 ease-spring hover:border-cyber-pink/50 hover:shadow-lg group"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <Image
                        fill={true}
                        src={relatedProject.imageUrl}
                        alt={relatedProject.title}
                        className="object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-cyber-neon transition-colors duration-200">
                        {relatedProject.title}
                      </h3>
                      <a
                        href={`/${locale}/projects/${relatedProject.id}`}
                        className="text-cyber-cyan hover:text-cyber-neon text-sm inline-flex items-center mt-2 transition-colors duration-200"
                      >
                        Projekt ansehen
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    );
  } catch (error) {
    console.error('Fehler beim Rendern der Projektseite:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cyber-pink mb-4">
          Fehler beim Laden des Projekts
        </h1>
        <p className="text-muted-foreground">
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später
          erneut.
        </p>
        <div className="mt-6">
          <BackButton href="/projects" label="Zurück zu Projekten" />
        </div>
      </div>
    );
  }
}
