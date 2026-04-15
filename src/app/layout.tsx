import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import LayoutSwitcher from "@/components/LayoutSwitcher";

export const metadata: Metadata = {
  title: "Codematics Services Pvt Ltd — For A Better, Safe And Peaceful World",
  description:
    "Codematics is a global trusted partner for guaranteed software engineering excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-body">
        <ThemeProvider>
          <LayoutSwitcher>{children}</LayoutSwitcher>
        </ThemeProvider>
      </body>
    </html>
  );
}
