"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { NewsItem } from "@/data/newsData";

export default function NewsDetailClient({ item }: { item: NewsItem }) {
  const paragraphs = item.content.split("\n\n");

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="text-center z-[1] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge mb-6">{item.category}</div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black mb-5 font-heading text-white-theme max-w-[800px] mx-auto">
              {item.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
              <span className="uppercase tracking-[1px] font-semibold">{item.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red" />
              <span>{item.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-[800px] mx-auto">
              {/* Featured Image Area */}
              <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-tertiary to-bg-primary border border-glass-border flex items-center justify-center mb-10">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black text-white-theme bg-gradient-to-br from-red to-red-dark">
                    {item.title?.charAt(0) || "C"}
                  </div>
                )}
              </div>

              {/* Article Text */}
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-300 text-[15px] leading-[2]">
                    {p}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-glass-border flex flex-wrap gap-3 items-center">
                <span className="text-gray-500 text-sm font-semibold mr-2">Tags:</span>
                <span className="py-1.5 px-4 rounded-full bg-[rgba(201,34,40,0.1)] border border-[rgba(201,34,40,0.2)] text-red text-xs font-semibold">
                  {item.category}
                </span>
                <span className="py-1.5 px-4 rounded-full bg-glass-bg border border-glass-border text-gray-400 text-xs font-semibold">
                  Codematics
                </span>
                <span className="py-1.5 px-4 rounded-full bg-glass-bg border border-glass-border text-gray-400 text-xs font-semibold">
                  {item.date}
                </span>
              </div>

              {/* Back to News */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <Link href="/news" className="btn-secondary">
                  ← Back to News
                </Link>
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
