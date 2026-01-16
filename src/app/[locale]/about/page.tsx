/**
 * @page AboutPage
 * @description The about/biography page with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Digital Hospitality" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, glassmorphic panels, animated timeline.
 */

'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, use } from 'react';
import { useTranslation } from 'react-i18next';
import { siGithub, siInspire, siBluesky, siGmail } from 'simple-icons';

import Timeline from '@/components/sections/About/Timeline/Timeline';
import { TimelineItem } from '@/components/sections/About/Timeline/Timeline';
import { SimpleIcon } from '@/components/ui/SimpleIcon';

const SOCIAL_ICONS: Record<string, string> = {
  github: siGithub.path,
  linkedin: siInspire.path,
  bluesky: siBluesky.path,
  mail: siGmail.path,
};

interface PageParams {
  params: Promise<{
    locale: string;
  }>;
}

export default function AboutPage({ params }: PageParams) {
  const resolvedParams = use(params);
  const { locale } = resolvedParams;
  const { t, i18n } = useTranslation('about');

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const defaultTimelineItems: TimelineItem[] = [
    {
      id: '1',
      year: '2005',
      title: 'First Steps',
      description: 'Created my first forum signatures and discovered HTML',
      category: 'beginning',
      icon: '👾',
      details: [
        'Learned basic HTML by customizing forum profiles',
        'Started modifying MySpace layouts',
        'First exposure to Photoshop',
      ],
    },
  ];

  const defaultSkills = ['JavaScript', 'TypeScript', 'React', 'Next.js'];
  const defaultSocialLinks = [
    { name: 'GitHub', icon: 'github', url: '' },
    { name: 'LinkedIn', icon: 'linkedin', url: '' },
  ];

  const getTimelineItems = (): TimelineItem[] => {
    try {
      const items = i18n.getResource(locale, 'about', 'timelineSection.items');
      if (items && Array.isArray(items)) {
        return items as TimelineItem[];
      }
    } catch (e) {
      console.error('Error loading timeline items:', e);
    }
    return defaultTimelineItems;
  };

  const getSkills = (): string[] => {
    try {
      const skills = i18n.getResource(locale, 'about', 'profileSection.skills');
      if (skills && Array.isArray(skills)) {
        return skills as string[];
      }
    } catch (e) {
      console.error('Error loading skills:', e);
    }
    return defaultSkills;
  };

  const getSocialLinks = (): Array<{
    name: string;
    icon: string;
    url: string;
  }> => {
    try {
      const links = i18n.getResource(locale, 'about', 'connectSection.social');
      if (links && Array.isArray(links)) {
        return links as Array<{ name: string; icon: string; url: string }>;
      }
    } catch (e) {
      console.error('Error loading social links:', e);
    }
    return defaultSocialLinks;
  };

  const timelineItems = getTimelineItems();
  const skills = getSkills();
  const socialLinks = getSocialLinks();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="mt-10 p-1 text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyber-neon to-cyber-pink">
          {t('pageTitle', 'My Journey Through Technology')}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          {t(
            'pageSubtitle',
            'From forum signatures to developing cutting-edge web applications, my journey into technology has been characterised by curiosity, play and a passion for creating digital experiences.',
          )}
        </p>
      </motion.div>

      {/* About & Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:mb-[5rem]">
        {/* About Card */}
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-glass-low backdrop-blur-md border border-glass-border rounded-xl p-6 transition-all duration-300 ease-spring hover:border-cyber-neon/50"
        >
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {t('aboutSection.title', 'About Me')}
          </h2>
          <p className="mb-4 text-muted-foreground">
            {t(
              'aboutSection.paragraph1',
              'I have been fascinated by computers and technology since I was young. My journey started with customising forum signatures and templates, which sparked my interest in web development and design.',
            )}
          </p>
          <p className="mb-4 text-muted-foreground">
            {t(
              'aboutSection.paragraph2',
              "Gaming has always been a significant part of my life and has influenced my approach to problem-solving and creativity in technology. From building simple mods to developing full applications, I've brought that gaming mindset of persistence and innovation.",
            )}
          </p>
          <p className="text-muted-foreground">
            {t(
              'aboutSection.paragraph3',
              "Today, I combine my technical skills with creative thinking to build solutions that are not only functional but engaging and intuitive. This portfolio represents the culmination of my experiences and showcases the projects I'm most proud of.",
            )}
          </p>
        </motion.article>

        {/* Profile Card */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-glass-low backdrop-blur-md border border-glass-border rounded-xl p-6 flex flex-col justify-center items-center transition-all duration-300 ease-spring hover:border-cyber-pink/50"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-2 border-cyber-neon shadow-lg shadow-cyber-neon/20">
            <Image
              src="/assets/images/about/about_profile_2.jpg"
              alt="Profile"
              fill
              className="object-cover"
              style={{
                objectPosition: '80% 50%',
                transform: 'scale(-1, 1)',
              }}
              priority
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">
              {t('profileSection.title', 'Skills & Interests')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-cyber-neon/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        {timelineItems && timelineItems.length > 0 ? (
          <Timeline items={timelineItems} startLeft={true} />
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Timeline loading...</p>
          </div>
        )}
      </motion.section>

      {/* Connect Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          {t('connectSection.title', "Let's Connect")}
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-muted-foreground">
          {t(
            'connectSection.description',
            'Interested in collaborating or just want to chat about the latest in tech or gaming? Feel free to reach out through any of the channels below.',
          )}
        </p>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={
                social.url.includes('@') ? 'mailto:' + social.url : social.url
              }
              className="group"
              aria-label={social.name}
            >
              <span className="sr-only">{social.name}</span>
              <div className="w-12 h-12 flex items-center justify-center bg-glass-low backdrop-blur-md border border-glass-border rounded-full transition-all duration-200 ease-spring group-hover:border-cyber-neon group-hover:shadow-lg group-hover:shadow-cyber-neon/20 text-muted-foreground group-hover:text-cyber-neon">
                {SOCIAL_ICONS[social.icon.toLowerCase()] ? (
                  <SimpleIcon
                    path={SOCIAL_ICONS[social.icon.toLowerCase()]}
                    title={social.name}
                    size={22}
                  />
                ) : (
                  <span className="text-sm">{social.icon}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
