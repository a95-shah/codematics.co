"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import Link from "next/link";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  slug?: string;
  image?: string;
}

export default function ServiceCard({ icon, title, description, index, slug, image }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const card = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-8 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl cursor-pointer transition-all duration-[400ms] relative overflow-hidden hover:border-[rgba(201,34,40,0.4)] hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] hover:-translate-y-2 h-full"
    >
      {/* Red glow on top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 card-glow-line"
        style={{ background: "linear-gradient(90deg, transparent, var(--red), transparent)" }}
      />

      <div className={`rounded-xl flex items-center justify-center mb-5 overflow-hidden ${image ? 'w-full h-40 bg-[linear-gradient(135deg,rgba(201,34,40,0.05),rgba(201,34,40,0.02))] border border-[rgba(201,34,40,0.1)]' : 'w-14 h-14 text-[28px] text-red bg-[linear-gradient(135deg,rgba(201,34,40,0.15),rgba(201,34,40,0.05))]'}`}>
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          icon
        )}
      </div>

      <h3 className="text-lg font-bold mb-3 text-white-theme font-heading">
        {title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>

      <div className="mt-5 text-red text-sm font-semibold flex items-center gap-1.5">
        Learn More →
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link href={`/services/${slug}`} className="block h-full">{card}</Link>;
  }

  return card;
}
