'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-[60] flex items-center gap-2 text-xs font-bold text-neutral-900 transition-all hover:scale-105 md:top-12 md:right-12"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <span
        className={
          language === 'ENG' ? 'text-black' : 'font-medium text-neutral-400'
        }
      >
        ENG
      </span>
      <span className="text-neutral-300">/</span>
      <span
        className={
          language === 'KOR' ? 'text-black' : 'font-medium text-neutral-400'
        }
      >
        KR
      </span>
    </motion.button>
  );
}
