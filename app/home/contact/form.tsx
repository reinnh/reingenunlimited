"use client";

import { useRef, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import EarthCanvas from "@/app/home/canvas/Earth";
import SectionWrapper from "@/app/hoc/section-wrapper";
import { slideIn } from "@/app/lib/motion";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      };

      if (!payload.name || !payload.email || !payload.phone || !payload.message) {
        toast.error("All fields are required.");
        return;
      }

      setLoading(true);

      try {
        const { data } = await axios.post("/api/v1/contact", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          setForm({ name: "", email: "", phone: "", message: "" });
          toast.success("Thanks! Your message has been sent.");
        } else {
          toast.error(data.error || "Something went wrong. Try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  return (
    <section className="xl:mt-12 flex xl:flex-row flex-col-reverse  overflow-hidden items-center justify-between   pb-10 ">
      {/* FORM */}
      <motion.div
        viewport={{ once: true, amount: 0.25 }}
        className="md:flex-[0.75] flex-1 bg-[#0f0e1f] md:p-8 p-4 rounded-2xl  md:max-w-lg w-full "
      >
        <p className="text-[14px] text-gray-400 uppercase tracking-widest">
          Get in touch
        </p>

        <h3 className="text-white font-bold text-4xl mt-2">
          Contact Us
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6"
        >
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Insert your name..."
              className="w-full bg-[#1a1830] text-white placeholder:text-gray-500 px-5 py-4 rounded-md outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email..."
              className="w-full bg-[#1a1830] text-white placeholder:text-gray-500 px-5 py-4 rounded-md outline-none"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number..."
              className="w-full bg-[#1a1830] text-white placeholder:text-gray-500 px-5 py-4 rounded-md outline-none"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Say something..."
              rows={5}
              className="w-full bg-[#1a1830] text-white placeholder:text-gray-500 px-5 py-4 rounded-md outline-none resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#1a1830] hover:bg-[#232044] transition px-6 py-3 rounded-md text-white font-semibold w-fit"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* CANVAS (UNCHANGED) */}
      <motion.div
        variants={slideIn({ direction: "right", delay: 0.2 })}
        viewport={{ once: true, amount: 0.25 }}
        className="xl:flex-1  max-w-xl  w-full h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] mb-10 md:mb-0"
      >
        <EarthCanvas />
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");