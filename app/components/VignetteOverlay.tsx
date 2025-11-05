"use client";

export default function VignetteOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(215,217,223,0)_55%,rgba(215,217,223,0.16)_100%)]" />
    </div>
  );
}


