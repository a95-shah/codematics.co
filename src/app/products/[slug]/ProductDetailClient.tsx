"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { Product } from "@/data/productsData";

export default function ProductDetailClient({ product }: { product: Product }) {
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
            <div className="hero-badge mb-6">Our Products</div>
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-[36px] font-black text-white-theme font-heading"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)` }}
              >
                {product.title.charAt(0)}
              </div>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black mb-5 font-heading text-white-theme">
              {product.title}
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[700px] mx-auto leading-[1.8]">
              {product.description}
            </p>
            <div className="flex gap-3 justify-center mt-6 flex-wrap">
              {product.platforms.map((p) => (
                <span
                  key={p}
                  className="py-1.5 px-4 rounded-full text-xs font-semibold"
                  style={{
                    background: `${product.color}1a`,
                    border: `1px solid ${product.color}33`,
                    color: product.color,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About This Product */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold mb-6 leading-[1.2] text-white-theme font-heading">
                About <span className="text-red">{product.title}</span>
              </h2>
              <p className="text-gray-300 text-[15px] leading-[1.9] mb-6">
                {product.longDescription}
              </p>
              <Link href="/contact" className="btn-primary">
                Get In Touch
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div
                className="w-full aspect-[4/3] rounded-3xl border flex items-center justify-center relative overflow-hidden"
                style={{
                  borderColor: `${product.color}33`,
                  background: `linear-gradient(135deg, ${product.color}0d, ${product.color}05)`,
                }}
              >
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain p-4" />
                ) : (
                  <div
                    className="w-32 h-32 rounded-3xl flex items-center justify-center text-[64px] font-black text-white-theme font-heading"
                    style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)` }}
                  >
                    {product.title.charAt(0)}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-bg-primary">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold mb-4 font-heading">
                <span className="text-white-theme">Product </span>
                <span className="text-red">Features</span>
              </h2>
              <p className="text-gray-400 max-w-[600px] mx-auto">
                Explore what makes {product.title} a standout product.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {product.features.map((feature, i) => (
              <AnimatedSection key={feature} delay={i * 0.06}>
                <div className="p-6 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl transition-all duration-300 hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-1 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}22, ${product.color}11)`,
                      color: product.color,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--bg-secondary), rgba(201,34,40,0.05))" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-5">
              Interested in <span className="text-red">{product.title}</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Get in touch to learn more about this product or discuss a custom solution for your needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <Link href="/products" className="btn-secondary">View All Products</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
