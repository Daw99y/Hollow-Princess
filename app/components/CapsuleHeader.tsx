'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CapsuleHeader() {
  const { scrollY } = useScroll();

  // Transform scroll values for animation over 0-200px range
  const titleScale = useTransform(scrollY, [0, 200], [1.0, 0.85]);
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0.7]);
  const titleBlur = useTransform(scrollY, [0, 200], [0, 1.5]);
  const sublineOpacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  const { t } = useLanguage();

  return (
    <motion.div className="pointer-events-none fixed top-12 left-1/2 z-50 max-w-full -translate-x-1/2 transform px-4 text-center">
      <motion.h1
        className="font-gothic relative text-[clamp(1.5rem,5vw,3rem)] tracking-widest whitespace-nowrap text-neutral-800"
        style={{
          scale: titleScale,
          opacity: titleOpacity,
          filter: `blur(${titleBlur}px)`,
        }}
      >
        {t('header.title')}
      </motion.h1>
      <motion.h2
        className="font-geist-sans mt-2 text-xs font-light tracking-widest text-neutral-500/70 dark:text-neutral-400/70"
        style={{
          opacity: sublineOpacity,
          scale: titleScale,
        }}
      ></motion.h2>
    </motion.div>
  );
}
