'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NewsSection = () => {
  const newsItems = [
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
    <section id="news" className="py-24 bg-gradient-to-b from-[#110626] to-[#030014]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
            Latest News & Updates
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay informed with our latest announcements, events, and game updates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard 
              key={item.id} 
              item={item} 
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-violet-500/20 transition duration-300">
            View All News
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const NewsCard = ({ item, index }: { item: any, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden group hover:bg-white/10 transition-colors duration-300 border border-violet-800/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-gray-400 text-sm mb-2">{item.date}</div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 mb-4">
          {item.excerpt}
        </p>
        <a href="#" className="text-violet-400 font-medium inline-flex items-center hover:text-violet-300 transition-colors">
          Read More
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default NewsSection; 