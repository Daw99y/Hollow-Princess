'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start with loader visible
  const [showLoader, setShowLoader] = useState(true);
  // Start with content hidden
  const [showContent, setShowContent] = useState(false);

  // Wait signals
  const [splineReady, setSplineReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [docLoaded, setDocLoaded] = useState(false);

  // 1. Hydration check
  useEffect(() => {
    setHydrated(true);
  }, []);

  // 2. Event listeners for Spline and Window Load
  useEffect(() => {
    const handleLoad = () => setDocLoaded(true);
    const handleSplineReady = () => setSplineReady(true);

    if (document.readyState === 'complete') {
      setDocLoaded(true);
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    window.addEventListener('spline:ready', handleSplineReady, { once: true });

    return () => {
      window.removeEventListener('load', handleLoad as any);
      window.removeEventListener('spline:ready', handleSplineReady as any);
    };
  }, []);

  // 3. Lock Scroll when loader is active
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showLoader]);

  // Combined readiness check
  const canDismiss = splineReady && (hydrated || docLoaded);

  // Cross-Dissolve Logic:
  // 1. Content: Start fading IN (Opacity 0 -> 1)
  // 2. Loader: Start fading OUT (via AnimatePresence exit)
  // Both happen simultaneously when canDismiss becomes true.
  useEffect(() => {
    if (canDismiss) {
      setShowContent(true);
      setShowLoader(false);
    }
  }, [canDismiss]);

  return (
    <>
      <motion.div
        key="content"
        className="relative z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 3.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>

      <div className="relative z-50">
        <AnimatePresence>{showLoader && <LoadingScreen />}</AnimatePresence>
      </div>
    </>
  );
}
