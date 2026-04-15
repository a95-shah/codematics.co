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
    <div className="bg-bg-primary min-h-screen font-body selection:bg-red-600/30">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="h-1 w-20 bg-[#c92228] mx-auto mb-8 rounded-full"></div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading text-white-theme">
              Team <span className="text-[#c92228]">Codematics</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-[600px] mx-auto leading-relaxed font-medium">
              A diverse collective of engineers, designers, and visionaries driving software excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      {leadership.length > 0 && (
        <section className="pb-20 container mx-auto px-6">
          <div className="mb-12 border-l-4 border-[#c92228] pl-6 uppercase">
            <h2 className="text-3xl font-black text-white-theme font-heading tracking-tight">Our Global Leadership</h2>
            <p className="text-gray-500 font-medium normal-case">The visionary leads guiding our mission.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            {leadership.map((member, i) => (
              <TeamCard key={member._id} name={member.name} role={member.role} index={i} image={member.image} linkedin={member.linkedin} variant="minimal" />
            ))}
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="pb-32 container mx-auto px-6">
          <div className="mb-12 border-l-4 border-glass-border pl-6">
            <h2 className="text-3xl font-black text-white-theme font-heading tracking-tight">Our Expert Team</h2>
            <p className="text-gray-500 font-medium">Software artisans who bring every project to life.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <TeamCard key={member._id} name={member.name} role={member.role} index={i} image={member.image} linkedin={member.linkedin} />
            ))}
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="pb-32 container mx-auto px-6">
        <div className="bg-bg-secondary p-16 rounded-[3rem] border border-glass-border shadow-2xl relative overflow-hidden group text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none transition-colors group-hover:bg-red-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white-theme mb-6 font-heading tracking-tight">
              Join Our <span className="text-[#c92228]">Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              We&apos;re constantly scouting for top-tier talent. Let&apos;s build the future of software, together.
            </p>
            <Link href="/contact" className="px-10 py-5 bg-[#c92228] text-[#ffffff] rounded-2xl font-bold shadow-xl hover:bg-[#a01b20] transition-all transform active:scale-95 inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
