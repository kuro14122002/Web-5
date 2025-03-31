'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('screenshots');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  const screenshots = [
    {
      id: 1,
      title: "Epic Battle Scene",
      description: "An epic showdown between heroes and the forces of darkness.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
    },
    {
      id: 2,
      title: "Enchanted Forest",
      description: "Explore the mystical Whispering Woods filled with ancient magic.",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080",
    },
    {
      id: 3,
      title: "Crystal Caverns",
      description: "Discover hidden treasures in the glowing Crystal Caverns.",
      image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974",
    },
    {
      id: 4,
      title: "Floating Islands",
      description: "Journey through the majestic Floating Islands high above the clouds.",
      image: "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=1974",
    },
    {
      id: 5,
      title: "Ancient Temple",
      description: "Uncover the secrets of the forgotten Temple of Eternity.",
      image: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?q=80&w=2069",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Official Cinematic Trailer",
      description: "Witness the epic tale of Ethereal Realms in this breathtaking cinematic trailer.",
      thumbnail: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080",
      videoId: "dQw4w9WgXcQ" // YouTube video ID (this is a placeholder)
    },
    {
      id: 2,
      title: "Combat Showcase",
      description: "Deep dive into the dynamic combat system with this gameplay demonstration.",
      thumbnail: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974",
      videoId: "dQw4w9WgXcQ" // YouTube video ID (this is a placeholder)
    },
    {
      id: 3,
      title: "Developer Diary #1",
      description: "The team shares insights into the creation of Ethereal Realms' immersive world.",
      thumbnail: "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=1974",
      videoId: "dQw4w9WgXcQ" // YouTube video ID (this is a placeholder)
    },
  ];

  const tabVariants = {
    active: {
      color: "#fff",
      backgroundImage: "linear-gradient(to right, rgba(126, 34, 206, 0.8), rgba(79, 70, 229, 0.8))",
      scale: 1.05,
    },
    inactive: {
      color: "#9ca3af",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      scale: 1,
    }
  };

  return (
    <section id="media" className="py-24 bg-[#030014]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
            Media Gallery
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore screenshots and videos from the world of Ethereal Realms
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 p-1 rounded-full backdrop-blur-md">
            <motion.button
              variants={tabVariants}
              animate={activeTab === 'screenshots' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('screenshots')}
              className="px-6 py-2 rounded-full text-lg font-medium"
            >
              Screenshots
            </motion.button>
            <motion.button
              variants={tabVariants}
              animate={activeTab === 'videos' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab('videos')}
              className="px-6 py-2 rounded-full text-lg font-medium"
            >
              Videos
            </motion.button>
          </div>
        </div>

        {activeTab === 'screenshots' && (
          <div className="max-w-5xl mx-auto">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-xl overflow-hidden mb-3"
            >
              {screenshots.map((screenshot) => (
                <SwiperSlide key={screenshot.id}>
                  <div className="relative">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-xl font-bold text-white">{screenshot.title}</h3>
                      <p className="text-gray-300">{screenshot.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbnails-swiper"
            >
              {screenshots.map((screenshot) => (
                <SwiperSlide key={screenshot.id} className="cursor-pointer rounded-lg overflow-hidden">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-24 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden group hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-400">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection; 