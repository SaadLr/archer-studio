"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Magnetic from "@/components/fx/Magnetic";

const MARQUEE = [
  "品牌识别 BRAND IDENTITY",
  "网页与 3D WEB & 3D",
  "影像摄影 FILM & PHOTO",
  "营销增长 GROWTH",
  "设计直击痛点® HIT THE TARGET",
];

const lineVariants: Variants = {
  hidden: { y: "115%", rotate: 3 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.13 },
  }),
};

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);

  /* mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18 });
  const smy = useSpring(my, { stiffness: 55, damping: 18 });

  const targetX = useTransform(smx, (v) => v * -34);
  const targetY = useTransform(smy, (v) => v * -26);
  const typeX = useTransform(smx, (v) => v * 14);
  const typeY = useTransform(smy, (v) => v * 10);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const state = started ? "visible" : "hidden";

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouse}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Intro"
    >
      {/* --- animated target, right side --- */}
      <motion.div
        style={{ x: targetX, y: targetY }}
        className="pointer-events-none absolute right-[-30%] top-1/2 z-0 w-[80vw] -translate-y-1/2 sm:right-[-16%] sm:w-[58vw] lg:right-[3%] lg:w-[42vw]"
        aria-hidden="true"
      >
        <motion.div
          initial={false}
          animate={started ? { scale: [1, 1.045, 1] } : {}}
          transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
        >
          <svg viewBox="0 0 400 400" fill="none" className="h-auto w-full">
            {/* static rings */}
            <circle cx="200" cy="200" r="196" stroke="rgba(237,234,227,0.13)" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="150" stroke="rgba(237,234,227,0.2)" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="104" stroke="rgba(232,69,44,0.55)" strokeWidth="1.5" />
            {/* rotating dashed ring */}
            <g className="animate-spin-slower" style={{ transformOrigin: "200px 200px" }}>
              <circle cx="200" cy="200" r="128" stroke="rgba(237,234,227,0.3)" strokeDasharray="4 10" />
            </g>
            <g className="animate-spin-slowest" style={{ transformOrigin: "200px 200px" }}>
              <circle cx="200" cy="200" r="176" stroke="rgba(232,69,44,0.35)" strokeDasharray="52 26" strokeWidth="1" />
            </g>
            {/* crosshair ticks */}
            <line x1="200" y1="8" x2="200" y2="52" stroke="rgba(237,234,227,0.5)" strokeWidth="1.5" />
            <line x1="200" y1="348" x2="200" y2="392" stroke="rgba(237,234,227,0.5)" strokeWidth="1.5" />
            <line x1="8" y1="200" x2="52" y2="200" stroke="rgba(237,234,227,0.5)" strokeWidth="1.5" />
            <line x1="348" y1="200" x2="392" y2="200" stroke="rgba(237,234,227,0.5)" strokeWidth="1.5" />
            {/* bullseye */}
            <circle cx="200" cy="200" r="34" fill="rgba(232,69,44,0.16)" stroke="#e8452c" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="7" fill="#f2b33d" />
            {/* the arrow that hits after load */}
            <motion.g
              initial={{ x: -430, y: -430, opacity: 0 }}
              animate={started ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.28, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            >
              <line x1="96" y1="96" x2="188" y2="188" stroke="#edeae3" strokeWidth="4" strokeLinecap="round" />
              <path d="M188 188 L164 181 L181 164 Z" fill="#e8452c" />
              <path d="M110 78 L96 96 L78 110" stroke="#e8452c" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M104 72 L96 96 L72 104" stroke="#edeae3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* --- headline block --- */}
      <motion.div
        style={{ x: typeX, y: typeY }}
        className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-24 pt-32 md:px-10 md:pt-36"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-[11px] tracking-[0.4em] text-fog md:mb-8 md:text-xs"
        >
          <span className="inline-block h-2 w-2 animate-tick bg-flame" />
          数字代理 — DIGITAL AGENCY — 北纬 67.8° 起瞄
        </motion.p>

        <h1 className="font-display uppercase leading-[0.86] text-bone">
          <span className="block overflow-hidden">
            <motion.span
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate={state}
              className="block text-[clamp(3.4rem,11.5vw,11.5rem)]"
            >
              Design that
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate={state}
              className="text-stroke block text-[clamp(3.4rem,11.5vw,11.5rem)]"
            >
              hits the
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate={state}
              className="block text-[clamp(3.4rem,11.5vw,11.5rem)]"
            >
              Target<span className="align-super text-[0.42em] text-flame">®</span>
              <span className="ml-4 inline-block h-[0.14em] w-[0.9em] translate-y-[-0.28em] bg-flame align-baseline md:ml-6" />
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.62, duration: 0.7 }}
            className="max-w-md font-cn text-base leading-relaxed text-bone/90 md:text-xl"
          >
            设计直击痛点<span className="text-flame">®</span>
            <span className="mt-2 block text-sm leading-relaxed text-fog md:text-base">
              品牌、影像、网页与营销 — 以弓箭手的精准，塑造消费者的第一印象。
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.74, duration: 0.7 }}
            className="flex items-center gap-6"
          >
            <Magnetic strength={0.3}>
              <a
                href="mailto:ArcherStudio@qq.com"
                className="group inline-flex items-center gap-3 border border-bone/30 px-7 py-4 text-xs tracking-[0.3em] text-bone transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-[#0a0a0b]"
              >
                START A PROJECT
                <span className="font-cn text-xs tracking-[0.2em] opacity-80">开启合作</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* --- bottom bar: scroll cue + coords --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 flex items-center justify-between border-t border-line px-5 py-4 text-[11px] tracking-[0.3em] text-fog md:px-10"
      >
        <span className="flex items-center gap-3">
          <span className="relative block h-6 w-px overflow-hidden bg-fog/30">
            <span className="animate-scroll-cue absolute left-0 top-0 h-full w-px bg-flame" />
          </span>
          SCROLL TO AIM — 开始瞄准
        </span>
        <span className="hidden sm:block">KIRUNA 67.8558°N — BEIJING 39.9042°N</span>
      </motion.div>

      {/* --- marquee --- */}
      <div className="relative z-10 overflow-hidden border-t border-line bg-[#0a0a0b]/70 py-3 backdrop-blur-sm">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex" aria-hidden={half === 1}>
              {MARQUEE.concat(MARQUEE).map((item, i) => (
                <span
                  key={`${half}-${i}`}
                  className="flex items-center gap-6 px-6 text-xs tracking-[0.3em] text-bone/85"
                >
                  {item}
                  <span className="text-flame">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
