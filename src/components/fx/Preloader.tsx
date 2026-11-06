"use client";

import { useEffect, useState } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";

/**
 * Preloader — "calibrating the sights".
 * Concentric rings rotate while a counter climbs 0→100,
 * then an arrow fires into the bullseye before the curtain lifts.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [hit, setHit] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setHit(true);
        window.setTimeout(() => {
          document.body.style.overflow = "";
          document.documentElement.classList.remove("lenis-stopped");
          onDone();
        }, 750);
      },
    });
    return () => {
      controls.stop();
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0a0b] px-6 py-6 md:px-10 md:py-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      {/* top row */}
      <div className="flex items-center justify-between text-[11px] tracking-[0.35em] text-fog">
        <span>ARCHER STUDIO®</span>
        <span className="hidden sm:block">数字代理 — DIGITAL AGENCY</span>
        <span className="text-flame">CALIBRATING 校准中</span>
      </div>

      {/* center: target + counter + arrow */}
      <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
        {/* rotating rings */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-spin-slower text-fog"
          fill="none"
        >
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 6" />
          <circle cx="100" cy="100" r="72" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="100" cy="100" r="46" stroke="#e8452c" strokeOpacity="0.8" />
          <line x1="100" y1="0" x2="100" y2="14" stroke="currentColor" strokeOpacity="0.7" />
          <line x1="100" y1="186" x2="100" y2="200" stroke="currentColor" strokeOpacity="0.7" />
          <line x1="0" y1="100" x2="14" y2="100" stroke="currentColor" strokeOpacity="0.7" />
          <line x1="186" y1="100" x2="200" y2="100" stroke="currentColor" strokeOpacity="0.7" />
        </svg>
        <div
          className={`absolute h-24 w-24 rounded-full transition-colors duration-300 md:h-32 md:w-32 ${
            hit ? "bg-flame" : "border border-fog/40"
          }`}
        />
        <div
          className={`absolute h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            hit ? "bg-[#0a0a0b] scale-150" : "bg-gold"
          }`}
        />

        {/* the arrow — flies in from off-screen on hit */}
        <AnimatePresence>
          {hit && (
            <motion.svg
              key="arrow"
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full"
              initial={{ x: "-140%", y: "-140%", opacity: 0 }}
              animate={{ x: "12%", y: "12%", opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
              fill="none"
            >
              <line x1="18" y1="18" x2="92" y2="92" stroke="#edeae3" strokeWidth="3" strokeLinecap="round" />
              <path d="M92 92 L76 88 L88 76 Z" fill="#e8452c" />
              <path d="M30 8 L18 18 M8 30 L18 18" stroke="#e8452c" strokeWidth="4" strokeLinecap="round" />
              <path d="M22 2 L18 18 L2 22" stroke="#edeae3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* counter */}
      <div className="flex items-end justify-between">
        <div className="font-display text-[18vw] leading-[0.85] text-bone md:text-[9rem]">
          {count}
          <span className="text-flame">%</span>
        </div>
        <div className="mb-3 text-right text-[11px] tracking-[0.35em] text-fog">
          <p>AIM — 瞄准</p>
          <p className="mt-1 text-bone">DRAW — 开弓</p>
          <p className="mt-1">HIT — 命中</p>
        </div>
      </div>

      {/* progress hairline */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-fog/10">
        <div
          className="h-full bg-flame transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}
