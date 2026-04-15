"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";

const contactInfo = [
  { icon: <HiLocationMarker size={22} />, title: "Pakistan Office", text: "Office # 14, 2nd Floor, KPK IT Park, Abbottabad, Pakistan" },
  { icon: <HiLocationMarker size={22} />, title: "Estonia (EU) Office", text: "Tartu, Estonia" },
  { icon: <HiMail size={22} />, title: "Email Us", text: "contact@codematics.co\ninfo@codematics.co" },
  { icon: <HiPhone size={22} />, title: "Call Us", text: "Pakistan: +92-992-639764\n+92-992-426915\nEstonia: +372-5565-5510" },
  { icon: <HiClock size={22} />, title: "Working Hours", text: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM" },
];

export default function ContactPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="grid-pattern" />
        <div className="text-center z-[1] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge mb-6">Get In Touch</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-5 font-heading">
              <span className="text-white-theme">Contact</span> <span className="text-[#c92228]">Us</span>
            </h1>
            <p className="text-[1.1rem] text-gray-300 max-w-[600px] mx-auto leading-[1.8]">
              Discuss with our experts and choose the best solution for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[60px] about-grid">
            <AnimatedSection direction="left">
              <h2 className="text-[clamp(1.8rem,3vw,2.2rem)] font-extrabold mb-8">
                Let&apos;s Build Something <span className="text-red">Amazing</span>
              </h2>
              <div className="flex flex-col gap-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4 items-start">
                    <div className="contact-icon-box">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-bold mb-1 text-[15px] font-heading">{info.title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{info.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="glass-card p-10">
                <h3 className="text-[22px] font-bold mb-6 font-heading">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title="Frequently Asked Questions" subtitle="Quick answers to common questions about working with Codematics." />
          <div className="max-w-[700px] mx-auto flex flex-col gap-4">
            {[
              { q: "What technologies does Codematics specialize in?", a: "We specialize in Mobile Apps (iOS/Android), Web Development, Game Development, AI/ML, Blockchain, 3D Modeling, Digital Marketing, and more." },
              { q: "Where are your offices located?", a: "We have offices in Abbottabad, Pakistan (KPK IT Park) and Tartu, Estonia (EU Office)." },
              { q: "Do you offer remote development resources?", a: "Yes! We provide on-demand remote resources for businesses worldwide. Visit our Remote Resources page for more details." },
              { q: "How can I get a quote for my project?", a: "Simply fill out the contact form above or email us at contact@codematics.co with your project details, and our team will get back to you within 24 hours." },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card p-6">
                  <h4 className="text-base font-bold mb-2 text-white-theme font-heading">{faq.q}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
