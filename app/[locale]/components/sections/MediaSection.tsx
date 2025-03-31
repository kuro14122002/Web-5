'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import type { Swiper as SwiperType } from 'swiper';

interface MediaItem {
  id: number;
  title: string;
  description: string;
  image: string;
  videoId?: string;
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
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
    <motion.button
      variants={tabVariants}
      animate={isActive ? 'active' : 'inactive'}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="px-6 py-2 rounded-full text-lg font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
      aria-pressed={isActive}
    >
      {children}
    </motion.button>
  );
};

const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('screenshots');
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const t = useTranslations('media');
  
  const screenshots: MediaItem[] = [
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

  const videos: MediaItem[] = [
    {
      id: 1,
      title: "Official Cinematic Trailer",
      description: "Witness the epic tale of Ethereal Realms in this breathtaking cinematic trailer.",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Combat Showcase",
      description: "Deep dive into the dynamic combat system with this gameplay demonstration.",
      image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1974",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Developer Diary #1",
      description: "The team shares insights into the creation of Ethereal Realms' immersive world.",
      image: "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?q=80&w=1974",
      videoId: "dQw4w9WgXcQ"
    },
  ];

  return (
    <section id="media" className="py-24 bg-[#030014]" aria-labelledby="media-title">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 id="media-title" className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center mb-8" role="tablist" aria-label="Media types">
          <div className="inline-flex bg-white/5 p-1 rounded-full backdrop-blur-md">
            <TabButton
              isActive={activeTab === 'screenshots'}
              onClick={() => setActiveTab('screenshots')}
            >
              {t('screenshots')}
            </TabButton>
            <TabButton
              isActive={activeTab === 'videos'}
              onClick={() => setActiveTab('videos')}
            >
              {t('videos')}
            </TabButton>
          </div>
        </div>

        {activeTab === 'screenshots' && (
          <div className="max-w-5xl mx-auto" role="tabpanel" aria-label="Screenshots gallery">
            <Swiper
              spaceBetween={10}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-xl overflow-hidden mb-3"
            >
              {screenshots.map((screenshot) => (
                <SwiperSlide key={screenshot.id}>
                  <div className="relative aspect-video">
                    <Image
                      src={screenshot.image}
                      alt={screenshot.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover"
                      quality={90}
                      priority={screenshot.id === 1}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h3 className="text-xl font-bold text-white">{screenshot.title}</h3>
                      <p className="text-gray-300">{screenshot.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm" />
              <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm" />
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
                  <div className="relative aspect-video">
                    <Image
                      src={screenshot.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 20vw, 192px"
                      className="object-cover"
                      quality={60}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {activeTab === 'videos' && (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            role="tabpanel" 
            aria-label="Videos gallery"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative aspect-video">
                  <LiteYouTubeEmbed
                    id={video.videoId!}
                    title={video.title}
                    poster="maxresdefault"
                    webp
                    noCookie={true}
                    params="rel=0"
                  />
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

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {t('viewAll')}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;