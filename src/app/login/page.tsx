"use client";

import Link from "next/link";
import { useState } from "react";
import BorderGlow from "../../components/BorderGlow";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("seeker"); // 'seeker', 'employer', 'admin'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    let currentRole = "seeker";
    if (email === "admin@demo.com") currentRole = "admin";
    else if (email === "employer@demo.com") currentRole = "employer";

    // Simulate Employer Email Verification Flow (just a UI toast)
    if (currentRole === "employer") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }

    setTimeout(() => {
      if (currentRole === "seeker") router.push("/seeker/dashboard");
      else if (currentRole === "employer") router.push("/employer/dashboard");
      else if (currentRole === "admin") router.push("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-violet-500/30">
      {/* Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 bg-teal-900/90 border border-teal-500/50 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <span>✅</span> Employer Email Verification Successful!
      </div>

      <header className="bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
            <span className="text-slate-100">Job</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Portal</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors">Back to Home</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <BorderGlow
          className="max-w-md w-full z-10"
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#020617" // slate-950
          borderRadius={24}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={true}
          colors={['#8b5cf6', '#a855f7', '#3b82f6']} // Violet/Purple/Blue
        >
          <div className="p-8 relative overflow-hidden bg-slate-950/50 backdrop-blur-sm rounded-3xl h-full">
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
              <div className="w-12 h-12 border-4 border-violet-900 border-t-violet-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-100 font-bold">Authenticating as {role}...</p>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your customized dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:bg-slate-900 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-300">Password</label>
                <a href="#" className="text-xs font-semibold text-violet-400 hover:text-violet-300 hover:underline transition-colors">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:bg-slate-900 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transform hover:-translate-y-0.5 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-slate-400">
            Don't have an account? <Link href="/signup" className="text-violet-400 font-bold hover:text-violet-300 hover:underline transition-colors">Register here</Link>
          </div>
          </div>
        </BorderGlow>
      </main>
    </div>
  );
}
