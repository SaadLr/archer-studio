"use client";

import { motion } from "framer-motion";

/**
 * SectionLabel — consistent section eyebrow, e.g. "02 / 政府合作 — GOVERNMENT"
 */
export default function SectionLabel({
  index,
  cn,
  en,
  light = false,
}: {
  index: string;
  cn: string;
  en: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-3 text-[11px] tracking-[0.35em] ${
        light ? "text-bone/70" : "text-fog"
      }`}
    >
      <span className="inline-block h-2 w-2 bg-flame" />
      <span className="text-flame">{index}</span>
      <span>/</span>
      <span className={light ? "text-bone" : ""}>{cn}</span>
      <span>—</span>
      <span>{en}</span>
      <span className="h-px flex-1 bg-line" />
    </motion.div>
  );
}
