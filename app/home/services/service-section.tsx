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

const cardVariants: Variants = {
  hidden: (dir: "left" | "right") => ({
    opacity: 0,
    y: 60,
    x: dir === "left" ? -40 : 40,
    scaleX: 0.8,
    scaleY: 1.2,
    skewX: dir === "left" ? 20 : -20,
    skewY: dir === "left" ? 10 : -10,
    filter: "blur(6px)",
  }),
  show: (dir: "left" | "right") => ({
    opacity: 1,
    y: 0,
    x: 0,
    scaleX: [0.8, 1.1, 0.95, 1.02, 1],
    scaleY: [1.2, 0.9, 1.05, 0.98, 1],
    skewX: dir === "left" ? [20, -10, 5, -2, 0] : [-20, 10, -5, 2, 0],
    skewY: dir === "left" ? [10, -5, 2, -1, 0] : [-10, 5, -2, 1, 0],
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      times: [0, 0.4, 0.6, 0.8, 1]
    },
  }),
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
      whileHover={{ 
        y: -5,
        scaleX: [1, 1.05, 0.95, 1.02, 0.98, 1],
        scaleY: [1, 0.95, 1.05, 0.98, 1.02, 1],
        skewX: [0, -4, 4, -2, 2, 0],
        skewY: [0, 2, -2, 1, -1, 0],
        rotate: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.7, ease: "easeInOut" }
      }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={[
        "relative overflow-visible rounded-xl border-b-4 border-b-white",
        "bg-[#1d1836]",
        "shadow-lg",
      ].join(" ")}
    >
      {/* Arrow for left aligned card (desktop) */}
      {align === "left" && (
        <div className="hidden md:block absolute top-[15px] -right-[16px] w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#1d1836]" />
      )}
      
      {/* Arrow for right aligned card (desktop) */}
      {align === "right" && (
        <div className="hidden md:block absolute top-[15px] -left-[16px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[16px] border-r-[#1d1836]" />
      )}

      {/* Arrow for mobile (always on left since card is on right of timeline) */}
      <div className="md:hidden absolute top-[15px] -left-[16px] w-0 h-0 border-y-[10px] border-y-transparent border-r-[16px] border-r-[#1d1836]" />

      <div className="relative p-6 sm:p-7">
        <h3 className="text-xl sm:text-[22px] font-bold leading-snug text-white">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[15px] font-medium tracking-wide text-white/60">
          {item.subtitle}
        </p>

        <ul className="mt-5 space-y-3">
          {item.description.split('. ').map((point, index) => {
            if (!point.trim()) return null;
            return (
              <li key={index} className="flex items-start gap-3 text-white/80 text-sm sm:text-[15px] leading-relaxed">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/80 flex-shrink-0" />
                <span>{point}{index < item.description.split('. ').length - 1 ? '.' : ''}</span>
              </li>
            );
          })}
        </ul>
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
            <div className="pointer-events-none absolute left-6 top-0 h-full w-[3px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />

            <ol className="space-y-8 md:space-y-14">
              {services.map((item, index) => {
                const isLeft = index % 2 === 0;
                const align: "left" | "right" = isLeft ? "left" : "right";

                return (
                  <li
                    key={item.title}
                    className="grid grid-cols-[48px_1fr] items-start gap-x-5 md:grid-cols-[1fr_64px_1fr] md:gap-x-10"
                  >
                    {/* Left column (desktop) */}
                    <div className="hidden md:flex justify-end pr-2 pt-1">
                      {isLeft ? (
                        <ServiceCard item={item} align="left" />
                      ) : (
                        <span className="text-white font-bold tracking-wider pt-3">{item.period}</span>
                      )}
                    </div>

                    {/* Node */}
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                          "relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full border-[4px] border-white/20",
                          "bg-[#1d1836] shadow-xl",
                        ].join(" ")}
                      >
                        <div className="text-white flex items-center justify-center h-full w-full">
                          {item.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right column (mobile + desktop) */}
                    <div className="md:mt-0 pt-1">
                      <div className="md:hidden mb-3 text-white font-bold tracking-wider text-sm pt-3">
                        {item.period}
                      </div>
                      <div className="md:hidden">
                        <ServiceCard item={item} align="right" />
                      </div>
                      <div className="hidden md:block pl-2">
                        {!isLeft ? (
                          <ServiceCard item={item} align="right" />
                        ) : (
                          <span className="text-white font-bold tracking-wider pt-3 inline-block">{item.period}</span>
                        )}
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