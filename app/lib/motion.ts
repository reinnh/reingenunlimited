import { Variants, Transition } from "framer-motion";

/* ---------------------------------------------
   MOTION TOKENS (single source of truth)
--------------------------------------------- */

const MOTION = {
  duration: {
    fast: 0.25,
    normal: 0.5,
    slow: 0.8,
  },
  easing: {
    default: "easeOut" as Transition["ease"],
    smooth: [0.25, 0.1, 0.25, 1] as Transition["ease"], // cubic-bezier
  },
  spring: {
    type: "spring" as const,
    stiffness: 120,
    damping: 14,
  },
};

/* ---------------------------------------------
   TYPES
--------------------------------------------- */

type Direction = "left" | "right" | "up" | "down" | "none";

interface AnimationOptions {
  direction?: Direction;
  delay?: number;
  duration?: number;
  type?: Transition["type"];
  ease?: Transition["ease"];
}

/* ---------------------------------------------
   HELPERS
--------------------------------------------- */

const getAxis = (direction: Direction) => {
  switch (direction) {
    case "left":
      return { x: 80, y: 0 };
    case "right":
      return { x: -80, y: 0 };
    case "up":
      return { x: 0, y: 60 };
    case "down":
      return { x: 0, y: -60 };
    default:
      return { x: 0, y: 0 };
  }
};

/* ---------------------------------------------
   CORE FACTORY
--------------------------------------------- */

export const createMotion = ({ direction = "none", delay = 0.2, duration = MOTION.duration.normal, type = "tween", ease = MOTION.easing.default }: AnimationOptions = {}): Variants => {
  const { x, y } = getAxis(direction);

  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease,
      },
    },
  };
};

/* ---------------------------------------------
   PRESETS (clean + opinionated)
--------------------------------------------- */

// ✨ Text (natural spring)
export const textVariant = (delay = 0.2): Variants => ({
  hidden: { y: -30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ...MOTION.spring,
      delay,
    },
  },
});

// 🌫 Fade
export const fadeIn = (options: AnimationOptions = {}): Variants =>
  createMotion({
    ...options,
    type: "tween",
  });

// 🔍 Zoom
export const zoomIn = ({ delay = 0.2, duration = MOTION.duration.fast }: Pick<AnimationOptions, "delay" | "duration"> = {}): Variants => ({
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: MOTION.easing.default,
    },
  },
});

// ➡️ Slide (percentage-based)
export const slideIn = ({ direction = "left", delay = 0.2, duration = MOTION.duration.normal }: AnimationOptions = {}): Variants => {
  const map: Record<Direction, { x?: string | number; y?: string | number }> = {
    left: { x: "-100%" },
    right: { x: "100%" },
    up: { y: "100%" },
    down: { y: "-100%" },
    none: {},
  };

  return {
    hidden: map[direction],
    show: {
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: MOTION.easing.default,
      },
    },
  };
};

// 🧱 Stagger container
export const staggerContainer = ({
  staggerChildren = 0.08,
  delayChildren = 0,
}: {
  staggerChildren?: number;
  delayChildren?: number;
} = {}): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
