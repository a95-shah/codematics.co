// /app/contact/ContactForm.jsx
"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult({ success: false, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setResult({ success: true, message: "Transmission Successful. We'll be in touch." });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        setResult({ success: false, message: data.error || 'Signal Interrupted. Try again.' });
      }
    } catch (err) {
      setResult({ success: false, message: 'Encryption Error. Server unreachable.' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors duration-1000"></div>
      
      <div className="mb-12">
        <h2 className="text-4xl font-black text-gray-900 mb-4 font-serif uppercase tracking-tighter">Get in Touch</h2>
        <div className="flex items-center space-x-4">
           <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">Global Communication Hub</p>
        </div>
      </div>

      {result.message && (
        <div className={`mb-10 p-6 rounded-2xl text-center text-sm font-black uppercase tracking-widest border-2 ${
          result.success 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 animate-bounce' 
            : 'bg-rose-50 text-rose-700 border-rose-100 animate-shake'
        }`}>
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Commander Name</label>
            <input 
              name="name"
              required
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 transition-all font-bold text-gray-900 bg-gray-50/50 hover:bg-white" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Digital Address</label>
            <input 
              name="email"
              type="email"
              required
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 transition-all font-mono text-gray-900 bg-gray-50/50 hover:bg-white"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Signal Line (Phone)</label>
            <input 
              name="phone"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 transition-all font-mono text-gray-900 bg-gray-50/50 hover:bg-white"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Subject Header</label>
            <input 
              name="subject"
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 transition-all font-bold text-gray-900 bg-gray-50/50 hover:bg-white"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Core Content (Message)</label>
          <textarea 
            name="message"
            required
            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-blue-600 focus:ring-0 transition-all min-h-[160px] font-medium leading-relaxed bg-gray-50/50 hover:bg-white italic italic"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-gray-900 text-white-theme rounded-2xl text-xs font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 disabled:bg-gray-400 flex items-center justify-center group/btn"
          >
            {loading ? 'Transmitting...' : 'Initiate Transmission'}
            <span className="ml-4 h-6 w-6 rounded-full bg-glass-bg group-hover/btn:bg-white/20 flex items-center justify-center transition-all group-hover/btn:translate-x-2">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
