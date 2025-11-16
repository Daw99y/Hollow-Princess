"use client";

import { Fragment, useEffect, useState } from "react";
import SplineSceneClient from "./components/SplineSceneClient";
import VignetteOverlay from "./components/VignetteOverlay";
import LoadingScreen from "./components/LoadingScreen";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useActiveSection } from "./hooks/useActiveSection";
import SplineSegment from "./components/SplineSegment";
import ContentSection from "./components/ContentSection";
import BottomNav from "./components/BottomNav";

const TIMELINE_SEGMENTS = [
  {
    spline: {
      id: "spline-segment-1",
      dataSection: 1,
      label: "California Mountain Snake",
      description:
        "Establish the sterile gallery frame. The camera glides along the surgical rails.",
    },
    content: {
      id: "content-section-1",
      dataSection: 2,
      headline: "Interlude I",
      subline: "White Field",
    },
  },
  {
    spline: {
      id: "spline-segment-2",
      dataSection: 3,
      label: "Chronicle of Sutures",
      description:
        "Rotate around the medical armature highlighting the iridescent textiles.",
    },
    content: {
      id: "content-section-2",
      dataSection: 4,
      headline: "Interlude II",
      subline: "Enter Capsule",
    },
  },
  {
    spline: {
      id: "spline-segment-3",
      dataSection: 5,
      label: "Specimen Extraction",
      description:
        "Descend toward the vault, revealing translucent plastics and chrome sutures.",
    },
    content: {
      id: "content-section-3",
      dataSection: 6,
      headline: "Interlude III",
      subline: "Archive Pause",
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

  const handleNavSelect = (index: number) => {
    scrollToSection(index, { targetType: "content", center: true });
  };

  return (
    <main className="relative">

      {/* Fixed Spline canvas - full viewport */}
      <SplineSceneClient cameraState={cameraState} />

      {/* Global vignette above Spline, below UI */}
      <VignetteOverlay />

      {/* Bottom navigation */}
      <BottomNav activeIndex={activeIndex} onNavigate={handleNavSelect} />

      {/* Scrollable sections container (above vignette) */}
      <div className="relative z-20">
        {TIMELINE_SEGMENTS.map((segment, index) => (
          <Fragment key={segment.spline.id}>
            <SplineSegment
              id={segment.spline.id}
              dataSection={segment.spline.dataSection}
              index={index + 1}
              navIndex={index}
              label={segment.spline.label}
              description={segment.spline.description}
            />
            <ContentSection
              id={segment.content.id}
              dataSection={segment.content.dataSection}
              navIndex={index}
              headline={segment.content.headline}
              subline={segment.content.subline}
            />
          </Fragment>
        ))}
        <div
          aria-hidden="true"
          className="h-screen w-full bg-transparent"
        />
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