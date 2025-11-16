"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create IntersectionObserver to track which section is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const navGroupAttr = entry.target.getAttribute("data-nav-group");
          if (navGroupAttr) {
            const parsedNavIndex = parseInt(navGroupAttr, 10);
            if (!Number.isNaN(parsedNavIndex)) {
              setActiveIndex(parsedNavIndex);
              return;
            }
          }

          const sectionNumber = entry.target.getAttribute("data-section");
          if (!sectionNumber) {
            return;
          }

          const numericSection = parseInt(sectionNumber, 10);
          if (Number.isNaN(numericSection)) {
            return;
          }

          const navIndex = Math.max(
            0,
            Math.floor((numericSection - 1) / 2)
          );
          setActiveIndex(navIndex);
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: "-100px 0px -100px 0px" // Adjust trigger points
      }
    );

    // Get all sections with data-section attribute
    const sections = document.querySelectorAll('[data-section]');
    
    // Observe each section
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { activeIndex };
}
