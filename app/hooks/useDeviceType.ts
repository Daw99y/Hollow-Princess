'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when viewport width is <= breakpoint (default 768px).
 * Uses matchMedia and listens for changes; safe for SSR (defaults to false).
 */
/**
 * Core hook to track device type state with readiness flag.
 * Returns { isMobile, isReady } to handle hydration/loading states.
 */
export function useDeviceTypeState(breakpointPx: number = 768) {
  const [state, setState] = useState({ isMobile: false, isReady: false });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const query = `(max-width: ${breakpointPx}px)`;
    const media = window.matchMedia(query);

    const update = () => setState({ isMobile: media.matches, isReady: true });
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    // Fallback for older browsers
    if (typeof (media as any).addListener === 'function') {
      (media as any).addListener(update);
      return () => (media as any).removeListener?.(update);
    }
  }, [breakpointPx]);

  return state;
}

/**
 * Legacy hook returning boolean (isMobile).
 * Defaults to false (Desktop) during SSR/Hydration.
 */
export function useDeviceType(breakpointPx: number = 768): boolean {
  const { isMobile } = useDeviceTypeState(breakpointPx);
  return isMobile;
}

export default function useIsMobile(breakpointPx?: number): boolean {
  return useDeviceType(breakpointPx);
}

/**
 * Returns true when viewport width is <= 1024px (mobile + tablet).
 */
export function useIsMobileOrTablet(): boolean {
  return useDeviceType(1024);
}

/**
 * Enhanced version for components that need to wait for detection
 * to avoid double-rendering (e.g. 3D scenes).
 */
export function useIsMobileOrTabletState() {
  return useDeviceTypeState(1024);
}
