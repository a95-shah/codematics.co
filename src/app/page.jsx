"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Counter from "@/components/Counter";
import TeamCard from "@/components/TeamCard";
import ProductCard from "@/components/ProductCard";
import NewsCard from "@/components/NewsCard";
import ContactForm from "@/components/ContactForm";
import TechMarquee from "@/components/TechMarquee";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
} from "react-icons/hi";

import { useState, useEffect, useCallback } from "react";
import { getServiceIcon } from "@/utils/iconMap";

// ─── Animation Constants (hoisted to avoid re-creation on every render) ───────
const FADE_SCALE = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, ease: "easeOut" } };
const FADE_DOWN = (delay = 0) => ({ initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } });
const FADE_UP = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } });
const FADE_UP_30 = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.8 } });
const SCROLL_BOUNCE = { animate: { y: [0, 10, 0] }, transition: { repeat: Infinity, duration: 2 } };
const SCROLL_DOT = { animate: { y: [0, 12, 0], opacity: [1, 0, 1] }, transition: { repeat: Infinity, duration: 2 } };

// ─── Contact Info Data ────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: HiLocationMarker, label: "Pakistan Office", value: "Office # 14, 2nd Floor, KPK IT Park, Abbottabad, Pakistan", align: "items-start" },
  { icon: HiLocationMarker, label: "Estonia (EU) Office", value: "Tartu, Estonia", align: "items-start" },
  { icon: HiMail, label: "Email", value: "contact@codematics.co | info@codematics.co", align: "items-center" },
  { icon: HiPhone, label: "Phone", value: "Pakistan: +92-992-639764 | Estonia: +372-5565-5510", align: "items-center" },
];

// ─── Initial Data State ───────────────────────────────────────────────────────
const INITIAL_DATA = { services: [], teamMembers: [], products: [], newsItems: [] };

export default function HomePage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [svRes, tmRes, prRes, nwRes] = await Promise.all([
        fetch('/api/services?active=true').then(r => r.json()),
        fetch('/api/team?active=true').then(r => r.json()),
        fetch('/api/products?active=true').then(r => r.json()),
        fetch('/api/news?active=true').then(r => r.json()),
      ]);
      setData({ services: svRes, teamMembers: tmRes, products: prRes, newsItems: nwRes });
    } catch (err) {
      console.error('Data fetch failed:', err);
      setError('Failed to load content. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const { services, teamMembers, products, newsItems } = data;

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at center, var(--bg-secondary) 0%, var(--bg-primary) 70%)" }}
      >
        <ParticleBackground />

        {/* Gradient orbs */}
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(201,34,40,0.08) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[60px]" style={{ background: "radial-gradient(circle, rgba(201,34,40,0.06) 0%, transparent 70%)" }} />

        <div className="relative z-[1] text-center max-w-[900px] px-6 mt-8">
          <motion.div {...FADE_SCALE}>
            <motion.div {...FADE_DOWN(0.3)} className="hero-badge mb-8">
              Software Engineering Excellence
            </motion.div>
          </motion.div>

          <motion.h1 {...FADE_UP_30(0.5)} className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-[1.05] mb-2 font-heading">
            <span className="text-white-theme">CODE</span>
            <span className="bg-gradient-to-br from-red to-red-light bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              MATICS
            </span>
          </motion.h1>

          <motion.h2 {...FADE_UP(0.7)} className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-normal text-gray-200 mb-6 font-heading">
            For A Better, Safe And Peaceful World
          </motion.h2>

          <motion.p {...FADE_UP(0.9)} className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-gray-300 max-w-[650px] mx-auto mb-10 leading-[1.8]">
            A global trusted partner for guaranteed software engineering excellence,
            quality, and transparency at every step.
          </motion.p>

          <motion.div {...FADE_UP(1.1)} className="flex gap-4 justify-center flex-wrap">
            <Link href="/services" className="btn-primary">
              View Services
            </Link>
            <Link href="/products" className="btn-secondary">
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div {...SCROLL_BOUNCE} className="w-6 h-10 rounded-xl border-2 border-gray-500 flex justify-center pt-2">
            <motion.div {...SCROLL_DOT} className="w-[3px] h-2 rounded-sm bg-red" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section bg-bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <div className="hero-badge mb-5">
                About Us
              </div>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-6 leading-[1.2]">
                Technology That
                <span className="text-red"> Serves </span>
                Humanity
              </h2>
              <p className="text-gray-300 text-base leading-[1.9] mb-5">
                At our core, we believe technology should serve humanity. We craft state-of-the-art,
                secure, scalable, future-ready solutions — driving the transformation toward a more
                efficient, resilient, and digitally empowered future.
              </p>
              <p className="text-gray-400 text-[15px] leading-[1.8] mb-8">
                With a multinational presence, a diverse and talented team, and an award-winning
                portfolio, Codematics continues to set new benchmarks in the world of software
                engineering.
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="w-full aspect-square relative rounded-3xl overflow-hidden border border-glass-border">
                <Image
                  src="/new.png"
                  alt="About Codematics"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="section bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hero-badge"
            >
              What We Do
            </motion.div>
          </div>
          <SectionHeading
            title={<><span className="text-white-theme">Our Core</span> <span className="text-[#c92228]">Services</span></>}
            subtitle="We have a refined process after we have taken up a project. We offer the platform from where the projects take shape through stages of planning, testing and execution. We follow an agile methodology and run the project through a loop of feedback and constant improvement."
          />
          <div className="grid-3">
            {services.slice(0, 3).map((service, i) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                image={service.image}
                icon={getServiceIcon(service.iconName)}
                title={service.title}
                description={service.description}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="section bg-bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <div className="hero-badge mb-5">
                Our Achievements
              </div>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-6 leading-[1.2]">
                Awards &
                <span className="text-red"> Honors</span>
              </h2>
              <p className="text-gray-300 text-[15px] leading-[1.9]">
                We have earned a global reputation for our expertise in creating high-quality
                products. Our achievements have been acknowledged with prestigious awards from
                industry leaders and our Google and App Store-compatible Universal TV Remote App
                is amassing a global user base of over 180 million.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-3 gap-5">
                <Counter end={180} suffix="M+" label="Million Users" />
                <Counter end={766} suffix="+" label="Projects" />
                <Counter end={33} suffix="+" label="Awards Won" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section id="team" className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title={<><span className="text-white-theme">OUR</span> <span className="text-[#c92228]">Global Leadership</span></>} subtitle="Our talented and diverse team of professionals drives innovation and excellence in every project we undertake." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {teamMembers.slice(0, 3).map((member, i) => (
              <TeamCard key={member._id || member.name} name={member.name} role={member.role} index={i} image={member.image} linkedin={member.linkedin} variant="minimal" />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/team" className="btn-secondary">
              View Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section id="products" className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title={<><span className="text-white-theme">Our Winning</span> <span className="text-[#c92228]">Products</span></>} subtitle="Our portfolio of award-winning products that serve millions of users worldwide." />
          <div className="grid-3">
            {products.slice(0, 3).map((product, i) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                title={product.title}
                description={product.description}
                color={product.color}
                image={product.image}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary">
              Load More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK MARQUEE ===== */}
      <TechMarquee />

      {/* ===== REMOTE RESOURCES ===== */}
      <section
        id="remote-resources"
        className="section relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(201,34,40,0.08), var(--bg-secondary), rgba(201,34,40,0.05))" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px opacity-50" style={{ background: "linear-gradient(90deg, transparent, var(--red), transparent)" }} />
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center about-grid">
            <AnimatedSection direction="left">
              <div className="w-full aspect-[1.2] rounded-3xl bg-glass-bg border border-glass-border flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/remote-talent.jpg"
                  alt="Global Remote Talent"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="hero-badge mb-5">
                Hire Talent
              </div>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold mb-6 leading-[1.2]">
                We Provide On-Demand
                <span className="text-red"> Remote Resources</span>
              </h2>
              <p className="text-gray-300 text-base leading-[1.9] mb-8">
                With a mission to reshape the work practices and break the distance, our Remote
                Resource is all set to deliver unbeatable IT services globally with the utmost
                quality to boost your business on your own terms.
              </p>
              <Link href="/remote-resources" className="btn-primary">
                Request Now
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CSR ===== */}
      <section className="section bg-bg-primary">
        <div className="container">
          <SectionHeading
            title={<><span className="text-white-theme">Our </span><span className="text-[#c92228]">CSR</span><span className="text-white-theme"> Projects</span></>}
            subtitle="Our commitment extends to CSR (Corporate Social Responsibility) projects to solve social issues through leveraging technology and moving toward building a better, safer, and peaceful world."
          />
          <AnimatedSection>
            <div className="max-w-[500px] mx-auto p-10 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-[20px] text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl bg-[linear-gradient(135deg,rgba(201,34,40,0.2),rgba(201,34,40,0.05))]">
                🚀
              </div>
              <h3 className="text-[22px] font-bold mb-3 font-heading">Urraan</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                URRAAN provides free monthly boot camps and internships in a wide range of digital
                skills within Abbottabad city. The success rate of URRAAN is more than 75%, which
                means that majority of our candidates either start freelancing, get jobs locally, or
                initiate their own startups.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section id="news" className="section bg-bg-secondary">
        <div className="container">
          <SectionHeading title={<><span className="text-white-theme">Latest</span> <span className="text-[#c92228]">News</span></>} subtitle="Stay updated with our latest projects, releases, and company news." />
          <div className="grid-3">
            {newsItems.slice(0, 3).map((item, i) => (
              <NewsCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                description={item.description}
                coverImage={item.coverImage}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/news" className="btn-primary">
              Visit Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section bg-bg-primary">
        <div className="container">
          <SectionHeading title={<><span className="text-white-theme">Get In</span> <span className="text-[#c92228]">Touch</span></>} subtitle="Discuss with our experts and choose the best solution for your business." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] about-grid">
            <AnimatedSection direction="left">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold mb-2">
                  Let&apos;s Build Something
                  <span className="text-red"> Amazing</span>
                </h3>
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, align }) => (
                  <div key={label} className={`flex gap-4 ${align}`}>
                    <div className="contact-icon-box">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-[15px]">{label}</p>
                      <p className="text-gray-400 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== LOADING / ERROR OVERLAY ===== */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-red border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm font-medium">Loading...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-900/90 border border-red-600/30 text-white text-sm rounded-xl shadow-2xl backdrop-blur-sm">
          {error}
        </div>
      )}
    </>
  );
}
