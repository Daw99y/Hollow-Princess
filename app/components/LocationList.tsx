'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const LOCATIONS = [
  {
    city: 'SEOUL',
    coords: '37.5665° N / 126.9780° E',
    date: '2024.03.15',
    status: 'ACTIVE',
  },
  {
    city: 'BUSAN',
    coords: '35.1796° N / 129.0756° E',
    date: '2024.04.02',
    status: 'PENDING',
  },
  {
    city: 'INCHEON',
    coords: '37.4563° N / 126.7052° E',
    date: '2024.04.20',
    status: 'PENDING',
  },
  {
    city: 'DAEGU',
    coords: '35.8714° N / 128.6014° E',
    date: '2024.05.05',
    status: 'PENDING',
  },
  {
    city: 'JEJU',
    coords: '33.4996° N / 126.5312° E',
    date: '2024.05.15',
    status: 'PENDING',
  },
];

interface LocationListProps {
  id: string;
  dataSection?: number;
  navIndex?: number;
}

export default function LocationList({
  id,
  dataSection,
  navIndex,
}: LocationListProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const handleCityClick = (city: string) => {
    setActiveCity(activeCity === city ? null : city);
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      data-nav-group={navIndex}
      data-segment-type="content"
      className="relative z-10 flex h-[80vh] w-full items-center justify-center p-6 md:p-6"
    >
      {/* 
        Floating Data Slate Container:
        - max-w-[95vw]
        - rounded-[40px]
        - p-4
        - bg-zinc-50 (or subtle glass)
      */}
      <div className="h-full w-full max-w-[95vw] rounded-[40px] border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex h-full w-full flex-col justify-between rounded-[32px] bg-zinc-50 p-6">
          {LOCATIONS.map((loc, index) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => handleCityClick(loc.city)}
              className="group relative flex w-full cursor-pointer items-center justify-between border-b border-black/10 py-2 transition-colors duration-300 last:border-0 hover:rounded-2xl hover:bg-white hover:px-6 hover:shadow-sm md:py-4"
            >
              {/* Left: Index & City Name */}
              <div className="flex items-baseline space-x-6 md:space-x-12">
                <span className="font-mono text-xs text-neutral-400">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3
                  className="font-sans text-4xl font-black tracking-tighter text-transparent transition-all duration-300 group-hover:text-black md:text-7xl lg:text-8xl"
                  style={{
                    WebkitTextStroke: '1px black',
                  }}
                >
                  {loc.city}
                </h3>
              </div>

              {/* Right: Metadata (Fine Print) */}
              <div className="hidden flex-col items-end space-y-1 text-right font-mono text-[10px] tracking-widest text-neutral-500 md:flex">
                <div className="group-hover:text-black">{loc.coords}</div>
                <div>{loc.date}</div>
                <div className="mt-2 text-neutral-400 group-hover:animate-pulse group-hover:text-amber-500">
                  // {loc.status}
                </div>
              </div>

              {/* Mobile Status Only (with Date reveal) */}
              <div className="flex flex-col items-end space-y-1 font-mono text-[10px] text-neutral-400 md:hidden">
                <div
                  className={`transition-all duration-300 ${
                    activeCity === loc.city
                      ? 'translate-y-0 opacity-100'
                      : 'hidden -translate-y-2 opacity-0'
                  }`}
                >
                  {loc.date}
                </div>
                <div
                  className={
                    loc.status === 'PENDING'
                      ? 'animate-pulse text-neutral-500'
                      : ''
                  }
                >
                  {loc.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
