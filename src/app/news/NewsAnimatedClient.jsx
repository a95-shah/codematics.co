"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function NewsAnimatedClient({ news }) {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,34,40,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="text-center z-[1] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge mb-6">Blog & Updates</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              Latest <span className="text-red">News</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[600px] mx-auto leading-[1.8]">
              Stay updated with our latest projects, releases, and company news.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading
            title="All News & Updates"
            subtitle="Documenting our journey through innovation, community impact, and industry leadership."
          />
          <div className="grid-3">
            {news.map((item, i) => (
              <AnimatedSection key={item._id} delay={i * 0.08}>
                <Link href={`/news/${item.slug}`} className="block h-full">
                  <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl overflow-hidden transition-all duration-[400ms] cursor-pointer hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] h-full flex flex-col">
                    {/* Cover Image */}
                    <div className="h-[180px] flex items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-primary shrink-0 relative overflow-hidden">
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white-theme bg-gradient-to-br from-red to-red-dark">
                          C
                        </div>
                      )}
                      {/* Category badge */}
                      {item.category && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-red text-[#ffffff] rounded-full text-[10px] font-bold tracking-wider shadow-lg">
                          {item.category}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date & Author */}
                      <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-500 mb-3">
                        {item.date && <span>📅 {item.date}</span>}
                        {item.author && <span>✍️ {item.author}</span>}
                      </div>

                      <h3 className="text-base font-bold mb-2 font-heading text-white-theme leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-4 text-red text-sm font-semibold flex items-center gap-1.5">
                        Read More →
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {news.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-32 bg-glass-bg rounded-2xl border border-dashed border-glass-border text-gray-500 font-bold tracking-widest text-sm">
                NO NEWS ARTICLES AVAILABLE
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
