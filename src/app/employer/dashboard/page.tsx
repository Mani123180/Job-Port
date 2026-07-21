"use client";

import Link from "next/link";
import { useState } from "react";
import BorderGlow from "../../../components/BorderGlow";

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock State for Notifications
  const [toastMessage, setToastMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // 1. Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: "",
    description: "",
    industry: "Technology",
    size: "50-200",
    website: "",
    address: "",
    social: "",
    verified: false
  });

  // 2. Jobs State
  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior React Developer", category: "Engineering", type: "Full-Time", mode: "Remote", status: "Active", applications: 12, posted: "Oct 15, 2023" },
    { id: 102, title: "Product Manager", category: "Product", type: "Full-Time", mode: "Hybrid", status: "Closed", applications: 45, posted: "Sep 10, 2023" }
  ]);

  // 3. Applications State
  const [applications, setApplications] = useState([
    { id: 1, jobId: 101, jobTitle: "Senior React Developer", candidateName: "Ram", email: "ram@example.com", experience: "5 Years", status: "Pending", date: "Oct 18, 2023" },
    { id: 2, jobId: 101, jobTitle: "Senior React Developer", candidateName: "David", email: "david@example.com", experience: "2 Years", status: "Shortlisted", date: "Oct 19, 2023" },
    { id: 3, jobId: 102, jobTitle: "Product Manager", candidateName: "Sarah", email: "sarah@example.com", experience: "8 Years", status: "Hired", date: "Sep 15, 2023" }
  ]);

  // 4. Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New application received from Ram for Senior React Developer.", date: "2 hours ago", read: false },
    { id: 2, message: "Admin verified your company profile.", date: "1 day ago", read: true }
  ]);

  // --- Handlers ---
  
  // Job Handlers
  const handlePostJob = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJob = {
      id: Date.now(),
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      mode: formData.get("mode"),
      status: "Active",
      applications: 0,
      posted: "Just now"
    };
    setJobs([newJob, ...jobs]);
    showToast("Job posted successfully!");
    e.target.reset();
    setActiveTab("manage-jobs");
  };

  const handleUpdateJobStatus = (id, newStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
    showToast(`Job marked as ${newStatus}`);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    showToast("Job deleted");
  };

  // Applicant Handlers
  const [interviewForm, setInterviewForm] = useState<any>(null);

  const handleUpdateAppStatus = (id, newStatus) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));
    showToast(`Candidate marked as ${newStatus}`);
  };

  const handleScheduleInterview = (e: any) => {
    e.preventDefault();
    handleUpdateAppStatus(interviewForm, "Interview Scheduled");
    setInterviewForm(null);
    showToast("Interview Invitation Sent!");
  };

  // Profile Handler
  const handleSaveProfile = (e: any) => {
    e.preventDefault();
    showToast("Company profile updated!");
  };

  // Computed Stats
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'Active').length,
    totalApps: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    hired: applications.filter(a => a.status === 'Hired').length
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans relative text-slate-200">
      
      {/* Toast */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 backdrop-blur-md border ${toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'} bg-slate-900/95 text-blue-400 border-slate-700/50`}>
        {toastMessage && <span>✨ {toastMessage}</span>}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Midnight Blue */}
      <aside className={`w-72 bg-slate-950 text-slate-300 h-screen fixed flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-slate-800`}>
        <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-white drop-shadow-md">Job<span className="text-blue-500">Portal</span> <span className="text-[10px] font-semibold text-blue-200 bg-blue-900/50 border border-blue-500/30 px-2.5 py-1 rounded-full ml-2 align-top tracking-widest shadow-inner">EMPLOYER</span></Link>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white p-1 md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-5 flex-grow overflow-y-auto">
          <nav className="space-y-2 mt-2">
            {[
              { id: 'overview', name: 'Dashboard', icon: '📊' },
              { id: 'profile', name: 'Company Profile', icon: '🏢' },
              { id: 'post-job', name: 'Post a Job', icon: '✍️' },
              { id: 'manage-jobs', name: 'Manage Jobs', icon: '💼' },
              { id: 'applicants', name: 'View Applicants', icon: '👥' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full outline-none transition-all duration-300 ${activeTab === tab.id ? 'translate-x-1' : 'hover:translate-x-1'}`}
              >
                <BorderGlow 
                  borderRadius={12} 
                  glowRadius={4} 
                  edgeSensitivity={10} 
                  backgroundColor="#020617"
                  colors={['#3b82f6', '#06b6d4', '#60a5fa']}
                  className="w-full"
                  animated={activeTab === tab.id}
                >
                  <div className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-colors ${activeTab === tab.id ? 'bg-slate-900/50 text-white shadow-lg shadow-blue-900/20' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'}`}>
                    <span className={`text-xl ${activeTab === tab.id ? 'scale-110 drop-shadow-md' : 'opacity-70'} transition-transform`}>{tab.icon}</span>
                    {tab.name}
                  </div>
                </BorderGlow>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-950 backdrop-blur-md">
          <Link href="/login" className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-bold hover:shadow-md">
            <span className="text-rose-400">🔴</span> Secure Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-72 p-6 md:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 md:hidden -mx-6 -mt-6 mb-6 relative z-20">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            JobPortal <span className="text-[9px] font-bold text-blue-300 bg-blue-900/30 border border-blue-500/20 px-2 py-0.5 rounded-full">EMPLOYER</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800 relative z-10">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-4xl font-semibold text-slate-100 tracking-tight capitalize drop-shadow-sm">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-400 font-medium text-sm mt-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
               Manage your hiring pipeline and company presence.
            </p>
          </div>
          {companyProfile.verified && (
             <span className="bg-emerald-900/30 text-emerald-400 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-emerald-500/30 shadow-sm shadow-emerald-900/20 uppercase tracking-widest animate-in fade-in zoom-in duration-500">
                ✅ Verified Employer
             </span>
          )}
        </div>

        {/* 1. Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Jobs Posted", value: stats.totalJobs, from: "blue-500", to: "cyan-400", icon: "💼" },
                { label: "Active Jobs", value: stats.activeJobs, from: "emerald-500", to: "teal-400", icon: "✅" },
                { label: "Applications Received", value: stats.totalApps, from: "indigo-500", to: "blue-400", icon: "📄" },
                { label: "Shortlisted", value: stats.shortlisted, from: "amber-400", to: "yellow-300", icon: "⭐" },
                { label: "Interviews Scheduled", value: applications.filter(a => a.status === 'Interview Scheduled').length, from: "orange-500", to: "amber-400", icon: "📅" },
                { label: "Hired Candidates", value: stats.hired, from: "rose-500", to: "pink-400", icon: "🎉" }
              ].map((stat, i) => (
                <div key={i} className={`bg-slate-900/30 p-6 rounded-3xl border border-slate-800 shadow-lg hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-700 transition-all duration-300 relative overflow-hidden group backdrop-blur-md`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${stat.from} to-${stat.to} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform origin-bottom-left">{stat.icon}</div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-4xl font-semibold text-slate-100 drop-shadow-sm">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 backdrop-blur-md">
               <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                 <h2 className="font-semibold text-slate-200 tracking-tight">Recent Applications</h2>
                 <span className="text-xs font-bold bg-blue-900/30 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">New</span>
               </div>
               <div className="divide-y divide-slate-800 p-2">
                  {applications.slice(0, 3).map(app => (
                     <div key={app.id} className="p-5 flex items-center justify-between hover:bg-slate-800/50 rounded-xl transition-colors group cursor-pointer">
                        <div>
                           <div className="font-semibold text-slate-200">{app.candidateName}</div>
                           <div className="text-sm font-medium text-slate-400 mt-1">Applied for <span className="font-bold text-blue-400">{app.jobTitle}</span></div>
                        </div>
                        <button onClick={() => setActiveTab('applicants')} className="text-xs font-semibold text-blue-400 bg-blue-900/30 border border-blue-500/30 px-5 py-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm uppercase tracking-widest">Review</button>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* 2. Company Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8 relative z-10 backdrop-blur-md">
             <div className="flex items-center gap-5 mb-4 pb-6 border-b border-slate-800">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-blue-500/30">🏢</div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-100">Company Information</h3>
                  <p className="text-slate-400 font-medium text-sm">This is how your company will appear to job seekers.</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                   <input type="text" placeholder="Enter Company Name" defaultValue={companyProfile.name} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Industry</label>
                   <select defaultValue={companyProfile.industry} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>Technology</option><option>Finance</option><option>Healthcare</option><option>Education</option>
                   </select>
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Company Description</label>
                   <textarea rows={4} placeholder="Enter Company Description" defaultValue={companyProfile.description} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-200 shadow-sm placeholder-slate-600"></textarea>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Company Size</label>
                   <select defaultValue={companyProfile.size} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>1-10</option><option>11-50</option><option>50-200</option><option>201-500</option><option>500+</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Website URL</label>
                   <input type="url" placeholder="Enter Website URL" defaultValue={companyProfile.website} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Headquarters Address</label>
                   <input type="text" placeholder="Enter Headquarters Address" defaultValue={companyProfile.address} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                </div>
             </div>
             <div className="pt-8 border-t border-slate-800 flex justify-end">
               <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg tracking-wide">
                 Save Profile Changes
               </button>
             </div>
          </form>
        )}

        {/* 3. Post Job */}
        {activeTab === 'post-job' && (
          <form onSubmit={handlePostJob} className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8 relative z-10 backdrop-blur-md">
             <div className="flex items-center gap-5 mb-4 pb-6 border-b border-slate-800">
                <div className="w-16 h-16 bg-emerald-900/30 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-emerald-500/30">✍️</div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-100">Create a New Job Posting</h3>
                  <p className="text-slate-400 font-medium text-sm">Fill out the details below to attract top talent.</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Job Title</label>
                   <input name="title" type="text" required placeholder="e.g. Senior Frontend Engineer" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm text-lg placeholder-slate-600" />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                   <select name="category" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>Engineering</option><option>Design</option><option>Marketing</option><option>Sales</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Employment Type</label>
                   <select name="type" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Work Mode</label>
                   <select name="mode" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>Remote</option><option>Hybrid</option><option>On-site</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Experience Required</label>
                   <select name="experience" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm">
                     <option>Entry Level (0-2 Yrs)</option><option>Mid Level (3-5 Yrs)</option><option>Senior (5+ Yrs)</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Salary Range</label>
                   <input type="text" placeholder="e.g. $80k - $120k" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Application Deadline</label>
                   <input type="date" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-200 shadow-sm" />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Job Description & Responsibilities</label>
                   <textarea rows={6} required placeholder="Describe the role in detail..." className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-200 shadow-sm placeholder-slate-600"></textarea>
                </div>
             </div>
             <div className="pt-8 border-t border-slate-800 flex justify-end gap-4">
               <button type="button" onClick={() => showToast("Draft saved to cloud")} className="px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl shadow-sm hover:bg-slate-700 hover:shadow-md transition-all uppercase tracking-widest text-xs">
                 Save Draft
               </button>
               <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg tracking-wide">
                 Publish Job Now
               </button>
             </div>
          </form>
        )}

        {/* 4. Manage Jobs */}
        {activeTab === 'manage-jobs' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800">
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Job Details</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Applicants</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5">
                        <div className="font-semibold text-slate-200 text-lg mb-1">{job.title}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{job.type} • {job.mode} • Posted {job.posted}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border shadow-sm
                          ${job.status === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                            'bg-rose-900/30 text-rose-400 border-rose-500/30 shadow-rose-900/20'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-5">
                         <span className="font-semibold text-blue-400 bg-blue-900/30 border border-blue-500/30 shadow-sm shadow-blue-900/20 px-4 py-2 rounded-xl inline-block">
                           {job.applications} Candidates
                         </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {job.status === 'Active' ? (
                            <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleUpdateJobStatus(job.id, 'Closed')} className="px-4 py-2 bg-slate-900/80 text-amber-400 text-xs font-bold rounded-lg w-full h-full hover:text-amber-300">Pause</button></BorderGlow>
                          ) : (
                            <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleUpdateJobStatus(job.id, 'Active')} className="px-4 py-2 bg-slate-900/80 text-emerald-400 text-xs font-bold rounded-lg w-full h-full hover:text-emerald-300">Renew</button></BorderGlow>
                          )}
                          <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleDeleteJob(job.id)} className="px-4 py-2 bg-slate-900/80 text-rose-400 text-xs font-bold rounded-lg w-full h-full hover:text-rose-300">Delete</button></BorderGlow>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                     <tr><td colSpan={4} className="p-10 text-center"><div className="text-4xl mb-4 opacity-50 grayscale">📂</div><div className="text-slate-400 font-semibold text-lg">No jobs posted yet.</div></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. View Applicants */}
        {activeTab === 'applicants' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
             {interviewForm && (
                <form onSubmit={handleScheduleInterview} className="bg-slate-900/50 p-8 rounded-3xl border border-blue-500/30 shadow-xl shadow-blue-900/20 mb-8 animate-in zoom-in-95 relative border-t-4 border-t-blue-500 max-w-4xl mx-auto backdrop-blur-md">
                   <h3 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-3"><span className="text-3xl">📅</span> Schedule Interview</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div><label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Interview Date</label><input required type="date" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-200" /></div>
                      <div><label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Time</label><input required type="time" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-200" /></div>
                      <div><label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Format</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-200"><option>Google Meet (Online)</option><option>Zoom (Online)</option><option>In-Person (Office)</option></select>
                      </div>
                      <div><label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Meeting Link (Optional)</label><input type="url" placeholder="https://meet.google.com/..." className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-200" /></div>
                   </div>
                   <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setInterviewForm(null)} className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancel</button>
                      <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">Send Invite Now</button>
                   </div>
                </form>
             )}

             <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden backdrop-blur-md">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-slate-900/80 border-b border-slate-800">
                       <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Candidate</th>
                       <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Applied Role</th>
                       <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                     {applications.map(app => (
                       <tr key={app.id} className="hover:bg-slate-800/30 transition-colors group">
                         <td className="p-5">
                           <div className="font-semibold text-slate-100 text-lg">{app.candidateName}</div>
                           <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{app.experience} Exp • {app.date}</div>
                         </td>
                         <td className="p-5 font-bold text-slate-300">{app.jobTitle}</td>
                         <td className="p-5">
                           <span className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border shadow-sm inline-flex items-center gap-1.5
                             ${app.status === 'Hired' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                               app.status === 'Shortlisted' ? 'bg-amber-900/30 text-amber-400 border-amber-500/30 shadow-amber-900/20' : 
                               app.status === 'Interview Scheduled' ? 'bg-purple-900/30 text-purple-400 border-purple-500/30 shadow-purple-900/20' : 
                               app.status === 'Rejected' ? 'bg-rose-900/30 text-rose-400 border-rose-500/30 shadow-rose-900/20' : 
                               'bg-slate-800 text-slate-300 border-slate-700 shadow-slate-900/20'}`}>
                             {app.status === 'Hired' && '🎉'} {app.status === 'Shortlisted' && '⭐'} {app.status === 'Interview Scheduled' && '📅'}
                             {app.status}
                           </span>
                         </td>
                         <td className="p-5">
                            <div className="flex flex-wrap justify-end gap-2 max-w-xs ml-auto opacity-80 group-hover:opacity-100 transition-opacity">
                              <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => showToast("Downloading Resume...")} className="px-4 py-2 bg-slate-900/80 text-slate-300 text-xs font-bold rounded-lg w-full h-full hover:text-slate-100">Resume</button></BorderGlow>
                              
                              {app.status === 'Pending' && (
                                 <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleUpdateAppStatus(app.id, 'Shortlisted')} className="px-4 py-2 bg-slate-900/80 text-amber-400 text-xs font-bold rounded-lg w-full h-full hover:text-amber-300">Shortlist</button></BorderGlow>
                              )}
                              
                              {(app.status === 'Pending' || app.status === 'Shortlisted') && (
                                 <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => setInterviewForm(app.id)} className="px-4 py-2 bg-slate-900/80 text-purple-400 text-xs font-bold rounded-lg w-full h-full hover:text-purple-300">Interview</button></BorderGlow>
                              )}

                              {(app.status === 'Shortlisted' || app.status === 'Interview Scheduled') && (
                                 <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleUpdateAppStatus(app.id, 'Hired')} className="px-4 py-2 bg-slate-900/80 text-emerald-400 text-xs font-bold rounded-lg w-full h-full hover:text-emerald-300">Hire</button></BorderGlow>
                              )}

                              {app.status !== 'Rejected' && app.status !== 'Hired' && (
                                 <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleUpdateAppStatus(app.id, 'Rejected')} className="px-4 py-2 bg-slate-900/80 text-rose-400 text-xs font-bold rounded-lg w-full h-full hover:text-rose-300">Reject</button></BorderGlow>
                              )}
                            </div>
                         </td>
                       </tr>
                     ))}
                     {applications.length === 0 && (
                        <tr><td colSpan={4} className="p-10 text-center"><div className="text-4xl mb-4 opacity-50 grayscale">📂</div><div className="text-slate-400 font-semibold text-lg">No applications received yet.</div></td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        )}

        {/* 6. Notifications */}
        {activeTab === 'notifications' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-3xl mx-auto relative z-10 backdrop-blur-md">
             <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
               <div>
                 <h2 className="text-2xl font-semibold text-slate-100">Your Notifications</h2>
                 <p className="text-sm font-medium text-slate-400">Stay updated with your latest alerts.</p>
               </div>
               <button onClick={() => {setNotifications(notifications.map(n => ({...n, read: true}))); showToast("All marked as read");}} className="text-xs font-semibold uppercase tracking-widest text-blue-400 hover:text-blue-300 bg-blue-900/30 px-4 py-2 rounded-xl shadow-sm border border-blue-500/30 transition-colors">Mark all read</button>
             </div>
             <div className="divide-y divide-slate-800">
                {notifications.map(notif => (
                   <div key={notif.id} className={`p-8 flex gap-5 transition-colors cursor-pointer ${notif.read ? 'bg-transparent hover:bg-slate-800/30' : 'bg-blue-900/20 hover:bg-blue-900/30'}`}>
                      <div className="mt-1">
                         {notif.read ? <span className="text-slate-500 text-xl">⚪</span> : <span className="text-blue-400 text-xl animate-pulse">🔵</span>}
                      </div>
                      <div>
                         <p className={`text-lg font-bold ${notif.read ? 'text-slate-400' : 'text-slate-200'}`}>{notif.message}</p>
                         <p className="text-xs text-slate-500 mt-2 font-semibold uppercase tracking-widest">{notif.date}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
