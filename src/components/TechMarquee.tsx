"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const technologies = [
  "React", "Node.js", "Python", "Flutter",
  "AWS", "Azure", "Docker", "Angular",
  "Vue.js", "Kubernetes", "Swift", "Kotlin",
  "MongoDB", "PostgreSQL", "GraphQL"
];

// We double the array so the marquee can scroll infinitely without a gap
const marqueeItems = [...technologies, ...technologies];

export default function TechMarquee() {
  return (
    <section className="section bg-bg-primary overflow-hidden border-y border-glass-border">
      <div className="container mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hero-badge mb-5 bg-transparent"
          >
            Technologies
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(2rem,4vw,3rem)] font-extrabold font-heading"
          >
            Tech Stack We <span className="text-red">Master</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden border-y border-[rgba(201,34,40,0.1)] bg-[rgba(201,34,40,0.02)] py-8">
        
        {/* First Marquee Track */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {marqueeItems.map((tech, i) => (
            <span 
              key={`${tech}-${i}`} 
              className="mx-10 text-[22px] font-bold text-red font-heading uppercase tracking-[1px] opacity-90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Second Marquee Track (for seamless looping) */}
        <div className="animate-marquee whitespace-nowrap flex items-center absolute top-8">
          {marqueeItems.map((tech, i) => (
            <span 
              key={`copy-${tech}-${i}`} 
              className="mx-10 text-[22px] font-bold text-red font-heading uppercase tracking-[1px] opacity-90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Gradient overlays to fade edges */}
        <div className="absolute top-0 left-0 w-[15%] h-full bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
