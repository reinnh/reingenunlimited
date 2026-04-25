"use client";
import { motion } from "framer-motion";
import { staggerContainer } from "../lib/motion";

const StarWrapper = <P extends object>(Component: React.ComponentType<P>, idName?: string) => {
  const HOC = (props: P) => (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-440 mx-auto px-2 md:px-4 relative z-0">
      {idName && (
        <span
          className="hash-span"
          id={idName}>
          &nbsp;
        </span>
      )}
      <Component {...props} />
    </motion.section>
  );

  return HOC;
};

export default StarWrapper;
