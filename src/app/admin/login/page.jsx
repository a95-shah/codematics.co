// /src/app/admin/login/page.jsx
"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiShieldCheck, HiLockClosed, HiMail, HiArrowLeft } from 'react-icons/hi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (res.error) {
        setError('Invalid email or password.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden font-body selection:bg-red-600/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse"></div>
      
      <div className="w-full max-w-md bg-bg-secondary border border-glass-border p-12 lg:p-14 rounded-[2.5rem] shadow-2xl relative z-10">
         
         <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white-theme tracking-tight font-heading">Admin <span className="text-[#c92228]">Login</span></h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">Please enter your credentials to continue</p>
         </div>

         {error && (
           <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <p className="text-[#c92228] text-xs font-bold">{error}</p>
           </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 ml-2">Email Address</label>
                  <div className="relative">
                    <HiMail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input 
                      type="email" 
                      required 
                      className="w-full pl-12 pr-6 py-4 bg-bg-primary border border-glass-border rounded-2xl text-white-theme font-bold focus:border-[#c92228] focus:ring-0 transition-all outline-none" 
                      placeholder="admin@codematics.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 ml-2">Password</label>
                  <div className="relative">
                    <HiLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input 
                      type="password" 
                      required 
                      className="w-full pl-12 pr-6 py-4 bg-bg-primary border border-glass-border rounded-2xl text-white-theme font-bold tracking-widest focus:border-[#c92228] focus:ring-0 transition-all outline-none" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
               </div>
            </div>

            <div className="pt-4">
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full py-4 bg-[#c92228] text-white-theme rounded-2xl text-sm font-bold shadow-lg hover:bg-[#a01b20] transition-all transform active:scale-95 disabled:bg-gray-700 flex items-center justify-center gap-3"
               >
                 {loading ? 'Logging in...' : 'Login'}
                 {!loading && <span className="text-lg">→</span>}
               </button>
            </div>
         </form>

         <div className="mt-8 pt-8 border-t border-glass-border flex flex-col items-center gap-6">
            <Link 
              href="/" 
              className="group flex items-center text-xs font-bold text-gray-400 hover:text-white-theme transition-colors"
            >
              <HiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Go back to Landing Page
            </Link>
            <div className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">
               Codematics Internal Systems
            </div>
         </div>
      </div>
    </div>
  );
}
