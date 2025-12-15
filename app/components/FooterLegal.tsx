'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LegalOverlay from './LegalOverlay';
import { useLanguage } from '../context/LanguageContext';

export default function FooterLegal() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [overlayType, setOverlayType] = useState<'privacy' | 'terms' | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      // Show when user is near bottom (e.g. within 100px)
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      setIsVisible(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass =
    'fixed bottom-2 sm:bottom-8 text-[10px] sm:text-sm font-sans tracking-widest text-black/40 hover:text-black/100 transition-colors duration-300 uppercase cursor-pointer z-40 select-none';

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Terms - Left Corner */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className={`${linkClass} left-8 sm:left-12`}
              onClick={() => setOverlayType('terms')}
            >
              {t('footer.terms')}
            </motion.button>

            {/* Privacy - Right Corner */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className={`${linkClass} right-8 sm:right-12`}
              onClick={() => setOverlayType('privacy')}
            >
              {t('footer.privacy')}
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <LegalOverlay
        isOpen={!!overlayType}
        type={overlayType}
        onClose={() => setOverlayType(null)}
      />
    </>
  );
}
