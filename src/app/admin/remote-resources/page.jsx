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

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Summoning global talent...</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <HiLightningBolt className="mr-3 text-amber-500" />
            Remote Talent
          </h1>
          <p className="mt-1 text-sm text-gray-500">Manage remote development resources.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center px-6 py-3 bg-amber-600 text-white-theme rounded-xl shadow-lg hover:bg-amber-700 transition-all font-bold text-sm uppercase tracking-widest"
          >
            <HiPlus className="mr-2 h-5 w-5" />
            Enlist Resource
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Experience</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {resources.map((res) => (
              <tr key={res._id} className="hover:bg-amber-50/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-600 shadow-sm">
                      {res.image ? <img src={res.image} alt="" className="h-full w-full object-cover rounded-lg" /> : <HiLightningBolt />}
                    </div>
                    <div className="ml-4 font-black text-gray-900 tracking-tight">{res.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600 uppercase tracking-tighter shadow-inner px-2 py-1 bg-gray-50 rounded-md">{res.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {res.isActive ? <HiCheck className="inline h-6 w-6 text-green-500" /> : <HiX className="inline h-6 w-6 text-red-500" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(res)} className="text-amber-600 hover:text-amber-900 p-2 hover:bg-white rounded-lg shadow-sm border border-gray-100 bg-gray-50 transition-all"><HiPencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(res._id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-white rounded-lg shadow-sm border border-gray-100 bg-gray-50 transition-all"><HiTrash className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 mt-12 relative animate-fade-in shadow-amber-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-t-2xl"></div>
        <h2 className="text-2xl font-black text-gray-900 mb-8 font-serif leading-tight">{isEditing ? 'Edit Profile' : 'New Talent Profile'}</h2>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Title / Expertise</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-medium" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Senior MERN Stack Developer" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Years of Experience</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-medium" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 5+ years" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Image URL</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-mono" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
              <input type="checkbox" id="isActive" className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded cursor-pointer transition-all" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <label htmlFor="isActive" className="ml-3 text-sm font-bold text-gray-700 cursor-pointer">Active Enlistment</label>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Skills (comma-separated)</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, AWS" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Profile Description</label>
              <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all min-h-[160px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button type="button" onClick={resetForm} className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold text-sm">Cancel</button>
            <button type="submit" className="px-10 py-3 bg-amber-600 text-white-theme rounded-xl shadow-xl hover:bg-amber-700 transition-all font-bold text-sm transform active:scale-95">Verify & Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
