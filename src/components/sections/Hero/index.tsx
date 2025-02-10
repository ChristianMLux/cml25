'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button/button';

const animation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={animation.initial}
            animate={animation.animate}
            transition={animation.transition}
          >
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Available for Work
            </span>
            
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Creative Developer & Designer
            </h1>
            
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Building beautiful, functional, and user-friendly digital experiences with modern technologies.
            </p>
            
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button>
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative lg:ml-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src="/hero-image.jpg"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}