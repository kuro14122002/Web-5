'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CharactersSection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const characters = [
    {
      id: 1,
      name: "Aria Nightshade",
      role: "Shadow Assassin",
      description: "A master of stealth and precision, Aria strikes from the shadows with deadly accuracy. Her twin blades are said to be forged from the essence of darkness itself.",
      abilities: ["Shadow Step", "Death Mark", "Veil of Shadows"],
      image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1974",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Ragnar Stormfury",
      role: "Elemental Warrior",
      description: "Born amidst a legendary storm, Ragnar wields the raw power of thunder and lightning. His mighty warhammer can call down bolts from the heavens to smite his enemies.",
      abilities: ["Thunder Strike", "Lightning Surge", "Storm Shield"],
      image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      name: "Elara Moonsong",
      role: "Celestial Healer",
      description: "Blessed by the moon goddess, Elara possesses powerful healing abilities and protective magic. Her melodic enchantments can mend wounds and reinvigorate allies in battle.",
      abilities: ["Lunar Blessing", "Celestial Aura", "Star's Embrace"],
      image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1948",
      color: "from-teal-400 to-emerald-500",
    },
  ];

  return (
    <section id="characters" className="py-24 relative overflow-hidden bg-[#030014]">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
            Legendary Characters
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose your champion and master their unique abilities
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
                <h4 className="text-lg font-semibold mb-2 text-violet-300">Signature Abilities</h4>
                <ul className="space-y-2">
                  {characters[selectedCharacter].abilities.map((ability, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="mr-2 text-violet-400">✦</span>
                      {ability}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/20 transition duration-300">
                View Full Profile
              </button>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={characters[selectedCharacter].image} 
                alt={characters[selectedCharacter].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CharacterCard = ({ character, index, isSelected, onClick }: { 
  character: any, 
  index: number,
  isSelected: boolean,
  onClick: () => void
}) => {
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
      whileHover={{ y: -10 }}
      className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-violet-500 shadow-lg shadow-violet-500/20' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-full object-cover"
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