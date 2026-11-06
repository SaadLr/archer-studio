"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import CustomCursor from "@/components/fx/CustomCursor";
import BackgroundFX from "@/components/fx/BackgroundFX";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import GovProject from "@/components/sections/GovProject";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Studio from "@/components/sections/Studio";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  // Mount the Preloader on the client only — browser translate extensions
  // mutate text nodes before hydration, which caused hydration mismatches.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {mounted && loading && (
          <Preloader key="preloader" onDone={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <BackgroundFX />
      <Header started={!loading} />

      <main className="relative z-10">
        <Hero started={!loading} />
        <Manifesto />
        <GovProject />
        <Services />
        <Projects />
        <Studio />
        <Footer />
      </main>

      {/* film grain above everything (below cursor) */}
      <div className="grain" aria-hidden="true" />
    </SmoothScroll>
  );
}
