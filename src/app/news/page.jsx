import Link from 'next/link';
import { HiArrowRight, HiCalendar, HiUser } from 'react-icons/hi';

import dbConnect from '@/lib/db';
import NewsPost from '@/lib/models/NewsPost';

async function getNews() {
  await dbConnect();
  const news = await NewsPost.find({ isActive: true }).sort({ date: -1 }).lean();
  return news.map(n => ({
    ...n,
    _id: n._id.toString(),
    createdAt: n.createdAt?.toISOString(),
    updatedAt: n.updatedAt?.toISOString()
  }));
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="bg-bg-primary min-h-screen font-body selection:bg-red-600/30">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="h-1 w-20 bg-[#c92228] mb-8 rounded-full"></div>
            <h1 className="text-5xl md:text-7xl font-black text-white-theme tracking-tight font-heading mb-6">
              News & <span className="text-[#c92228]">Chronicles</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed font-medium border-l-2 border-glass-border pl-6">
              Documenting our journey through innovation, community impact, and industry leadership.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {news.map((item) => (
            <Link 
              key={item._id} 
              href={`/news/${item.slug}`} 
              className="group block"
            >
              <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-all duration-700 hover:shadow-red-600/10 border border-glass-border group-hover:border-red-600/20">
                {item.coverImage ? (
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-bg-secondary flex items-center justify-center font-black text-3xl text-gray-500 tracking-tighter">
                    {item.category}
                  </div>
                )}
                <div className="absolute top-6 left-6 px-5 py-2 bg-[#c92228] text-[#ffffff] rounded-full text-[10px] font-bold tracking-widest shadow-xl">
                  {item.category}
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500 tracking-widest">
                  <span className="flex items-center gap-2"><HiCalendar className="text-[#c92228] h-4 w-4" /> {item.date}</span>
                  <span className="flex items-center gap-2"><HiUser className="text-[#c92228] h-4 w-4" /> {item.author || "Codematics"}</span>
                </div>
                
                <h2 className="text-3xl font-black text-white-theme tracking-tight group-hover:text-[#c92228] transition-colors leading-tight font-heading">
                  {item.title}
                </h2>
                
                <p className="text-gray-400 font-medium leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                
                <div className="pt-4 flex items-center font-bold text-xs tracking-widest text-[#c92228] group-hover:gap-6 transition-all duration-500">
                  READ FULL ARTICLE
                  <HiArrowRight className="ml-4 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {news.length === 0 && (
          <div className="text-center py-40 bg-glass-bg rounded-[3rem] border border-dashed border-glass-border">
            <h2 className="text-gray-500 text-lg font-bold tracking-[0.3em]">RECORDS ARE CURRENTLY VOID</h2>
          </div>
        )}
      </section>
    </div>
  );
}
