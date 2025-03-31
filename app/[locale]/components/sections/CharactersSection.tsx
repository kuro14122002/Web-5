'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  abilities: string[];
  image: string;
  color: string;
}

interface CharacterCardProps {
  character: Character;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const CharactersSection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const t = useTranslations('characters');

  const characters: Character[] = [
    {
      id: 1,
      name: t('characters.0.name'),
      role: t('characters.0.role'),
      description: t('characters.0.description'),
      abilities: t('characters.0.abilities') as unknown as string[],
      image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1974",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 2,
      name: t('characters.1.name'),
      role: t('characters.1.role'),
      description: t('characters.1.description'),
      abilities: t('characters.1.abilities') as unknown as string[],
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      name: t('characters.2.name'),
      role: t('characters.2.role'),
      description: t('characters.2.description'),
      abilities: t('characters.2.abilities') as unknown as string[],
      image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe3?q=80&w=1948",
      color: "from-teal-400 to-emerald-500",
    },
  ];

  return (
    <section id="characters" className="py-24 relative overflow-hidden bg-[#030014]" aria-labelledby="characters-title">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="characters-title" className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {characters.map((character, index) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              index={index}
              isSelected={selectedCharacter === index}
              onClick={() => setSelectedCharacter(index)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-violet-800/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                {characters[selectedCharacter].name}
              </h3>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${characters[selectedCharacter].color} text-white`}>
                {characters[selectedCharacter].role}
              </div>
              <p className="text-gray-300 mb-6">
                {characters[selectedCharacter].description}
              </p>
              
              <div>
                <h4 className="text-lg font-semibold mb-2 text-violet-300">{t('signatureAbilities')}</h4>
                <ul className="space-y-2">
                  {characters[selectedCharacter].abilities.map((ability, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="mr-2 text-violet-400" aria-hidden="true">✦</span>
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/20 transition duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                aria-label={`${t('viewFullProfile')} ${characters[selectedCharacter].name}`}
              >
                {t('viewFullProfile')}
              </button>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" aria-hidden="true"></div>
              <Image 
                src={characters[selectedCharacter].image} 
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
                priority={selectedCharacter === 0}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CharacterCard = ({ character, index, isSelected, onClick }: CharacterCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/20' : ''
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" aria-hidden="true"></div>
        <Image 
          src={character.image} 
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-xl font-bold text-white">{character.name}</h3>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${character.color} text-white`}>
            {character.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharactersSection;