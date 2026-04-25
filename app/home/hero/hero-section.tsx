"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const ComputersCanvas = dynamic(() => import("../canvas/Computers"), { ssr: false });
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);
  return (
    <section
      id="hero"
      className="relative h-[90vh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/herobg.png"
          alt="engineering systems"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content + Canvas */}
      <AnimatePresence>
      <div className="relative z-10 flex flex-col   md:flex-row md:items-center justify-between h-full px-4  mx-auto  py-20 md:py-8">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:max-w-130 text-white max-w-70 ">
          <h1 className="text-xl md:text-3xl lg:text-6xl  font-saira font-black leading-[1.05]">
            ENGINEERED <br />
            SOFTWARE & <br />
            DIGITAL <br />
            INFRASTRUCTURE
          </h1>

          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`mt-6 text-lg md:text-xl text-neutral-300 leading-relaxed md:line-clamp-none ${!isOpen ? "line-clamp-3" : "line-clamp-none"} `}>
            Reingen is a technology engineering company building scalable platforms, high-performance web systems, and modern digital infrastructure for startups, enterprises, and emerging markets.
          </motion.p>

          <div className="flex gap-5 mt-8">
            <Link href="/start-project">
              <button className="bg-transparent text-white px-7 py-3 font-semibold rounded-sm border border-white/25 hover:border-sky-300/60 hover:bg-sky-400/10 transition-colors">Start a Project</button>
            </Link>
          </div>
        </motion.div>

        {/* Right - Canvas or Fallback */}
        {isMobile ? (
          <div className="w-full h-full flex items-center justify-center pointer-events-none xl:flex-1 max-w-xl h-[350px] md:h-[500px]">
            <div className="relative w-[280px] h-[280px] rounded-full border border-sky-500/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent flex items-center justify-center">
              <div className="w-[180px] h-[180px] rounded-full border border-sky-400/20 bg-sky-800/10" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] rounded-full opacity-30" />
            </div>
          </div>
        ) : (
          <ComputersCanvas />
        )}
        
      </div>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center items-center z-20">
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[32px] h-[56px] rounded-3xl border-[3px] border-white/40 flex justify-center items-start p-2 hover:border-sky-300/60 transition-colors">
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2.5 h-2.5 rounded-full bg-white/70 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
