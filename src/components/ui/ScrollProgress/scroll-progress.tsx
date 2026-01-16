'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  alwaysVisible?: boolean;
  height?: number;
  className?: string;
  showSections?: boolean;
  zIndex?: number;
  colors?: {
    light: string;
    dark: string;
  };
}

export default function ScrollProgress({
  alwaysVisible = false,
  height = 4,
  className = '',
  showSections = false,
  zIndex = 60,
  colors = {
    light: 'bg-primary',
    dark: 'bg-primary',
  },
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const { theme } = useTheme();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysVisible]);

  useEffect(() => {
    if (!showSections) return;

    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [showSections]);

  if (!isVisible) return null;

  const colorClass = theme === 'dark' ? colors.dark : colors.light;

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      className="fixed top-0 left-0 right-0"
      style={{ height: `${height}px`, zIndex: 60 }}
    >
      <motion.div
        className={`h-full origin-left ${colorClass} ${className}`}
        style={{ scaleX }}
      />

      {showSections && activeSection && (
        <div className="absolute right-4 top-4 bg-white dark:bg-gray-800 px-2 py-1 text-xs rounded-md shadow-sm">
          {activeSection.replaceAll('-', ' ')}
        </div>
      )}
    </div>
  );
}
