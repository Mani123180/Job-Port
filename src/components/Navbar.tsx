"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === "dark";

  const headerClass = isDark
    ? "sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800 shadow-sm transition-all"
    : "sticky top-0 z-50 bg-white border-b border-gray-200 py-2 shadow-sm transition-all";

  const textClass = isDark ? "text-slate-100" : "text-gray-900";
  const linkClass = isDark ? "text-slate-400 hover:text-slate-200" : "text-gray-600 hover:text-blue-600";
  const menuBgClass = isDark ? "bg-slate-950 border-slate-800" : "bg-white border-gray-200";
  const mobileLinkClass = isDark ? "text-slate-300 hover:text-white" : "text-gray-700 hover:text-blue-600";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold tracking-tighter flex items-center gap-2">
          <span className={textClass}>Job</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Portal</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex gap-8 text-sm font-medium ${linkClass}`}>
          <Link href="/jobs" className="transition-colors">Find Jobs</Link>
          <Link href="/companies" className="transition-colors">Companies</Link>
          <Link href="/internships" className="transition-colors">Internships</Link>
          <Link href="/resume-builder" className="transition-colors">Resume Builder</Link>
          <Link href="/interview-prep" className="transition-colors">Interview Prep</Link>
        </nav>
        
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/login" className={`px-4 py-2 text-sm font-semibold transition-colors ${linkClass}`}>Log In</Link>
          <Link href="/signup" className="px-5 py-2 text-sm font-semibold bg-violet-600 text-white rounded-full hover:bg-violet-500 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">Sign Up</Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`lg:hidden p-2 rounded-md ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`lg:hidden border-t px-4 py-4 space-y-4 shadow-xl absolute w-full left-0 ${menuBgClass}`}>
          <Link href="/jobs" onClick={() => setIsOpen(false)} className={`block text-base font-medium ${mobileLinkClass}`}>Find Jobs</Link>
          <Link href="/companies" onClick={() => setIsOpen(false)} className={`block text-base font-medium ${mobileLinkClass}`}>Companies</Link>
          <Link href="/internships" onClick={() => setIsOpen(false)} className={`block text-base font-medium ${mobileLinkClass}`}>Internships</Link>
          <Link href="/resume-builder" onClick={() => setIsOpen(false)} className={`block text-base font-medium ${mobileLinkClass}`}>Resume Builder</Link>
          <Link href="/interview-prep" onClick={() => setIsOpen(false)} className={`block text-base font-medium ${mobileLinkClass}`}>Interview Prep</Link>
          <div className="pt-4 border-t border-gray-200/20 flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsOpen(false)} className={`block text-center py-2 font-medium ${mobileLinkClass}`}>Log In</Link>
            <Link href="/signup" onClick={() => setIsOpen(false)} className="block text-center py-2 bg-violet-600 text-white font-medium rounded-full">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
