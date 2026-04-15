// /src/app/admin/news/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiNewspaper } from 'react-icons/hi';
import ImageUpload from '@/components/ImageUpload';

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    slug: '',
    description: '',
    date: '',
    category: '',
    content: '',
    coverImage: '',
    author: '',
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news');
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
      date: '',
      category: '',
      content: '',
      coverImage: '',
      author: '',
      isActive: true
    });
    setIsEditing(false);
    setError('');
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news post?')) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) fetchNews();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/news/${form._id}` : '/api/news';

    const payload = { ...form };
    if (!isEditing) delete payload._id;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchNews();
        resetForm();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse tracking-widest">Loading News...</div>;

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in font-body selection:bg-[#c92228]/40 selection:text-white-theme">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-6 md:pb-10 gap-4 md:gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="h-1 w-10 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Media Archives</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white-theme tracking-tight font-heading flex items-center gap-3">
            <HiNewspaper className="text-[#c92228] shrink-0" />
            News <span className="text-[#c92228]">Chronicles</span>
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 md:pl-6">Broadcast your journey, success stories, and latest releases.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-6 md:px-10 py-4 md:py-5 bg-[#c92228] text-white-theme rounded-xl md:rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all font-bold text-xs tracking-wide active:scale-95 group self-start md:self-auto"
          >
            <HiPlus className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
            Add New Article
          </button>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary rounded-2xl shadow-xl border border-glass-border overflow-x-auto">
        <table className="min-w-[800px] w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Story Title</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Slug</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Category</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Status</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-right text-[10px] font-bold text-gray-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {news.map((item) => (
              <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-glass-bg rounded-xl border border-glass-border overflow-hidden group-hover:bg-[#c92228]/10 transition-colors shrink-0">
                         {item.coverImage ? <img src={item.coverImage} className="h-full w-full object-cover" alt="" /> : <HiNewspaper className="h-full w-full p-2 text-gray-500" />}
                      </div>
                      <div className="max-w-xs">
                         <div className="font-bold text-white-theme text-sm font-heading group-hover:text-[#c92228] transition-colors tracking-tight truncate">{item.title}</div>
                         <div className="text-[10px] text-gray-500 font-bold tracking-[0.1em]">{item.date}</div>
                      </div>
                   </div>
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-xs text-gray-500 font-mono tracking-tighter">/{item.slug}</td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                   <span className="text-[8px] font-bold text-[#c92228] px-3 py-1 bg-[#c92228]/10 rounded-full border border-[#c92228]/20 tracking-[0.2em]">{item.category}</span>
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-center">
                  {item.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full mx-auto"></div>
                  }
                </td>
                <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {news.map((item) => (
          <div key={item._id} className="bg-bg-secondary rounded-2xl border border-glass-border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 bg-glass-bg rounded-xl border border-glass-border overflow-hidden shrink-0">
                {item.coverImage ? <img src={item.coverImage} className="h-full w-full object-cover" alt="" /> : <HiNewspaper className="h-full w-full p-2.5 text-gray-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white-theme text-sm font-heading tracking-tight truncate">{item.title}</div>
                <div className="text-[10px] text-gray-500 font-bold tracking-[0.1em] mt-0.5">{item.date}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[8px] font-bold text-[#c92228] px-2 py-0.5 bg-[#c92228]/10 rounded-full border border-[#c92228]/20 tracking-[0.15em]">{item.category}</span>
                  {item.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-glass-border">
              <span className="text-[10px] text-gray-500 font-mono tracking-tighter">/{item.slug}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-bg-secondary p-5 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl shadow-2xl border border-glass-border mt-10 md:mt-16 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c92228]/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#c92228]/10 transition-colors duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c92228] to-[#a01b20]"></div>
        
        <h2 className="text-xl md:text-3xl font-black text-white-theme mb-8 md:mb-12 font-heading tracking-tighter">{isEditing ? 'Edit Article' : 'Add New Article'}</h2>
        
        {error && <div className="mb-6 md:mb-10 p-4 md:p-6 bg-red-900/20 text-[#c92228] rounded-xl md:rounded-2xl border border-red-900/30 text-[10px] font-bold tracking-widest animate-shake leading-loose">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Article Title</label>
              <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none text-sm md:text-base" value={form.title} onChange={handleTitleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Date</label>
                  <input type="text" className="w-full px-4 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-widest outline-none text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Dec 2024" />
               </div>
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Category</label>
                  <input type="text" className="w-full px-4 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-[#c92228] transition-all font-bold tracking-widest outline-none text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Product Launch" />
               </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Abstract Overview</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[120px] md:min-h-[140px] font-medium leading-relaxed outline-none text-sm md:text-base" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex items-center p-5 md:p-8 bg-bg-primary rounded-xl md:rounded-[2rem] border border-glass-border group/check cursor-pointer" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
              <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${form.isActive ? 'bg-[#c92228] border-[#c92228]' : 'border-glass-border'}`}>
                 {form.isActive && <HiCheck className="text-white-theme h-4 w-4" />}
              </div>
              <label className="ml-4 md:ml-5 text-xs font-bold text-gray-300 tracking-widest cursor-pointer select-none">Active Broadcast Status</label>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Content (Markdown)</label>
              <textarea className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[180px] md:min-h-[220px] font-medium leading-relaxed outline-none text-sm md:text-base" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Author</label>
                  <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none text-sm md:text-base" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
               </div>
               <div className="space-y-2 md:space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Slug</label>
                  <input type="text" className="w-full px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-bg-primary/50 border-2 border-glass-border text-gray-500 font-mono text-xs" value={form.slug} readOnly />
               </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-2 md:ml-4">Cover Image</label>
              <ImageUpload value={form.coverImage || ''} onChange={(url) => setForm({ ...form, coverImage: url })} />
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
