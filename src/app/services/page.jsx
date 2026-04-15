import Link from 'next/link';

import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';

async function getServices() {
  await dbConnect();
  const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
  return services.map(s => ({
    ...s,
    _id: s._id.toString(),
    createdAt: s.createdAt?.toISOString(),
    updatedAt: s.updatedAt?.toISOString()
  }));
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-bg-primary min-h-screen font-body selection:bg-red-600/30">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-bg-primary -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-6 text-center">
          <div className="h-1 w-20 bg-[#c92228] mx-auto mb-8 rounded-full"></div>
          <h1 className="text-5xl md:text-6xl font-black text-white-theme tracking-tight font-heading mb-6">
            Our <span className="text-[#c92228]">Services</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            We architect and deliver cutting-edge digital solutions tailored for modern business ecosystems.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <Link 
                key={service._id} 
                href={`/services/${service.slug}`}
                className="group bg-bg-secondary border border-glass-border rounded-2xl shadow-xl hover:border-red-600/20 transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col"
              >
                {/* Service Image */}
                <div className="w-full h-48 overflow-hidden bg-bg-tertiary flex items-center justify-center shrink-0">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white-theme bg-gradient-to-br from-[#c92228] to-[#a01b20]">
                      {service.title?.charAt(0) || 'S'}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-white-theme font-heading tracking-tight group-hover:text-[#c92228] transition-colors">{service.title}</h2>
                    <div className="text-sm font-bold text-gray-500 font-mono tracking-tighter">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm line-clamp-3 font-medium flex-1">{service.description}</p>
                  
                  <div className="flex items-center font-bold text-[#c92228] text-sm group-hover:gap-2 transition-all">
                    <span>Explore Service Details</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {services.length === 0 && (
          <div className="text-center py-32 bg-glass-bg rounded-[3rem] border border-dashed border-glass-border text-gray-500 font-bold tracking-widest text-sm">
            NO ACTIVE SERVICES DISCOVERED IN REGISTRY
          </div>
        )}
      </section>
    </div>
  );
}
