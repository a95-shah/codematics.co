"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaLinkedin } from "react-icons/fa";

interface TeamCardProps {
  name: string;
  role: string;
  index: number;
  image?: string;
  linkedin?: string;
  variant?: 'default' | 'minimal';
}

export default function TeamCard({ name, role, index, image, linkedin, variant = 'default' }: TeamCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [firstName, ...lastNameArr] = name.split(" ");
  const lastName = lastNameArr.join(" ");

  if (variant === 'minimal') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="max-w-[220px] mx-auto text-left group cursor-pointer"
      >
        {/* Transparent Profile Image Container */}
        <div className="w-full aspect-[4/5] mb-5 relative overflow-hidden bg-transparent group-hover:-translate-y-2 transition-transform duration-500 rounded-2xl flex items-end justify-center">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl font-black text-[#c92228] bg-bg-secondary rounded-3xl">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <h4 className="text-2xl lg:text-[28px] font-bold mb-1 font-heading tracking-tight">
          <span className="text-white-theme">{firstName}</span>{" "}
          <span className="text-[#c92228]">{lastName}</span>
        </h4>

        <p className="text-gray-400 text-[13px] font-medium tracking-wide mb-3">
          {role}
        </p>

        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex text-white-theme hover:text-blue-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FaLinkedin size={22} />
          </a>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-center p-8 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-[2rem] transition-all duration-[400ms] cursor-pointer hover:border-red-600/30 hover:shadow-[0_0_40px_rgba(201,34,40,0.1)] hover:-translate-y-2 group"
    >
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-red-600/20 flex items-center justify-center text-3xl font-black text-[#c92228] bg-bg-secondary overflow-hidden group-hover:border-[#c92228] transition-colors">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
        ) : (
          name.charAt(0)
        )}
      </div>

      <h4 className="text-lg font-black mb-1 text-white-theme font-heading tracking-tight group-hover:text-[#c92228] transition-colors">
        {name}
      </h4>

      <p className="text-gray-500 text-xs font-bold tracking-wider mb-4">
        {role}
      </p>

      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-2 rounded-full bg-glass-bg border border-glass-border text-gray-400 hover:text-white-theme hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-95"
          onClick={(e) => e.stopPropagation()}
        >
          <FaLinkedin size={18} />
        </a>
      )}
    </motion.div>
  );
}
