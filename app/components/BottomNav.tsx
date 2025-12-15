'use client';

import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function BottomNav({ activeIndex, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  const links = [
    { label: t('nav.capsule'), value: 'Capsule' },
    { label: t('nav.location'), value: 'Location' },
    { label: t('nav.purchase'), value: 'Purchase' },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-8 z-40 flex justify-center">
      <div className="flex items-center gap-10">
        {links.map((link, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={link.value}
              type="button"
              onClick={() => onNavigate(index)}
              className={[
                'font-gothic text-lg tracking-widest transition-all duration-300',
                'text-black/65 hover:text-black/85',
                'transform focus:outline-none',
                isActive
                  ? 'scale-110 text-black/100'
                  : 'scale-100 hover:scale-105 focus:scale-105',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
