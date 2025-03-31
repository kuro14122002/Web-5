'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LanguageSwitcher = () => {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages: Language[] = [
    { code: 'en', name: t('en'), flag: '🇺🇸' },
    { code: 'vi', name: t('vi'), flag: '🇻🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        const buttons = menuRef.current?.querySelectorAll('button');
        if (!buttons?.length) return;
        
        const currentIndex = Array.from(buttons).findIndex(button => button === document.activeElement);
        const nextIndex = event.key === 'ArrowDown'
          ? (currentIndex + 1) % buttons.length
          : (currentIndex - 1 + buttons.length) % buttons.length;
        
        (buttons[nextIndex] as HTMLButtonElement).focus();
        break;
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    router.push(newPath);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Change language, current language is ${currentLanguage.name}`}
      >
        <span role="img" aria-hidden="true">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-black/80 backdrop-blur-md ring-1 ring-black/10 z-50 overflow-hidden"
            role="listbox"
            aria-label="Language selection"
          >
            <div className="py-1">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className={`${
                    locale === language.code 
                      ? 'bg-violet-600 text-white' 
                      : 'text-gray-300 hover:bg-white/10'
                  } w-full text-left px-4 py-3 text-sm flex items-center space-x-3 focus:outline-none focus:bg-violet-600 focus:text-white transition-colors`}
                  role="option"
                  aria-selected={locale === language.code}
                >
                  <span role="img" aria-hidden="true">{language.flag}</span>
                  <span>{language.name}</span>
                  {locale === language.code && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;