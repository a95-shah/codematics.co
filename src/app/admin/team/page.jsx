// /app/admin/team/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiAdjustments } from 'react-icons/hi';
import ImageUpload from '@/components/ImageUpload';

export default function TeamAdmin() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: '',
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedin: '',
    order: 0,
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setTeam(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch team members');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      _id: '',
      name: '',
      role: '',
      bio: '',
      image: '',
      linkedin: '',
      order: team.length,
      isActive: true
    });
    setIsEditing(false);
    setError('');
  };

  const handleEdit = (member) => {
    setForm(member);
    setIsEditing(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTeam();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/team/${form._id}` : '/api/team';

    const payload = { ...form };
    if (!isEditing) delete payload._id;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchTeam();
        resetForm();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Save failed');
      }
    } catch (err) {
      setError('Save failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse tracking-widest">Loading Team...</div>;

  return (
    <div className="space-y-12 animate-fade-in font-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-10 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-2 w-16 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500">Human Resources</span>
          </div>
          <h1 className="text-5xl font-black text-white-theme tracking-tighter font-heading flex items-center gap-4">
            Our <span className="text-[#c92228]">Team</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-6">Manage your company's personnel and leadership profiles.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-10 py-5 bg-[#c92228] text-white-theme rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all font-bold text-xs tracking-wide active:scale-95 group"
          >
            <HiPlus className="mr-3 h-6 w-6 transition-transform group-hover:rotate-90" />
            Add Team Member
          </button>
        )}
      </div>

      <div className="bg-bg-secondary rounded-[2.5rem] shadow-2xl border border-glass-border overflow-hidden">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Name & Role</th>
              <th className="px-8 py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Order</th>
              <th className="px-8 py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Status</th>
              <th className="px-8 py-6 text-right text-[10px] font-bold text-gray-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {team.map((member) => (
              <tr key={member._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6 whitespace-nowrap">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-glass-bg border border-glass-border overflow-hidden group-hover:border-[#c92228]/50 transition-colors flex items-center justify-center">
                         {member.image ? <img src={member.image} className="h-full w-full object-cover" alt="" /> : <span className="text-gray-500 font-bold">{member.name.charAt(0)}</span>}
                      </div>
                      <div>
                         <div className="font-bold text-white-theme text-sm font-heading group-hover:text-[#c92228] transition-colors tracking-tight">{member.name}</div>
                         <div className="text-[10px] text-gray-500 font-bold tracking-[0.1em]">{member.role}</div>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-center text-xs font-mono text-gray-400">
                  {member.order}
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-center">
                  {member.isActive 
                    ? <div className="h-2 w-2 bg-emerald-500 rounded-full mx-auto shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div> 
                    : <div className="h-2 w-2 bg-red-600 rounded-full mx-auto"></div>
                  }
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(member)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(member._id)} className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-bg-secondary p-12 lg:p-16 rounded-[3rem] shadow-3xl border border-glass-border mt-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c92228]/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#c92228]/10 transition-colors duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c92228] to-[#a01b20]"></div>
        
        <h2 className="text-3xl font-black text-white-theme mb-12 font-heading tracking-tighter">{isEditing ? 'Update Member Profile' : 'Register New Member'}</h2>
        
        {error && <div className="mb-10 p-6 bg-red-900/20 text-[#c92228] rounded-2xl border border-red-900/30 text-[10px] font-bold tracking-widest animate-shake leading-loose">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">Full Name</label>
              <input type="text" className="w-full px-8 py-5 rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">Professional Role</label>
              <input type="text" className="w-full px-8 py-5 rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold tracking-tight outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Lead Developer" />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">Photo Identity</label>
              <ImageUpload value={form.image || ''} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">Display Order</label>
                <input type="number" className="w-full px-8 py-5 rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all font-bold outline-none" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="flex items-center p-5 bg-bg-primary rounded-2xl border border-glass-border group/check cursor-pointer mt-7" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
                <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${form.isActive ? 'bg-[#c92228] border-[#c92228]' : 'border-glass-border'}`}>
                   {form.isActive && <HiCheck className="text-white-theme h-3 w-3" />}
                </div>
                <label className="ml-3 text-xs font-bold text-gray-300 cursor-pointer select-none">Live On-Site</label>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">LinkedIn Profile URL</label>
              <input type="text" className="w-full px-8 py-5 rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-[#c92228] transition-all font-mono text-xs outline-none" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-gray-500 tracking-widest ml-4">Professional Biography</label>
              <textarea className="w-full px-8 py-5 rounded-2xl bg-bg-primary border-2 border-glass-border focus:border-[#c92228] text-white-theme transition-all min-h-[220px] font-medium leading-relaxed outline-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-6 pt-10 border-t border-glass-border">
            <button type="button" onClick={resetForm} className="px-10 py-5 bg-glass-bg text-gray-400 rounded-2xl hover:text-white-theme transition-all font-bold text-xs active:scale-95">Cancel</button>
            <button type="submit" className="px-12 py-5 bg-[#c92228] text-white-theme rounded-2xl shadow-3xl hover:bg-[#a01b20] transition-all transform active:scale-95 font-bold text-xs shadow-red-900/40">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
