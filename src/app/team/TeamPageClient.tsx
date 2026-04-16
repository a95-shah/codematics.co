"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

interface Member {
  _id: string;
  name: string;
  role: string;
  category: string;
  image?: string;
  linkedin?: string;
  isActive: boolean;
}

export default function TeamPageClient({ members = [] }: { members: Member[] }) {
  // Simple categorization based on common leadership keywords if not explicitly categorized
  const allLeadership = members.filter(m => 
    m.isActive && (
      m.category === 'Leadership' || 
      m.role.toLowerCase().includes('director') || 
      m.role.toLowerCase().includes('ceo') || 
      m.role.toLowerCase().includes('founder') || 
      m.role.toLowerCase().includes('manager')
    )
  );

  const leadership = allLeadership.slice(0, 3);

  const team = members.filter(m => 
    m.isActive && !leadership.find(l => l._id === m._id)
  );

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="text-center z-[1] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">Our People</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              <span className="text-white-theme">Team</span> <span className="text-[#c92228]">Codematics</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[600px] mx-auto leading-[1.8]">
              A diverse collective of engineers, designers, and visionaries driving software excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="section bg-bg-secondary">
          <div className="container">
            <SectionHeading title="Our Global Leadership" subtitle="The visionary leads guiding our mission." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {leadership.map((member, i) => (
                <TeamCard key={member._id} name={member.name} role={member.role} index={i} image={member.image} linkedin={member.linkedin} variant="minimal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="section bg-bg-primary">
          <div className="container">
            <SectionHeading title="Our Expert Team" subtitle="Software artisans who bring every project to life." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <TeamCard key={member._id} name={member.name} role={member.role} index={i} image={member.image} linkedin={member.linkedin} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--bg-secondary), rgba(201,34,40,0.05))" }}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-5">
              Join Our <span className="text-red">Excellence</span>
            </h2>
            <p className="text-gray-300 text-base max-w-[600px] mx-auto mb-8 leading-[1.8]">
              We&apos;re constantly scouting for top-tier talent. Let&apos;s build the future of software, together.
            </p>
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
