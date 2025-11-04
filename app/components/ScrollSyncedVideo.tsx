"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollSyncedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const desiredTimeRef = useRef(0);
  const lastBackSeekAtRef = useRef(0);
  const durationRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = async () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 12;
      console.log("Video metadata loaded, duration:", durationRef.current);
      setIsReady(true);
      setIsLoading(false);
      try {
        // Warm up decoder; allowed because muted + playsInline
        await video.play();
        // Immediately pause; we'll steer via playbackRate
        video.pause();
      } catch (_) {}
    };

    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setIsLoading(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    let rafId: number | null = null;

    const sync = () => {
      const desired = desiredTimeRef.current;
      const current = video.currentTime;
      const delta = desired - current;

      // Close enough: hold exact frame
      if (Math.abs(delta) < 0.02) {
        if (!video.paused) video.pause();
        video.playbackRate = 1;
      } else if (delta > 0) {
        // Scroll forward: steer with playbackRate for smoothness
        const rate = Math.max(0.5, Math.min(4, 0.5 + delta * 3));
        video.playbackRate = rate;
        if (video.paused) {
          void video.play().catch(() => {});
        }
      } else {
        // Going backwards: throttle seeks to avoid heavy decode
        const now = performance.now();
        if (!video.paused) video.pause();
        video.playbackRate = 1;
        if (now - lastBackSeekAtRef.current >= 50) {
          video.currentTime = desired;
          lastBackSeekAtRef.current = now;
        }
      }

      rafId = requestAnimationFrame(sync);
    };

    rafId = requestAnimationFrame(sync);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight));
      const duration = durationRef.current > 0 ? durationRef.current : (Number.isFinite(video.duration) ? video.duration : 12);
      desiredTimeRef.current = progress * duration;
    };

    // Initialize once
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  return (
    <div className="fixed inset-0 z-0">
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="text-neutral-400 font-geist-sans text-sm tracking-widest">
            Loading...
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ backgroundColor: '#ffffff' }}
      >
        <source src="/videos/hollow-princess-video.webm" type="video/webm" />
        <source src="/videos/hollow-princess-vid.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
