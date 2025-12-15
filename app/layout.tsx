import type { Metadata } from 'next';
import { UnifrakturMaguntia } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import CapsuleHeader from './components/CapsuleHeader';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider } from './context/LanguageContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Hollow Princess - Endless',
  description: 'High-fidelity digital interface for outfits and garments.',
};

const unifrakturMaguntia = UnifrakturMaguntia({
  variable: '--font-gothic',
  subsets: ['latin'],
  weight: '400',
});

const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
});

const tanker = localFont({
  src: '../public/fonts/Tanker-Regular.woff2',
  variable: '--font-tanker',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${unifrakturMaguntia.variable} ${tanker.variable} antialiased`}
      >
        <LanguageProvider>
          <CapsuleHeader />
          <LanguageToggle />
          {children}
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
