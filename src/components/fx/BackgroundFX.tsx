"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useState } from "react";

type Streak = {
  x: number;
  y: number;
  len: number;
  vx: number;
  vy: number;
  alpha: number;
  wobble: number;
  phase: number;
  flame: boolean;
};

/**
 * BackgroundFX — everything that drifts behind the content:
 *  1. a canvas of faint arrow-streaks crossing the viewport
 *  2. a huge rotating target ring on the right edge
 *  3. a soft flame-coloured spotlight trailing the mouse
 *  4. a scroll-depth HUD bottom-left (like a sight readout)
 */
export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useRef(false);

  /* ---------- canvas streaks ---------- */
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const streaks: Streak[] = [];
    const COUNT = 42;

    const spawn = (anywhere: boolean): Streak => ({
      x: anywhere ? Math.random() * w : -60,
      y: anywhere ? Math.random() * h : Math.random() * h,
      len: 26 + Math.random() * 70,
      vx: 0.18 + Math.random() * 0.4,
      vy: -0.06 + Math.random() * 0.12,
      alpha: 0.04 + Math.random() * 0.1,
      wobble: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      flame: Math.random() < 0.16,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < COUNT; i++) streaks.push(spawn(true));

    let t = 0;
    const tick = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (const s of streaks) {
        s.x += s.vx;
        s.y += s.vy + Math.sin(t * 2 + s.phase) * s.wobble * 0.14;
        if (s.x - s.len > w + 80) Object.assign(s, spawn(false));

        const angle = Math.atan2(s.vy, s.vx);
        const dx = Math.cos(angle) * s.len;
        const dy = Math.sin(angle) * s.len;
        const grad = ctx.createLinearGradient(s.x - dx, s.y - dy, s.x, s.y);
        const col = s.flame ? "232,69,44" : "237,234,227";
        grad.addColorStop(0, `rgba(${col},0)`);
        grad.addColorStop(1, `rgba(${col},${s.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.flame ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(s.x - dx, s.y - dy);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // tiny arrow head
        ctx.fillStyle = `rgba(${col},${s.alpha * 1.6})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ---------- mouse spotlight ---------- */
  const sx = useMotionValue(-600);
  const sy = useMotionValue(-600);
  const spotX = useSpring(sx, { stiffness: 60, damping: 20 });
  const spotY = useSpring(sy, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      sx.set(e.clientX);
      sy.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [sx, sy]);

  /* ---------- scroll HUD ---------- */
  const { scrollYProgress } = useScroll();
  const pctRaw = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const [pct, setPct] = useState(0);
  useMotionValueEvent(pctRaw, "change", (v) => setPct(v));

  return (
    <>
      {/* streak canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      {/* giant slow target ring, right edge */}
      <div
        className="pointer-events-none fixed -right-[22vw] top-1/2 z-0 hidden h-[58vw] w-[58vw] -translate-y-1/2 opacity-[0.55] md:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" className="h-full w-full animate-spin-slowest">
          <circle cx="200" cy="200" r="196" stroke="rgba(237,234,227,0.07)" strokeDasharray="3 9" />
          <circle cx="200" cy="200" r="150" stroke="rgba(237,234,227,0.05)" />
          <circle cx="200" cy="200" r="104" stroke="rgba(232,69,44,0.08)" strokeDasharray="40 22" />
          <circle cx="200" cy="200" r="58" stroke="rgba(237,234,227,0.06)" />
          <line x1="200" y1="4" x2="200" y2="40" stroke="rgba(237,234,227,0.09)" />
          <line x1="200" y1="360" x2="200" y2="396" stroke="rgba(237,234,227,0.09)" />
          <line x1="4" y1="200" x2="40" y2="200" stroke="rgba(237,234,227,0.09)" />
          <line x1="360" y1="200" x2="396" y2="200" stroke="rgba(237,234,227,0.09)" />
        </svg>
      </div>

      {/* mouse spotlight */}
      <motion.div
        style={{
          x: spotX,
          y: spotY,
          background:
            "radial-gradient(circle, rgba(232,69,44,0.07) 0%, rgba(242,179,61,0.035) 30%, transparent 62%)",
        }}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />

      {/* scroll HUD */}
      <div
        className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-3 text-[11px] tracking-[0.3em] text-fog mix-blend-difference md:flex"
        aria-hidden="true"
      >
        <span className="relative block h-8 w-px overflow-hidden bg-fog/30">
          <motion.span
            style={{ scaleY: scrollYProgress }}
            className="absolute inset-0 origin-top bg-flame"
          />
        </span>
        <span>
          SCROLL <span className="text-bone">{String(pct).padStart(3, "0")}%</span>
        </span>
      </div>
    </>
  );
}
