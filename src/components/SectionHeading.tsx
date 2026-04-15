"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-[60px]">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[clamp(2rem,4vw,3rem)] font-extrabold mb-2"
        style={{ color: light ? "var(--bg-primary)" : "var(--white)" }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-20 h-[3px] mx-auto rounded-sm"
        style={{ background: "linear-gradient(90deg, var(--red), var(--red-light))" }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 text-[1.05rem] max-w-[700px] mx-auto leading-[1.8]"
          style={{ color: light ? "var(--gray-500)" : "var(--gray-300)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
