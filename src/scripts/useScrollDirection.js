import { useState, useEffect } from "react";

// Checkt, ob Nutzer hoch oder herunter scrolled, um festzulegen, ob Header sichtbar sein soll oder nicht
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);
  useEffect(() => {
    let latestVerticalScroll = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > latestVerticalScroll ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - latestVerticalScroll > 10 || scrollY - latestVerticalScroll < -10)) {
        setScrollDirection(direction);
      }
      latestVerticalScroll = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}
