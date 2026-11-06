"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/fx/SectionLabel";

const TAGS = ["环境导视 SIGNAGE", "品牌识别 BRAND IDENTITY", "建筑影像 VISUALIZATION"];

export default function GovProject() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* image drifts slower than the page — classic parallax window */
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const contentY = useTransform(scrollYProgress, [0.25, 1], ["0%", "-18%"]);
  const veil = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.35, 0.6]);

  return (
    <section
      id="government"
      ref={ref}
      className="relative h-[105vh] min-h-[620px] overflow-hidden"
      aria-label="Government collaboration projects"
    >
      {/* parallax image */}
      <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0" aria-hidden="true">
        <img
          src="/images/gov-project.jpg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[#06060a] to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80" aria-hidden="true" />

      {/* registration marks */}
      <span className="mark left-5 top-24" aria-hidden="true" />
      <span className="mark right-5 top-24" aria-hidden="true" />

      {/* content */}
      <motion.div
        style={{ y: contentY }}
        className="absolute inset-x-0 bottom-0 px-5 pb-14 md:px-10 md:pb-20"
      >
        <div className="mb-6">
          <div className="[&_span.h-px]:bg-bone/30">
            <SectionLabel index="02" cn="政府合作" en="GOVERNMENT COLLABORATION" light />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.6rem,7.5vw,7rem)] uppercase leading-[0.9] text-bone"
            >
              Government
              <span className="block text-stroke">Collaboration</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-3 font-cn text-xl font-bold text-bone/90 md:text-2xl"
            >
              政府合作项目
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="font-cn text-sm leading-relaxed text-bone/90">
              为国机集团成员企业提供环境导视与品牌形象系统 —
              从园区大门到楼宇标识，让每一处细节都精准传达国家队的分量与秩序。
            </p>
            <p className="mt-2 text-xs leading-relaxed text-bone/80">
              Environmental signage & brand systems for SINOMACH subsidiaries —
              identity work measured at the scale of entire campuses.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="border border-bone/35 px-3 py-1.5 text-[11px] tracking-[0.2em] text-bone/90 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
