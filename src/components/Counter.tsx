"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function Counter({ end, suffix = "", label, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <div
      ref={ref}
      className="text-center py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl transition-all duration-300"
    >
      <div className="text-[clamp(1.2rem,3.5vw,1.6rem)] font-black font-heading leading-none mb-2 bg-gradient-to-br from-red to-red-light bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        {count}
        {suffix}
      </div>
      <div className="text-[0.65rem] sm:text-[0.8rem] md:text-[0.95rem] text-gray-300 font-medium uppercase tracking-tight md:tracking-[2px] break-words">
        {label}
      </div>
    </div>
  );
}
