"use client";

import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  { title: "Innovation", desc: "We stay ahead of technological trends, constantly exploring new frontiers to deliver cutting-edge solutions.", icon: "💡" },
  { title: "Quality", desc: "Every line of code we write, every design we craft, meets the highest standards of excellence.", icon: "⭐" },
  { title: "Transparency", desc: "We believe in open communication and honest collaboration with our clients at every step.", icon: "🔍" },
  { title: "Impact", desc: "Our work is driven by the desire to create technology that positively impacts lives worldwide.", icon: "🌍" },
];

const milestones = [
  { year: "2014", text: "Codematics founded with a vision to serve humanity through technology" },
  { year: "2016", text: "Launched Universal TV Remote — now with 180M+ users globally" },
  { year: "2018", text: "Expanded to Estonia with EU office presence" },
  { year: "2020", text: "Surpassed 500+ successful projects delivered worldwide" },
  { year: "2022", text: "Launched CSR initiative URRAAN for digital skills empowerment" },
  { year: "2024", text: "Reached 766+ projects and 33+ industry awards" },
];

export default function AboutPageClient() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[40px]" style={{ background: "radial-gradient(circle, rgba(201,34,40,0.06) 0%, transparent 70%)" }} />
        <div className="text-center z-[1] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">Our Story</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              About <span className="text-red">Codematics</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[600px] mx-auto leading-[1.8]">
              Building technology that empowers businesses and transforms lives since 2014.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold mb-6 leading-[1.2]">
                Our Mission & <span className="text-red">Vision</span>
              </h2>
              <p className="text-gray-300 text-base leading-[1.9] mb-5">
                At our core, we believe technology should serve humanity. We craft state-of-the-art, secure, scalable, future-ready solutions — driving the transformation toward a more efficient, resilient, and digitally empowered future.
              </p>
              <p className="text-gray-400 text-[15px] leading-[1.8]">
                With a multinational presence, a diverse and talented team, and an award-winning portfolio, Codematics continues to set new benchmarks in the world of software engineering. From mobile apps to AI-driven solutions, we deliver excellence across every domain.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-5">
                <Counter end={180} suffix="M+" label="Million Users" />
                <Counter end={766} suffix="+" label="Projects" />
                <Counter end={33} suffix="+" label="Awards Won" />
                <Counter end={10} suffix="+" label="Years" duration={1500} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title="Our Core Values" subtitle="The principles that guide everything we do at Codematics." />
          <div className="grid-4">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="text-lg font-bold mb-3 font-heading">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title="Our Journey" subtitle="Key milestones in the Codematics story." />
          <div className="max-w-[700px] mx-auto relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg, var(--red), var(--red-dark), transparent)" }} />
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 0.1} direction="left">
                <div className="flex gap-8 mb-10 items-start pl-2">
                  <div className="w-[26px] h-[26px] rounded-full bg-red border-4 border-bg-primary shrink-0 z-[1]" />
                  <div>
                    <div className="text-red font-extrabold text-lg font-heading mb-1">{m.year}</div>
                    <p className="text-gray-300 text-[15px] leading-relaxed">{m.text}</p>
                  </div>
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
              Ready to Build the <span className="text-red">Future</span>?
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              Partner with Codematics to bring your vision to life with world-class software engineering.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">Get In Touch</Link>
              <Link href="/services" className="btn-secondary">Our Services</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
