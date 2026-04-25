
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const features = [
  {
    title: "End-to-End Product Engineering",
    description:
      "We take ownership from planning through launch. You get clear requirements, solid architecture, and clean implementation—built to ship quickly today and scale confidently tomorrow. We align scope, timelines, and technical decisions so delivery stays predictable and maintainable.",
    highlight: "Delivery",
    sub: "Discovery → Build → Launch",
    image: "/images/dev1.jpg",
  },
  {
    title: "Clear Process, Visible Progress",
    description:
      "We run organized sprints with defined milestones, transparent priorities, and frequent updates. You always know what’s shipping, what’s next, and why—no guesswork or surprises. We document decisions, keep feedback loops tight, and ensure each release moves the product forward.",
    highlight: "Clarity",
    sub: "Sprints • Milestones • Updates",
    image: "/images/dev2.png",
  },
  {
    title: "Secure, Performant, Scalable",
    description:
      "We engineer for reliability from day one: performance budgets, secure defaults, and maintainable code. Your platform stays fast, stable, and ready for growth. We optimize critical paths, reduce operational risk, and build a foundation your team can confidently extend over time.",
    highlight: "Quality",
    sub: "Security • Performance • Scale",
    image: "/images/dev3.mp4",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function EngineeringDifference() {
  const ids = useMemo(
    () =>
      features.map((f) =>
        f.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      ),
    [],
  );
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="about" className="w-full bg-[#050816] text-white py-24 md:py-28 px-6 md:px-10">
      <div className="mx-auto max-w-8xl">
        {/* HEADER */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-sky-400/90 tracking-[0.28em] text-xs sm:text-sm mb-5">
            ABOUT REINGEN
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold mb-5 font-saira text-white/95">
            Engineering-first software delivery.
          </h2>

          <p className="text-neutral-300/80 max-w-3xl mx-auto text-pretty leading-relaxed">
            We design and build modern websites and web applications for teams
            that need speed, quality, and long-term maintainability. Our approach
            is structured, transparent, and focused on outcomes.
          </p>
        </div>

        {/* FEATURES */}
        <div className="space-y-40">

        {features.map((feature, i) => {
          const isReverse = i % 2 !== 0;
          const isVideo = feature.image.endsWith(".mp4");

          return (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24"
            >

              {/* IMAGE */}
              <div
                className={[
                  "relative w-full h-105 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]",
                  isReverse ? "lg:order-2" : "lg:order-1",
                ].join(" ")}
              >
                {isVideo ? (
                  <video
                    className="h-full w-full rounded-xl object-cover transition duration-700 hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={feature.title}
                  >
                    <source src={feature.image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover rounded-xl hover:scale-105 transition duration-700"
                  />
                )}
              </div>

              {/* TEXT */}
              <div className={isReverse ? "lg:order-1" : "lg:order-2"}>
                <h3 className="font-saira text-2xl font-semibold mb-4 text-white/95">
                  {feature.title}
                </h3>

                {/* Desktop: full description */}
                <p className="hidden md:block text-neutral-300/75 leading-relaxed mb-7">
                  {feature.description}
                </p>

                {/* Mobile: collapsed preview + smooth expand */}
                <div className="md:hidden mb-7">
                  <p className="text-neutral-300/75 leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>

                  <motion.div
                    initial={false}
                    animate={
                      openId === ids[i]
                        ? { height: "auto", opacity: 1, marginTop: 10 }
                        : { height: 0, opacity: 0, marginTop: 0 }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-300/75 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === ids[i] ? null : ids[i]))
                    }
                    className="mt-3 inline-flex items-center text-sm font-medium text-sky-300/90 hover:text-sky-200 transition-colors"
                  >
                    {openId === ids[i] ? "Show less" : "Read more"}
                  </button>
                </div>

                <div>
                  <p className="text-sky-400 text-2xl font-semibold">
                    {feature.highlight}
                  </p>

                  <p className="text-sm text-neutral-400/70">
                    {feature.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}