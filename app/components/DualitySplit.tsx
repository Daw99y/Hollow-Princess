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
    title: 'Benediction',
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
    title: 'Anathema',
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

// --- Internal Component for Card ---
function ParallaxCard({
  outfit,
  hoveredSide,
  setHoveredSide,
  activeInfoId,
  onInfoClick,
  onClose,
}: {
  outfit: (typeof OUTFITS)[0];
  hoveredSide: 'left' | 'right' | null;
  setHoveredSide: (side: 'left' | 'right' | null) => void;
  activeInfoId: string | null;
  onInfoClick: (e: React.MouseEvent, id: string) => void;
  onClose: (e?: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={() => setHoveredSide(outfit.side)}
      onMouseLeave={() => setHoveredSide(null)}
      className="group relative h-full cursor-pointer overflow-hidden rounded-[40px] border border-neutral-200 bg-white shadow-sm transition-all duration-700 ease-[0.22,1,0.36,1]"
      animate={{
        flex: hoveredSide === outfit.side ? 2 : hoveredSide === null ? 1 : 1,
      }}
      transition={SPRING_TRANSITION}
    >
      <div className="absolute inset-0 h-full w-full p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-zinc-50 transition-colors duration-500 group-hover:bg-white">
          <div className="absolute inset-0 z-0 flex items-center justify-center p-8">
            <motion.h2
              className="text-center font-sans text-5xl leading-none font-black tracking-tighter text-neutral-200 uppercase md:text-7xl lg:text-8xl"
              animate={{
                scale:
                  hoveredSide === outfit.side
                    ? 1
                    : hoveredSide === null
                      ? 1
                      : 0.6,
                opacity:
                  hoveredSide === outfit.side
                    ? 1
                    : hoveredSide === null
                      ? 1
                      : 0.5,
                color:
                  hoveredSide === outfit.side
                    ? 'rgba(0,0,0,0.1)'
                    : 'rgb(229,229,229)',
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {outfit.title}
            </motion.h2>
            <button
              onClick={(e) => onInfoClick(e, outfit.id)}
              className={`absolute bottom-8 z-50 w-fit animate-pulse font-mono text-xs font-bold tracking-widest text-black hover:text-neutral-500 ${
                outfit.side === 'right' ? 'right-8' : 'left-8'
              }`}
            >
              INFO
            </button>
          </div>

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
                  {/* Reuse Close Icon */}
                  <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white shadow-md"
                  >
                    ×
                  </button>

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
        </div>
      </div>
    </motion.div>
  );
}

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
          <ParallaxCard
            key={outfit.id}
            outfit={outfit}
            hoveredSide={hoveredSide}
            setHoveredSide={setHoveredSide}
            activeInfoId={activeInfoId}
            onInfoClick={handleInfoClick}
            onClose={handleClose}
          />
        ))}
      </div>

      {/* MOBILE SWIPE CAROUSEL (Visible on Mobile) */}
      <div className="scrollbar-hide flex h-full w-full snap-x snap-mandatory gap-4 overflow-x-auto bg-transparent p-6 md:hidden">
        {OUTFITS.map((outfit) => (
          <div
            key={outfit.id}
            className="relative h-full w-[85vw] flex-none snap-center overflow-hidden rounded-[40px] border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[32px] bg-zinc-50">
              {/* Background Text & Info Button */}
              <div className="absolute inset-0 z-0 flex items-center justify-center bg-zinc-50 p-6">
                <h2 className="text-center font-sans text-4xl leading-none font-black tracking-tighter text-neutral-200 uppercase">
                  {outfit.title}
                </h2>
                <button
                  onClick={(e) => handleInfoClick(e, outfit.id)}
                  className="absolute top-6 right-6 z-50 w-fit animate-pulse font-mono text-xs font-bold tracking-widest text-black"
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
