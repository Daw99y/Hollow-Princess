"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function CapsuleHeader() {
  const { scrollY } = useScroll();

  // Transform scroll values for animation over 0-200px range
  const titleScale = useTransform(scrollY, [0, 200], [1.0, 0.85]);
  const titleOpacity = useTransform(scrollY, [0, 200], [1, 0.7]);
  const titleBlur = useTransform(scrollY, [0, 200], [0, 1.5]);
  const sublineOpacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  return (
    <motion.div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none text-center max-w-full px-4">
      <motion.h1
        className="font-gothic text-[clamp(1.5rem,5vw,3rem)] text-neutral-800 tracking-widest relative whitespace-nowrap"
        style={{
          scale: titleScale,
          opacity: titleOpacity,
          filter: `blur(${titleBlur}px)`,
        }}
      >
        Never Ending Swarm
      </motion.h1>
      <motion.h2
        className="font-geist-sans text-xs text-neutral-500/70 dark:text-neutral-400/70 tracking-widest font-light mt-2"
        style={{
          opacity: sublineOpacity,
          scale: titleScale,
        }}
      ></motion.h2>
      <div className="w-8 h-px bg-neutral-500/10 dark:bg-neutral-400/10 mx-auto mt-3"></div>
    </motion.div>
  );
}
