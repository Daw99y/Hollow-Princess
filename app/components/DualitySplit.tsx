'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 220,
  damping: 30,
};

const OUTFITS = [
  {
    id: 'patch',
    side: 'left' as const,
    title: 'PATCH',
    codeNum: '01 // PATCH',
    image: '/images/outfitsandgarments/patch-outfit-transp.png',
    info: {
      title: 'Patchwork Shell',
      code: 'P-S-01-V2',
      spec: '3L Waterproof',
      details: 'Asymmetric Cut',
    },
  },
  {
    id: '5050s',
    side: 'right' as const,
    title: '5050S',
    codeNum: '02 // 5050S',
    image: '/images/outfitsandgarments/5050-outfit-transp.png',
    info: {
      title: '50/50 Split Shell',
      code: 'S-50-02-V1',
      spec: 'Dual Texture',
      details: 'Modular Zip',
    },
  },
];

interface DualitySplitProps {
  id?: string;
  dataSection?: number;
  navIndex?: number;
}

export default function DualitySplit({
  id,
  dataSection,
  navIndex,
}: DualitySplitProps) {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);

  const handleInfoClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveInfoId(id);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveInfoId(null);
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      data-nav-group={navIndex}
      data-segment-type="content"
      className="relative z-10 flex h-[80vh] w-full flex-col md:p-6"
    >
      {/* Click-outside backdrop */}
      {activeInfoId && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={handleClose}
        />
      )}

      {/* DESKTOP LAYOUT (Hidden on Mobile) */}
      <div className="hidden h-full w-full gap-6 md:flex">
        {OUTFITS.map((outfit) => (
          <motion.div
            key={outfit.id}
            layout
            onMouseEnter={() => setHoveredSide(outfit.side)}
            onMouseLeave={() => setHoveredSide(null)}
            className="group relative h-full cursor-pointer overflow-hidden rounded-[40px] border border-neutral-200 bg-white shadow-sm transition-all duration-700 ease-[0.22,1,0.36,1]"
            animate={{
              flex:
                hoveredSide === outfit.side ? 2 : hoveredSide === null ? 1 : 1,
            }}
            transition={SPRING_TRANSITION}
          >
            {/* Background Text & Info Button - Behind Image */}
            <div
              className={`absolute inset-0 z-0 flex flex-col justify-between p-8 ${
                outfit.side === 'right' ? 'items-end text-right' : ''
              }`}
            >
              <h2 className="font-tanker text-5xl leading-none tracking-widest text-neutral-200 uppercase transition-colors group-hover:text-black/10 md:text-[8rem] lg:text-[14rem]">
                {outfit.title}
              </h2>
              <button
                onClick={(e) => handleInfoClick(e, outfit.id)}
                className="z-50 w-fit animate-pulse font-mono text-xs font-bold tracking-widest text-black hover:text-neutral-500"
              >
                INFO
              </button>
            </div>

            {/* Image Layer - z-10 */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-2 md:p-10">
              <div className="relative h-full w-full">
                <Image
                  src={outfit.image}
                  alt={`${outfit.title} Outfit`}
                  fill
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>

            {/* Overlay Info (Technical Description) */}
            <AnimatePresence>
              {activeInfoId === outfit.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-8 z-50 w-auto ${
                    outfit.side === 'right' ? 'right-8' : 'left-8'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={`relative space-y-4 rounded-lg border border-neutral-100 bg-white/90 p-6 shadow-xl backdrop-blur-md ${
                      outfit.side === 'right' ? 'text-right' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                        Title
                      </div>
                      <div className="font-geist-sans text-2xl font-bold tracking-tight text-neutral-900 uppercase">
                        {outfit.info.title}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                        Code
                      </div>
                      <div className="font-mono text-sm text-neutral-700 uppercase">
                        {outfit.info.code}
                      </div>
                    </div>

                    <div className="h-px w-full bg-neutral-200"></div>

                    <div
                      className={`flex space-x-8 ${
                        outfit.side === 'right' ? 'justify-end' : ''
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Spec
                        </div>
                        <div className="font-mono text-xs text-neutral-700">
                          {outfit.info.spec}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Details
                        </div>
                        <div className="font-mono text-xs text-neutral-700">
                          {outfit.info.details}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* MOBILE SWIPE CAROUSEL (Visible on Mobile) */}
      <div className="scrollbar-hide flex h-full w-full snap-x snap-mandatory gap-4 overflow-x-auto bg-transparent p-6 md:hidden">
        {OUTFITS.map((outfit) => (
          <div
            key={outfit.id}
            className="relative flex h-full w-[85vw] flex-none snap-center flex-col overflow-hidden rounded-[40px] border border-neutral-200 bg-white shadow-sm"
          >
            {/* Background Text & Info Button */}
            <div className="absolute inset-0 z-0 flex flex-col justify-between p-6">
              <h2 className="font-tanker text-5xl leading-none tracking-widest text-neutral-200 uppercase">
                {outfit.title}
              </h2>
              <button
                onClick={(e) => handleInfoClick(e, outfit.id)}
                className="z-50 w-fit animate-pulse font-mono text-xs font-bold tracking-widest text-black"
              >
                INFO
              </button>
            </div>

            {/* Image Layer */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
              <div className="relative h-full w-full">
                <Image
                  src={outfit.image}
                  alt={outfit.title}
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

            {/* Overlay Info (Mobile Centered/Bottom) */}
            <AnimatePresence>
              {activeInfoId === outfit.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-6 bottom-6 left-6 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative space-y-4 rounded-lg border border-neutral-100 bg-white/90 p-6 shadow-xl backdrop-blur-md">
                    {/* Reuse Close Icon */}
                    <button
                      onClick={handleClose}
                      className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white shadow-md"
                    >
                      ×
                    </button>

                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Title
                        </div>
                        <div className="font-geist-sans text-xl font-bold tracking-tight text-neutral-900 uppercase">
                          {outfit.info.title}
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Code
                        </div>
                        <div className="font-mono text-xs text-neutral-700 uppercase">
                          {outfit.info.code}
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-neutral-200"></div>

                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Spec
                        </div>
                        <div className="font-mono text-xs text-neutral-700">
                          {outfit.info.spec}
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                          Details
                        </div>
                        <div className="font-mono text-xs text-neutral-700">
                          {outfit.info.details}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Mobile Swipe Indicator */}
      <div className="absolute right-0 -bottom-2 left-0 flex justify-center pb-2 md:hidden">
        <span className="animate-pulse font-mono text-[10px] tracking-[0.2em] text-neutral-400">
          {'< SWIPE >'}
        </span>
      </div>
    </section>
  );
}
