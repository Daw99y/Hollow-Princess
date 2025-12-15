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
const ScrollyTellingSequence = dynamic(
  () => import('./components/ScrollyTellingSequence')
);
const ScrollyTellingLocations = dynamic(
  () => import('./components/ScrollyTellingLocations')
);
const ScrollyTellingPurchase = dynamic(
  () => import('./components/ScrollyTellingPurchase')
);
const ScrollyTellingOutro = dynamic(
  () => import('./components/ScrollyTellingOutro')
);
import MagneticSection from './components/MagneticSection';

const DualitySplit = dynamic(() => import('./components/DualitySplit'));
const LocationList = dynamic(() => import('./components/LocationList'));
const ProductRack = dynamic(() => import('./components/ProductRack'));
const CartModal = dynamic(() => import('./components/CartModal'));
const FooterLegal = dynamic(() => import('./components/FooterLegal'));

// CartItem type moved to context

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

  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [splineReady, setSplineReady] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [docLoaded, setDocLoaded] = useState<boolean>(false);

  // Mark hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Listen for window load and spline readiness
  useEffect(() => {
    const handleLoad = () => setDocLoaded(true);
    const handleSplineReady = () => setSplineReady(true);

    if (document.readyState === 'complete') {
      setDocLoaded(true);
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
    window.addEventListener('spline:ready', handleSplineReady, { once: true });

    return () => {
      window.removeEventListener('load', handleLoad as any);
      window.removeEventListener('spline:ready', handleSplineReady as any);
    };
  }, []);

  // Lock scroll while loader shown; restore after fade completes via onFinish
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showLoader]);

  const canDismiss = splineReady && (hydrated || docLoaded);

  const handleNavSelect = (index: number) => {
    scrollToSection(index, { targetType: 'content', center: true });
  };

  return (
    <main className="relative">
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
                  onOpenCart={() => {}} // No-op, managed globally
                  cartCount={0} // Managed globally
                  onAddToCart={() => {}} // No-op, managed globally
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

      {/* Loading overlay (covers all until ready, then fades out and unmounts) */}
      {showLoader && (
        <LoadingScreen
          done={canDismiss}
          onFinish={() => {
            setShowLoader(false);
            document.body.style.overflow = '';
          }}
        />
      )}
    </main>
  );
}
