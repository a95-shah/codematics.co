"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { Service } from "@/data/servicesData";

export default function ServiceDetailClient({ service }: { service: Service }) {

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
            <div className="hero-badge mb-6">Our Services</div>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(201,34,40,0.15),rgba(201,34,40,0.05))]">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-[36px] font-black text-red font-heading">{service.title.charAt(0)}</span>
                )}
              </div>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black mb-5 font-heading text-white-theme">
              {service.title}
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[700px] mx-auto leading-[1.8]">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About This Service */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold mb-6 leading-[1.2] text-white-theme font-heading">
                About This <span className="text-red">Service</span>
              </h2>
              <p className="text-gray-300 text-[15px] leading-[1.9] mb-6">
                {service.longDescription}
              </p>
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="w-full aspect-[4/3] rounded-3xl border border-glass-border flex items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-tertiary relative overflow-hidden">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="text-[120px] font-black text-red opacity-20 font-heading">{service.title.charAt(0)}</div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--red), transparent)" }} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section bg-bg-primary">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold mb-4 font-heading">
                <span className="text-white-theme">Key </span>
                <span className="text-red">Features</span>
              </h2>
              <p className="text-gray-400 max-w-[600px] mx-auto">
                What makes our {service.title.toLowerCase()} service stand out from the rest.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {service.features.map((feature, i) => (
              <AnimatedSection key={feature} delay={i * 0.06}>
                <div className="p-6 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl transition-all duration-300 hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-red text-lg bg-[linear-gradient(135deg,rgba(201,34,40,0.15),rgba(201,34,40,0.05))]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white-theme font-heading">What We Deliver</h3>
                <ul className="space-y-3">
                  {service.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-gray-300 text-[15px]">
                      <span className="w-2 h-2 rounded-full bg-red shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white-theme font-heading">Technologies We Use</h3>
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="py-2 px-4 rounded-full bg-[rgba(201,34,40,0.1)] border border-[rgba(201,34,40,0.2)] text-red text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--bg-secondary), rgba(201,34,40,0.05))" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-5">
              Ready to Get <span className="text-red">Started</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Let&apos;s discuss how our {service.title.toLowerCase()} expertise can help bring your project to life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">Start a Conversation</Link>
              <Link href="/services" className="btn-secondary">View All Services</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
