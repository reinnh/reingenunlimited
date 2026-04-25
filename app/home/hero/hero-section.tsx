"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ComputersCanvas from "../canvas/Computers";
import { useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
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

        {/* Right - Canvas */}
          <ComputersCanvas />
        
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
