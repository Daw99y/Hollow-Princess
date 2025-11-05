"use client";

import { useEffect, useState } from "react";
import SplineSceneClient from "./components/SplineSceneClient";
import WallNav from "./components/WallNav";
import Section1 from "./components/sections/Section1";
import Section2 from "./components/sections/Section2";
import Section3 from "./components/sections/Section3";
import Section4 from "./components/sections/Section4";
import VignetteOverlay from "./components/VignetteOverlay";
import LoadingScreen from "./components/LoadingScreen";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useActiveSection } from "./hooks/useActiveSection";

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

    if (document.readyState === "complete") {
      setDocLoaded(true);
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }
    window.addEventListener("spline:ready", handleSplineReady, { once: true });

    return () => {
      window.removeEventListener("load", handleLoad as any);
      window.removeEventListener("spline:ready", handleSplineReady as any);
    };
  }, []);

  // Lock scroll while loader shown; restore after fade completes via onFinish
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showLoader]);

  const canDismiss = splineReady && (hydrated || docLoaded);

  return (
    <main className="relative">
      {/* Fixed 4-Wall Navigation */}
      <WallNav activeIndex={activeIndex} scrollToSection={scrollToSection} />

      {/* Fixed Spline canvas - full viewport */}
      <SplineSceneClient cameraState={cameraState} />

      {/* Global vignette above Spline, below UI */}
      <VignetteOverlay />

      {/* Scrollable sections container (above vignette) */}
      <div className="relative z-20">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>

      {/* Loading overlay (covers all until ready, then fades out and unmounts) */}
      {showLoader && (
        <LoadingScreen
          done={canDismiss}
          onFinish={() => {
            setShowLoader(false);
            document.body.style.overflow = "";
          }}
        />
      )}
    </main>
  );
}