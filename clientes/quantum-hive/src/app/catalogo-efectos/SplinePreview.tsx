"use client";

import { useEffect, useRef } from "react";

const SPLINE_URLS: Record<string, string> = {
  "3d-voluta-scroll":    "https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode",
  "3d-orbita-zoom":      "https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode",
  "3d-seguir-cursor":    "https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode",
  "3d-mirar-cursor":     "https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode",
  "3d-fondo-dinamico":   "https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode",
};

export default function SplinePreview({ elementoId }: { elementoId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const url = SPLINE_URLS[elementoId];

  useEffect(() => {
    if (!ref.current || !url) return;
    const container = ref.current;

    // Load Spline viewer script if not already loaded
    const existingScript = document.querySelector('script[src*="spline-viewer"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
      document.head.appendChild(script);
    }

    // Create the spline-viewer element
    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute("url", url);
    viewer.setAttribute("events-target", "local");
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    container.appendChild(viewer);

    return () => {
      if (container.contains(viewer)) {
        container.removeChild(viewer);
      }
    };
  }, [url]);

  if (!url) return null;

  return <div ref={ref} className="h-full w-full" />;
}
