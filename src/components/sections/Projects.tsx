"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/fx/SectionLabel";

type Project = {
  id: string;
  cn: string;
  en: string;
  img: string;
  aspect: string;
  descCn: string;
  descEn: string;
  tags: { en: string; cn: string }[];
  wide?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "pagevine",
    cn: "Pagevine 包装设计",
    en: "PAGEVINE — PACKAGING SYSTEM",
    img: "/images/pagevine.jpg",
    aspect: "aspect-[4/3]",
    descCn: "美妆品牌包装系统设计 —— 从单支小盒到整盒陈列，以极简结构构筑统一视觉语言。",
    descEn: "A cosmetic packaging system — from single carton to full-box display, unified by minimalist structure.",
    tags: [
      { en: "PACKAGING DESIGN", cn: "包装设计" },
      { en: "BRAND IDENTITY", cn: "品牌识别" },
      { en: "STRUCTURAL DESIGN", cn: "结构设计" },
    ],
  },
  {
    id: "vajrayana",
    cn: "Vajrayana 品牌手册",
    en: "VAJRAYANA — BRAND VISUALS",
    img: "/images/vajrayana.jpg",
    aspect: "aspect-[3/4]",
    descCn: "品牌视觉与产品摄影 —— 模特展示与产品特写，以光影塑造高级感品牌印象。",
    descEn: "Brand visuals and product photography — crafting a premium impression through light.",
    tags: [
      { en: "PRODUCT PHOTOGRAPHY", cn: "产品摄影" },
      { en: "BRAND IDENTITY", cn: "品牌识别" },
      { en: "VISUAL DIRECTION", cn: "视觉指导" },
    ],
  },
  {
    id: "film",
    cn: "影像制作 Showreel",
    en: "FILM & PHOTO — SHOWREEL",
    img: "/images/film-photo.jpg",
    aspect: "aspect-[16/9]",
    descCn: "电影质感的品牌影像 —— 从布光到后期调色，为品牌赋予可被记住的氛围。",
    descEn: "Cinematic brand film — from lighting to grade, atmosphere people remember.",
    tags: [
      { en: "FILM PRODUCTION", cn: "影像制作" },
      { en: "COLOR GRADE", cn: "后期调色" },
      { en: "DIRECTION", cn: "导演指导" },
    ],
    wide: true,
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 56, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
      className={p.wide ? "md:col-span-2" : ""}
    >
      <div
        ref={ref}
        data-hover
        data-cursor="VIEW CASE"
        className={`group relative overflow-hidden border border-line ${p.aspect}`}
      >
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[9%] inset-x-0" aria-hidden="true">
          <img
            src={p.img}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#0a0a0b]/25 transition-colors duration-500 group-hover:bg-[#0a0a0b]/10" aria-hidden="true" />
        {/* corner index */}
        <span className="absolute left-4 top-4 border border-bone/30 bg-[#0a0a0b]/60 px-2.5 py-1 text-[10px] tracking-[0.3em] text-bone/95 backdrop-blur-sm">
          {String(i + 1).padStart(2, "0")} / {p.id.toUpperCase()}
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="flex items-center gap-2 font-cn text-xl font-bold text-bone md:text-2xl">
            {p.cn}
            <ArrowUpRight className="h-5 w-5 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.5} />
          </h3>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-fog">{p.en}</p>
          <p className="mt-3 max-w-xl font-cn text-sm leading-relaxed text-bone/85">{p.descCn}</p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-fog">{p.descEn}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
            {p.tags.map((t) => (
              <span key={t.en} className="text-[10px] tracking-[0.22em] text-fog">
                <span className="italic">{t.en}</span>
                <span className="text-fog/80"> / </span>
                <span className="font-cn">{t.cn}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28 md:px-10 md:py-40" aria-label="International projects">
      <SectionLabel index="04" cn="国际项目" en="INTERNATIONAL PROJECTS" />

      <div className="mt-12 md:mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.92] text-bone"
        >
          Shots fired<span className="text-flame">,</span>
          <span className="text-stroke block">bullseyes landed.</span>
        </motion.h2>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-28">
        <div className="md:mt-0">
          <Card p={PROJECTS[0]} i={0} />
        </div>
        <div className="md:mt-32">
          <Card p={PROJECTS[1]} i={1} />
        </div>
        <div className="md:col-span-2">
          <Card p={PROJECTS[2]} i={2} />
        </div>
      </div>
    </section>
  );
}
