'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { CameraState } from '../types/camera';

interface SplineSceneClientProps {
  cameraState: CameraState;
}

// Import SplineScene with client-side only rendering (no SSR)
const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
});

export default function SplineSceneClient({
  cameraState,
}: SplineSceneClientProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // 1. Immediately signal "spline:ready" to dismiss the global loader.
    // This allows the user to see the page immediately (LCP).
    // The background will be white/plain initially.
    if (typeof window !== 'undefined') {
      // Small timeout to ensure the listener in page.tsx is mounted
      setTimeout(() => {
        window.dispatchEvent(new Event('spline:ready'));
      }, 100);
    }

    // 2. Schedule the heavy 3D scene load for when the browser is idle.
    const loadSpline = () => {
      setShouldLoad(true);
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadSpline, { timeout: 3000 });
    } else {
      setTimeout(loadSpline, 2000); // Fallback for Safari/others
    }
  }, []);

  return (
    <>
      {/* 
        This pure white background (or whatever matches your design) 
        stays visible behind the Spline scene until the scene fully renders/canvas is ready.
      */}
      <div className="fixed inset-0 z-0 bg-white" />

      {shouldLoad && (
        <div className="animate-fade-in duration-1000">
          <SplineScene cameraState={cameraState} />
        </div>
      )}
    </>
  );
}
