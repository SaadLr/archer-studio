"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/fx/SectionLabel";
import Magnetic from "@/components/fx/Magnetic";

const BASES = [
  {
    id: "01",
    cn: "基律纳",
    en: "KIRUNA",
    country: "瑞典 / SWEDEN",
    coords: "67.8558° N, 20.2253° E",
    tz: "Europe/Stockholm",
  },
  {
    id: "02",
    cn: "北京",
    en: "BEIJING",
    country: "中国 / CHINA",
    coords: "39.9042° N, 116.4074° E",
    tz: "Asia/Shanghai",
  },
  {
    id: "03",
    cn: "广州",
    en: "GUANGZHOU",
    country: "中国 / CHINA",
    coords: "23.1291° N, 113.2644° E",
    tz: "Asia/Shanghai",
  },
];

function LocalTime({ tz }: { tz: string }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [tz]);
  return <span className="tabular-nums">{time}</span>;
}

export default function Studio() {
  return (
    <section
      id="studio"
      className="relative border-y border-line bg-[#0d0d0f] px-5 py-28 md:px-10 md:py-40"
      aria-label="Studio locations"
    >
      <SectionLabel index="05" cn="工作室" en="STUDIO" />

      <div className="mt-12 md:mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,5rem)] uppercase leading-[0.95] text-bone"
        >
          Three bases.
          <span className="text-stroke block">One line of aim.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-4 font-cn text-lg text-bone/80"
        >
          三个据点，同一条瞄准线。 —— 极光之下与珠江之畔，随时开弓。
        </motion.p>
      </div>

      {/* location cards */}
      <div className="mt-14 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-3">
        {BASES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            data-hover
            className="group relative bg-[#0d0d0f] p-8 transition-colors duration-300 hover:bg-[#111114] md:p-10"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-xs tracking-[0.2em] text-fog transition-colors group-hover:text-flame">
                {b.id} — {b.en}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-flame/70 transition-transform duration-300 group-hover:scale-150" />
            </div>
            <h3 className="mt-8 font-cn text-3xl font-bold text-bone md:text-4xl">
              {b.cn}
              <span className="mt-1 block font-display text-lg font-normal tracking-[0.12em] text-fog">
                {b.en}
              </span>
            </h3>
            <p className="mt-4 font-cn text-xs text-fog">{b.country}</p>
            <p className="mt-1 text-[11px] tracking-[0.18em] text-fog">{b.coords}</p>
            <div className="mt-8 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-[10px] tracking-[0.3em] text-fog">LOCAL TIME 当地时间</span>
              <span className="font-mono text-sm text-bone/90">
                <LocalTime tz={b.tz} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-start gap-10 md:mt-32 lg:flex-row lg:items-end lg:justify-between">
        <motion.h3
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.2rem,6vw,5.5rem)] uppercase leading-[0.92] text-bone"
        >
          Let&apos;s hit
          <span className="text-stroke block">
            the target<span className="text-flame" style={{ WebkitTextStroke: "0" }}>.</span>
          </span>
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Magnetic strength={0.3}>
            <a
              href="mailto:ArcherStudio@qq.com"
              className="group inline-flex items-center gap-4 bg-flame px-8 py-5 text-xs tracking-[0.3em] text-[#0a0a0b] transition-colors duration-300 hover:bg-bone"
            >
              <span className="font-cn text-sm font-bold">开启合作</span>
              <span>START A PROJECT</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
