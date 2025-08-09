// src/components/CRTOverlay.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FaultyTerminal = dynamic(
  () => import("@/components/FaultyTerminal/FaultyTerminal"),
  { ssr: false }
);

export default function CRTOverlay() {
  const [ready, setReady] = useState(false);
  const raf = useRef<number | null>(null);

  // Fade out after the first paint of the client component.
  useEffect(() => {
    raf.current = requestAnimationFrame(() => setReady(true));
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#A7EF9E"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.5}
          // If your component can expose an onReady, call setReady(true) there instead.
          // onReady={() => setReady(true)}
        />
      </div>

      {/* Fullscreen loader with a smooth fade-out */}
      <div
        className={`fixed inset-0 z-40 grid place-items-center bg-black transition-opacity duration-500 ${
          ready ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {/* <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" /> */}
          <p className="text-emerald-300/80 tracking-widest text-lg font-black">
            BOOTING CRT…
          </p>
        </div>
      </div>
    </>
  );
}
