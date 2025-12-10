'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 120,
  damping: 25,
  mass: 1.2,
};

const OUTFITS = [
  {
    id: 'patch',
    side: 'left' as const,
    title: 'Anathema',
    codeNum: '01 // PATCH',
    image: '/images/outfitsandgarments/patch-outfit-transp.png',
    narrative: {
      header: 'ANATHEMA // STASIS PROTOCOL',
      subHeader: 'SUBJECT: THE "PATCH" SYSTEM',
      body: 'Designed for the handling and transport of the Endless serum. The "Patch" system prioritizes utilitarian endurance for bodies suspended in time. The "cellular" mesh underlay allows for ventilation, while distressed laddering mimics the natural decay the serum prevents.',
      techLog: [
        {
          label: 'MODULAR',
          value: 'Oversized bellows pockets for serum vial security.',
        },
        {
          label: 'SHIELDING',
          value: 'Asymmetric raw-hem paneling for core protection.',
        },
      ],
    },
  },
  {
    id: '5050s',
    side: 'right' as const,
    title: 'Benediction',
    codeNum: '02 // 5050S',
    image: '/images/outfitsandgarments/5050-outfit-transp-v2.png',
    narrative: {
      header: 'BENEDICTION // FLUID STATE',
      subHeader: 'SUBJECT: THE "5050" WAVE VARIANT',
      body: 'A visual study of the Endless serum entering the bloodstream. The "5050S" silhouette rejects linear structure for organic fluidity. The bi-tonal split represents the threshold between the aging mortal self and the preserved synthetic eternal.',
      techLog: [
        { label: 'GEOMETRY', value: 'Sinusoidal "Wave" panel cutting.' },
        {
          label: 'TEXTURE',
          value: '3D "scale" dimensional articulation on lower chassis.',
        },
      ],
    },
  },
];

// --- Internal Component for Card ---
function ParallaxCard({
  outfit,
  hoveredSide,
  setHoveredSide,
  activeInfoId,
  setActiveInfoId,
  onInfoClick,
  onClose,
}: {
  outfit: (typeof OUTFITS)[0];
  hoveredSide: 'left' | 'right' | null;
  setHoveredSide: (side: 'left' | 'right' | null) => void;
  activeInfoId: string | null;
  setActiveInfoId: (id: string | null) => void;
  onInfoClick: (e: React.MouseEvent, id: string) => void;
  onClose: (e?: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={() => {
        setHoveredSide(outfit.side);
        setActiveInfoId(outfit.id);
      }}
      onMouseLeave={() => {
        setHoveredSide(null);
        setActiveInfoId(null);
      }}
      className="group relative h-full cursor-pointer overflow-hidden rounded-[40px] border border-neutral-200 bg-white shadow-sm transition-all duration-700 ease-[0.22,1,0.36,1]"
      animate={{
        flex:
          hoveredSide === outfit.side || activeInfoId === outfit.id ? 1.8 : 1,
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
                  hoveredSide === outfit.side || activeInfoId === outfit.id
                    ? 1
                    : hoveredSide === null
                      ? 1
                      : 0.6,
                opacity:
                  hoveredSide === outfit.side || activeInfoId === outfit.id
                    ? 1
                    : hoveredSide === null
                      ? 1
                      : 0.5,
                color:
                  hoveredSide === outfit.side || activeInfoId === outfit.id
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute bottom-6 z-50 w-full max-w-md ${
                  outfit.side === 'right'
                    ? 'right-6 md:right-auto md:left-6'
                    : 'left-6'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* GLASS NARRATIVE CARD (LIGHT MODE) */}
                <div className="relative overflow-hidden rounded-[24px] border border-black/[0.04] bg-white/85 p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                  {/* Subtle Inner Highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/50 ring-inset" />

                  <button
                    onClick={onClose}
                    className="group absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-neutral-500 transition-colors hover:bg-black/10 hover:text-black"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>

                  <div className="relative space-y-6 text-left">
                    {/* Headers */}
                    <div className="space-y-1">
                      <h3 className="animate-pulse font-sans text-xs font-bold tracking-[0.15em] text-neutral-900 uppercase">
                        {outfit.narrative.header}
                      </h3>
                      <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                        {outfit.narrative.subHeader}
                      </div>
                    </div>

                    {/* Narrative Body */}
                    <p className="font-sans text-sm leading-relaxed font-medium text-neutral-700">
                      {outfit.narrative.body}
                    </p>

                    {/* Technical Log */}
                    <div className="space-y-2 border-t border-black/[0.06] pt-4">
                      {outfit.narrative.techLog.map((log, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-1 text-[11px] font-medium sm:flex-row sm:gap-2"
                        >
                          <span className="shrink-0 font-mono text-neutral-400 uppercase">
                            {log.label}:
                          </span>
                          <span className="font-mono text-neutral-600">
                            {log.value}
                          </span>
                        </div>
                      ))}
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
    setHoveredSide(null); // Force collapse
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      data-nav-group={navIndex}
      data-segment-type="content"
      className="relative z-10 flex h-[80vh] w-full flex-col md:p-6"
    >
      {/* Click-outside backdrop (Mobile Only) */}
      {activeInfoId && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
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
            setActiveInfoId={setActiveInfoId}
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
                    className="absolute right-4 bottom-4 left-4 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* MOBILE CARD VERSION (LIGHT MODE) */}
                    <div className="relative overflow-hidden rounded-[24px] border border-black/[0.04] bg-white/90 p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                      <button
                        onClick={handleClose}
                        className="group absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-neutral-500 transition-colors hover:bg-black/10 hover:text-black"
                      >
                        <X size={14} strokeWidth={2.5} />
                      </button>

                      <div className="relative space-y-4 text-left">
                        <div className="space-y-1">
                          <h3 className="font-sans text-[10px] font-bold tracking-[0.15em] text-neutral-900 uppercase">
                            {outfit.narrative.header}
                          </h3>
                          <div className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                            {outfit.narrative.subHeader}
                          </div>
                        </div>

                        <p className="font-sans text-xs leading-relaxed font-medium text-neutral-700">
                          {outfit.narrative.body}
                        </p>
                        <div className="space-y-2 border-t border-black/[0.06] pt-3">
                          {outfit.narrative.techLog.map((log, i) => (
                            <div
                              key={i}
                              className="flex flex-col gap-0 text-[10px] sm:flex-row sm:gap-2"
                            >
                              <span className="shrink-0 font-mono text-neutral-400 uppercase">
                                {log.label}:
                              </span>
                              <span className="font-mono text-neutral-600">
                                {log.value}
                              </span>
                            </div>
                          ))}
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
