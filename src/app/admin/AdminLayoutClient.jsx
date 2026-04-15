// /src/app/admin/layout.jsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession, SessionProvider } from 'next-auth/react';
import { 
  HiViewGrid, 
  HiCollection, 
  HiCube, 
  HiNewspaper, 
  HiUserGroup, 
  HiMail, 
  HiLightningBolt, 
  HiDocumentText,
  HiLogout,
  HiMenu,
  HiX
} from 'react-icons/hi';

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <div className="min-h-screen bg-bg-primary text-white-theme font-body">{children}</div>;

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HiViewGrid },
    { name: 'Services', href: '/admin/services', icon: HiCollection },
    { name: 'Products', href: '/admin/products', icon: HiCube },
    { name: 'News & Media', href: '/admin/news', icon: HiNewspaper },
    { name: 'Our Global Team', href: '/admin/team', icon: HiUserGroup },
    { name: 'Messages', href: '/admin/contact', icon: HiMail },
    { name: 'Remote Skills', href: '/admin/remote-resources', icon: HiLightningBolt },
    { name: 'Pages', href: '/admin/pages', icon: HiDocumentText },
  ];

  return (
    <div className="flex min-h-screen bg-bg-primary text-white-theme font-body selection:bg-red-600/30">
      
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-bg-secondary border-b border-glass-border z-50 flex items-center justify-between px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading font-bold text-lg tracking-tighter">
            <span className="text-white-theme">CODE</span>
            <span className="text-[#c92228]">MATICS</span>
          </span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white-theme hover:bg-glass-bg rounded-xl transition-all active:scale-90"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-[240px] bg-bg-secondary border-r border-glass-border shadow-2xl z-50 flex flex-col transition-transform duration-300 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6 mb-2 shrink-0">
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
             <span className="font-heading font-bold text-xl tracking-tighter">
                <span className="text-white-theme">CODE</span>
                <span className="text-[#c92228]">MATICS</span>
             </span>
          </Link>
          <div className="mt-2 flex items-center gap-2">
             <div className="h-1 w-12 bg-[#c92228] rounded-full"></div>
             <p className="text-[10px] text-gray-500 tracking-[0.2em] font-bold">Control Hub</p>
          </div>
        </div>

        <nav className="px-4 space-y-1 flex-1 overflow-y-auto pb-4 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-[13px] font-bold rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'text-white-theme bg-[#c92228] shadow-[0_10px_20px_-5px_rgba(201,34,40,0.4)] translate-x-1' 
                    : 'text-gray-400 hover:text-white-theme hover:bg-glass-bg'
                }`}
              >
                {isActive && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-white-theme opacity-50"></div>
                )}
                <item.icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white-theme' : 'text-gray-500 group-hover:text-[#c92228]'}`} />
                <span className="font-heading tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 bg-bg-secondary border-t border-glass-border backdrop-blur-md shrink-0">
           <div className="flex items-center gap-4 mb-6 p-3 bg-glass-bg rounded-2xl border border-glass-border">
              <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#c92228] to-[#a01b20] flex items-center justify-center text-white-theme font-bold text-sm shadow-lg shadow-red-900/20">
                {session?.user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white-theme truncate font-heading tracking-tight">{session?.user?.email}</p>
                <div className="flex items-center gap-1.5">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-[9px] text-gray-500 font-bold tracking-widest">Authorized</p>
                </div>
              </div>
           </div>
           
           <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 text-[10px] font-bold tracking-[0.2em] text-gray-500 hover:text-white-theme bg-glass-bg hover:bg-red-600 rounded-2xl transition-all shadow-inner-sm active:scale-95 group"
          >
            <HiLogout className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 ml-0 lg:ml-[240px] min-h-screen bg-bg-primary relative overflow-x-hidden pt-16 lg:pt-0">
        <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 lg:p-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="fixed bottom-0 right-0 -mr-64 -mb-64 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
