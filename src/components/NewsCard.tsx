"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

interface NewsCardProps {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  index: number;
}

export default function NewsCard({ slug, title, description, coverImage, index }: NewsCardProps) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <Link href={`/news/${slug}`} className="block h-full">
        <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl overflow-hidden transition-all duration-[400ms] cursor-pointer hover:border-[rgba(201,34,40,0.3)] hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(201,34,40,0.15)] h-full flex flex-col">
          <div className="h-[180px] flex items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-primary shrink-0 relative overflow-hidden">
            {coverImage ? (
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white-theme bg-gradient-to-br from-red to-red-dark">
                C
              </div>
            )}
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-base font-bold mb-2 font-heading text-white-theme">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
