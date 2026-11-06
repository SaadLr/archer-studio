"use client";

import { motion } from "framer-motion";

const SITEMAP = [
  { cn: "宣言", en: "MANIFESTO", href: "#about" },
  { cn: "政府合作", en: "GOVERNMENT", href: "#government" },
  { cn: "我们做什么", en: "SERVICES", href: "#services" },
  { cn: "国际项目", en: "PROJECTS", href: "#projects" },
  { cn: "工作室", en: "STUDIO", href: "#studio" },
];

const FOLLOW = [
  { cn: "抖音", en: "TIKTOK", value: "sidiidisiowwowoa", href: "https://www.tiktok.com/@sidiidisiowwowoa" },
  { cn: "小红书", en: "RED", value: "5665576758" },
  { cn: "微信", en: "WECHAT", value: "BifzikarRer" },
  { cn: "QQ", en: "QQ", value: "875906630" },
  { cn: "邮箱", en: "EMAIL", value: "ArcherStudio@qq.com", href: "mailto:ArcherStudio@qq.com" },
];

const MARK = "ARCHER STUDIO".split("");

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" aria-label="Footer">
      {/* reverse marquee */}
      <div className="overflow-hidden border-b border-line py-4">
        <div className="animate-marquee-reverse flex w-max whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex" aria-hidden={half === 1}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={`${half}-${i}`}
                  className="flex items-center gap-8 px-8 text-xs tracking-[0.35em] text-fog"
                >
                  DESIGN THAT HITS THE TARGET
                  <span className="text-flame">✦</span>
                  <span className="font-cn">设计直击痛点®</span>
                  <span className="text-flame">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* link columns */}
      <div className="grid gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20">
        <div>
          <p className="text-[11px] tracking-[0.35em] text-fog">
            <span className="font-cn">站内导航</span> / SITEMAP
          </p>
          <ul className="mt-6 space-y-3">
            {SITEMAP.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-sweep inline-flex items-baseline gap-3 text-sm text-bone/80 transition-colors hover:text-bone"
                >
                  <span className="font-cn text-xs text-fog">{l.cn}</span>
                  <span className="font-display tracking-[0.12em]">{l.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-[11px] tracking-[0.35em] text-fog">
            <span className="font-cn">关注我们</span> / FOLLOW
          </p>
          <ul className="mt-6 space-y-3">
            {FOLLOW.map((f) => {
              const inner = (
                <>
                  <span className="font-cn text-xs text-fog">{f.cn}</span>
                  <span className="text-[11px] tracking-[0.25em] text-fog">{f.en}</span>
                  <span className="link-sweep font-mono text-sm text-bone/85">{f.value}</span>
                </>
              );
              return (
                <li key={f.en} className="flex items-baseline gap-4 md:justify-end">
                  {f.href ? (
                    <a
                      href={f.href}
                      target={f.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-baseline gap-4 transition-colors hover:text-bone"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="px-2 pb-6 md:px-4" aria-hidden="true">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="select-none text-center font-display uppercase leading-[0.82] text-bone"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
              className="flex justify-center text-[clamp(3rem,13.2vw,13rem)]"
            >
              {MARK.slice(0, 6).map((ch, i) => (
                <motion.span
                  key={`a-${i}`}
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="inline-block transition-colors duration-200 hover:text-flame"
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.28 } },
              }}
              className="flex items-baseline justify-center text-[clamp(3rem,13.2vw,13rem)]"
            >
              {MARK.slice(7).map((ch, i) => (
                <motion.span
                  key={`s-${i}`}
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="inline-block transition-colors duration-200 hover:text-flame"
                >
                  {ch}
                </motion.span>
              ))}
              <motion.sup
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.85, duration: 0.5 } },
                }}
                className="ml-2 align-super font-cn text-[clamp(0.8rem,2vw,2rem)] text-flame"
              >
                ®
              </motion.sup>
            </motion.span>
          </span>
        </motion.h2>
      </div>

      {/* bottom bar */}
      <div className="flex flex-col gap-3 border-t border-line px-5 py-5 text-[10px] tracking-[0.28em] text-fog md:flex-row md:items-center md:justify-between md:px-10">
        <span>© 2026 ARCHER STUDIO <span className="font-cn">保留所有权利</span> / ALL RIGHTS RESERVED</span>
        <span className="flex gap-6">
          <a href="#top" className="link-sweep hover:text-bone"><span className="font-cn">隐私政策</span> / PRIVACY</a>
          <a href="#top" className="link-sweep hover:text-bone"><span className="font-cn">条款</span> / TERMS</a>
        </span>
        <span className="font-cn">北极圈造，为命中而生。</span>
      </div>
    </footer>
  );
}
