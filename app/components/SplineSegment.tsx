"use client";

import { motion } from "framer-motion";

interface SplineSegmentProps {
  id: string;
  dataSection: number;
  navIndex: number;
}

export default function SplineSegment({
  id,
  dataSection,
  navIndex,
}: SplineSegmentProps) {
  return (
    <motion.section
      id={id}
      data-section={dataSection}
      className="relative z-20 flex min-h-screen h-screen w-full items-center px-8 md:px-20"
      data-nav-group={navIndex}
      data-segment-type="spline"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.4, once: false }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  );
}
