'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cx = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

const SIZES = ['S', 'M', 'L', 'XL'];

const PRODUCTS = [
  {
    id: 'p1',
    name: 'ASYM-SHELL',
    code: 'G-V1',
    price: 420.0,
    image: '/images/outfitsandgarments/dark grey vest.png',
  },
  {
    id: 'p2',
    name: 'CELLULAR-KNIT',
    code: 'BLK',
    price: 350.0,
    image: '/images/outfitsandgarments/sweater.png',
  },
  {
    id: 'p3',
    name: 'PATCH-TROUSER',
    code: 'V1',
    price: 480.0,
    image: '/images/outfitsandgarments/patch pants.png',
  },
  {
    id: 'p4',
    name: 'WAVE-SHELL',
    code: 'L-G',
    price: 420.0,
    image: '/images/outfitsandgarments/grey vest.png',
  },
  {
    id: 'p5',
    name: 'BI-TONAL',
    code: '50-50',
    price: 460.0,
    image: '/images/outfitsandgarments/5050 pants.png',
  },
];

interface ProductRackProps {
  id: string;
  dataSection?: number;
  navIndex?: number;
  onOpenCart?: () => void;
  cartCount?: number;
  onAddToCart?: (item: {
    productId: string;
    name: string;
    code: string;
    price: number;
    size: string;
    image: string;
  }) => void;
}

export default function ProductRack({
  id,
  dataSection,
  navIndex,
  onOpenCart,
  cartCount = 0,
  onAddToCart,
}: ProductRackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );

  const handleSizeSelect = (
    e: React.MouseEvent,
    productId: string,
    size: string
  ) => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const addToCart = (e: React.MouseEvent, product: (typeof PRODUCTS)[0]) => {
    e.stopPropagation();

    // Default size to 'M' if not selected
    const size = selectedSizes[product.id] || 'M';

    if (onAddToCart) {
      onAddToCart({
        productId: product.id,
        name: product.name,
        code: product.code,
        price: product.price,
        size: size,
        image: product.image,
      });
    }

    // Trigger animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 300);
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      data-nav-group={navIndex}
      data-segment-type="content"
      // Removed bg-white
      className="relative z-30 flex h-[80vh] min-h-[80vh] w-full flex-col md:p-6"
    >
      {/* Absolute "System Counter" Cart - Pinned Top Right */}
      <button
        onClick={onOpenCart}
        className={cx(
          'absolute top-10 left-1/2 z-50 flex -translate-x-1/2 animate-pulse cursor-pointer flex-col items-center font-mono text-[10px] font-bold tracking-[0.2em] text-black uppercase hover:text-black/70',
          isAdded ? 'scale-110' : ''
        )}
      >
        <span>CART</span>
      </button>

      {/* DESKTOP ACCORDION (Hidden on Mobile) */}
      <div className="hidden h-full w-full gap-4 md:flex">
        {PRODUCTS.map((product, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cx(
                'group relative h-full cursor-pointer flex-col overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm transition-all duration-700 ease-[0.22,1,0.36,1]',
                isHovered ? 'flex-[4] shadow-xl' : 'flex-[1]'
              )}
            >
              {/* Image Layer - Full Height */}
              <div className="absolute inset-0 h-full w-full p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-zinc-50 transition-colors duration-500 group-hover:bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-4 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition-colors duration-500">
                {/* Top ID - Standard */}
                <div className="font-mono text-[10px] tracking-widest text-black/60 group-hover:text-black">
                  {product.code}
                </div>

                {/* Right - Collapsed State (Vertical Text) */}
                <div
                  className={cx(
                    'absolute top-1/2 right-6 translate-x-1/3 -translate-y-1/2 whitespace-nowrap transition-opacity duration-300',
                    isHovered ? 'opacity-0 delay-0' : 'opacity-100 delay-300'
                  )}
                >
                  <span className="block rotate-90 font-mono text-xs font-bold tracking-[0.2em] text-neutral-400">
                    {product.name.split('-')[0]} // {product.id}
                  </span>
                </div>

                {/* Bottom - Expanded Tech Spec Panel */}
                <div
                  className={cx(
                    'relative translate-y-8 opacity-0 transition-all duration-500 ease-out',
                    isHovered ? 'translate-y-0 opacity-100 delay-100' : ''
                  )}
                >
                  <div className="flex flex-col space-y-3 rounded-xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-md">
                    <div className="flex flex-col border-l-2 border-black pl-3">
                      <h3 className="font-geist-sans text-2xl leading-none font-black tracking-tighter uppercase">
                        {product.name}
                      </h3>
                      <span className="mt-1 font-mono text-xs text-neutral-500">
                        ${product.price.toFixed(2)} USD
                      </span>
                    </div>

                    {/* Size Selector */}
                    <div className="flex w-full space-x-1">
                      {SIZES.map((size) => {
                        const isSelected =
                          (selectedSizes[product.id] || 'M') === size;
                        return (
                          <button
                            key={size}
                            onClick={(e) =>
                              handleSizeSelect(e, product.id, size)
                            }
                            className={cx(
                              'flex-1 rounded-md border py-2 font-mono text-xs transition-colors',
                              isSelected
                                ? 'border-black bg-black text-white'
                                : 'border-neutral-200 bg-transparent text-neutral-500 hover:border-black hover:text-black'
                            )}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={(e) => addToCart(e, product)}
                      className="w-full rounded-md bg-black py-3 font-mono text-xs text-white transition-transform hover:bg-neutral-800 active:scale-95"
                    >
                      [ + ADD TO CART ]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE SCROLL CAROUSEL (Visible on Mobile) */}
      <div className="scrollbar-hide flex h-full w-full snap-x snap-mandatory gap-4 overflow-x-auto bg-transparent p-6 md:hidden">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="relative flex h-full w-[85vw] flex-none snap-center flex-col overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm"
          >
            {/* Image Layer - Top ~60% */}
            <div className="relative w-full flex-[3] overflow-hidden rounded-t-[32px] bg-zinc-50 p-4">
              <div className="relative h-full w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Content Layer - Bottom ~40% */}
            <div className="relative flex flex-[2] flex-col justify-between rounded-b-[32px] bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    {product.code}
                  </div>
                  <h3 className="font-geist-sans mt-1 text-2xl leading-none font-black tracking-tighter uppercase">
                    {product.name}
                  </h3>
                </div>
                <div className="font-mono text-lg font-bold">
                  ${product.price}
                </div>
              </div>

              {/* Size & Add */}
              <div className="mt-4 space-y-3">
                <div className="flex w-full space-x-1">
                  {SIZES.map((size) => {
                    const isSelected =
                      (selectedSizes[product.id] || 'M') === size;
                    return (
                      <button
                        key={size}
                        onClick={(e) => handleSizeSelect(e, product.id, size)}
                        className={cx(
                          'flex-1 rounded-md border py-3 font-mono text-[10px] transition-colors',
                          isSelected
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 bg-transparent text-neutral-500'
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={(e) => addToCart(e, product)}
                  className="w-full rounded-md bg-black py-4 font-mono text-xs text-white active:scale-95"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-0 -bottom-2 left-0 flex justify-center pb-2 md:hidden">
        <span className="animate-pulse font-mono text-[10px] tracking-[0.2em] text-neutral-400">
          {'< SWIPE >'}
        </span>
      </div>
    </section>
  );
}
