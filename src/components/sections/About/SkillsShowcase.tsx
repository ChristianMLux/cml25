'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SkillsShowcaseProps {
  skills: {
    category: string;
    items: string[];
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
      <h3 className="text-2xl font-bold tracking-tighter">Skills & Expertise</h3>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {skills.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg border p-6"
          >
            <h4 className="font-semibold">{category.category}</h4>
            <ul className="mt-4 space-y-2">
              {category.items.map((skill) => (
                <li key={skill} className="flex items-center text-gray-500 dark:text-gray-400">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}