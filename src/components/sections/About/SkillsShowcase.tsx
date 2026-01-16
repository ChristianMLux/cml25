/**
 * @component SkillsShowcase
 * @description A glassmorphic skills grid with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Intentional Ornamentation" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic lists, accessible category headings.
 */

'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SkillsShowcaseProps {
  skills: {
    category: string;
    items: (string | undefined)[];
  }[];
}

export function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16"
    >
      <h3 className="text-2xl font-bold tracking-tighter text-foreground">
        Skills & Expertise
      </h3>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {skills.map((category, index) => (
          <motion.article
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-xl bg-glass-low backdrop-blur-md border border-glass-border p-6 transition-all duration-300 ease-spring hover:border-cyber-neon/50 hover:shadow-lg"
          >
            <h4 className="font-semibold text-lg text-cyber-neon">
              {category.category}
            </h4>
            <ul className="mt-4 space-y-3">
              {category.items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <CheckCircle className="mr-3 h-4 w-4 text-cyber-neon flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
