"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Wrapper de entrada discreta (fade + translate) usado em toda a página.
 * Respeita `prefers-reduced-motion` trocando para uma transição instantânea.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const transition = {
    duration: prefersReducedMotion ? 0.01 : 0.6,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
