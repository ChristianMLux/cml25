'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';
import { SkillsShowcase } from './SkillsShowcase';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma'] },
];

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: '2021 - Present',
    description: 'Leading frontend development for enterprise applications.',
  },
  // Add more experiences...
];

export default function About() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              About Me
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                I'm a passionate web developer with over 5 years of experience in creating modern web applications. I specialize in building fast, accessible, and user-friendly digital experiences.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                My journey in web development started with curiosity and has evolved into a deep passion for creating impactful digital solutions.
              </p>
              <div className="flex gap-4">
                <Button>
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">View Projects</Button>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] overflow-hidden rounded-lg"
          >
            <Image
              src="/about-image.jpg"
              alt="About Me"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Skills Section */}
        <SkillsShowcase skills={skills} />

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold tracking-tighter">Experience</h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border p-6"
              >
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {exp.company} • {exp.period}
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}