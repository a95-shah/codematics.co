"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function ServicesAnimatedClient({ services }) {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[40px]"
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
            <div className="hero-badge mb-6">What We Do</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              Our <span className="text-red">Services</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[650px] mx-auto leading-[1.8]">
              We architect and deliver cutting-edge digital solutions tailored
              for modern business ecosystems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading
            title="Our Core Services"
            subtitle="Explore the full range of services we offer to help businesses grow."
          />
          <div className="grid-3">
            {services.map((service, i) => (
              <AnimatedSection key={service._id} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full"
                >
                  <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl overflow-hidden transition-all duration-[400ms] cursor-pointer hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] h-full flex flex-col">
                    {/* Service Image */}
                    <div className="h-[180px] flex items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-primary shrink-0 relative overflow-hidden">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white-theme bg-gradient-to-br from-red to-red-dark">
                          {service.title?.charAt(0) || "S"}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 font-heading text-white-theme">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="mt-4 text-red text-sm font-semibold flex items-center gap-1.5">
                        Learn More →
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {services.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-32 bg-glass-bg rounded-2xl border border-dashed border-glass-border text-gray-500 font-bold tracking-widest text-sm">
                NO ACTIVE SERVICES DISCOVERED
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
              Have a Project in <span className="text-red">Mind</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Let&apos;s discuss how Codematics can help bring your ideas to
              life with our expertise.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a Conversation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
