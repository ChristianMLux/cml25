import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
