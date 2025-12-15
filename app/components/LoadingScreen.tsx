'use client';

import { AnimatePresence, motion } from 'framer-motion';
import VignetteOverlay from './VignetteOverlay';

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <span className="font-gothic text-2xl tracking-widest text-black md:text-4xl">
        Hollow Princess
      </span>
      <VignetteOverlay />
    </motion.div>
  );
}
