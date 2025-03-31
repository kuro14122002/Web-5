'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const HeroSection = () => {
  const t = useTranslations('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const heroData = [
    {
      id: 1,
      title: t('slides.0.title'),
      subtitle: t('slides.0.subtitle'),
      image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070",
      cta: t('slides.0.cta'),
    },
    {
      id: 2,
      title: t('slides.1.title'),
      subtitle: t('slides.1.subtitle'),
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070",
      cta: t('slides.1.cta'),
    },
    {
      id: 3,
      title: t('slides.2.title'),
      subtitle: t('slides.2.subtitle'),
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
      cta: t('slides.2.cta'),
    },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Background Video/Slider */}
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="absolute inset-0 w-full h-full"
      >
        {heroData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:shadow-lg transition-shadow"
                      aria-label={slide.cta}
                    >
                      {slide.cta}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-white/10 transition-colors"
                      aria-label={t('watchTrailer')}
                    >
                      {t('watchTrailer')}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm hidden md:flex" />
        <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black/30 rounded-full backdrop-blur-sm hidden md:flex" />
      </Swiper>

      {/* Progress Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {heroData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Floating game platforms */}
      <div className="absolute bottom-10 right-10 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex gap-4 items-center bg-black/50 backdrop-blur-md p-4 rounded-lg"
        >
          <p className="text-white font-medium">{t('availableOn')}</p>
          <div className="flex gap-3">
            {/* Platform Icons */}
            <button 
              className="text-white bg-white/10 p-2 rounded hover:bg-white/20 transition-colors focus:ring-2 focus:ring-white/50 outline-none"
              aria-label="Available on PC"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 0v24h24V0H0zm13.3 4.3l-1.2.7.7 1.3 1.2-.7c1 .8 2.2 2.1 2.6 3.6h-1.9v1.5h4.4v-1.5h-1c-.4-2-1.9-3.7-3.3-4.9l1.9-1.1-.7-1.3-2.7 1.5zm-12.6.4h8.5v1.5H.7V4.7zm1 3h7.5v1.5H1.7V7.7zm-1 3h8.5v1.5H.7v-1.5zm0 3h8.5v1.5H.7v-1.5zm1 3h7.5v1.5H1.7v-1.5zm12.1.5c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" />
              </svg>
            </button>
            <button
              className="text-white bg-white/10 p-2 rounded hover:bg-white/20 transition-colors focus:ring-2 focus:ring-white/50 outline-none"
              aria-label="Available on PlayStation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5.4 0l.3 2.1L4.4 4.6h4.8l-1.1-2.4.1-2.1h-2.8zm8.9 0l-.1 2.1 1.3 2.4h-4.8l1.1-2.4-.3-2.1h2.8zm-6.2 5h8.4l.9 6.6h-10l.7-6.6zM6.9 18H4.4v-5.8h2.5V18zm2.9 0H7.3v-5.8h2.5V18zm2.9 0h-2.5v-5.8h2.5V18zm2.9 0h-2.5v-5.8h2.5V18zm-9.1 1.5h9.8v2.5H6.5v-2.5zm10.9 0h2.1v2.5h-2.1v-2.5z" />
              </svg>
            </button>
            <button
              className="text-white bg-white/10 p-2 rounded hover:bg-white/20 transition-colors focus:ring-2 focus:ring-white/50 outline-none"
              aria-label="Available on Xbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 0H5.1C2.3 0 0 2.3 0 5.1v13.8C0 21.7 2.3 24 5.1 24h13.8c2.8 0 5.1-2.3 5.1-5.1V5.1C24 2.3 21.7 0 18.9 0zM12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm6.5-11c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <p className="text-white text-sm mb-2">{t('scrollToExplore')}</p>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
            className="w-2 h-2 bg-white rounded-full mt-2"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;