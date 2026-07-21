"use client";

import Link from "next/link";
import { useState } from "react";
import BorderGlow from "../../../components/BorderGlow";

export default function SeekerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock State for Notifications
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // 1. Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    experience: "Fresher",
    education: "",
    skills: "",
    portfolio: "",
    github: "",
    completion: 0
  });

  // 2. Saved / Available Jobs (Mocking a job board)
  const [availableJobs, setAvailableJobs] = useState([
    { id: 201, title: "Frontend Engineer", company: "Stripe", location: "Remote", salary: "$120k - $150k" },
    { id: 202, title: "UI/UX Designer", company: "Figma", location: "San Francisco, CA", salary: "$100k - $130k" },
    { id: 203, title: "Full Stack Developer", company: "TechNova Inc.", location: "Hybrid", salary: "$90k - $120k" }
  ]);

  // 3. Applications State
  const [applications, setApplications] = useState([
    { id: 1, jobId: 99, jobTitle: "React Native Developer", company: "Meta", status: "Applied", date: "Oct 19, 2023" },
    { id: 2, jobId: 98, jobTitle: "Frontend Lead", company: "Vercel", status: "Interview Scheduled", date: "Oct 15, 2023", interviewDetails: { date: "Oct 22, 2023", time: "10:00 AM", link: "https://meet.google.com/abc-defg-hij" } },
    { id: 3, jobId: 97, jobTitle: "Web Developer", company: "Google", status: "Offer Sent", date: "Oct 01, 2023", offerDetails: { package: "$140,000/yr", joiningDate: "Nov 01, 2023" } },
    { id: 4, jobId: 96, jobTitle: "Junior Dev", company: "Local Startup", status: "Rejected", date: "Sep 20, 2023", feedback: "Looking for someone with more backend experience." }
  ]);

  // 4. Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Vercel scheduled an interview with you.", date: "2 hours ago", read: false },
    { id: 2, message: "Google sent you an Offer Letter!", date: "1 day ago", read: false }
  ]);

  // --- Handlers ---
  
  // Apply for Job Handler
  const [applyingJobId, setApplyingJobId] = useState<any>(null);

  const handleApply = (e: any) => {
    e.preventDefault();
    const job = availableJobs.find(j => j.id === applyingJobId);
    
    const newApp = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      status: "Applied",
      date: "Just now"
    };

    setApplications([newApp, ...applications]);
    showToast("Application Submitted Successfully!");
    setApplyingJobId(null);
    setActiveTab("applications");
  };

  const handleWithdraw = (id) => {
    setApplications(applications.filter(a => a.id !== id));
    showToast("Application Withdrawn");
  };

  const handleOffer = (id, accepted) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: accepted ? "Hired" : "Offer Rejected" } : a));
    showToast(accepted ? "Offer Accepted! Congratulations!" : "Offer Rejected.");
  };

  const handleSaveProfile = (e: any) => {
    e.preventDefault();
    setProfile({ ...profile, completion: 100 });
    showToast("Profile Updated!");
  };

  // Computed Stats
  const stats = {
    totalApps: applications.length,
    saved: availableJobs.length,
    interviews: applications.filter(a => a.status === 'Interview Scheduled').length,
    completion: profile.completion
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans relative text-slate-200">
      
      {/* Toast */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 backdrop-blur-md border ${toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'} bg-slate-900/95 text-teal-400 border-slate-700/50`}>
        {toastMessage && <span>✨ {toastMessage}</span>}
      </div>

      {/* Sidebar - Midnight Blue */}
      <aside className="w-72 bg-slate-950 text-slate-300 h-screen fixed flex flex-col z-10 hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-white drop-shadow-md">Job<span className="text-teal-400">Portal</span> <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-900/30 border border-emerald-500/30 px-2.5 py-1 rounded-full ml-2 align-top tracking-widest shadow-inner">SEEKER</span></Link>
        </div>
        
        <div className="p-5 flex-grow overflow-y-auto">
          <nav className="space-y-2 mt-2">
            {[
              { id: 'overview', name: 'Dashboard', icon: '📊' },
              { id: 'profile', name: 'My Profile', icon: '👤' },
              { id: 'find-jobs', name: 'Find Jobs', icon: '🔍' },
              { id: 'applications', name: 'Track Applications', icon: '📄' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setApplyingJobId(null); }}
                className={`w-full outline-none transition-all duration-300 ${activeTab === tab.id ? 'translate-x-1' : 'hover:translate-x-1'}`}
              >
                <BorderGlow 
                  borderRadius={12} 
                  glowRadius={4} 
                  edgeSensitivity={10} 
                  backgroundColor="#020617"
                  colors={['#14b8a6', '#10b981', '#34d399']}
                  className="w-full"
                  animated={activeTab === tab.id}
                >
                  <div className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-colors ${activeTab === tab.id ? 'bg-slate-900/50 text-white shadow-lg shadow-teal-900/20' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'}`}>
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
      <main className="flex-grow md:ml-72 p-10 lg:p-12 relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800 relative z-10">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-4xl font-semibold text-slate-100 tracking-tight capitalize drop-shadow-sm">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-400 font-medium text-sm mt-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse"></span>
               Manage your career and job applications.
            </p>
          </div>
          <div className="flex items-center gap-4 animate-in fade-in zoom-in duration-500">
             <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-slate-100">{profile.name}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{profile.title}</div>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white flex items-center justify-center font-semibold text-xl shadow-lg shadow-teal-500/30 border border-teal-300/50 hover:scale-105 transition-transform cursor-pointer">
                {profile.name ? profile.name.charAt(0) : 'S'}
             </div>
          </div>
        </div>

        {/* 1. Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Applications", value: stats.totalApps, from: "teal-500", to: "emerald-400", icon: "📄" },
                { label: "Saved Jobs", value: stats.saved, from: "blue-500", to: "cyan-400", icon: "🔖" },
                { label: "Upcoming Interviews", value: stats.interviews, from: "purple-500", to: "fuchsia-400", icon: "📅" },
                { label: "Profile Completion", value: `${stats.completion}%`, from: "amber-400", to: "yellow-300", icon: "⭐" }
              ].map((stat, i) => (
                <div key={i} className={`bg-slate-900/30 p-6 rounded-3xl border border-slate-800 shadow-lg hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-700 transition-all duration-300 relative overflow-hidden group backdrop-blur-md`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${stat.from} to-${stat.to} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform origin-bottom-left">{stat.icon}</div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-4xl font-semibold text-slate-100 drop-shadow-sm">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 backdrop-blur-md">
                  <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                    <h2 className="font-semibold text-slate-200 tracking-tight">Application Pipeline</h2>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6">
                       <div className="flex justify-between items-center group">
                         <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-teal-400 transition-colors">Applied</span> 
                         <span className="font-semibold text-2xl text-slate-100">{applications.filter(a => a.status === 'Applied').length}</span>
                       </div>
                       <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="bg-slate-500 h-full w-full"></div></div>

                       <div className="flex justify-between items-center group">
                         <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-purple-400 transition-colors">Interviews Scheduled</span> 
                         <span className="font-semibold text-2xl text-purple-400">{stats.interviews}</span>
                       </div>
                       <div className="w-full bg-purple-900/30 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-full" style={{width: '60%'}}></div></div>

                       <div className="flex justify-between items-center group">
                         <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-emerald-400 transition-colors">Offers Received</span> 
                         <span className="font-semibold text-2xl text-emerald-400">{applications.filter(a => a.status === 'Offer Sent' || a.status === 'Hired').length}</span>
                       </div>
                       <div className="w-full bg-emerald-900/30 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full" style={{width: '30%'}}></div></div>
                    </div>
                  </div>
               </div>
               
               {stats.completion < 100 && (
                   <BorderGlow 
                     borderRadius={24} 
                     glowRadius={6} 
                     edgeSensitivity={10} 
                     backgroundColor="#0f172a" 
                     colors={['#14b8a6', '#10b981', '#34d399']}
                     className="w-full h-full"
                     animated={true}
                   >
                     <div className="bg-transparent rounded-3xl p-10 text-white flex flex-col justify-center relative overflow-hidden group h-full">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                        <h2 className="text-3xl font-semibold mb-3 drop-shadow-md">Boost Your Visibility!</h2>
                        <p className="text-teal-100 font-medium mb-8 leading-relaxed">You are <span className="font-semibold bg-white/10 px-2 py-0.5 rounded">{100 - stats.completion}%</span> away from a complete profile. Employers are 80% more likely to respond to candidates with complete profiles.</p>
                        <button onClick={() => setActiveTab('profile')} className="bg-slate-800 border border-teal-500/50 text-teal-400 font-semibold px-8 py-4 rounded-xl shadow-lg w-max hover:shadow-xl hover:-translate-y-1 hover:bg-slate-700 transition-all uppercase tracking-widest text-sm">Complete Now</button>
                     </div>
                   </BorderGlow>
                )}
            </div>
          </div>
        )}

        {/* 2. My Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10 relative z-10 backdrop-blur-md">
             
             <div>
                <h3 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-3"><span className="text-3xl">👤</span> Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input type="text" placeholder="Enter Full Name" defaultValue={profile.name} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Professional Title</label>
                      <input type="text" placeholder="Enter Professional Title" defaultValue={profile.title} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                      <input type="email" placeholder="Enter Email Address" defaultValue={profile.email} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input type="tel" placeholder="Enter Phone Number" defaultValue={profile.phone} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                </div>
             </div>

             <div>
                <h3 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-3"><span className="text-3xl">💼</span> Experience & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Years of Experience</label>
                      <select defaultValue={profile.experience} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm">
                        <option>Fresher</option><option>1-3 Years</option><option>3-5 Years</option><option>5+ Years</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Highest Education</label>
                      <input type="text" placeholder="Enter Highest Education" defaultValue={profile.education} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Key Skills (Comma separated)</label>
                      <input type="text" placeholder="Enter Key Skills" defaultValue={profile.skills} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                </div>
             </div>

             <div>
                <h3 className="text-2xl font-semibold text-slate-100 mb-6 flex items-center gap-3"><span className="text-3xl">🔗</span> Links & Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Portfolio Link</label>
                      <input type="url" placeholder="Enter Portfolio Link" defaultValue={profile.portfolio} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">GitHub / LinkedIn</label>
                      <input type="url" placeholder="Enter GitHub / LinkedIn URL" defaultValue={profile.github} className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                   </div>
                   <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Upload Resume (PDF)</label>
                      <label className="border-2 border-dashed border-slate-700 rounded-3xl p-12 text-center bg-slate-950 hover:bg-slate-900 hover:border-teal-500 transition-colors cursor-pointer block relative group shadow-sm">
                         <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e: any) => {
                            if(e.target.files && e.target.files.length > 0) {
                               showToast("Resume uploaded successfully!");
                            }
                         }} />
                         <span className="text-5xl mb-4 block pointer-events-none group-hover:scale-110 transition-transform">📄</span>
                         <span className="font-semibold text-lg text-teal-400 pointer-events-none block mb-1">Click to upload new resume</span> 
                         <span className="text-slate-500 font-bold text-sm pointer-events-none">or drag and drop</span>
                      </label>
                   </div>
                </div>
             </div>
             
             <div className="pt-8 border-t border-slate-800 flex justify-end">
               <button type="submit" className="px-10 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg tracking-wide">
                 Save Profile Changes
               </button>
             </div>
          </form>
        )}

        {/* 3. Find & Apply for Jobs */}
        {activeTab === 'find-jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
             {applyingJobId ? (
                <form onSubmit={handleApply} className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg max-w-2xl mx-auto border-t-4 border-t-teal-500 relative backdrop-blur-md">
                   <button type="button" onClick={() => setApplyingJobId(null)} className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-200 mb-6 flex items-center gap-2 transition-colors">← Back to Jobs</button>
                   <h2 className="text-3xl font-semibold text-slate-100 mb-2">Apply for {availableJobs.find(j => j.id === applyingJobId).title}</h2>
                   <p className="text-slate-400 mb-8 font-bold">at <span className="text-teal-400">{availableJobs.find(j => j.id === applyingJobId).company}</span></p>
                   
                   <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Resume Selection</label>
                        <select className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 font-bold text-slate-200 shadow-sm">
                          <option>Use Profile Resume (Ram_Resume.pdf)</option>
                          <option>Upload New Resume...</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Expected Salary (Optional)</label>
                        <input type="text" placeholder="e.g. $100,000" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 font-bold text-slate-200 shadow-sm placeholder-slate-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Cover Letter (Optional)</label>
                        <textarea rows={5} placeholder="Why are you a great fit for this role?" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 font-medium text-slate-200 shadow-sm resize-none placeholder-slate-600"></textarea>
                      </div>
                   </div>
                   <button type="submit" className="w-full mt-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg tracking-wide">
                     Submit Application Now
                   </button>
                </form>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {availableJobs.map(job => (
                     <div key={job.id} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 shadow-lg hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col group backdrop-blur-md">
                        <div className="font-semibold text-2xl text-slate-100 mb-2">{job.title}</div>
                        <div className="text-teal-400 font-semibold mb-6 text-lg">{job.company}</div>
                        <div className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-3"><span className="text-xl">📍</span> {job.location}</div>
                        <div className="text-sm font-bold text-slate-400 mb-8 flex items-center gap-3"><span className="text-xl">💰</span> {job.salary}</div>
                        <button onClick={() => setApplyingJobId(job.id)} className="mt-auto w-full py-4 bg-teal-900/30 text-teal-400 font-semibold uppercase tracking-widest rounded-xl border border-teal-500/30 shadow-sm hover:bg-teal-600 hover:text-white hover:shadow-md transition-all text-sm">
                           Apply Now
                        </button>
                     </div>
                  ))}
                </div>
             )}
          </div>
        )}

        {/* 4. Track Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10">
             {applications.map(app => (
                <div key={app.id} className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden flex flex-col md:flex-row md:items-stretch group hover:shadow-xl hover:border-slate-700 transition-all duration-300 backdrop-blur-md">
                   <div className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/50 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">{app.company}</div>
                      <div className="text-2xl font-semibold text-slate-100 mb-3 leading-tight">{app.jobTitle}</div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Applied on {app.date}</div>
                   </div>
                   <div className="p-8 md:w-2/3 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Current Status</div>
                            <span className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest border shadow-sm inline-flex items-center gap-2
                              ${app.status === 'Hired' || app.status === 'Offer Sent' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                                app.status === 'Interview Scheduled' ? 'bg-purple-900/30 text-purple-400 border-purple-500/30 shadow-purple-900/20' : 
                                app.status === 'Rejected' || app.status === 'Offer Rejected' ? 'bg-rose-900/30 text-rose-400 border-rose-500/30 shadow-rose-900/20' : 
                                'bg-amber-900/30 text-amber-400 border-amber-500/30 shadow-amber-900/20'}`}>
                              {app.status === 'Hired' && '🎉'} {app.status === 'Offer Sent' && '✉️'} {app.status === 'Interview Scheduled' && '📅'}
                              {app.status}
                            </span>
                         </div>
                         {app.status === 'Applied' && (
                            <button onClick={() => handleWithdraw(app.id)} className="text-[10px] font-semibold uppercase tracking-widest text-rose-400 hover:text-rose-300 bg-rose-900/30 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-colors">Withdraw</button>
                         )}
                      </div>
                      
                      {/* Dynamic Content based on status */}
                      {app.status === 'Interview Scheduled' && app.interviewDetails && (
                         <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/30 shadow-inner">
                            <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">📅 Interview Details</h4>
                            <p className="text-sm font-bold text-purple-200 mb-2">Date: <span className="text-purple-400">{app.interviewDetails.date} at {app.interviewDetails.time}</span></p>
                            <p className="text-sm font-bold text-purple-200 mb-5">Link: <a href="#" className="text-purple-400 underline hover:text-purple-300">{app.interviewDetails.link}</a></p>
                            <button onClick={() => showToast("Reschedule request sent.")} className="text-xs font-semibold uppercase tracking-widest bg-slate-800 text-purple-400 px-5 py-2.5 rounded-xl shadow-sm border border-purple-500/30 hover:bg-slate-700 transition-colors">Request Reschedule</button>
                         </div>
                      )}

                      {app.status === 'Offer Sent' && app.offerDetails && (
                         <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/30 shadow-inner">
                            <h4 className="font-semibold text-emerald-300 mb-3 flex items-center gap-2">🎉 Congratulations! Offer Received.</h4>
                            <p className="text-sm font-bold text-emerald-200 mb-2">Package: <span className="text-emerald-400">{app.offerDetails.package}</span></p>
                            <p className="text-sm font-bold text-emerald-200 mb-5">Expected Joining: <span className="text-emerald-400">{app.offerDetails.joiningDate}</span></p>
                            <div className="flex gap-3">
                               <button onClick={() => handleOffer(app.id, true)} className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Accept Offer</button>
                               <button onClick={() => handleOffer(app.id, false)} className="text-xs font-semibold uppercase tracking-widest bg-slate-800 text-rose-400 border border-rose-500/30 px-6 py-3 rounded-xl shadow-sm hover:bg-slate-700 transition-colors">Reject</button>
                            </div>
                         </div>
                      )}

                      {app.status === 'Rejected' && app.feedback && (
                         <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner">
                            <h4 className="font-semibold text-slate-300 mb-2">Employer Feedback:</h4>
                            <p className="text-sm font-medium text-slate-400 italic">"{app.feedback}"</p>
                         </div>
                      )}
                   </div>
                </div>
             ))}
             {applications.length === 0 && (
                <div className="p-16 text-center bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg backdrop-blur-md">
                   <div className="text-6xl mb-6 opacity-50 grayscale">📭</div>
                   <h3 className="text-2xl font-semibold text-slate-100 mb-3">No applications yet</h3>
                   <button onClick={() => setActiveTab('find-jobs')} className="text-sm font-semibold uppercase tracking-widest text-teal-400 hover:text-teal-300 bg-teal-900/30 border border-teal-500/30 px-6 py-3 rounded-xl shadow-sm transition-colors mt-4 inline-block">Find jobs to apply for</button>
                </div>
             )}
          </div>
        )}

        {/* 5. Notifications */}
        {activeTab === 'notifications' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-3xl mx-auto relative z-10 backdrop-blur-md">
             <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
               <div>
                 <h2 className="text-2xl font-semibold text-slate-100">Your Notifications</h2>
                 <p className="text-sm font-medium text-slate-400">Stay updated on your job search.</p>
               </div>
               <button onClick={() => {setNotifications(notifications.map(n => ({...n, read: true}))); showToast("All marked as read");}} className="text-xs font-semibold uppercase tracking-widest text-teal-400 hover:text-teal-300 bg-teal-900/30 px-4 py-2 rounded-xl shadow-sm border border-teal-500/30 transition-colors">Mark all read</button>
             </div>
             <div className="divide-y divide-slate-800">
                {notifications.map(notif => (
                   <div key={notif.id} className={`p-8 flex gap-5 transition-colors cursor-pointer ${notif.read ? 'bg-transparent hover:bg-slate-800/30' : 'bg-teal-900/20 hover:bg-teal-900/30'}`}>
                      <div className="mt-1">
                         {notif.read ? <span className="text-slate-500 text-xl">⚪</span> : <span className="text-teal-400 text-xl animate-pulse">🔵</span>}
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
