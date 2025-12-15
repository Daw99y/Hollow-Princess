'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ENG' | 'KOR';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Simple dictionary for translations
const translations: Record<string, Record<Language, string>> = {
  // Navigation / UI
  'nav.about': { ENG: 'ABOUT', KOR: '소개' },
  'nav.shop': { ENG: 'SHOP', KOR: '상점' },
  'nav.capsule': { ENG: 'Capsule', KOR: '캡슐' },
  'nav.location': { ENG: 'Location', KOR: '위치' },
  'nav.purchase': { ENG: 'Purchase', KOR: '구매' },

  // Product Items
  'product.asym': { ENG: 'ASYM-SHELL', KOR: '비대칭-쉘' },
  'product.knit': { ENG: 'CELLULAR-KNIT', KOR: '셀룰러-니트' },
  'product.trouser': { ENG: 'PATCH-TROUSER', KOR: '패치-트라우저' },
  'product.wave': { ENG: 'WAVE-SHELL', KOR: '웨이브-쉘' },
  'product.bitonal': { ENG: 'BI-TONAL', KOR: '바이-토널' },

  // Header / Branding
  'header.title': { ENG: 'Hollow Princess', KOR: '할로우 프린세스' }, // Example fallback

  // Footer / Legal
  'footer.terms': { ENG: 'TERMS & CONDITIONS', KOR: '이용 약관' },
  'footer.privacy': { ENG: 'PRIVACY POLICY', KOR: '개인정보 처리방침' },

  // Cart
  'cart.title': { ENG: 'My Cart', KOR: '장바구니' },
  'cart.close': { ENG: 'Close', KOR: '닫기' },
  'cart.empty': { ENG: 'Cart is empty', KOR: '장바구니가 비어 있습니다' },
  'cart.subtotal': { ENG: 'Subtotal', KOR: '소계' },
  'cart.shipping': { ENG: 'Shipping', KOR: '배송' },
  'cart.calc': { ENG: 'Calc at next step', KOR: '다음 단계에서 계산' },
  'cart.total': { ENG: 'Total', KOR: '합계' },
  'cart.checkout': { ENG: 'Checkout', KOR: '결제하기' },
  'cart.pay': { ENG: 'Pay', KOR: '결제' },

  // Product
  'product.soldOut': { ENG: 'SOLD OUT', KOR: '품절' },
  'product.remaining': { ENG: 'REMAINING', KOR: '남음' },
  'product.addToCart': { ENG: 'ADD TO CART', KOR: '장바구니 담기' },
  'product.swipe': { ENG: '< SWIPE >', KOR: '< 스와이프 >' },
  'product.info': { ENG: 'INFO', KOR: '정보' },

  // Locations
  'location.seoul': { ENG: 'SEOUL', KOR: '서울' },
  'location.busan': { ENG: 'BUSAN', KOR: '부산' },
  'location.incheon': { ENG: 'INCHEON', KOR: '인천' },
  'location.daegu': { ENG: 'DAEGU', KOR: '대구' },
  'location.jeju': { ENG: 'JEJU', KOR: '제주' },
  'location.status.active': { ENG: 'ACTIVE', KOR: '활성' },
  'location.status.pending': { ENG: 'PENDING', KOR: '대기중' },

  // Add more keys as we identify them in the components
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ENG');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ENG' ? 'KOR' : 'ENG'));
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key; // Return key if translation missing
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
