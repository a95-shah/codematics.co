"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Team", href: "/team" },
  { name: "Products", href: "/products" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname?.includes("/admin")) return null;

  return (
    <>
      {/* DEBUG_ID: V3_FIX_03 */}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--nav-border)"
            : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 flex items-center justify-center">
  <Image
    src="/logo.png"
    alt="Logo"
    width={80}
    height={80}
    className="object-contain"
    priority
  />
</div>
            <span className="font-heading font-extrabold text-[22px] tracking-[1px]">
              <span className="text-white-theme">CODE</span><span className="text-[#c92228]">MATICS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-0
           desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 px-4 text-sm font-semibold transition-colors duration-300 relative"
                style={{
                  color:
                    pathname === link.href ? "var(--red)" : "var(--gray-200)",
                }}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-0.5 bg-red rounded-sm"
                  />
                )}
              </Link>
            ))}
            <Link href="/remote-resources" className="btn-primary !py-2.5 !px-6 !text-[13px]">
              Remote Resources
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle ml-2"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </motion.div>
            </button>
          </div>

          {/* Mobile: Menu Button */}
          <button
            className="mobile-menu-btn hidden bg-transparent border-none text-white-theme text-[28px] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-4/5 max-w-[360px] h-screen backdrop-blur-[20px] z-[999] pt-[100px] px-10 pb-10 flex flex-col gap-2 border-l border-glass-border overflow-y-auto"
            style={{ background: "var(--mobile-menu-bg)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3.5 text-lg font-medium border-b border-glass-border"
                  style={{
                    color:
                      pathname === link.href ? "var(--red)" : "var(--gray-200)",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                href="/remote-resources"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-5 justify-center w-full"
              >
                Remote Resources
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <button
                onClick={toggleTheme}
                className="theme-toggle mt-4 w-full flex items-center justify-center gap-2 !rounded-full"
                aria-label="Toggle theme"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                  <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed top-0 left-0 w-full h-full z-[998]"
          style={{ background: "var(--overlay-bg)" }}
        />
      )}
    </>
  );
}
