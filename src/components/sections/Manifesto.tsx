"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from "framer-motion";
import SectionLabel from "@/components/fx/SectionLabel";

/* tokens: EN words + CN chunks kept whole */
const TOKENS = [
  "Archer", "Studio", "shapes", "the", "first", "feeling", "—",
  "品牌、", "影像、", "网页", "与", "营销，", "为", "深知",
  "“", "感知", "即", "竞争力", "”", "的", "企业，", "打造", "从", "策略", "到", "落地的", "完整", "闭环。",
  "Perception", "is", "the", "target.", "设计直击痛点®",
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-flame">{suffix}</span>
    </span>
  );
}

const STATS = [
  { to: 70, suffix: "M+", cn: "全渠道累计播放", en: "ORGANIC VIEWS ACROSS CHANNELS" },
  { to: 3, suffix: "", cn: "三大据点连成瞄准线", en: "STUDIOS — KIRUNA · BEIJING · GUANGZHOU" },
  { to: 4, suffix: "", cn: "四项专业集于一处", en: "DISCIPLINES UNDER ONE ROOF" },
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  const driftRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: drift } = useScroll({
    target: driftRef,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(drift, [0, 1], ["4%", "-14%"]);

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-40" aria-label="Manifesto">
      <SectionLabel index="01" cn="宣言" en="MANIFESTO" />

      <div ref={ref} className="mt-12 max-w-5xl md:mt-16">
        <p className="font-cn text-[clamp(1.55rem,3.6vw,3.3rem)] font-medium leading-[1.28] text-bone">
          {TOKENS.map((token, i) => {
            const start = i / TOKENS.length;
            const end = start + 1 / TOKENS.length;
            return (
              <span key={i}>
                <Word progress={scrollYProgress} range={[start, end]}>
                  {token}
                </Word>{" "}
              </span>
            );
          })}
        </p>
      </div>

      {/* stats */}
      <div className="mt-20 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:mt-28">
        {STATS.map((s, i) => (
          <motion.div
            key={s.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-[#0a0a0b] p-8 transition-colors duration-300 hover:bg-[#101012] md:p-10"
          >
            <div className="font-display text-5xl leading-none text-bone md:text-6xl">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-4 font-cn text-sm text-bone/85">{s.cn}</p>
            <p className="mt-1 text-[11px] tracking-[0.25em] text-fog">{s.en}</p>
          </motion.div>
        ))}
      </div>

      {/* drifting strip — moves with scroll */}
      <div ref={driftRef} className="mt-24 overflow-hidden md:mt-32" aria-hidden="true">
        <motion.div
          style={{ x: driftX }}
          className="text-stroke-thin whitespace-nowrap font-display text-[clamp(2.6rem,7vw,6.5rem)] uppercase leading-none opacity-60"
        >
          Precision 精度 <span className="text-flame" style={{ WebkitTextStroke: "0" }}>×</span> Timing 时机 <span className="text-flame" style={{ WebkitTextStroke: "0" }}>×</span> Control 控制 <span className="text-flame" style={{ WebkitTextStroke: "0" }}>×</span> Impact 命中
        </motion.div>
      </div>
    </section>
  );
}
