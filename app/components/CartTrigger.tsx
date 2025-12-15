'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartTrigger() {
  const { items, toggleCart } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.button
          onClick={toggleCart}
          className="fixed top-8 left-8 z-[60] flex items-center gap-2 text-xs font-bold text-neutral-900 transition-all hover:scale-105 md:top-12 md:left-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-black">CART</span>
          <span className="text-neutral-300">/</span>
          <span className="font-medium text-neutral-400">
            {items.length.toString().padStart(2, '0')}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
