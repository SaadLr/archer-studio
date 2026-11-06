"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

/**
 * CustomCursor — an archer's reticle.
 * A center dot with four crosshair ticks and a trailing ring.
 * Expands + rotates over interactive elements, shows a label
 * over elements marked [data-cursor="..."]. Pointer-fine only.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX = useSpring(mx, { stiffness: 1600, damping: 80, mass: 0.2 });
  const dotY = useSpring(my, { stiffness: 1600, damping: 80, mass: 0.2 });
  const ringX = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 320, damping: 32, mass: 0.6 });

  const ringTransform = useMotionTemplate`translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  const dotTransform = useMotionTemplate`translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-hover]");
      setHovering(!!interactive);
      const labelled = t.closest("[data-cursor]") as HTMLElement | null;
      setLabel(labelled ? labelled.dataset.cursor ?? null : null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring + ticks */}
      <motion.div
        style={{ transform: ringTransform }}
        className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.7 : hovering ? 1.7 : 1,
            rotate: hovering ? 45 : 0,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative -ml-5 -mt-5 h-10 w-10"
        >
          <span className="absolute inset-0 rounded-full border border-bone/70" />
          <span className="absolute left-1/2 top-[-5px] h-[7px] w-px -translate-x-1/2 bg-bone/80" />
          <span className="absolute left-1/2 bottom-[-5px] h-[7px] w-px -translate-x-1/2 bg-bone/80" />
          <span className="absolute top-1/2 left-[-5px] w-[7px] h-px -translate-y-1/2 bg-bone/80" />
          <span className="absolute top-1/2 right-[-5px] w-[7px] h-px -translate-y-1/2 bg-bone/80" />
        </motion.div>
      </motion.div>

      {/* center dot */}
      <motion.div
        style={{ transform: dotTransform }}
        className="pointer-events-none fixed left-0 top-0 z-[91] mix-blend-difference"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: pressed ? 2.2 : 1, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-bone"
        />
      </motion.div>

      {/* hover label (e.g. VIEW CASE) */}
      <motion.div
        style={{ transform: ringTransform }}
        className="pointer-events-none fixed left-0 top-0 z-[92]"
        aria-hidden="true"
      >
        <motion.span
          animate={{ opacity: label && visible ? 1 : 0, y: hovering ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="block -translate-y-9 whitespace-nowrap bg-flame px-3 py-1 text-[11px] font-medium tracking-[0.25em] text-[#0a0a0b]"
        >
          {label ?? ""}
        </motion.span>
      </motion.div>
    </>
  );
}
