import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'beginning' | 'education' | 'career' | 'project' | 'gaming';
  icon: string;
  details: string[];
  projectLink?: string;
  projectLinkLabel?: string;
}

const categoryColors: Record<string, string> = {
  beginning: 'from-blue-400 to-blue-600',
  education: 'from-purple-400 to-purple-600',
  career: 'from-emerald-400 to-emerald-600',
  project: 'from-amber-400 to-amber-600',
  gaming: 'from-pink-400 to-pink-600',
};

interface TimelineProps {
  items: TimelineItem[];
  startLeft?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TimelineItemComponent: React.FC<{
  item: TimelineItem;
  index: number;
  totalItems: number;
  startLeft: boolean;
}> = ({ item, index, totalItems, startLeft }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });
  const isEven = startLeft
    ? index % 2 !== 0
      ? true
      : false
    : index % 2 === 0
      ? true
      : false;
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isVeryNarrow = screenWidth < 450;

  const getBorderClass = () => {
    if (isVeryNarrow) {
      return 'border-t-4';
    } else if (isMobile) {
      return 'border-l-4';
    } else {
      return isEven ? 'border-l-4' : 'border-r-4';
    }
  };

  const borderClass = getBorderClass();

  const timelineContent = (
    <motion.div
      whileHover={{ scale: item.projectLink ? 1.02 : 1 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-step-hover ${borderClass} border-primary ${
        item.projectLink
          ? 'cursor-pointer hover:shadow-xl transition-all duration-300'
          : ''
      }`}
    >
      {isVeryNarrow && (
        <div className="mb-3 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
          {item.year}
        </div>
      )}

      <div className="flex items-center mb-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${categoryColors[item.category]} text-white mr-3`}
        >
          {item.icon}
        </span>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {item.title}
        </h3>
        {item.projectLink && (
          <span className="ml-2 text-primary text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </span>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {item.description}
      </p>
      <ul className="space-y-2">
        {item.details.map((detail, i) => (
          <li key={i} className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={`relative ${isMobile ? 'mt-4' : '-my-8 md:-my-16'} hover:z-20 transition-all duration-300`}
    >
      {!isVeryNarrow && (
        <div
          className={`absolute top-0 ${
            isMobile ? 'left-0' : 'left-1/2 -ml-7'
          } z-20 flex items-center justify-center w-14 h-14 rounded-full border-4 bg-white dark:bg-gray-800 border-primary shadow-md`}
        >
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {item.year}
          </span>
          {!isMobile && (
            <div
              className={`absolute ${isEven ? 'right-[-1.12rem]' : 'left-[-1.12rem]'}`}
            >
              <div
                className={`w-2 h-2 rounded-full bg-primary shadow-sm ${isEven ? 'mr-1' : 'ml-1'}`}
              />
            </div>
          )}
        </div>
      )}

      <div
        className={`flex flex-col md:flex-row ${
          isVeryNarrow
            ? 'pl-0'
            : isMobile
              ? 'pl-20'
              : isEven
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
        }`}
      >
        {!isVeryNarrow && (
          <div
            className={`md:w-1/2 ${!isMobile && isEven ? 'md:pr-8' : 'md:pl-8'}`}
          />
        )}
        <div
          className={`${
            isVeryNarrow
              ? 'w-full'
              : isMobile
                ? 'w-full'
                : `md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`
          } z-10`}
        >
          {item.projectLink ? (
            <Link href={item.projectLink} className="block">
              {timelineContent}
            </Link>
          ) : (
            timelineContent
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ items, startLeft = true }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setScreenWidth(window.innerWidth);

    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted || !items || items.length === 0) {
    return <div className="text-center p-8">Loading timeline...</div>;
  }

  const isVeryNarrow = screenWidth < 450;

  return (
    <div className="relative py-4">
      {!isVeryNarrow && (
        <div
          className={`absolute ${
            screenWidth < 768 ? 'left-7 mt-10' : 'left-1/2 ml-0'
          } top-0 w-1 bg-primary/70 h-8 z-0`}
        />
      )}

      {!isVeryNarrow && (
        <div
          className={`absolute ${
            screenWidth < 768
              ? 'left-7 mb-[10rem] bottom-[4rem]'
              : 'left-1/2 ml-0 bottom-[10rem]'
          } top-8 w-1 bg-primary/70 z-0`}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative"
      >
        {items.map((item, index) => (
          <TimelineItemComponent
            key={item.id || index}
            item={item}
            index={index}
            totalItems={items.length}
            startLeft={startLeft}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
