"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { newsItems } from "@/data/newsData";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";



export default function NewsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="text-center z-[1] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">Blog & Updates</div>
            <h1 className="text-[clamp(2rem,3vw,3rem)] font-black mb-5 font-heading">
              <span className="text-white-theme">Latest</span> <span className="text-[#c92228]">News</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[600px] mx-auto leading-[1.8]">
              Stay updated with our latest projects, releases, and company news.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title="All News & Updates" />
          <div className="grid-3">
            {newsItems.map((item, i) => (
              <NewsCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                description={item.description}
                coverImage={item.coverImage}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
