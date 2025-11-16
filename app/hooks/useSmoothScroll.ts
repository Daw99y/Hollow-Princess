"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { CameraState } from "../types/camera";

// Camera positions for each spline segment boundary
const CAMERA_STATES: CameraState[] = [
  {
    // Segment 1 start
    position: { x: 80.16, y: 597.14, z: 0.72 },
    rotation: { x: -21.75, y: 26.92, z: 13.89 },
  },
  {
    // Segment 1 end / Segment 2 start
    position: { x: -224.85, y: 488.24, z: -61.6 },
    rotation: { x: -36.43, y: -67.54, z: -34.3 },
  },
  {
    // Segment 2 end / Segment 3 start
    position: { x: 99.23, y: 15.67, z: 140.16 },
    rotation: { x: 22.58, y: 22.3, z: 21.74 },
  },
  {
    // Segment 3 end / Segment 4 start
    position: { x: -175.77, y: 171.81, z: 1039.52 },
    rotation: { x: 4.24, y: -8.76, z: 0.65 },
  },
];

type CameraSegment = {
  start: CameraState;
  end: CameraState;
};

const CAMERA_SEGMENTS: CameraSegment[] = CAMERA_STATES.map((state, index) => {
  const nextState = CAMERA_STATES[index + 1] ?? state;
  return { start: state, end: nextState };
});

type TimelineBand =
  | {
      type: "spline";
      segmentIndex: number;
      duration: number;
    }
  | {
      type: "content";
      duration: number;
    };

const TIMELINE_BANDS: TimelineBand[] = [
  { type: "spline", segmentIndex: 0, duration: 0.25 },
  { type: "content", duration: 0.1 },
  { type: "spline", segmentIndex: 1, duration: 0.25 },
  { type: "content", duration: 0.1 },
  { type: "spline", segmentIndex: 2, duration: 0.25 },
  { type: "content", duration: 0.1 },
];

const TIMELINE_TOTAL_LENGTH = TIMELINE_BANDS.reduce(
  (acc, band) => acc + band.duration,
  0
);

type SplineRange = {
  segmentIndex: number;
  start: number;
  end: number;
};

const SPLINE_RANGES: SplineRange[] = [];

(() => {
  let cursor = 0;
  TIMELINE_BANDS.forEach((band) => {
    if (band.type === "spline") {
      SPLINE_RANGES.push({
        segmentIndex: band.segmentIndex,
        start: cursor,
        end: cursor + band.duration,
      });
    }
    cursor += band.duration;
  });
})();

export function useSmoothScroll() {
  const [cameraState, setCameraState] = useState<CameraState>(CAMERA_STATES[0]);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to window scroll
    lenis.on("scroll", () => {
      // This will be handled by the second useEffect
    });

    // Intersection Observer removed - scroll handler now controls all camera state updates
    // This prevents conflicting state updates that cause janky animation

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Listen to Lenis scroll for smooth interpolation between sections
  useEffect(() => {
    // Wait for Lenis to be initialized and sections to be available
    const timeoutId = setTimeout(() => {
      if (!lenisRef.current) {
        console.warn("Lenis not initialized yet");
        return;
      }

      const lenis = lenisRef.current;

      const handleScroll = ({ scroll }: { scroll: number }) => {
        const limit =
          lenis.limit ??
          Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
        const normalizedScroll = Math.min(Math.max(scroll / limit, 0), 1);
        const timelinePosition =
          normalizedScroll * TIMELINE_TOTAL_LENGTH;

        let activeRange: SplineRange | null = null;
        let previousRange: SplineRange | null = null;

        for (const range of SPLINE_RANGES) {
          if (timelinePosition >= range.start && timelinePosition <= range.end) {
            activeRange = range;
            break;
          }

          if (timelinePosition > range.end) {
            previousRange = range;
            continue;
          }

          if (timelinePosition < range.start) {
            break;
          }
        }

        const interpolateSegment = (
          segmentIndex: number,
          progress: number
        ): CameraState => {
          const clampedIndex = Math.min(
            Math.max(segmentIndex, 0),
            CAMERA_SEGMENTS.length - 1
          );
          const segment = CAMERA_SEGMENTS[clampedIndex];
          const clampedProgress = Math.min(Math.max(progress, 0), 1);
          return {
            position: {
              x:
                segment.start.position.x +
                (segment.end.position.x - segment.start.position.x) *
                  clampedProgress,
              y:
                segment.start.position.y +
                (segment.end.position.y - segment.start.position.y) *
                  clampedProgress,
              z:
                segment.start.position.z +
                (segment.end.position.z - segment.start.position.z) *
                  clampedProgress,
            },
            rotation: {
              x:
                segment.start.rotation.x +
                (segment.end.rotation.x - segment.start.rotation.x) *
                  clampedProgress,
              y:
                segment.start.rotation.y +
                (segment.end.rotation.y - segment.start.rotation.y) *
                  clampedProgress,
              z:
                segment.start.rotation.z +
                (segment.end.rotation.z - segment.start.rotation.z) *
                  clampedProgress,
            },
          };
        };

        if (activeRange) {
          const segmentProgress =
            (timelinePosition - activeRange.start) /
            (activeRange.end - activeRange.start || 1);
          const interpolatedState = interpolateSegment(
            activeRange.segmentIndex,
            segmentProgress
          );
          setCameraState(interpolatedState);
          return;
        }

        if (!previousRange) {
          setCameraState(interpolateSegment(0, 0));
          return;
        }

        setCameraState(interpolateSegment(previousRange.segmentIndex, 1));
      };

      lenis.on("scroll", handleScroll);

      // Initial call after a short delay to ensure limit is set
      setTimeout(() => {
        const initialScroll = lenis.scroll;
        handleScroll({ scroll: initialScroll });
      }, 100);

      // Store cleanup function
      (lenis as Lenis & { _cameraScrollCleanup?: () => void })._cameraScrollCleanup = () => {
        lenis.off("scroll", handleScroll);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        const lenisWithCleanup = lenisRef.current as Lenis & { _cameraScrollCleanup?: () => void };
        if (lenisWithCleanup._cameraScrollCleanup) {
          lenisWithCleanup._cameraScrollCleanup();
        }
        }
    };
  }, []);

  const scrollToSection = (
    sectionIndex: number,
    options?: { targetType?: "spline" | "content"; center?: boolean }
  ) => {
    if (!lenisRef.current) return;

    const targetType = options?.targetType ?? "spline";
    const selector =
      `[data-nav-group="${sectionIndex}"][data-segment-type="${targetType}"]`;
    const target = document.querySelector<HTMLElement>(selector);

    if (!target) {
      return;
    }

    const center = options?.center ?? false;
    let offset = 0;

    if (center) {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      offset = -(viewportHeight / 2) + sectionHeight / 2;
    }

    lenisRef.current.scrollTo(target, {
      offset,
      duration: 2.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return { cameraState, scrollToSection };
}
