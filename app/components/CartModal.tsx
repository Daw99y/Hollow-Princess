'use client';

import Image from 'next/image';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  code: string;
  price: number;
  size: string;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
}

export default function CartModal({
  isOpen,
  onClose,
  items = [],
}: CartModalProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 
        HUD Container: 
        - w-[60vw] h-[60vh]
        - rounded-[32px]
        - bg-black/80 + backdrop-blur-xl
        - border white/10 (inner glow)
        - large diffuse shadow
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black/80 shadow-[0_0_100px_0_rgba(0,0,0,0.5)] backdrop-blur-xl md:h-[60vh] md:w-[60vw] md:max-w-none md:flex-row"
      >
        {/* Left Column: The Inventory */}
        <div className="flex flex-1 flex-col overflow-hidden p-6 md:w-[70%] md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <h2 className="font-geist-sans text-xl font-medium tracking-tight text-white md:text-2xl">
              My Cart{' '}
              <span className="text-white/40">
                ({items.length.toString().padStart(2, '0')})
              </span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs text-white/60 transition-colors hover:bg-white hover:text-black"
            >
              Close
            </button>
          </div>

          {/* List */}
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 md:space-y-4">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center font-mono text-sm text-white/40">
                Cart is empty
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl border border-white/0 p-3 transition-colors hover:bg-white/5 md:p-4"
                >
                  {/* Image Box */}
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white/5 md:h-24 md:w-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="font-geist-sans text-lg font-medium text-white md:text-xl">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 md:gap-3">
                        <span className="font-mono text-[10px] text-white/40 md:text-xs">
                          {item.code}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/20"></span>
                        <span className="font-mono text-[10px] text-white/40 md:text-xs">
                          SIZE: {item.size}
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-base text-white md:text-lg">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: The Command */}
        <div className="flex flex-col justify-end border-t border-white/5 bg-black/40 p-6 md:h-full md:w-[30%] md:justify-between md:border-t-0 md:border-l md:p-8">
          {/* Summary Info (Hidden on very small screens if needed, or compact) */}
          <div className="space-y-4 pt-4 md:space-y-6">
            <div className="flex justify-between text-sm text-white/60">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="hidden justify-between text-sm text-white/60 md:flex">
              <span>Shipping</span>
              <span>Calc at next step</span>
            </div>
            <div className="h-px w-full bg-white/10"></div>
            <div className="flex justify-between text-lg font-medium text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons (Apple Aesthetic) */}
          <div className="mt-6 space-y-3 md:mt-0">
            <button className="font-geist-sans w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 active:scale-95 md:py-4 md:text-base">
              Checkout
            </button>
            <button className="font-geist-sans flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2A2A2A] active:scale-95 md:py-4 md:text-base">
              <span className="text-xl"></span> Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
