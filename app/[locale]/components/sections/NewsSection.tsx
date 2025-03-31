'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const NewsSection = () => {
  const t = useTranslations('news');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "New Expansion: The Crystal Dominion Coming Soon",
      date: "March 15, 2024",
      category: "Announcement",
      excerpt: "Explore the floating islands of Crystal Dominion, face new fearsome enemies, and discover legendary artifacts in our biggest expansion yet.",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2030",
    },
    {
      id: 2,
      title: "Spring Tournament Registration Now Open",
      date: "February 28, 2024",
      category: "Event",
      excerpt: "Sign up for the Spring Tournament for a chance to win exclusive in-game items and a share of the $10,000 prize pool.",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070",
    },
    {
      id: 3,
      title: "Balance Update 2.5 - Class Changes & Bug Fixes",
      date: "February 10, 2024",
      category: "Patch Notes",
      excerpt: "The latest update brings major balance changes to all character classes, weapon adjustments, and resolves several critical bugs.",
      image: "https://images.unsplash.com/photo-1614064643392-ed3878311664?q=80&w=2070",
    },
  ];

  return (
    <section 
      id="news" 
      className="py-24 bg-gradient-to-b from-[#110626] to-[#030014]"
      aria-labelledby="news-title"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 
            id="news-title"
            className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300"
          >
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((item, index) => (
            <NewsCard 
              key={item.id} 
              item={item} 
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button 
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-violet-500/20 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label={t('viewAllNews')}
          >
            {t('viewAllNews')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  }
};

const NewsCard = ({ item, index }: NewsCardProps) => {
  const t = useTranslations('news');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden group hover:bg-white/10 transition-colors duration-300 border border-violet-800/20"
      tabIndex={0}
    >
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={item.image} 
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={85}
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <time dateTime={item.date} className="text-gray-400 text-sm mb-2 block">
          {item.date}
        </time>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 mb-4">
          {item.excerpt}
        </p>
        <a 
          href="#" 
          className="text-violet-400 font-medium inline-flex items-center hover:text-violet-300 transition-colors group/link focus:outline-none focus:text-violet-300"
          aria-label={`${t('readMore')} ${item.title}`}
        >
          {t('readMore')}
          <svg 
            className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
};

export default NewsSection;