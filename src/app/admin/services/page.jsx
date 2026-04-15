// /src/app/admin/services/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiCollection } from 'react-icons/hi';
import ImageUpload from '@/components/ImageUpload';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    slug: '',
    image: '',
    description: '',
    longDescription: '',
    details: '',
    features: '',
    technologies: '',
    order: 0,
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch services');
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
      image: '',
      description: '',
      longDescription: '',
      details: '',
      features: '',
      technologies: '',
      order: 0,
      isActive: true
    });
    setIsEditing(false);
    setError('');
  };

  const handleEdit = (service) => {
    setForm({
      ...service,
      details: service.details?.join(', ') || '',
      features: service.features?.join(', ') || '',
      technologies: service.technologies?.join(', ') || ''
    });
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) fetchServices();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/services/${form._id}` : '/api/services';

    const payload = {
      ...form,
      details: (form.details || "").split(',').map(s => s.trim()).filter(Boolean),
      features: (form.features || "").split(',').map(s => s.trim()).filter(Boolean),
      technologies: (form.technologies || "").split(',').map(s => s.trim()).filter(Boolean),
    };

    if (!isEditing) delete payload._id;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchServices();
        resetForm();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse tracking-widest">Loading Services...</div>;

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in font-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-6 md:pb-10 gap-4 md:gap-6">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-2 w-12 md:w-16 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500">Service Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white-theme tracking-tight font-heading flex items-center gap-3">
            <HiCollection className="text-[#c92228] shrink-0" />
            Services <span className="text-[#c92228]">Engine</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 md:pl-6">Architecture of core competencies and primary solutions.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-5 md:px-6 py-3 md:py-4 bg-[#c92228] text-white-theme rounded-xl shadow-xl hover:bg-[#a01b20] transition-all font-bold text-xs tracking-wide active:scale-95 group self-start md:self-auto"
          >
            <HiPlus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
            Add New Service
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary rounded-xl lg:rounded-[1.5rem] shadow-xl border border-glass-border overflow-x-auto w-full">
        <table className="min-w-[800px] w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Service Title</th>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Slug</th>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Image</th>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Order</th>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Active</th>
              <th className="px-5 lg:px-8 py-5 lg:py-6 text-right text-[10px] font-bold text-gray-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap font-bold text-white-theme text-sm font-heading group-hover:text-[#c92228] transition-colors">{service.title}</td>
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-xs text-gray-500 font-mono tracking-tighter">/{service.slug}</td>
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                  {service.image ? (
                    <div className="h-10 w-10 rounded-xl overflow-hidden border border-glass-border bg-bg-primary">
                      <img src={service.image} alt="" className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">No image</span>
                  )}
                </td>
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-center text-sm font-bold text-white-theme">
                  {service.order || 0}
                </td>
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-center">
                  {service.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full mx-auto"></div>
                  }
                </td>
                <td className="px-5 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(service)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(service._id)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <div key={service._id} className="bg-bg-secondary rounded-2xl border border-glass-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              {service.image ? (
                <div className="h-11 w-11 rounded-xl overflow-hidden border border-glass-border bg-bg-primary shrink-0">
                  <img src={service.image} alt="" className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-11 w-11 rounded-xl bg-glass-bg border border-glass-border flex items-center justify-center shrink-0">
                  <HiCollection className="text-gray-500 h-5 w-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white-theme text-sm font-heading tracking-tight truncate">{service.title}</div>
                <div className="text-[10px] text-gray-500 font-mono tracking-tighter mt-0.5">/{service.slug}</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-glass-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-gray-500 font-bold tracking-widest">ORDER</span>
                  <span className="text-xs font-bold text-white-theme">{service.order || 0}</span>
                </div>
                {service.isActive 
                  ? <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                  : <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                }
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(service)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(service._id)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-bg-secondary p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] shadow-xl border border-glass-border mt-8 md:mt-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c92228]/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#c92228]/10 transition-colors duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c92228] to-[#a01b20]"></div>
        
        <h2 className="text-xl md:text-2xl font-black text-white-theme mb-6 md:mb-8 font-heading tracking-tighter">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
        
        {error && <div className="mb-6 md:mb-10 p-4 md:p-6 bg-red-900/20 text-[#c92228] rounded-xl md:rounded-2xl border border-red-900/30 text-[10px] font-bold tracking-widest animate-shake leading-loose">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Service Title</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none text-sm md:text-base" value={form.title} onChange={handleTitleChange} required placeholder="e.g. Web Development" />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Slug</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary/50 border-2 border-glass-border text-gray-500 font-mono text-xs" value={form.slug} readOnly />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Service Image</label>
              <ImageUpload value={form.image || ''} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Short Description</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[100px] md:min-h-[120px] font-medium leading-relaxed outline-none text-sm md:text-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Sequence Order</label>
              <input type="number" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none text-sm md:text-base" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
            <div className="flex items-center p-5 md:p-8 bg-bg-primary rounded-xl md:rounded-[2rem] border border-glass-border group/check cursor-pointer" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
              <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.isActive ? 'bg-[#c92228] border-[#c92228]' : 'border-glass-border'}`}>
                 {form.isActive && <HiCheck className="text-white-theme h-4 w-4" />}
              </div>
              <label className="ml-4 md:ml-5 text-xs font-bold text-gray-300 tracking-widest cursor-pointer select-none">Active Status</label>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Long Description</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[100px] md:min-h-[120px] font-medium leading-relaxed outline-none text-sm md:text-base" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Sub-Details (Comma Delimited)</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
               <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Service Features (Comma Delimited)</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Technologies (Comma Delimited)</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-6 pt-6 md:pt-10 border-t border-glass-border">
            <button type="button" onClick={resetForm} className="px-8 md:px-10 py-4 md:py-5 bg-glass-bg text-gray-400 rounded-xl md:rounded-2xl hover:text-white-theme transition-all font-bold text-xs active:scale-95 order-2 sm:order-1">Cancel</button>
            <button type="submit" className="px-10 md:px-12 py-4 md:py-5 bg-[#c92228] text-white-theme rounded-xl md:rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all transform active:scale-95 font-bold text-xs shadow-red-900/30 order-1 sm:order-2">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
