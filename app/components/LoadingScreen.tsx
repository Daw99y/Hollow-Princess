"use client";

import { AnimatePresence, motion } from "framer-motion";
import VignetteOverlay from "./VignetteOverlay";

interface LoadingScreenProps {
  done: boolean;
  onFinish: () => void;
}

export default function LoadingScreen({ done, onFinish }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: done ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (done) onFinish();
        }}
      >
        <span className="font-gothic text-2xl md:text-4xl text-black tracking-widest">
          Hollow Princess
        </span>
        <VignetteOverlay />
      </motion.div>
    </AnimatePresence>
  );
}
