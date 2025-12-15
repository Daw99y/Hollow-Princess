'use client';

import { Fragment, useEffect, useState } from 'react';
import SplineSceneClient from './components/SplineSceneClient';
import VignetteOverlay from './components/VignetteOverlay';
import LoadingScreen from './components/LoadingScreen';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useActiveSection } from './hooks/useActiveSection';
import SplineSegment from './components/SplineSegment';
import ContentSection from './components/ContentSection';
import Link from 'next/link';
import BottomNav from './components/BottomNav';
import dynamic from 'next/dynamic';
import ScrollyTellingSequence from './components/ScrollyTellingSequence';
import ScrollyTellingLocations from './components/ScrollyTellingLocations';
import ScrollyTellingPurchase from './components/ScrollyTellingPurchase';
import ScrollyTellingOutro from './components/ScrollyTellingOutro';
import MagneticSection from './components/MagneticSection';

const DualitySplit = dynamic(() => import('./components/DualitySplit'));
const LocationList = dynamic(() => import('./components/LocationList'));
const ProductRack = dynamic(() => import('./components/ProductRack'));
const CartModal = dynamic(() => import('./components/CartModal'));
const FooterLegal = dynamic(() => import('./components/FooterLegal'));

export type CartItem = {
  id: string; // unique ID for cart entry (e.g. timestamp)
  productId: string;
  name: string;
  code: string;
  price: number;
  size: string;
  image: string;
};

const TIMELINE_SEGMENTS = [
  {
    spline: {
      id: 'spline-segment-1',
      dataSection: 1,
    },
    content: {
      id: 'content-section-1',
      dataSection: 2,
      headline: 'Interlude I',
      subline: 'Capsule Brief',
      copy: 'Capsule narrative and silhouettes will be detailed here.',
      type: 'duality',
    },
  },
  {
    spline: {
      id: 'spline-segment-2',
      dataSection: 3,
    },
    content: {
      id: 'content-section-2',
      dataSection: 4,
      headline: 'Interlude II',
      subline: 'Field Stations',
      copy: 'Pop-up shop locations and dates will be listed here.',
      type: 'location_list',
    },
  },
  {
    spline: {
      id: 'spline-segment-3',
      dataSection: 5,
    },
    content: {
      id: 'content-section-3',
      dataSection: 6,
      headline: 'Interlude III',
      subline: 'Acquisition',
      copy: 'Purchase instructions and availability notes will appear here.',
      type: 'product_rack',
    },
  },
];

export default function Home() {
  const { cameraState, scrollToSection } = useSmoothScroll();
  const { activeIndex } = useActiveSection();

  // const [showLoader, setShowLoader] = useState<boolean>(true); // Removed - handled globally
  const [splineReady, setSplineReady] = useState<boolean>(false); // Still needed for internal logic? actually no, handled globally now?
  // Wait, SplineSceneClient needs to work regardless.
  // Actually, SplineSceneClient dispatches the event.
  // We can remove: showLoader, hydrated, docLoaded logic from here (it's in ClientLayout)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Removed redundant effects for hydration, window load, spline:ready (handled in ClientLayout)
  // Removed scroll lock (handled in ClientLayout)

  const handleNavSelect = (index: number) => {
    scrollToSection(index, { targetType: 'content', center: true });
  };

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setCartItems((prev) => [...prev, newItem]);
  };

  return (
    <main className="relative">
      <CartModal
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
      />

      {/* Fixed Spline canvas - full viewport */}
      <SplineSceneClient cameraState={cameraState} />

      {/* Global vignette above Spline, below UI */}
      <VignetteOverlay />

      {/* Bottom navigation */}
      <BottomNav activeIndex={activeIndex} onNavigate={handleNavSelect} />
      <FooterLegal />

      {/* Scrollable sections container (above vignette) */}
      <div className="relative z-20">
        <ScrollyTellingSequence />
        {TIMELINE_SEGMENTS.map((segment, index) => (
          <Fragment key={segment.spline.id}>
            <SplineSegment
              id={segment.spline.id}
              dataSection={segment.spline.dataSection}
              navIndex={index}
            />
            {/* ... rest of content ... */}
            {(segment.content as any).type === 'duality' ? (
              <MagneticSection>
                <DualitySplit
                  id={segment.content.id}
                  dataSection={segment.content.dataSection}
                  navIndex={index}
                />
              </MagneticSection>
            ) : (segment.content as any).type === 'location_list' ? (
              <MagneticSection>
                <LocationList
                  id={segment.content.id}
                  dataSection={segment.content.dataSection}
                  navIndex={index}
                />
              </MagneticSection>
            ) : (segment.content as any).type === 'product_rack' ? (
              <MagneticSection>
                <ProductRack
                  id={segment.content.id}
                  dataSection={segment.content.dataSection}
                  navIndex={index}
                  onOpenCart={handleOpenCart}
                  cartCount={cartItems.length}
                  onAddToCart={handleAddToCart}
                />
              </MagneticSection>
            ) : (
              <ContentSection
                id={segment.content.id}
                dataSection={segment.content.dataSection}
                navIndex={index}
                headline={segment.content.headline}
                subline={segment.content.subline}
                children={segment.content.copy}
              />
            )}
            {/* Inject Location ScrollyTelling after Outfits (Index 0) */}
            {index === 0 && <ScrollyTellingLocations />}
            {/* Inject Purchase ScrollyTelling after Locations (Index 1) */}
            {index === 1 && <ScrollyTellingPurchase />}
            {/* Inject Outro ScrollyTelling after Purchase (Index 2) */}
            {index === 2 && <ScrollyTellingOutro />}
          </Fragment>
        ))}
        <div aria-hidden="true" className="h-screen w-full bg-transparent" />
      </div>

      {/* LoadingScreen removed - handled globally in ClientLayout */}
    </main>
  );
}
