"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import SectionWrapper from "@/app/hoc/section-wrapper";
import { AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  slug: string;
  liveUrl: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  category: string;
};

export const projects: Project[] = [
  {
    title: "Quantum Store",
    slug: "quantum-store",
    liveUrl: "https://quantumstore.space/",
    image: "/projects/1.png",
    shortDescription:
      "A modern e-commerce platform built for seamless product discovery, fast checkout, and a polished shopping experience.",
    longDescription:
      "Quantum Store is a full-scale e-commerce solution designed with performance, usability, and conversion in mind. It features intuitive product browsing, advanced search and filtering, secure checkout flows, responsive layouts, and an admin-friendly structure for managing products and orders. The platform focuses on delivering a premium shopping experience with clean UI, fast loading speeds, and scalable architecture for future growth.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "JWT Authentication",
    ],
    category: "E-commerce",
  },
  {
    title: "E-Commerce Template",
    slug: "ecommerce-template",
    liveUrl: "",
    image: "/projects/2.png",
    shortDescription:
      "A reusable high-conversion e-commerce template built for modern online stores and scalable digital commerce.",
    longDescription:
      "This e-commerce template was built as a production-ready foundation for businesses looking to launch online quickly without sacrificing quality. It includes responsive storefront pages, category filtering, product detail views, shopping cart flows, checkout structure, and seller-ready architecture. The focus was on creating a flexible, reusable system that can adapt across multiple industries while maintaining excellent UI/UX standards.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Node.js",
      "MongoDB",
    ],
    category: "E-commerce",
  },
  {
    title: "Univer Construction Limited",
    slug: "univer-construction",
    liveUrl: "https://www.univerconstructionlimited.com/",
    image: "/projects/3.png",
    shortDescription:
      "A professional corporate website for a construction company focused on trust, project visibility, and client acquisition.",
    longDescription:
      "Univer Construction Limited is a business-focused website developed to establish strong digital presence and credibility for a construction brand. It highlights company services, completed projects, expertise, and contact channels while maintaining a clean professional identity. The goal was to create a strong lead-generation platform with fast navigation, mobile responsiveness, and a trustworthy corporate presentation.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Design",
      "SEO Optimisation",
    ],
    category: "Corporate Website",
  },
  {
    title: "Spannki Crypto Wallet",
    slug: "spannki-wallet",
    liveUrl: "https://www.spannki.site/",
    image: "/projects/4.png",
    shortDescription:
      "A crypto wallet platform with KYC verification, secure onboarding, and dashboard-driven account management.",
    longDescription:
      "Spannki Wallet is a fintech-focused crypto platform built around secure user onboarding and compliance-driven account verification. It includes KYC workflows, dashboard analytics, account verification systems, and user management flows designed for trust and security. The platform balances clean interface design with strict backend security principles, ensuring both usability and operational integrity.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Authentication System",
      "KYC Verification",
      "Role-Based Access Control",
    ],
    category: "FinTech / Crypto",
  },
];

/* ------------------------------------------------------------------ */
/*  CATEGORY ACCENT MAP                                                */
/* ------------------------------------------------------------------ */

const CATEGORY_COLORS: Record<string, string> = {
  "E-commerce": "#60A5FA",
  "Corporate Website": "#34D399",
  "FinTech / Crypto": "#FBBF24",
  SaaS: "#818CF8",
  Platform: "#F472B6",
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? "#60A5FA";
}

/* ------------------------------------------------------------------ */
/*  PROJECT CARD                                                       */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const accent = getCategoryColor(project.category);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#0e0e1c]/80 transition-colors duration-300 hover:border-white/15"
    >
      {/* top accent line */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${accent}88, transparent)` }}
      />

      {/* image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.02]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={index < 2}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* category badge */}
        <div
          className="absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase backdrop-blur-md"
          style={{
            backgroundColor: `${accent}20`,
            color: accent,
            border: `1px solid ${accent}30`,
          }}
        >
          {project.category}
        </div>

        {/* live link */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/50 text-white/70 backdrop-blur-md transition-colors hover:text-white hover:border-white/30"
            aria-label={`Visit ${project.title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1c] via-transparent to-transparent opacity-60" />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h3 className="font-saira text-[17px] font-semibold text-white/95 leading-snug">
          {project.title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-white/50 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/6 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/40"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-white/6 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/35">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* view details */}
        <button
          onClick={onSelect}
          className="mt-auto pt-4 inline-flex items-center gap-1 text-[12px] font-medium text-sky-300/70 hover:text-sky-200 transition-colors self-start"
        >
          View details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT DETAIL MODAL                                               */
/* ------------------------------------------------------------------ */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  const accent = getCategoryColor(project.category);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto no-scrollbar rounded-xl border border-white/10 bg-[#0b0b18]/95 backdrop-blur-xl"
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/20 backdrop-blur transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b18] via-transparent to-transparent" />
        </div>

        {/* body */}
        <div className="px-6 pb-6 -mt-8 relative z-10">
          {/* category */}
          <div
            className="inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase mb-3"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}25`,
            }}
          >
            {project.category}
          </div>

          <h2 className="font-saira text-2xl font-semibold text-white/95">
            {project.title}
          </h2>

          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            {project.longDescription}
          </p>

          {/* technologies */}
          <div className="mt-5">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-white/35 mb-2">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/55"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-white/80 hover:bg-white/[0.08] hover:border-white/20 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visit Live Site
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN SECTION                                                       */
/* ------------------------------------------------------------------ */

function ProjectGallery() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full py-16 overflow-hidden">
      {/* background video — breaks out of max-w container to full viewport */}
      {/* Optimized deep dark gradient background — breaks out of max-w container to full viewport */}
      <div className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#050816] to-[#050816]">
        {/* Subtle grid overlay to keep it premium */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 mx-auto px-4 md:px-8">
        {/* header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-400/80 tracking-[0.28em] text-xs mb-3"
          >
            OUR WORK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-saira text-balance text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl"
          >
            Project Gallery
          </motion.h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/50 sm:text-base">
            A selection of platforms and systems we&apos;ve built for clients
            across e-commerce, fintech, and corporate industries.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectGallery
