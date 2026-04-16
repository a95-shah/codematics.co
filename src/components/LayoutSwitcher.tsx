"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutSwitcher({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
     return <main key={pathname}>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main key={pathname}>{children}</main>
      <Footer />
    </>
  );
}
