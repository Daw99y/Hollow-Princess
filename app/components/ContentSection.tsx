"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ContentSectionProps {
  id: string;
  dataSection: number;
  navIndex: number;
  headline?: string;
  subline?: string;
  children?: ReactNode;
}

export default function ContentSection({
  id,
  dataSection,
  navIndex,
  headline = "Interlude",
  subline = "White void placeholder",
  children,
}: ContentSectionProps) {
  return (
    <motion.section
      id={id}
      data-section={dataSection}
      data-nav-group={navIndex}
      data-segment-type="content"
      className="relative z-30 flex h-[80vh] min-h-[80vh] w-full items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center space-y-4 px-8 text-center text-neutral-600">
        <p className="font-geist-mono text-xs uppercase tracking-[0.35em] text-neutral-500">
          {subline}
        </p>
        <h3 className="font-geist-sans text-4xl tracking-widest text-neutral-700">
          {headline}
        </h3>
        <div className="w-full max-w-3xl font-geist-sans text-sm tracking-wide text-neutral-500">
          {children ?? (
            <span className="opacity-70">
              Future editorial copy will appear here. This section intentionally
              pauses the 3D motion.
            </span>
          )}
        </div>
      </div>
    </motion.section>
  );
}

