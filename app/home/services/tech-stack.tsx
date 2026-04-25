"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA — organised by SERVICE AREA                                   */
/* ------------------------------------------------------------------ */

type TechItem = { name: string; icon: string };

type TechCategory = {
  label: string;
  accent: string;
  items: TechItem[];
};

const categories: TechCategory[] = [
  {
    label: "Website Development",
    accent: "#60A5FA",
    items: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap 5", icon: "bootstrap" },
    ],
  },
  {
    label: "UI/UX & Branding",
    accent: "#38BDF8",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Framer Motion", icon: "framermotion" },
      { name: "shadcn/ui", icon: "react" },
      { name: "Responsive", icon: "css3" },
    ],
  },
  {
    label: "Web App Development",
    accent: "#818CF8",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "Zustand", icon: "react" },
      { name: "Hook Form", icon: "react" },
      { name: "Zod", icon: "typescript" },
      { name: "Server Actions", icon: "nextjs" },
      { name: "API Routes", icon: "nextjs" },
    ],
  },
  {
    label: "E-commerce & Data",
    accent: "#FBBF24",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongodb" },
      { name: "Prisma", icon: "prisma" },
      { name: "REST APIs", icon: "fastapi" },
      { name: "GraphQL", icon: "graphql" },
      { name: "WebSockets", icon: "socketio" },
    ],
  },
  {
    label: "SEO & Performance",
    accent: "#34D399",
    items: [
      { name: "Elasticsearch", icon: "elasticsearch" },
      { name: "Cloudinary", icon: "cloudflare" },
      { name: "SSR/SSG", icon: "nextjs" },
      { name: "Web Vitals", icon: "chrome" },
    ],
  },
  {
    label: "Security & Auth",
    accent: "#F472B6",
    items: [
      { name: "JWT", icon: "json" },
      { name: "Cookie Auth", icon: "chrome" },
      { name: "RBAC", icon: "linux" },
      { name: "Cybersecurity", icon: "linux" },
      { name: "Red Team", icon: "linux" },
      { name: "Pen Testing", icon: "linux" },
    ],
  },
  {
    label: "DevOps & Infra",
    accent: "#FB923C",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "VS Code", icon: "vscode" },
      { name: "PlatformIO", icon: "arduino" },
      { name: "Sys Design", icon: "archlinux" },
    ],
  },
  {
    label: "Hardware & IoT",
    accent: "#A78BFA",
    items: [
      { name: "ESP32", icon: "arduino" },
      { name: "RPi Pico", icon: "raspberrypi" },
      { name: "C/C++", icon: "cplusplus" },
      { name: "MCUs", icon: "arduino" },
    ],
  },
];

/* ---- Icon CDN ---------------------------------------------------- */

const iconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;

const ICON_OVERRIDES: Record<string, string> = {
  nextjs: iconUrl("nextjs").replace("-original", "-plain"),
  express: iconUrl("express"),
  github: iconUrl("github"),
  vscode: iconUrl("vscode"),
  archlinux: iconUrl("archlinux"),
  json: iconUrl("json"),
  chrome: iconUrl("chrome"),
  socketio: iconUrl("socketio"),
  framermotion: iconUrl("framermotion"),
  cloudflare: iconUrl("cloudflare"),
  prisma: iconUrl("prisma"),
  elasticsearch: iconUrl("elasticsearch"),
};

const INVERT_SLUGS = new Set(["nextjs", "express", "github"]);

function getIconSrc(slug: string) {
  return ICON_OVERRIDES[slug] ?? iconUrl(slug);
}

const TOTAL = categories.reduce((s, c) => s + c.items.length, 0);

/* ---- How many categories to show inline before "View all" -------- */
const VISIBLE_CATS = 4; // show first 4 categories inline

/* ================================================================== */
/*  INLINE ICON (tiny)                                                 */
/* ================================================================== */

function TinyIcon({ item }: { item: TechItem }) {
  return (
    <div className="group relative flex items-center gap-1.5 rounded-md border border-white/6 bg-white/[0.025] px-2 py-1.5 transition duration-150 hover:bg-white/[0.06] hover:border-white/12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getIconSrc(item.icon)}
        alt={item.name}
        className="h-3.5 w-3.5 object-contain"
        loading="lazy"
        style={{ filter: INVERT_SLUGS.has(item.icon) ? "invert(1)" : undefined }}
      />
      <span className="text-[10px] leading-none text-white/50 group-hover:text-white/70 transition-colors whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  CHIP (used in modal)                                               */
/* ================================================================== */

function Chip({ item }: { item: TechItem }) {
  return (
    <div className="group flex flex-col items-center gap-1">
      <div className="h-8 w-8 grid place-items-center rounded-md border border-white/8 bg-white/[0.03] transition duration-150 group-hover:bg-white/[0.07] group-hover:border-white/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getIconSrc(item.icon)}
          alt={item.name}
          className="h-4 w-4 object-contain"
          loading="lazy"
          style={{ filter: INVERT_SLUGS.has(item.icon) ? "invert(1)" : undefined }}
        />
      </div>
      <span className="text-[9px] leading-none text-white/40 group-hover:text-white/65 transition-colors text-center truncate max-w-[54px]">
        {item.name}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  MODAL                                                              */
/* ================================================================== */

function TechModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[82vh] overflow-y-auto no-scrollbar rounded-xl border border-white/10 bg-[#0b0b18]/95 backdrop-blur-xl"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/8 bg-[#0b0b18]/90 backdrop-blur px-5 py-3.5">
              <div>
                <h3 className="font-saira text-base font-semibold text-white/95">Full Technology Stack</h3>
                <p className="text-[11px] text-white/45">{TOTAL} technologies · {categories.length} service areas</p>
              </div>
              <button onClick={onClose} className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors" aria-label="Close">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-6">
              {categories.map((cat, ci) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.035, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.accent }} />
                    <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: cat.accent }}>{cat.label}</span>
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] text-white/30">{cat.items.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ci * 0.035 + ii * 0.018, duration: 0.2 }}
                      >
                        <Chip item={item} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  MAIN EXPORT                                                        */
/* ================================================================== */

export default function TechStackSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        {/* heading */}
        <p className="text-[11px] font-medium tracking-[0.25em] text-sky-300/75 uppercase">
          Preferred Stack
        </p>
        <h3 className="mt-1.5 font-saira text-xl font-semibold text-white/95 lg:text-2xl">
          Technologies we prefer
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-white/45">
          Proven tools for speed, reliability, and maintainability.
        </p>

        {/* inline category rows — show first N categories with their items */}
        <div className="mt-5 space-y-4">
          {categories.slice(0, VISIBLE_CATS).map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* category label */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.accent }} />
                <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: cat.accent }}>
                  {cat.label}
                </span>
              </div>
              {/* items */}
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <TinyIcon key={item.name} item={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* remaining count + view all */}
        <motion.button
          onClick={() => setModalOpen(true)}
          whileHover={{ x: 2 }}
          className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-sky-300/75 hover:text-sky-200 transition-colors"
        >
          +{categories.slice(VISIBLE_CATS).reduce((s, c) => s + c.items.length, 0)} more across {categories.length - VISIBLE_CATS} areas · View all {TOTAL}
          <ChevronRight className="h-3 w-3" />
        </motion.button>

        {/* tagline */}
        <div className="mt-3 text-[12px] leading-relaxed text-white/45">
          <span className="font-semibold text-white/70">Full-package delivery</span>
          {" — "}strategy, design, development, deployment & support.
        </div>

        {/* Optimized Static Tech Visual */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center justify-center h-24 overflow-hidden rounded-lg border border-white/8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-[#0b0b18] to-[#050816] relative"
        >
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]" />
          <div className="flex gap-4 opacity-50 filter grayscale">
            {/* simple static dots representing nodes */}
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-150" />
          </div>
        </motion.div>
      </div>

      <TechModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
