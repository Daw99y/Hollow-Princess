"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollSyncedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded, duration:", video.duration);
      setIsReady(true);
    };

    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    // Force load
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      if (sections.length === 0) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = window.scrollY + (viewportHeight / 2);
      
      let targetTime = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          const sectionProgress = (viewportCenter - sectionTop) / rect.height;
          const sectionStartTime = index * 3;
          targetTime = sectionStartTime + (sectionProgress * 3);
        }
      });
      
      targetTime = Math.max(0, Math.min(12, targetTime));
      
      // Only set currentTime if video is ready
      if (video.readyState >= 2) {
        video.currentTime = targetTime;
      }
    };

    // Initial sync
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 w-full h-full object-cover"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <source src="/videos/hollow-princess-vid.mp4" type="video/mp4" />
    </video>
  );
}
