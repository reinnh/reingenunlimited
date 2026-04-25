"use client";

import { Star, Code2, Rocket, ShieldCheck, Handshake } from "lucide-react";

const items = [
  {
    icon: Star,
    label: "5★ Client Reviews",
  },
  {
    icon: Code2,
    label: "Full-Stack Experts | Next.js • React • Node",
  },
  {
    icon: Rocket,
    label: "Fast Delivery | Agile Development",
  },
  {
    icon: ShieldCheck,
    label: "Secure & Scalable Systems",
  },
  {
    icon: Handshake,
    label: "Trusted by Startups & Businesses",
  },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-[#1e25444f] text-white">
      <div className="relative w-full overflow-hidden">
        <div className="flex w-full items-center py-3 text-sm md:text-base">
          <div className="marquee-left flex w-max flex-nowrap whitespace-nowrap">
            <div className="flex items-center gap-10 px-6">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-neutral-200"
                  >
                    <Icon className="h-5 w-5 text-sky-400" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-10 px-6" aria-hidden="true">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`${item.label}-dup`}
                    className="flex items-center gap-2 text-neutral-200"
                  >
                    <Icon className="h-5 w-5 text-sky-400" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}