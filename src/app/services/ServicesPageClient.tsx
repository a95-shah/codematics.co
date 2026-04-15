"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { getServiceIcon } from "@/utils/iconMap";

import { services } from "@/data/servicesData";

export default function ServicesPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="text-center z-[1] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">What We Do</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              <span className="text-white-theme">Our</span> <span className="text-[#c92228]">Services</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[650px] mx-auto leading-[1.8]">
              We have a refined process. We offer the platform from where projects take shape through stages of planning, testing, and execution following an agile methodology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <div className="grid-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                icon={getServiceIcon(service.iconName)}
                title={service.title}
                description={service.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title="Deep Dive Into Our Expertise" subtitle="Each of our services is backed by years of experience and a team of specialists." />
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={0.05} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-[60px] p-10 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-[20px] about-grid">
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div className="text-4xl text-red mb-4">{getServiceIcon(service.iconName)}</div>
                  <h3 className="text-[22px] font-bold mb-4 font-heading">{service.title}</h3>
                  <p className="text-gray-300 text-[15px] leading-[1.8] mb-5">{service.description}</p>
                  <ul className="list-none grid grid-cols-2 gap-2">
                    {service.details.map((d) => (
                      <li key={d} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div className="w-full aspect-[1.2] rounded-2xl border border-glass-border flex items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-tertiary">
                    <div className="text-[72px] text-red opacity-30">{getServiceIcon(service.iconName)}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--bg-secondary), rgba(201,34,40,0.05))" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-5">
              Have a Project in <span className="text-red">Mind</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Let&apos;s discuss how Codematics can help bring your ideas to life with our expertise.
            </p>
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
