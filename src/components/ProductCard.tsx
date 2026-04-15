"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
  slug?: string;
  image?: string;
}

export default function ProductCard({ title, description, color, index, slug, image }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const card = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl transition-all duration-[400ms] cursor-pointer overflow-hidden relative hover:border-[rgba(201,34,40,0.3)] hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] hover:-translate-y-1.5 h-full"
    >
      {/* Product icon area */}
      <div
        className="w-full h-40 rounded-xl flex items-center justify-center mb-5 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}11)`,
          border: `1px solid ${color}33`,
        }}
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-[28px] font-black text-white-theme font-heading"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            {title.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-[17px] font-bold mb-2 text-white-theme font-heading">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>

      <div className="mt-4 flex gap-3">
        <span className="py-1.5 px-3.5 rounded-[20px] bg-[rgba(201,34,40,0.1)] border border-[rgba(201,34,40,0.2)] text-red text-xs font-semibold">
          View Details
        </span>
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link href={`/products/${slug}`} className="block h-full">{card}</Link>;
  }

  return card;
}
