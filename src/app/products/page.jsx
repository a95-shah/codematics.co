import Link from 'next/link';
import { HiArrowRight, HiCube } from 'react-icons/hi';

import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

async function getProducts() {
  await dbConnect();
  const products = await Product.find({ isActive: true }).lean();
  return products.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString()
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-bg-primary min-h-screen font-body selection:bg-red-600/30">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-6 text-center">
          <div className="h-1 w-20 bg-[#c92228] mx-auto mb-8 rounded-full"></div>
          <h1 className="text-5xl md:text-6xl font-black text-white-theme tracking-tight font-heading mb-6">
            Our <span className="text-[#c92228]">Innovation</span> Hub
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Discover our flagship software solutions designed to simplify workflows and amplify global impact.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/products/${product.slug}`}
              className="group relative bg-bg-secondary rounded-2xl overflow-hidden shadow-xl transition-all duration-500 border border-glass-border hover:border-red-600/20 flex flex-col h-full"
            >
               {/* Product Decoration */}
               <div 
                className="h-1.5 absolute top-0 left-0 right-0 group-hover:h-2 transition-all duration-500" 
                style={{ backgroundColor: product.color || '#c92228' }}
               ></div>

               {/* Product Image */}
               {product.image && (
                 <div className="w-full h-52 overflow-hidden bg-bg-tertiary">
                   <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
                 </div>
               )}
               
               <div className="p-6 relative z-10 flex flex-col h-full">
                  <div className="mb-5 flex justify-between items-start">
                    <div className="flex flex-wrap gap-2">
                       {product.platforms?.map((p, i) => (
                         <span key={i} className="px-3 py-1 bg-glass-bg text-[9px] font-bold text-gray-500 rounded-full border border-glass-border tracking-wider uppercase">{p}</span>
                       ))}
                    </div>
                    <div className="text-[#c92228] bg-red-600/10 p-3 rounded-2xl border border-red-600/10">
                      <HiCube className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-black text-white-theme mb-3 font-heading tracking-tight group-hover:text-[#c92228] transition-colors">{product.title}</h2>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">{product.description}</p>
                  
                  <div className="mt-auto pt-8 border-t border-glass-border">
                    <div className="flex items-center justify-between font-bold text-xs tracking-widest text-[#c92228] group-hover:gap-4 transition-all">
                       <span>VIEW PRODUCT DETAILS</span>
                       <HiArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
               </div>
            </Link>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-40 bg-glass-bg rounded-2xl border border-dashed border-glass-border">
             <p className="text-gray-500 font-bold tracking-[0.3em]">INNOVATION PIPELINE CURRENTLY EMPTY</p>
          </div>
        )}
      </section>
    </div>
  );
}
