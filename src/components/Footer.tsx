"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Team", href: "/team" },
  { name: "Products", href: "/products" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Remote Resources", href: "/remote-resources" },
];

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer
      className="relative overflow-hidden border-t border-glass-border"
      style={{ background: "var(--footer-gradient)" }}
    >
      {/* Red glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--red), transparent)" }}
      />

      <div className="container !py-20 !pb-10">
        <div
          className="grid gap-10 footer-grid"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr" }}
        >
          {/* Brand */}
          <AnimatedSection delay={0}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-[1px]">
                <span className="text-white-theme">CODE</span><span className="text-[#c92228]">MATICS</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-[1.8] mb-6">
              A global trusted partner for guaranteed software engineering excellence, quality, and transparency at every step.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-gray-300 text-sm transition-all duration-300 hover:bg-red hover:border-red hover:text-[#ffffff]"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection delay={0.1}>
            <h4 className="text-base font-bold mb-6 text-white-theme uppercase tracking-[1px]">
              Quick Links
            </h4>
            <ul className="list-none mb-8">
              {quickLinks.map((link) => (
                <li key={link.name} className="mb-2.5">
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm transition-all duration-300 hover:text-red hover:pl-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center px-6 py-2.5 bg-glass-bg border border-glass-border rounded-xl text-xs font-bold text-gray-400 hover:bg-[#c92228] hover:text-white-theme hover:border-[#c92228] transition-all"
            >
              Admin Login
            </Link>
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection delay={0.2}>
            <h4 className="text-base font-bold mb-6 text-white-theme uppercase tracking-[1px]">
              Services
            </h4>
            <ul className="list-none">
              {["Mobile Apps", "Web Development", "Game Development", "UX/UI Design", "Digital Marketing", "AI Solutions"].map((s) => (
                <li key={s} className="mb-2.5">
                  <span className="text-gray-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection delay={0.3}>
            <h4 className="text-base font-bold mb-6 text-white-theme uppercase tracking-[1px]">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <HiLocationMarker className="text-red text-lg mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Office # 14, 2nd Floor, KPK IT Park, Abbottabad, Pakistan
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <HiMail className="text-red text-lg shrink-0" />
                <span className="text-gray-400 text-sm">contact@codematics.co</span>
              </div>
              <div className="flex gap-3 items-center">
                <HiPhone className="text-red text-lg shrink-0" />
                <span className="text-gray-400 text-sm">+92-992-639764</span>
              </div>
              <div className="mt-2">
                <p className="text-gray-300 text-[13px] font-semibold mb-1">Estonia (EU) Office</p>
                <span className="text-gray-400 text-sm">Tartu, Estonia</span>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom */}
        <div className="border-t border-glass-border mt-[60px] pt-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-gray-500 text-[13px]">
            © {new Date().getFullYear()} Codematics Services (Private) Limited. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 text-[13px]">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-[13px]">Terms</Link>
            <Link href="#" className="text-gray-500 text-[13px]">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
