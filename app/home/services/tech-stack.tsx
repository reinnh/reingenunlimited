"use client";

export default function TechStackSection() {
  return (
    <div className="w-full">
      {/* heading */}
      <p className="text-[11px] font-medium tracking-[0.25em] text-sky-300/75 uppercase">
        Engineering Philosophy
      </p>
      <h3 className="mt-1.5 font-saira text-xl font-semibold text-white/95 lg:text-2xl">
        How We Build
      </h3>
      <p className="mt-1 text-[13px] leading-relaxed text-white/45 mb-6">
        The foundation of reliable, scalable digital infrastructure.
      </p>

      {/* Modern, sharp text block */}
      <div className="relative border-l-2 border-sky-400/50 bg-[#1d1836]/30 backdrop-blur-sm p-6 md:p-8">
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-white/85 font-medium tracking-wide">
          &ldquo;Modern TypeScript-based full-stack development focused on building scalable, high-performance, and maintainable web applications, with emphasis on clean system design and production-ready engineering practices. 
          <br /><br />
          From bespoke e-commerce platforms to complex enterprise web systems, our architecture ensures strict security, unparalleled performance, and a seamless user experience. We do not just write code; we engineer resilient, long-term digital assets that empower forward-thinking brands to scale without friction.&rdquo;
        </p>
      </div>
    </div>
  );
}
