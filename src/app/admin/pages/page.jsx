// /app/admin/pages/page.jsx
"use client";
import { useState } from 'react';
import { HiDocumentText, HiPlus, HiTrash, HiSave } from 'react-icons/hi';

export default function PagesAdmin() {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    heroTitle: '',
    heroSubtitle: '',
    sections: []
  });
  const [message, setMessage] = useState('');

  const pages = [
    { name: 'Home', slug: 'home' },
    { name: 'About Us', slug: 'about' },
    { name: 'Services', slug: 'services' },
    { name: 'Our Team', slug: 'team' },
    { name: 'Products', slug: 'products' },
    { name: 'News', slug: 'news' },
    { name: 'Contact', slug: 'contact' },
    { name: 'Remote Skills', slug: 'remote-resources' }
  ];

  const fetchPageData = async (slug) => {
    setSelectedSlug(slug);
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/pages/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title || '',
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          sections: data.sections || []
        });
      } else {
        setForm({ title: '', heroTitle: '', heroSubtitle: '', sections: [] });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { heading: '', body: '' }]
    });
  };

  const removeSection = (index) => {
    const newSections = form.sections.filter((_, i) => i !== index);
    setForm({ ...form, sections: newSections });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...form.sections];
    newSections[index][field] = value;
    setForm({ ...form, sections: newSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/pages/${selectedSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMessage('Page content saved successfully!');
      } else {
        setMessage('Error saving page.');
      }
    } catch (err) {
      setMessage('Error connecting to API.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      <div className="border-b border-glass-border pb-4 md:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white-theme tracking-tight flex items-center">
            <HiDocumentText className="mr-3 text-[#c92228] shrink-0" />
            Static Pages
          </h1>
          <p className="mt-1 text-sm text-gray-500">Edit content for your landing pages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-10">
        {/* Page Selector */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Select Page</label>
          {/* Mobile: horizontal scroll, Desktop: vertical list */}
          <div className="flex lg:flex-col gap-2 md:gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-1 px-1">
            {pages.map((p) => (
              <button
                key={p.slug}
                onClick={() => fetchPageData(p.slug)}
                className={`whitespace-nowrap lg:w-full text-left px-4 md:px-5 py-3 md:py-4 rounded-xl border text-sm font-black transition-all shrink-0 ${
                  selectedSlug === p.slug
                    ? 'bg-[#c92228] text-white-theme border-[#c92228] shadow-xl shadow-red-900/20 lg:scale-105 z-10'
                    : 'bg-bg-secondary text-gray-400 border-glass-border hover:border-[#c92228]/30 hover:bg-glass-bg'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          {!selectedSlug ? (
            <div className="bg-bg-secondary border-2 border-dashed border-glass-border rounded-2xl h-[300px] md:h-[400px] flex items-center justify-center text-gray-500 text-sm font-medium italic px-4 text-center">
              Select a page from {typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'the left' : 'above'} to start editing.
            </div>
          ) : loading ? (
            <div className="text-center p-16 md:p-20 font-black text-[#c92228] animate-pulse">Loading content...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10 animate-fade-in">
              <div className="bg-bg-secondary p-5 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-sm border border-glass-border space-y-6 md:space-y-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#c92228] rounded-t-xl md:rounded-t-2xl"></div>
                <h3 className="text-lg md:text-xl font-black text-white-theme uppercase tracking-widest border-b border-glass-border pb-3 md:pb-4">Hero Section</h3>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Browser Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-[#c92228] text-white-theme font-medium outline-none transition-all text-sm md:text-base" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Home | Codematics" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Headline</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-[#c92228] text-white-theme text-base md:text-lg font-black outline-none transition-all" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Subtitle</label>
                    <textarea className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-glass-border focus:border-[#c92228] text-white-theme min-h-[80px] outline-none transition-all text-sm md:text-base" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="bg-bg-secondary p-5 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-sm border border-glass-border space-y-6 md:space-y-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#c92228]/60 rounded-t-xl md:rounded-t-2xl"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-glass-border pb-3 md:pb-4 gap-3">
                  <h3 className="text-lg md:text-xl font-black text-white-theme uppercase tracking-widest">Page Sections</h3>
                  <button type="button" onClick={addSection} className="text-xs font-black text-[#c92228] flex items-center hover:underline bg-[#c92228]/10 px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#c92228]/20 self-start sm:self-auto">
                    <HiPlus className="mr-1" /> Add New Section
                  </button>
                </div>
                
                <div className="space-y-8 md:space-y-12">
                  {form.sections.map((section, index) => (
                    <div key={index} className="group relative p-5 md:p-8 bg-bg-primary rounded-xl md:rounded-2xl border border-glass-border hover:border-[#c92228]/30 transition-all">
                      <button type="button" onClick={() => removeSection(index)} className="absolute -top-2 -right-2 md:-top-3 md:-right-3 p-1.5 md:p-2 bg-bg-secondary text-red-500 rounded-full shadow-lg border border-glass-border hover:bg-red-900/20 transition-colors z-10">
                        <HiTrash className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <label className="block text-[10px] font-black text-[#c92228]/70 uppercase tracking-[0.2em] mb-2">Section {index + 1} Heading</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-glass-border focus:border-[#c92228] text-white-theme font-bold outline-none transition-all text-sm md:text-base" value={section.heading} onChange={(e) => updateSection(index, 'heading', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-[#c92228]/70 uppercase tracking-[0.2em] mb-2">Section {index + 1} Body Copy</label>
                          <textarea className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-glass-border focus:border-[#c92228] text-white-theme min-h-[120px] md:min-h-[140px] leading-relaxed italic outline-none transition-all text-sm md:text-base" value={section.body} onChange={(e) => updateSection(index, 'body', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {form.sections.length === 0 && (
                    <div className="text-center py-8 md:py-10 text-gray-500 text-sm font-medium italic">No custom sections added yet.</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sticky bottom-2 md:bottom-4 bg-bg-secondary/90 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl border border-glass-border shadow-2xl z-20">
                <span className={`text-xs md:text-sm font-black uppercase tracking-widest text-center sm:text-left ${message.includes('Error') ? 'text-red-600' : 'text-emerald-500'}`}>
                  {message}
                </span>
                <button type="submit" disabled={loading} className="px-8 md:px-12 py-3 md:py-4 bg-[#c92228] text-white-theme rounded-xl shadow-xl hover:bg-[#a01b20] transition-all font-black uppercase tracking-[0.1em] text-xs md:text-sm flex items-center justify-center active:scale-95 disabled:bg-gray-700 shrink-0">
                  <HiSave className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
                  {loading ? 'Saving...' : 'Deploy Content'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
