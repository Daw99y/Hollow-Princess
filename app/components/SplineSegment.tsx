"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SplineSegmentProps {
  id: string;
  dataSection: number;
  index: number;
  navIndex: number;
  label?: string;
  description?: string;
}

export default function SplineSegment({
  id,
  dataSection,
  index,
  navIndex,
  label = "Spline Segment",
  description = "Camera path progression",
}: SplineSegmentProps) {
  const segmentRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: segmentRef,
    offset: ["start end", "end start"],
  });

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.85, 0.2]
  );
  const overlayTranslate = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      id={id}
      ref={(node) => {
        segmentRef.current = node;
      }}
      data-section={dataSection}
      className="relative z-20 flex min-h-screen h-screen w-full items-center px-8 md:px-20"
      data-nav-group={navIndex}
      data-segment-type="spline"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.4, once: false }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        style={{ opacity: overlayOpacity, translateY: overlayTranslate }}
        className="w-full text-white"
      >
        <p className="font-geist-sans text-xs uppercase tracking-[0.3em] text-neutral-200/60">
          {String(index).padStart(2, "0")}
        </p>
        <h2 className="mt-4 font-geist-sans text-4xl md:text-5xl tracking-tight text-white/90">
          {label}
        </h2>
        <p className="mt-4 max-w-xl font-geist-sans text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.section>
  );
}

