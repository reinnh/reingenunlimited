"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function StartProjectPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      if (data.success) {
        toast.success("Inquiry sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send inquiry.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white flex flex-col font-saira selection:bg-sky-500/30">
      {/* Navigation */}
      <nav className="w-full p-6 md:px-12 flex items-center justify-between border-b border-white/5">
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
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Left: Info & Timeline */}
        <div className="flex-1 p-8 md:p-12 lg:p-20 lg:border-r border-white/5 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-900/10 via-[#050816] to-[#050816] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-md"
          >
            <p className="text-sky-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Let's Build Something
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Start a Project with Reingen
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-12">
              We specialize in robust, high-performance web systems and digital infrastructure. Tell us what you need, and let's craft a tailored solution.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90">1. Brief & Discovery</h3>
                  <p className="text-sm text-white/40 mt-1">Submit your requirements. We'll review them and schedule a quick discovery call.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90">2. Proposal & Strategy</h3>
                  <p className="text-sm text-white/40 mt-1">Receive a detailed technical proposal, complete with timelines and system architecture.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90">3. Engineering Phase</h3>
                  <p className="text-sm text-white/40 mt-1">We build and deploy your system with transparent communication throughout the process.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Clean Form */}
        <div className="flex-1 p-8 md:p-12 lg:p-20 bg-white/[0.01] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-white/70">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#0b0b18] border border-white/10 text-white placeholder:text-white/20 px-5 py-3.5 rounded-sm outline-none focus:border-sky-500/50 focus:bg-[#0d0d24] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white/70">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-[#0b0b18] border border-white/10 text-white placeholder:text-white/20 px-5 py-3.5 rounded-sm outline-none focus:border-sky-500/50 focus:bg-[#0d0d24] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-white/70">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. +1 234 567 890"
                  className="w-full bg-[#0b0b18] border border-white/10 text-white placeholder:text-white/20 px-5 py-3.5 rounded-sm outline-none focus:border-sky-500/50 focus:bg-[#0d0d24] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">
                  Project Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your goals, timeline, or current technical challenges..."
                  className="w-full bg-[#0b0b18] border border-white/10 text-white placeholder:text-white/20 px-5 py-3.5 rounded-sm outline-none focus:border-sky-500/50 focus:bg-[#0d0d24] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 transition-colors px-6 py-4 rounded-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="mt-6 text-xs text-white/30 text-center lg:text-left">
              By submitting this form, you'll receive an automated confirmation email.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
