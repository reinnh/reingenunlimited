"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary/90 backdrop-blur border-b border-white/10">
      <div className=" mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-white text-[22px] font-bold tracking-wide">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <Image 
              src="/logo.jpg" 
              alt="Reingen Logo" 
              fill 
              className="object-cover"
              sizes="32px"
            />
          </div>
          REINGEN
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                className="text-neutral-300 hover:text-white text-[16px] font-medium transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen(!open)}
          className="sm:hidden text-white">
          {open ?
            <X size={28} />
          : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden bg-[#0b0b12] border-t border-white/10">
          <ul className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block text-neutral-300 hover:text-white text-[18px] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
