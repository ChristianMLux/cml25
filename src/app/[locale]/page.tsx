import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = locale === "de" ? "Portfolio - Startseite" : "Portfolio - Home";
  const description =
    locale === "de"
      ? "Willkommen auf meinem Portfolio - Entdecke meine Projekte und Fähigkeiten"
      : "Welcome to my portfolio - Explore my projects and skills";

  return {
    title,
    description,
  };
}

import { getProjects } from "@/lib/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects = await getProjects(locale);
  const featuredProjects = projects.filter((p) => p.isFeatured);

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Projects locale={locale} projects={featuredProjects} />
      <Contact locale={locale} />
    </>
  );
}
