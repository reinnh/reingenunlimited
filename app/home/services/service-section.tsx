"use client";

import { motion ,Variants} from "framer-motion";
import SectionWrapper from "@/app/hoc/section-wrapper";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Gauge,
  LifeBuoy,
  Palette,
  ShoppingCart,
  Globe,
} from "lucide-react";
import TechStackSection from "./tech-stack";

type Service = {
  title: string;
  subtitle: string;
  description: string;
  period: string;
  icon: ReactNode;
  accent: {
    line: string;
    softBg: string;
    ring: string;
  };
};

const services: Service[] = [
  {
    title: "Custom Website Development",
    subtitle: "Modern, responsive websites",
    description:
      "We design and build fast, responsive websites that reflect your brand and convert visitors into customers. From landing pages to multi-page sites, we deliver clean UI, accessible layouts, and a polished experience across all devices.",
    period: "Websites",
    icon: <Globe className="h-5 w-5" />,
    accent: {
      line: "bg-indigo-400/70",
      softBg: "bg-indigo-400/10",
      ring: "ring-indigo-400/25",
    },
  },
  {
    title: "UI/UX Design & Branding",
    subtitle: "Professional look & feel",
    description:
      "We create clean, modern interfaces with a consistent design system—typography, spacing, components, and interactions. The result is a premium, easy-to-use experience that stays cohesive as your product scales.",
    period: "Design",
    icon: <Palette className="h-5 w-5" />,
    accent: {
      line: "bg-sky-400/70",
      softBg: "bg-sky-400/10",
      ring: "ring-sky-400/25",
    },
  },
  {
    title: "Web App Development",
    subtitle: "Dashboards, portals, platforms",
    description:
      "We build secure, scalable web applications with modern architecture and a focus on performance. Expect clean code, reusable components, smooth animations, and a maintainable foundation your team can grow with.",
    period: "Apps",
    icon: <Code2 className="h-5 w-5" />,
    accent: {
      line: "bg-sky-400/70",
      softBg: "bg-sky-400/10",
      ring: "ring-sky-400/25",
    },
  },
  {
    title: "E‑commerce & Payments",
    subtitle: "Checkout that converts",
    description:
      "We implement product catalogs, carts, and frictionless checkout flows with trusted payment integrations. Built for speed, reliability, and a customer experience that feels secure and effortless.",
    period: "Commerce",
    icon: <ShoppingCart className="h-5 w-5" />,
    accent: {
      line: "bg-amber-400/75",
      softBg: "bg-amber-400/10",
      ring: "ring-amber-400/25",
    },
  },
  {
    title: "SEO, Performance & Analytics",
    subtitle: "Visibility + measurable growth",
    description:
      "We optimize Core Web Vitals, metadata, and on-page structure to improve rankings and load times. With analytics in place, you get clear insight into user behavior and what drives conversions.",
    period: "Optimize",
    icon: <Gauge className="h-5 w-5" />,
    accent: {
      line: "bg-violet-400/70",
      softBg: "bg-violet-400/10",
      ring: "ring-violet-400/25",
    },
  },
  {
    title: "Maintenance, Support & Hosting",
    subtitle: "Reliable and up to date",
    description:
      "We keep your product stable with ongoing updates, bug fixes, monitoring, and security hardening. You get dependable support and continuous improvements—without operational headaches.",
    period: "Support",
    icon: <LifeBuoy className="h-5 w-5" />,
    accent: {
      line: "bg-fuchsia-400/70",
      softBg: "bg-fuchsia-400/10",
      ring: "ring-fuchsia-400/25",
    },
  },
];

const cardVariants:Variants = {
  hidden: (dir: "left" | "right") => ({
    opacity: 0,
    y: 14,
    x: dir === "left" ? -28 : 28,
    filter: "blur(6px)",
  }),
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({
  item,
  align,
}: {
  item: Service;
  align: "left" | "right";
}) {
  return (
    <motion.div
      custom={align}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={[
        "relative overflow-hidden rounded-xl border border-white/10",
        "bg-[#141427]/70",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_22px_70px_-30px_rgba(0,0,0,0.85)]",
        "backdrop-blur",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90">
        <div className={["h-full w-full", item.accent.line].join(" ")} />
      </div>
      <div className="relative min-h-[176px] p-6 sm:min-h-[190px] sm:p-7">
        <div className="flex items-start gap-3">
          <div
            className={[
              "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg",
              "border border-white/10 text-white/90",
              "ring-1",
              item.accent.ring,
              item.accent.softBg,
            ].join(" ")}
          >
            {item.icon}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-medium tracking-wide text-white/60">
              {item.subtitle}
            </p>
            <h3 className="mt-1 text-base sm:text-lg font-semibold leading-snug text-white">
              {item.title}
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/75">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// PreferredStackBranches replaced by TechStackSection (./tech-stack.tsx)

const Timeline = () => {
  return (
    <section className="relative w-full py-16">
      <div className="mx-auto  px-4 md:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-saira text-balance text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl"
          >
            Services We Offer
          </motion.h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
            Clear, professional delivery across strategy, design, development, and
            long-term support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-0 h-full w-1 bg-gradient-to-b from-indigo-400/65 via-sky-400/45 to-fuchsia-400/65 md:left-1/2 md:-translate-x-1/2" />

            <ol className="space-y-8 md:space-y-14">
              {services.map((item, index) => {
                const isLeft = index % 2 === 0;
                const align: "left" | "right" = isLeft ? "left" : "right";

                return (
                  <li
                    key={item.title}
                    className="grid grid-cols-[24px_1fr] items-start gap-x-5 md:grid-cols-[1fr_64px_1fr] md:gap-x-10"
                  >
                    {/* Left column (desktop) */}
                    <div className="hidden md:block">
                      {isLeft ? <ServiceCard item={item} align="left" /> : null}
                    </div>

                    {/* Node + period */}
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                          "relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-white/20",
                          "bg-[#0b0b14]/70 shadow-[0_14px_40px_-20px_rgba(0,0,0,0.95)] backdrop-blur",
                        ].join(" ")}
                      >
                        <motion.div
                          aria-hidden="true"
                          animate={{
                            opacity: [0.25, 0.65, 0.25],
                            scale: [1, 1.18, 1],
                          }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-xl bg-white/10"
                        />
                        <div
                          className={[
                            "relative grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/90",
                            "ring-1",
                            item.accent.ring,
                            item.accent.softBg,
                          ].join(" ")}
                        >
                          {item.icon}
                        </div>
                      </motion.div>

                      <div className="mt-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/60">
                        {item.period}
                      </div>
                    </div>

                    {/* Right column (mobile + desktop) */}
                    <div className="md:mt-0">
                      <div className="md:hidden">
                        <ServiceCard item={item} align="right" />
                      </div>
                      <div className="hidden md:block">
                        {!isLeft ? (
                          <ServiceCard item={item} align="right" />
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:sticky lg:top-24">
            <TechStackSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Timeline, "services");