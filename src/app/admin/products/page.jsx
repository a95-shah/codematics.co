// /src/app/admin/products/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiCube } from 'react-icons/hi';
import ImageUpload from '@/components/ImageUpload';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    slug: '',
    description: '',
    color: '#c92228',
    longDescription: '',
    features: '',
    platforms: '',
    image: '',
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({ ...form, title, slug: generateSlug(title) });
  };

  const resetForm = () => {
    setForm({
      _id: '',
      title: '',
      slug: '',
      description: '',
      color: '#c92228',
      longDescription: '',
      features: '',
      platforms: '',
      image: '',
      isActive: true
    });
    setIsEditing(false);
    setError('');
  };

  const handleEdit = (product) => {
    setForm({
      ...product,
      features: product.features?.join(', ') || '',
      platforms: product.platforms?.join(', ') || ''
    });
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/products/${form._id}` : '/api/products';

    const payload = {
      ...form,
      features: (form.features || "").split(',').map(s => s.trim()).filter(Boolean),
      platforms: (form.platforms || "").split(',').map(s => s.trim()).filter(Boolean),
    };

    // Fix: Remove empty _id for new products to avoid Mongoose CastError
    if (!isEditing) {
      delete payload._id;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchProducts();
        resetForm();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400 font-bold animate-pulse tracking-widest">Inventory Sync...</div>;

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in font-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-6 md:pb-10 gap-4 md:gap-6">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-2 w-12 md:w-16 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500">Production Control</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white-theme tracking-tighter font-heading flex items-center gap-3 md:gap-4">
            <HiCube className="text-[#c92228] shrink-0" />
            Product <span className="text-[#c92228]">Universe</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 md:pl-6">Life-changing innovations and flagship digital solutions.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-6 md:px-10 py-4 md:py-5 bg-[#c92228] text-white-theme rounded-xl md:rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all font-bold text-xs tracking-wide active:scale-95 group self-start md:self-auto"
          >
            <HiPlus className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
            Add New Product
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary rounded-2xl lg:rounded-[2.5rem] shadow-2xl border border-glass-border overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Project Identity</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Theme Key</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Platforms</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Status</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-right text-[10px] font-bold text-gray-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-glass-bg rounded-xl border border-glass-border flex items-center justify-center p-2 group-hover:bg-[#c92228]/10 transition-colors shrink-0">
                         {product.image ? <img src={product.image} className="h-full w-full object-contain" alt="" /> : <HiCube className="text-gray-500" />}
                      </div>
                      <div className="font-bold text-white-theme text-sm font-heading group-hover:text-[#c92228] transition-colors tracking-tight">{product.title}</div>
                   </div>
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full shadow-lg shrink-0" style={{ backgroundColor: product.color }}></div>
                    <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">{product.color}</span>
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                   <div className="flex gap-1.5 flex-wrap max-w-[150px]">
                      {product.platforms?.map((p, i) => (
                        <span key={i} className="text-[8px] font-bold text-gray-300 px-2 py-0.5 bg-glass-bg rounded-md tracking-tighter border border-glass-border">{p}</span>
                      ))}
                   </div>
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-center">
                  {product.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full mx-auto"></div>
                  }
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product._id} className="bg-bg-secondary rounded-2xl border border-glass-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-glass-bg rounded-xl border border-glass-border flex items-center justify-center p-2 shrink-0">
                {product.image ? <img src={product.image} className="h-full w-full object-contain" alt="" /> : <HiCube className="text-gray-500 h-6 w-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white-theme text-sm font-heading tracking-tight truncate">{product.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-3 w-3 rounded-full shadow-sm shrink-0" style={{ backgroundColor: product.color }}></div>
                  <span className="text-[10px] font-medium text-gray-500 tracking-wider uppercase">{product.color}</span>
                  {product.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  }
                </div>
              </div>
            </div>
            {product.platforms?.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {product.platforms.map((p, i) => (
                  <span key={i} className="text-[9px] font-bold text-gray-300 px-2 py-0.5 bg-glass-bg rounded-md tracking-tighter border border-glass-border">{p}</span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-glass-border">
              <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-bg-secondary p-5 md:p-8 lg:p-12 xl:p-16 rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] shadow-2xl lg:shadow-3xl border border-glass-border mt-10 md:mt-16 lg:mt-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c92228]/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#c92228]/10 transition-colors duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c92228] to-[#a01b20]"></div>
        
        <h2 className="text-xl md:text-3xl font-black text-white-theme mb-8 md:mb-12 font-heading tracking-tighter">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
        
        {error && <div className="mb-6 md:mb-10 p-4 md:p-6 bg-red-900/20 text-[#c92228] rounded-xl md:rounded-2xl border border-red-900/30 text-[10px] font-bold tracking-widest animate-shake leading-loose">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Product Title</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none text-sm md:text-base" value={form.title} onChange={handleTitleChange} required placeholder="Universal TV Remote" />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Slug</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary/50 border-2 border-glass-border text-gray-500 font-mono text-xs" value={form.slug} readOnly />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Accent Color</label>
                  <div className="flex gap-3 md:gap-4">
                     <input type="color" className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] cursor-pointer bg-transparent border-none rounded-xl md:rounded-2xl" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                     <input type="text" className="flex-1 px-4 md:px-8 py-3 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border text-gray-400 font-mono text-xs" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                  </div>
               </div>
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Is Active</label>
                  <div className="h-[50px] md:h-[60px] flex items-center p-4 md:p-6 bg-bg-primary rounded-xl md:rounded-2xl border border-glass-border group/check cursor-pointer" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
                    <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.isActive ? 'bg-[#c92228] border-[#c92228]' : 'border-glass-border'}`}>
                        {form.isActive && <HiCheck className="text-white-theme h-4 w-4" />}
                    </div>
                  </div>
               </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Description</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[120px] md:min-h-[140px] font-medium leading-relaxed outline-none shadow-inner text-sm md:text-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Long Description</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[120px] md:min-h-[140px] font-medium leading-relaxed outline-none text-sm md:text-base" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Platforms (Comma Delimited)</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.platforms} onChange={(e) => setForm({ ...form, platforms: e.target.value })} placeholder="iOS, Android, Web" />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Features (Comma Delimited)</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Product Image</label>
              <ImageUpload value={form.image || ''} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-6 pt-6 md:pt-10 border-t border-glass-border">
            <button type="button" onClick={resetForm} className="px-8 md:px-10 py-4 md:py-5 bg-glass-bg text-gray-400 rounded-xl md:rounded-2xl hover:text-white-theme transition-all font-bold text-xs active:scale-95 order-2 sm:order-1">Cancel</button>
            <button type="submit" className="px-10 md:px-12 py-4 md:py-5 bg-[#c92228] text-white-theme rounded-xl md:rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all transform active:scale-95 font-bold text-xs shadow-red-900/40 order-1 sm:order-2">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
