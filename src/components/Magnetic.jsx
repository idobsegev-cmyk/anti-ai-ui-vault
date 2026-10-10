"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const MotionLink = motion.create(Link);

/**
 * A link that is pulled toward the pointer; its label drifts further for depth.
 * variant: "solid" | "outline" | "accent"
 */
export default function Magnetic({ href, children, variant = "solid", strength = 0.32, className = "", onClick }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  const lx = useTransform(sx, (v) => v * 0.55);
  const ly = useTransform(sy, (v) => v * 0.55);

  const move = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    solid: "bg-ink text-paper",
    outline: "bg-paper text-ink border border-ink",
    accent: "bg-terracotta text-paper",
  }[variant];

  return (
    <span onPointerMove={move} onPointerLeave={reset} className="-m-6 inline-block p-6">
      <MotionLink
        ref={ref}
        href={href}
        onClick={onClick}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.95 }}
        className={`focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium ${styles} ${className}`}
      >
        <motion.span style={{ x: lx, y: ly }} className="inline-flex items-center gap-2">
          {children}
        </motion.span>
      </MotionLink>
    </span>
  );
}
