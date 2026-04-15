// /app/admin/contact/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { HiTrash, HiMail, HiMailOpen, HiClock, HiUser, HiChatAlt } from 'react-icons/hi';

export default function ContactAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch messages');
      setLoading(false);
    }
  };

  const toggleRead = async (id, currentRead) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentRead })
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      setError('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMessages();
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse tracking-widest">Checking your inbox...</div>;

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in font-body">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-glass-border pb-6 md:pb-10 gap-4 md:gap-6">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-2 w-12 md:w-16 bg-[#c92228] rounded-full"></div>
             <span className="text-[10px] font-bold tracking-[0.5em] text-gray-500">Inbox & Lead Gen</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white-theme tracking-tighter font-heading flex items-center gap-3 md:gap-4">
            <HiChatAlt className="text-[#c92228] shrink-0" />
            Messages
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-lg leading-relaxed border-l-2 border-glass-border pl-4 md:pl-6">Respond to customer inquiries, support requests, and potential leads.</p>
        </div>
      </div>

      {error && <div className="p-4 md:p-6 bg-red-900/20 text-[#c92228] rounded-xl md:rounded-2xl border border-red-900/30 text-[10px] font-bold tracking-widest animate-shake leading-loose">{error}</div>}

      {/* Desktop Table View */}
      <div className="hidden md:block bg-bg-secondary rounded-2xl lg:rounded-[2.5rem] shadow-2xl border border-glass-border overflow-hidden">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-bg-primary">
            <tr>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Sender Overview</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-left text-[10px] font-bold text-gray-400 tracking-widest">Inquiry Details</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-center text-[10px] font-bold text-gray-400 tracking-widest">Status</th>
              <th className="px-6 lg:px-8 py-5 lg:py-6 text-right text-[10px] font-bold text-gray-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {messages.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center">
                  <p className="text-gray-600 font-bold tracking-[0.3em]">INBOX IS CURRENTLY EMPTY</p>
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} className={`hover:bg-white/[0.02] transition-colors group ${!msg.isRead ? 'bg-[#c92228]/5 border-l-2 border-l-[#c92228]' : ''}`}>
                  <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden transition-colors ${msg.isRead ? 'bg-glass-bg text-gray-500 border border-glass-border' : 'bg-[#c92228] text-white-theme shadow-[0_0_15px_rgba(201,34,40,0.4)]'}`}>
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white-theme font-heading group-hover:text-[#c92228] transition-colors tracking-tight">{msg.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold tracking-[0.1em]">{msg.email}</div>
                        {msg.phone && <div className="text-[10px] text-gray-500 mt-1 font-mono">{msg.phone}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-5 lg:py-6">
                    <div className="max-w-xs lg:max-w-xl">
                      <div className="text-sm font-bold text-white-theme truncate mb-2">{msg.subject || 'Website Inquiry'}</div>
                      <div className="text-xs text-gray-400 font-medium line-clamp-2 leading-relaxed">{msg.message}</div>
                      <div className="flex items-center text-[9px] text-gray-600 mt-3 font-bold tracking-widest">
                        <HiClock className="mr-2 h-3 w-3" />
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-center">
                    <button 
                      onClick={() => toggleRead(msg._id, msg.isRead)}
                      className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest transition-all ${
                        msg.isRead 
                          ? 'bg-glass-bg text-gray-500 border border-glass-border hover:text-white-theme' 
                          : 'bg-[#c92228] text-white-theme shadow-lg border border-[#c92228] animate-pulse cursor-pointer'
                      }`}
                    >
                      {msg.isRead ? 'READ' : 'NEW'}
                    </button>
                  </td>
                  <td className="px-6 lg:px-8 py-5 lg:py-6 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button 
                      onClick={() => toggleRead(msg._id, msg.isRead)} 
                      title={msg.isRead ? "Mark Unread" : "Mark Read"}
                      className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90 inline-flex items-center justify-center"
                    >
                      {msg.isRead ? <HiMail className="h-4 w-4" /> : <HiMailOpen className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(msg._id)} 
                      className="text-gray-400 hover:text-white-theme p-3 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90 inline-flex items-center justify-center"
                    >
                      <HiTrash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {messages.length === 0 ? (
          <div className="bg-bg-secondary rounded-2xl border border-glass-border p-10 text-center">
            <p className="text-gray-600 font-bold tracking-[0.2em] text-sm">INBOX IS CURRENTLY EMPTY</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`bg-bg-secondary rounded-2xl border border-glass-border p-4 space-y-4 ${!msg.isRead ? 'border-l-2 border-l-[#c92228] bg-[#c92228]/5' : ''}`}>
              {/* Sender Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-lg ${msg.isRead ? 'bg-glass-bg text-gray-500 border border-glass-border' : 'bg-[#c92228] text-white-theme shadow-[0_0_15px_rgba(201,34,40,0.4)]'}`}>
                    {msg.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white-theme font-heading tracking-tight truncate">{msg.name}</div>
                    <div className="text-[10px] text-gray-500 font-bold tracking-[0.1em] truncate">{msg.email}</div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleRead(msg._id, msg.isRead)}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest shrink-0 ${
                    msg.isRead 
                      ? 'bg-glass-bg text-gray-500 border border-glass-border' 
                      : 'bg-[#c92228] text-white-theme animate-pulse'
                  }`}
                >
                  {msg.isRead ? 'READ' : 'NEW'}
                </button>
              </div>

              {/* Message Content */}
              <div>
                <div className="text-sm font-bold text-white-theme mb-1">{msg.subject || 'Website Inquiry'}</div>
                <div className="text-xs text-gray-400 font-medium line-clamp-3 leading-relaxed">{msg.message}</div>
              </div>

              {/* Footer Row */}
              <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                <div className="flex items-center text-[9px] text-gray-600 font-bold tracking-widest">
                  <HiClock className="mr-1.5 h-3 w-3" />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleRead(msg._id, msg.isRead)} 
                    className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-[#c92228] rounded-xl transition-all active:scale-90"
                  >
                    {msg.isRead ? <HiMail className="h-4 w-4" /> : <HiMailOpen className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => handleDelete(msg._id)} 
                    className="text-gray-400 hover:text-white-theme p-2.5 bg-glass-bg hover:bg-red-900 rounded-xl transition-all active:scale-90"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
