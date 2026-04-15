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
    <div className="space-y-10 pb-20">
      <div className="border-b border-gray-100 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <HiDocumentText className="mr-3 text-blue-500" />
            Static Pages
          </h1>
          <p className="mt-1 text-sm text-gray-500">Edit content for your landing pages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-3">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Select Page</label>
          {pages.map((p) => (
            <button
              key={p.slug}
              onClick={() => fetchPageData(p.slug)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-black transition-all ${
                selectedSlug === p.slug
                  ? 'bg-blue-600 text-white-theme border-blue-600 shadow-xl shadow-blue-100 scale-105 z-10'
                  : 'bg-white text-gray-700 border-gray-100 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {!selectedSlug ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-[400px] flex items-center justify-center text-gray-400 text-sm font-medium italic">
              Select a page from the left to start editing.
            </div>
          ) : loading ? (
            <div className="text-center p-20 font-black text-blue-600 animate-pulse">Loading content...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 space-y-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-2xl"></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Hero Section</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Browser Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Home | Codematics" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Headline</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-black" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Hero Subtitle</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 space-y-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 rounded-t-2xl"></div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Page Sections</h3>
                  <button type="button" onClick={addSection} className="text-xs font-black text-indigo-600 flex items-center hover:underline bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">
                    <HiPlus className="mr-1" /> Add New Section
                  </button>
                </div>
                
                <div className="space-y-12">
                  {form.sections.map((section, index) => (
                    <div key={index} className="group relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-300 transition-all shadow-inner-sm">
                      <button type="button" onClick={() => removeSection(index)} className="absolute -top-3 -right-3 p-2 bg-white text-red-500 rounded-full shadow-lg border border-red-100 hover:bg-red-50 transition-colors">
                        <HiTrash className="h-4 w-4" />
                      </button>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Section {index + 1} Heading</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-gray-900" value={section.heading} onChange={(e) => updateSection(index, 'heading', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Section {index + 1} Body Copy</label>
                          <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[140px] leading-relaxed italic" value={section.body} onChange={(e) => updateSection(index, 'body', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {form.sections.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm font-medium italic italic">No custom sections added yet.</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sticky bottom-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-blue-100 shadow-2xl z-20">
                <span className={`text-sm font-black uppercase tracking-widest ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </span>
                <button type="submit" disabled={loading} className="px-12 py-4 bg-blue-600 text-white-theme rounded-xl shadow-xl hover:bg-blue-700 transition-all font-black uppercase tracking-[0.1em] text-sm flex items-center active:scale-95 disabled:bg-gray-400">
                  <HiSave className="mr-3 h-5 w-5" />
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
