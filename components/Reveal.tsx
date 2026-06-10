"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.2, 0.6, 0.2, 1];

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Lightweight fade-up on scroll. Wrap any block to animate it into view once.
 * Falls back to a plain fade when the user prefers reduced motion.
 */
export default function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerRevealProps = {
  as?: "div" | "ul";
  className?: string;
  delay?: number;
  stagger?: number;
  children: ReactNode;
};

/**
 * Scroll-triggered container that cascades its StaggerItem children one after
 * another instead of revealing the whole block at once.
 */
export function StaggerReveal({
  as = "div",
  className,
  delay = 0,
  stagger = 0.07,
  children,
}: StaggerRevealProps) {
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
};

/** One step in a StaggerReveal cascade. */
export function StaggerItem({ as = "div", className, children }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}
