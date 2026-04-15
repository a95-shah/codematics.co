// /app/admin/remote-resources/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiLightningBolt } from 'react-icons/hi';

export default function RemoteResourcesAdmin() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    description: '',
    skills: '',
    experience: '',
    image: '',
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/remote-resources');
      const data = await res.json();
      setResources(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch resources');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      _id: '',
      title: '',
      description: '',
      skills: '',
      experience: '',
      image: '',
      isActive: true
    });
    setIsEditing(false);
    setError('');
  };

  const handleEdit = (resource) => {
    setForm({
      ...resource,
      skills: resource.skills?.join(', ') || ''
    });
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      const res = await fetch(`/api/remote-resources/${id}`, { method: 'DELETE' });
      if (res.ok) fetchResources();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/remote-resources/${form._id}` : '/api/remote-resources';

    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchResources();
        resetForm();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse tracking-widest">Summoning global talent...</div>;

  return (
    <div className="space-y-8 md:space-y-10 animate-fade-in font-body">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-glass-border pb-4 md:pb-6 gap-4">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 bg-amber-500 rounded-full"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Global Talent Pool</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white-theme tracking-tight flex items-center gap-3">
            <HiLightningBolt className="text-amber-500 shrink-0" />
            Remote <span className="text-amber-500">Talent</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 md:pl-6">Manage remote development resources.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-5 md:px-6 py-3 md:py-4 bg-amber-600 text-white-theme rounded-xl shadow-lg hover:bg-amber-700 transition-all font-bold text-xs uppercase tracking-widest active:scale-95 group self-start md:self-auto"
          >
            <HiPlus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
            Enlist Resource
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary rounded-2xl shadow-xl border border-glass-border overflow-x-auto">
        <table className="min-w-[600px] w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-5 lg:px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Title</th>
              <th className="px-5 lg:px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Experience</th>
              <th className="px-5 lg:px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Status</th>
              <th className="px-5 lg:px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {resources.map((res) => (
              <tr key={res._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-5 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-500 shadow-sm">
                      {res.image ? <img src={res.image} alt="" className="h-full w-full object-cover rounded-lg" /> : <HiLightningBolt />}
                    </div>
                    <div className="font-black text-white-theme tracking-tight group-hover:text-amber-500 transition-colors text-sm">{res.title}</div>
                  </div>
                </td>
                <td className="px-5 lg:px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter px-3 py-1 bg-glass-bg rounded-md border border-glass-border">{res.experience}</span>
                </td>
                <td className="px-5 lg:px-6 py-4 whitespace-nowrap text-center">
                  {res.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full mx-auto"></div>
                  }
                </td>
                <td className="px-5 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(res)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-amber-600 rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(res._id)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {resources.map((res) => (
          <div key={res._id} className="bg-bg-secondary rounded-2xl border border-glass-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-500 shadow-sm">
                {res.image ? <img src={res.image} alt="" className="h-full w-full object-cover rounded-lg" /> : <HiLightningBolt className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-black text-white-theme tracking-tight text-sm truncate">{res.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter px-2 py-0.5 bg-glass-bg rounded-md border border-glass-border">{res.experience}</span>
                  {res.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-glass-border">
              <button onClick={() => handleEdit(res)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-amber-600 rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(res._id)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-bg-secondary p-5 md:p-8 lg:p-10 rounded-2xl shadow-2xl border border-glass-border mt-8 md:mt-12 relative animate-fade-in overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-t-2xl"></div>
        <h2 className="text-xl md:text-2xl font-black text-white-theme mb-6 md:mb-8 font-heading tracking-tighter">{isEditing ? 'Edit Profile' : 'New Talent Profile'}</h2>
        
        {error && <div className="mb-4 md:mb-6 p-4 bg-red-900/20 text-[#c92228] rounded-xl border border-red-900/30 text-[10px] font-bold tracking-widest">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Title / Expertise</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-amber-500 text-white-theme transition-all font-medium outline-none text-sm md:text-base" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Senior MERN Stack Developer" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Years of Experience</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-amber-500 text-white-theme transition-all font-medium outline-none text-sm md:text-base" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 5+ years" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Image URL</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-amber-500 text-white-theme transition-all font-mono outline-none text-xs md:text-sm" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex items-center p-4 bg-bg-primary rounded-xl border border-glass-border cursor-pointer" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
              <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${form.isActive ? 'bg-amber-500 border-amber-500' : 'border-glass-border'}`}>
                {form.isActive && <HiCheck className="text-white-theme h-3 w-3" />}
              </div>
              <label className="ml-3 text-sm font-bold text-gray-300 cursor-pointer select-none">Active Enlistment</label>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Skills (comma-separated)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-amber-500 text-white-theme transition-all outline-none text-sm md:text-base" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, AWS" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Profile Description</label>
              <textarea className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-amber-500 text-white-theme transition-all min-h-[140px] md:min-h-[160px] outline-none text-sm md:text-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 pt-4 md:pt-6 border-t border-glass-border">
            <button type="button" onClick={resetForm} className="px-6 md:px-8 py-3 bg-glass-bg text-gray-400 rounded-xl hover:text-white-theme transition-all font-bold text-sm active:scale-95 order-2 sm:order-1">Cancel</button>
            <button type="submit" className="px-8 md:px-10 py-3 bg-amber-600 text-white-theme rounded-xl shadow-xl hover:bg-amber-700 transition-all font-bold text-sm transform active:scale-95 order-1 sm:order-2">Verify & Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
