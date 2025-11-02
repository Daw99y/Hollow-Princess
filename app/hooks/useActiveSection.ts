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
          if (entry.isIntersecting) {
            // Get the section number from data-section attribute
            const sectionNumber = entry.target.getAttribute("data-section");
            if (sectionNumber) {
              // Map section numbers to navigation indices
              // Section 1 (data-section="1") → Index 0 (Home)
              // Section 2 (data-section="2") → Index 1 (Lore)
              // Section 3 (data-section="3") → Index 2 (Vault)
              // Section 4 (data-section="4") → Index 3 (Store)
              const sectionIndex = parseInt(sectionNumber) - 1;
              setActiveIndex(sectionIndex);
            }
          }
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
