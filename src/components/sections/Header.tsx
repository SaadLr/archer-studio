"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Magnetic from "@/components/fx/Magnetic";

const NAV = [
  { cn: "政府合作", en: "GOVERNMENT", href: "#government" },
  { cn: "我们做什么", en: "SERVICES", href: "#services" },
  { cn: "国际项目", en: "PROJECTS", href: "#projects" },
  { cn: "工作室", en: "STUDIO", href: "#studio" },
];

export default function Header({ started }: { started: boolean }) {
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160);
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <>
      {/* scroll progress — the bowstring meter */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-flame"
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: "-110%" }}
        animate={{ y: started ? (hidden ? "-110%" : "0%") : "-110%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <Magnetic strength={0.25}>
            <a href="#top" className="flex items-center gap-3" aria-label="Archer Studio home">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="10" stroke="#edeae3" strokeWidth="1.5" />
                <circle cx="11" cy="11" r="5.5" stroke="#edeae3" strokeWidth="1.5" />
                <circle cx="11" cy="11" r="1.8" fill="#e8452c" />
              </svg>
              <span className="font-display text-lg tracking-[0.08em] text-bone">
                ARCHER STUDIO<sup className="ml-0.5 text-[9px] text-flame">®</sup>
              </span>
            </a>
          </Magnetic>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="link-sweep group flex items-baseline gap-1.5 text-xs tracking-[0.22em] text-bone/90 transition-colors hover:text-bone"
              >
                <span className="text-[10px] text-flame">0{i + 1}</span>
                <span>{item.en}</span>
                <span className="text-[11px] text-bone/75 transition-colors group-hover:text-bone">
                  {item.cn}
                </span>
              </a>
            ))}
          </nav>

          <div className="text-right text-[11px] leading-relaxed tracking-[0.28em] text-bone/90">
            <p>DIGITAL AGENCY / 数字代理</p>
            <p className="flex items-center justify-end gap-1.5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
              OPEN FOR PROJECTS
            </p>
          </div>
        </div>
      </motion.header>
    </>
  );
}
