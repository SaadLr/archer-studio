"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/fx/SectionLabel";

const SERVICES = [
  {
    num: "01",
    cn: "网页与 3D 设计",
    en: "WEB & 3D DESIGN",
    descCn: "网站、界面与实时 3D —— 快速、有触感、为转化而建。",
    descEn: "Sites, interfaces and real-time 3D — fast, tactile and built to convert.",
    tags: ["SITES", "INTERFACES", "REAL-TIME 3D"],
  },
  {
    num: "02",
    cn: "影像与摄影",
    en: "FILM & PHOTO",
    descCn: "具有电影质感的影像与摄影 —— 赋予品牌独特氛围的关键。",
    descEn: "Film and photo with a cinematic feel — what gives a brand its atmosphere.",
    tags: ["FILM", "PHOTOGRAPHY", "DIRECTION"],
  },
  {
    num: "03",
    cn: "营销与增长",
    en: "MARKETING & GROWTH",
    descCn: "策略、内容与营销活动，将关注度转化为势能 —— 自有渠道及过往项目累计 7000 万+ 次播放。",
    descEn: "Strategy, content and campaigns that turn attention into momentum — 70M+ views across our own channels and prior projects.",
    tags: ["STRATEGY", "CONTENT", "CAMPAIGNS"],
  },
  {
    num: "04",
    cn: "品牌识别",
    en: "BRAND IDENTITY",
    descCn: "命名、标志与视觉系统 —— 品牌赖以被识别的语言。",
    descEn: "Names, logos and visual systems — the language a brand is recognized by.",
    tags: ["NAMING", "LOGOS", "SYSTEMS"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-28 md:px-10 md:py-40" aria-label="What we do">
      <SectionLabel index="03" cn="我们做什么" en="WHAT WE DO" />

      <div className="mt-12 flex flex-col gap-8 md:mt-16 lg:flex-row lg:items-end lg:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.92] text-bone"
        >
          Four arrows.
          <span className="text-stroke block">One target.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-md font-cn text-sm leading-relaxed text-fog"
        >
          我们是一家小型工作室，致力于统筹全局 —— 策略、设计、动效与代码集于一处。从最初的创意到最终的网站上线，我们将品牌、体验与增长打造成一个连贯的整体。
          <span className="mt-2 block text-xs text-fog/90">
            A small studio working with the whole picture — strategy, design, motion and code under one roof.
          </span>
        </motion.p>
      </div>

      {/* service rows */}
      <div className="mt-16 md:mt-24">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            data-hover
            className={`group relative border-t border-line py-8 transition-colors duration-300 hover:bg-bone/[0.025] md:py-10 ${
              i === SERVICES.length - 1 ? "border-b" : ""
            }`}
          >
            {/* flame edge on hover */}
            <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-flame transition-transform duration-400 ease-out group-hover:scale-y-100" />

            <div className="grid items-start gap-4 px-2 md:grid-cols-[70px_1.1fr_1fr_44px] md:gap-8 md:px-6">
              <span className="font-display text-sm text-fog transition-colors duration-300 group-hover:text-flame">
                /{s.num}
              </span>

              <h3 className="transition-transform duration-300 group-hover:translate-x-2">
                <span className="block font-cn text-2xl font-bold text-bone md:text-3xl">
                  {s.cn}
                </span>
                <span className="mt-1 block font-display text-lg tracking-[0.06em] text-fog transition-colors duration-300 group-hover:text-bone md:text-xl">
                  {s.en}
                </span>
              </h3>

              <div>
                <p className="font-cn text-sm leading-relaxed text-bone/90">{s.descCn}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-fog">{s.descEn}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] tracking-[0.3em] text-fog/90">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <span className="hidden justify-self-end md:block">
                <ArrowUpRight
                  className="h-7 w-7 -translate-x-2 translate-y-2 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
