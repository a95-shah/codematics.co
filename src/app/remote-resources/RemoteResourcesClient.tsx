"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

const resources = [
  { title: "Mobile App Developers", desc: "Expert iOS & Android developers for native and cross-platform mobile applications.", icon: "📱" },
  { title: "Web Developers", desc: "Full-stack web developers proficient in React, Next.js, Node.js, and modern web technologies.", icon: "💻" },
  { title: "Game Developers", desc: "Unity & Unreal Engine specialists for 2D/3D games, AR/VR experiences and gamification.", icon: "🎮" },
  { title: "UI/UX Designers", desc: "Creative designers for user-centric interfaces, design systems, and brand identity.", icon: "🎨" },
  { title: "3D Artists & Animators", desc: "3D modeling, character animation, product visualization, and motion graphics experts.", icon: "🎭" },
  { title: "AI/ML Engineers", desc: "Machine learning engineers, data scientists, and AI specialists for intelligent solutions.", icon: "🤖" },
  { title: "Digital Marketers", desc: "SEO specialists, social media managers, and digital marketing strategists.", icon: "📈" },
  { title: "QA Engineers", desc: "Quality assurance engineers for automated and manual testing, ensuring bug-free products.", icon: "✅" },
  { title: "DevOps Engineers", desc: "Cloud infrastructure, CI/CD pipelines, and system administration specialists.", icon: "⚙️" },
];

const benefits = [
  { title: "Cost-Effective", desc: "Save up to 60% on development costs compared to in-house hiring.", icon: "💰" },
  { title: "Flexible Engagement", desc: "Hourly, part-time, or full-time — choose the model that fits your needs.", icon: "🔄" },
  { title: "Quick Onboarding", desc: "Get your remote team member productive within 48 hours.", icon: "⚡" },
  { title: "No Overhead", desc: "No office space, equipment, or HR overhead — we handle everything.", icon: "🏢" },
  { title: "Timezone Coverage", desc: "With offices in Pakistan and Estonia, we cover multiple timezones.", icon: "🌍" },
  { title: "Quality Guaranteed", desc: "Rigorous hiring process ensures only top-tier talent on your team.", icon: "⭐" },
];

export default function RemoteResourcesClient() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero !min-h-[60vh]">
        <div className="grid-pattern" />
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[40px]" style={{ background: "radial-gradient(circle, rgba(201,34,40,0.08) 0%, transparent 70%)" }} />
        <div className="text-center z-[1] px-6 max-w-[800px]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">Hire Remote Talent</div>
            <h1 className="text-[clamp(2.5rem,5vw,3.8rem)] font-black mb-5 font-heading">
              Empowering Your Success: Expert Remote Talent,
              <span className="text-red"> Just a Click Away!</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[650px] mx-auto mb-8 leading-[1.8]">
              With a mission to reshape work practices and break the distance, our Remote Resource is all set to deliver unbeatable IT services globally.
            </p>
            <Link href="#request-form" className="btn-primary !text-base !py-4 !px-10">
              Request Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Resources */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title="Available Remote Resources" subtitle="Choose from our pool of pre-vetted, experienced professionals ready to join your team." />
          <div className="grid-3">
            {resources.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 0.06}>
                <div className="glass-card p-8 h-full text-center">
                  <div className="text-5xl mb-4">{r.icon}</div>
                  <h3 className="text-[17px] font-bold mb-3 font-heading">{r.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title="Why Hire Remote from Codematics?" subtitle="The advantages of partnering with us for your remote staffing needs." />
          <div className="grid-3">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.08}>
                <div className="glass-card p-8 h-full text-center">
                  <div className="text-[40px] mb-4">{b.icon}</div>
                  <h3 className="text-[17px] font-bold mb-3 font-heading">{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title="How It Works" subtitle="A simple 4-step process to get your remote team up and running." />
          <div className="grid-4 relative">
            {[
              { step: "01", title: "Tell Us Your Needs", desc: "Share your requirements, tech stack, and project scope." },
              { step: "02", title: "We Match Talent", desc: "We select the best-fit candidates from our vetted pool." },
              { step: "03", title: "Interview & Select", desc: "You interview and choose the talent that fits your team." },
              { step: "04", title: "Get Started", desc: "Your remote team member starts working within 48 hours." },
            ].map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.15}>
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-4xl font-black font-heading text-red mb-4">{s.step}</div>
                  <h4 className="text-base font-bold mb-2 font-heading">{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title="Request Remote Resources" subtitle="Fill out the form below and our team will get back to you within 24 hours." />
          <div className="max-w-[600px] mx-auto">
            <div className="glass-card p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
