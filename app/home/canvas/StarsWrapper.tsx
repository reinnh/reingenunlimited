"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const StarsCanvas = dynamic(() => import("./Stars"), {
  ssr: false,
});

const StarsWrapper = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  if (isMobile) {
    return null;
  }

  return <StarsCanvas />;
};

export default StarsWrapper;
