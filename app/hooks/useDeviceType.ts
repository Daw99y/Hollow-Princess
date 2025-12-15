'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when viewport width is <= breakpoint (default 768px).
 * Uses matchMedia and listens for changes; safe for SSR (defaults to false).
 */
export function useDeviceType(breakpointPx: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const query = `(max-width: ${breakpointPx}px)`;
    const media = window.matchMedia(query);

    const update = () => setIsMobile(media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    // Fallback for older browsers (deprecated API)
    if (typeof (media as any).addListener === 'function') {
      (media as any).addListener(update);
      return () => (media as any).removeListener?.(update);
    }
    return;
  }, [breakpointPx]);

  return isMobile;
}

export default function useIsMobile(breakpointPx?: number): boolean {
  return useDeviceType(breakpointPx);
}

/**
 * Returns true when viewport width is <= 1024px (mobile + tablet).
 * Useful for applying mobile/tablet-specific behavior.
 */
export function useIsMobileOrTablet(): boolean {
  return useDeviceType(1024);
}

/**
 * Returns true when viewport width is <= breakpoint.
 * Initializes synchronously on the client to avoid hydration mismatch delay.
 * WARNING: ONLY USE IN COMPONENTS WITH ssr: false (Client-only).
 */
export function useClientDeviceType(breakpointPx: number = 768): boolean {
  // Initialize state based on window presence to avoid hydration mismatch on server
  // But for client-only components, this will be correct immediately
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const query = `(max-width: ${breakpointPx}px)`;
    const media = window.matchMedia(query);

    const update = () => setIsMobile(media.matches);

    // Initial check is already done in state initializer, but listener is needed for resizes
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    // Fallback for older browsers
    if (typeof (media as any).addListener === 'function') {
      (media as any).addListener(update);
      return () => (media as any).removeListener?.(update);
    }
    return;
  }, [breakpointPx]);

  return isMobile;
}

/**
 * Client-only version of useIsMobileOrTablet.
 * WARNING: ONLY USE IN COMPONENTS WITH ssr: false.
 */
export function useClientIsMobileOrTablet(): boolean {
  return useClientDeviceType(1024);
}
