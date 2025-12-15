'use client';

import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export default function CartModal() {
  const { t } = useLanguage();
  const { isCartOpen, setIsCartOpen, items } = useCart();

  const onClose = () => setIsCartOpen(false);

  if (!isCartOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* 
        HUD Container: 
        - Reskinned to Light Mode VAPOR
        - bg-white/90 + backdrop-blur-xl
        - border black/5
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[32px] border border-black/5 bg-white/90 shadow-[0_0_100px_0_rgba(0,0,0,0.1)] backdrop-blur-xl md:h-[60vh] md:w-[60vw] md:max-w-none md:flex-row"
      >
        {/* Left Column: The Inventory */}
        <div className="flex flex-1 flex-col overflow-hidden p-6 md:w-[70%] md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between md:mb-8">
            <h2 className="font-geist-sans text-xl font-medium tracking-tight text-black md:text-2xl">
              {t('cart.title')}{' '}
              <span className="text-neutral-400">
                ({items.length.toString().padStart(2, '0')})
              </span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-200 px-4 py-1.5 font-mono text-xs text-neutral-500 transition-colors hover:bg-black hover:text-white"
            >
              {t('cart.close')}
            </button>
          </div>

          {/* List */}
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 md:space-y-4">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center font-mono text-sm text-neutral-400">
                {t('cart.empty')}
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-100 p-3 transition-colors hover:bg-neutral-50 md:p-4"
                >
                  {/* Image Box */}
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:h-24 md:w-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 opacity-80 mix-blend-multiply transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="font-geist-sans text-lg font-medium text-black md:text-xl">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 md:gap-3">
                        <span className="font-mono text-[10px] text-neutral-400 md:text-xs">
                          {item.code}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-neutral-200"></span>
                        <span className="font-mono text-[10px] text-neutral-400 md:text-xs">
                          SIZE: {item.size}
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-base text-black md:text-lg">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: The Command */}
        <div className="flex flex-col justify-end border-t border-neutral-100 bg-neutral-50/50 p-6 md:h-full md:w-[30%] md:justify-between md:border-t-0 md:border-l md:p-8">
          {/* Summary Info */}
          <div className="space-y-4 pt-4 md:space-y-6">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>{t('cart.subtotal')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="hidden justify-between text-sm text-neutral-500 md:flex">
              <span>{t('cart.shipping')}</span>
              <span>{t('cart.calc')}</span>
            </div>
            <div className="h-px w-full bg-neutral-200"></div>
            <div className="flex justify-between text-lg font-medium text-black">
              <span>{t('cart.total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons (Apple Aesthetic - Light Mode) */}
          <div className="mt-6 space-y-3 md:mt-0">
            {/* Primary Action: Solid Black */}
            <button className="font-geist-sans w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 active:scale-95 md:py-4 md:text-base">
              {t('cart.checkout')}
            </button>
            {/* Secondary: Apple Pay (Standard Black Button) */}
            <button className="font-geist-sans flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2A2A2A] active:scale-95 md:py-4 md:text-base">
              <span className="text-xl"></span> {t('cart.pay')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
