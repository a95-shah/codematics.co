// /src/app/admin/dashboard/page.jsx
import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';
import Product from '@/lib/models/Product';
import NewsPost from '@/lib/models/NewsPost';
import TeamMember from '@/lib/models/TeamMember';
import ContactMessage from '@/lib/models/ContactMessage';
import RemoteResource from '@/lib/models/RemoteResource';
import Link from 'next/link';
import { 
  HiCollection, 
  HiCube, 
  HiNewspaper, 
  HiUserGroup, 
  HiMail, 
  HiLightningBolt 
} from 'react-icons/hi';

async function getStats() {
  await dbConnect();
  const [services, products, news, team, unreadContacts, remoteResources] = await Promise.all([
    Service.countDocuments(),
    Product.countDocuments(),
    NewsPost.countDocuments(),
    TeamMember.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
    RemoteResource.countDocuments(),
  ]);

  return {
    services,
    products,
    news,
    team,
    unreadContacts,
    remoteResources
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Core Services', count: stats.services, icon: HiCollection, color: 'text-red-500', href: '/admin/services', desc: 'Manage your primary service offerings' },
    { label: 'Product Universe', count: stats.products, icon: HiCube, color: 'text-rose-500', href: '/admin/products', desc: 'Global software products' },
    { label: 'News & Media', count: stats.news, icon: HiNewspaper, color: 'text-orange-500', href: '/admin/news', desc: 'Latest press and narrative posts' },
    { label: 'Global Team', count: stats.team, icon: HiUserGroup, color: 'text-red-600', href: '/admin/team', desc: 'Our leadership and talent' },
    { label: 'Messages', count: stats.unreadContacts, icon: HiMail, color: 'text-red-400', href: '/admin/contact', unread: stats.unreadContacts > 0, desc: 'Incoming customer transmissions' },
    { label: 'Remote Talent', count: stats.remoteResources, icon: HiLightningBolt, color: 'text-amber-500', href: '/admin/remote-resources', desc: 'On-demand development resources' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-glass-border pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="h-1 w-12 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">System Overview</span>
          </div>
          <h1 className="text-3xl font-black text-white-theme tracking-tight font-heading italic">Command <span className="text-[#c92228]">Center</span></h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 italic">Welcome Commander. Monitoring metrics for the Codematics Digital Infrastructure.</p>
        </div>
        
        <div className="bg-bg-secondary p-3 rounded-xl border border-glass-border shadow-md flex items-center gap-4">
           <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#c92228] mb-0.5">Status</p>
              <p className="text-sm font-bold text-white-theme uppercase tracking-tight">Operational</p>
           </div>
           <div className="h-8 w-px bg-glass-bg"></div>
           <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link 
            key={card.label} 
            href={card.href}
            className="group relative block p-8 bg-bg-secondary rounded-[2rem] border border-glass-border hover:border-[#c92228]/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-red-900/10 overflow-hidden"
          >
            {/* Background Icon Decoration */}
            <card.icon className="absolute -bottom-6 -right-6 h-40 w-40 text-white-theme opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`mb-6 flex justify-between items-start`}>
                 <div className="p-3 bg-glass-bg rounded-xl border border-glass-border group-hover:bg-[#c92228]/10 group-hover:border-[#c92228]/20 transition-colors">
                    <card.icon className={`h-8 w-8 ${card.color}`} />
                 </div>
                 {card.unread && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-lg animate-bounce">
                       <span className="text-[10px] font-black text-white-theme tracking-widest uppercase italic">New Message</span>
                    </div>
                 )}
              </div>
              
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-black text-white-theme tracking-tight leading-none group-hover:text-[#c92228] transition-colors">{card.count}</span>
              </div>
              
              <h3 className="text-base font-black text-white-theme font-heading uppercase tracking-tight mb-1">
                {card.label}
              </h3>
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed italic">{card.desc}</p>
              
              <div className="mt-6 pt-5 border-t border-glass-border flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white-theme transition-colors">Configure Section</span>
                 <svg className="h-5 w-5 text-gray-500 group-hover:text-[#c92228] group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                 </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
