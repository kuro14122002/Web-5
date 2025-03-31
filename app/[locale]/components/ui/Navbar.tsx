'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const t = useTranslations('navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-400">Ethereal</span>
              <span>Realms</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium"
              >
                {t('playNow')}
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 w-full p-4"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks mobile />
              <div className="flex justify-center py-2">
                <LanguageSwitcher />
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium w-full">
                {t('playNow')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const t = useTranslations('navbar');
  
  const links = [
    { name: t('home'), href: '/' },
    { name: t('features'), href: '#features' },
    { name: t('characters'), href: '#characters' },
    { name: t('media'), href: '#media' },
    { name: t('news'), href: '#news' },
  ];

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`${
            mobile 
              ? 'block py-2 text-center hover:bg-white/10 rounded' 
              : 'hover:text-violet-400 transition-colors'
          } text-white font-medium`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Navbar; 