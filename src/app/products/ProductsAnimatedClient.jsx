"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function ProductsAnimatedClient({ products }) {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div
          className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[40px]"
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
            <div className="hero-badge mb-6">Our Portfolio</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              Our Winning <span className="text-red">Products</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[650px] mx-auto leading-[1.8]">
              Discover our flagship software solutions designed to simplify
              workflows and amplify global impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading
            title="Featured Products"
            subtitle="Explore our portfolio of innovative products trusted by millions worldwide."
          />
          <div className="grid-3">
            {products.map((product, i) => (
              <AnimatedSection key={product._id} delay={i * 0.08}>
                <Link
                  href={`/products/${product.slug}`}
                  className="block h-full"
                >
                  <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl overflow-hidden transition-all duration-[400ms] cursor-pointer hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] h-full flex flex-col relative">
                    {/* Top color accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{
                        background: `linear-gradient(90deg, ${product.color || "#c92228"}, transparent)`,
                      }}
                    />

                    {/* Product Image */}
                    <div
                      className="h-[180px] flex items-center justify-center shrink-0 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${product.color || "#c92228"}15, ${product.color || "#c92228"}08)`,
                      }}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-3"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white-theme font-heading"
                          style={{
                            background: `linear-gradient(135deg, ${product.color || "#c92228"}, ${product.color || "#c92228"}cc)`,
                          }}
                        >
                          {product.title?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Platform badges */}
                      {product.platforms && product.platforms.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.platforms.map((p, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-glass-bg text-[10px] font-bold text-gray-500 rounded-full border border-glass-border tracking-wider uppercase"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-lg font-bold mb-2 font-heading text-white-theme">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="mt-4 text-red text-sm font-semibold flex items-center gap-1.5">
                        View Details →
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {products.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-32 bg-glass-bg rounded-2xl border border-dashed border-glass-border text-gray-500 font-bold tracking-widest text-sm">
                NO PRODUCTS AVAILABLE
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(135deg, var(--bg-secondary), rgba(201,34,40,0.05))",
        }}
      >
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-5">
              Have a Product <span className="text-red">Idea</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Let us help you turn your vision into a product that millions will
              love.
            </p>
            <Link href="/contact" className="btn-primary">
              Discuss Your Idea
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
