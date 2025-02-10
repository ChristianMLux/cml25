import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Portfolio - Home',
  description: 'Welcome to my portfolio - showcasing my projects and skills',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}