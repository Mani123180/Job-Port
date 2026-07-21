"use client";

import Link from "next/link";
import { useState } from "react";
import BorderGlow from "../../../components/BorderGlow";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userTab, setUserTab] = useState("seekers");
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [notificationStatus, setNotificationStatus] = useState("");

  // Mock Data as State
  const [users, setUsers] = useState([
    { id: 1, name: "Ram", email: "ram@example.com", role: "Seeker", status: "Active", joined: "Oct 10, 2023", applications: 12 },
    { id: 2, name: "TechNova Inc.", email: "hr@technova.com", role: "Employer", status: "Verified", joined: "Oct 05, 2023", jobsPosted: 5 },
    { id: 3, name: "David", email: "david@example.com", role: "Seeker", status: "Suspended", joined: "Oct 15, 2023", applications: 0 },
    { id: 4, name: "Global Systems", email: "careers@global.com", role: "Employer", status: "Pending", joined: "Oct 16, 2023", jobsPosted: 0 }
  ]);

  const [jobs, setJobs] = useState([
    { id: 101, title: "Senior React Developer", company: "TechNova Inc.", status: "Active", applications: 45, date: "Oct 15, 2023", featured: false },
    { id: 102, title: "Crypto Trader", company: "Unknown LLC", status: "Pending", applications: 0, date: "Today", featured: false },
    { id: 103, title: "Data Analyst", company: "Global Systems", status: "Active", applications: 12, date: "Yesterday", featured: false }
  ]);

  const [companies, setCompanies] = useState([
    { id: 1, name: "TechNova Inc.", industry: "Technology", status: "Verified", jobs: 5, rating: 4.8 },
    { id: 2, name: "Global Systems", industry: "Finance", status: "Pending", jobs: 0, rating: 0 },
    { id: 3, name: "HealthCare Plus", industry: "Healthcare", status: "Verified", jobs: 12, rating: 4.5 }
  ]);

  // Actions for Users
  const handleApproveUser = (id: number) => setUsers(users.map(u => u.id === id ? { ...u, status: 'Verified' } : u));
  const handleSuspendUser = (id: number) => setUsers(users.map(u => u.id === id ? { ...u, status: 'Suspended' } : u));
  const handleDeleteUser = (id: number) => setUsers(users.filter(u => u.id !== id));

  // Actions for Jobs
  const handleApproveJob = (id: number) => setJobs(jobs.map(j => j.id === id ? { ...j, status: 'Active' } : j));
  const handleFeatureJob = (id: number) => setJobs(jobs.map(j => j.id === id ? { ...j, featured: !j.featured } : j));
  const handleDeleteJob = (id: number) => setJobs(jobs.filter(j => j.id !== id));

  // Actions for Companies
  const handleVerifyCompany = (id: number) => setCompanies(companies.map(c => c.id === id ? { ...c, status: 'Verified' } : c));
  const handleDeleteCompany = (id: number) => setCompanies(companies.filter(c => c.id !== id));

  const handleStubAction = (action: string, entityName: string) => {
    alert(`${action} action triggered for ${entityName}. This would open a modal or new page in the full implementation.`);
  };

  const handleSendNotification = (e: any) => {
    e.preventDefault();
    setNotificationStatus("Sending...");
    setTimeout(() => {
      setNotificationStatus("Sent Successfully!");
      e.target.reset(); // clear form
      setTimeout(() => setNotificationStatus(""), 3000); // clear toast after 3s
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans relative text-slate-200">
      
      {/* Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 backdrop-blur-md border ${notificationStatus ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-95 pointer-events-none'} ${notificationStatus.includes('Successfully') ? 'bg-emerald-900/95 text-emerald-50 border-emerald-700/50' : 'bg-slate-900/95 text-slate-50 border-slate-700/50'}`}>
        {notificationStatus.includes('Successfully') ? '✨' : '⏳'} {notificationStatus}
      </div>

      {/* Sidebar Navigation - Midnight Blue */}
      <aside className="w-72 bg-slate-950 text-slate-300 h-screen fixed flex flex-col z-10 hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-white drop-shadow-md">Job<span className="text-violet-400">Portal</span> <span className="text-[10px] font-semibold text-violet-200 bg-violet-900/50 border border-violet-500/30 px-2.5 py-1 rounded-full ml-2 align-top tracking-widest shadow-inner">ADMIN</span></Link>
        </div>
        
        <div className="p-5 flex-grow overflow-y-auto">
          <nav className="space-y-2 mt-2">
            {[
              { id: 'overview', name: 'Dashboard Overview', icon: '🌐' },
              { id: 'users', name: 'User Management', icon: '👥' },
              { id: 'jobs', name: 'Job Management', icon: '💼' },
              { id: 'companies', name: 'Company Management', icon: '🏢' },
              { id: 'content', name: 'Content Management', icon: '📝' },
              { id: 'reports', name: 'Reports & Analytics', icon: '📈' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedContent(null); }}
                className={`w-full outline-none transition-all duration-300 ${activeTab === tab.id ? 'translate-x-1' : 'hover:translate-x-1'}`}
              >
                <BorderGlow 
                  borderRadius={12} 
                  glowRadius={4} 
                  edgeSensitivity={10} 
                  backgroundColor="#020617"
                  colors={['#8b5cf6', '#a855f7', '#3b82f6']}
                  className="w-full"
                  animated={activeTab === tab.id}
                >
                  <div className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-colors ${activeTab === tab.id ? 'bg-slate-900/50 text-white shadow-lg shadow-violet-900/20' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'}`}>
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

      {/* Main Content Area */}
      <main className="flex-grow md:ml-72 p-10 lg:p-12 relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-400/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800 relative z-10">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-4xl font-semibold text-slate-100 tracking-tight capitalize drop-shadow-sm">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-400 font-medium text-sm mt-2 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse"></span>
               System operating normally. Manage and monitor the platform.
            </p>
          </div>
        </div>

        {/* 1. Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Job Seekers", value: users.filter(u => u.role === 'Seeker').length, from: "blue-500", to: "cyan-400", icon: "👨‍💻" },
                { label: "Total Employers", value: users.filter(u => u.role === 'Employer').length, from: "violet-500", to: "fuchsia-400", icon: "👔" },
                { label: "Total Companies", value: companies.length, from: "fuchsia-500", to: "pink-400", icon: "🏢" },
                { label: "Total Jobs", value: jobs.length, from: "blue-600", to: "indigo-500", icon: "💼" },
                { label: "Active Jobs", value: jobs.filter(j => j.status === 'Active').length, from: "emerald-500", to: "teal-400", icon: "✅" },
                { label: "Pending Approvals", value: jobs.filter(j => j.status === 'Pending').length, from: "amber-500", to: "orange-400", icon: "⏳" },
                { label: "Applications", value: jobs.reduce((sum, job) => sum + job.applications, 0), from: "rose-500", to: "pink-400", icon: "📄" },
                { label: "Revenue", value: "$0", from: "emerald-600", to: "green-400", icon: "💰" }
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
              <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden backdrop-blur-md">
                 <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                   <h2 className="font-semibold text-slate-200 tracking-tight">Recent System Activities</h2>
                   <span className="text-xs font-bold bg-violet-900/30 text-violet-400 border border-violet-500/20 px-3 py-1 rounded-full">Live Feed</span>
                 </div>
                 <div className="divide-y divide-slate-800 p-3">
                   {[
                     "New employer 'Stripe' registered.",
                     "Job 'Frontend Dev' flagged for review.",
                     "150 new users joined today.",
                     "Company 'HealthCare Plus' verified."
                   ].map((act, i) => (
                     <div key={i} className="p-4 text-sm font-semibold text-slate-300 flex gap-4 items-center hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
                       <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-sm shadow-violet-900/50 group-hover:scale-125 transition-transform"></span>
                       {act}
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. User Management */}
        {activeTab === 'users' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10 backdrop-blur-md">
            <div className="p-6 border-b border-slate-800 flex gap-4 bg-slate-900/50">
              <button onClick={() => setUserTab('seekers')} className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${userTab === 'seekers' ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50' : 'text-slate-400 hover:bg-slate-800/50'}`}>Job Seekers</button>
              <button onClick={() => setUserTab('employers')} className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${userTab === 'employers' ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50' : 'text-slate-400 hover:bg-slate-800/50'}`}>Employers</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800">
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Name / Email</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">{userTab === 'seekers' ? 'Applications' : 'Jobs Posted'}</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.filter(u => userTab === 'seekers' ? u.role === 'Seeker' : u.role === 'Employer').map(user => (
                    <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5">
                        <div className="font-semibold text-slate-200">{user.name}</div>
                        <div className="text-sm font-medium text-slate-400 mt-0.5">{user.email}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border shadow-sm
                          ${user.status === 'Active' || user.status === 'Verified' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                            user.status === 'Suspended' ? 'bg-rose-900/30 text-rose-400 border-rose-500/30 shadow-rose-900/20' : 
                            'bg-amber-900/30 text-amber-400 border-amber-500/30 shadow-amber-900/20'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-bold text-slate-300">
                        {userTab === 'seekers' ? user.applications : user.jobsPosted}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {userTab === 'employers' && user.status === 'Pending' && (
                            <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleApproveUser(user.id)} className="px-4 py-2 bg-slate-900/80 text-emerald-400 text-xs font-bold rounded-lg w-full h-full hover:text-emerald-300">Approve</button></BorderGlow>
                          )}
                          <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleStubAction('View', user.name)} className="px-4 py-2 bg-slate-900/80 text-slate-300 text-xs font-bold rounded-lg w-full h-full hover:text-slate-100">View</button></BorderGlow>
                          <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleStubAction('Edit', user.name)} className="px-4 py-2 bg-slate-900/80 text-slate-300 text-xs font-bold rounded-lg w-full h-full hover:text-slate-100">Edit</button></BorderGlow>
                          {user.status !== 'Suspended' && (
                            <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleSuspendUser(user.id)} className="px-4 py-2 bg-slate-900/80 text-amber-400 text-xs font-bold rounded-lg w-full h-full hover:text-amber-300">Suspend</button></BorderGlow>
                          )}
                          <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleDeleteUser(user.id)} className="px-4 py-2 bg-slate-900/80 text-rose-400 text-xs font-bold rounded-lg w-full h-full hover:text-rose-300">Delete</button></BorderGlow>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Job Management */}
        {activeTab === 'jobs' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10 backdrop-blur-md">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">🔍</div>
                <input type="text" placeholder="Search across all jobs..." className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-200 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 shadow-sm transition-all placeholder-slate-500" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800">
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Job Title</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Company</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5">
                        <div className="font-semibold text-slate-200 flex items-center gap-3">
                          {job.title}
                          {job.featured && <span className="text-[10px] bg-violet-900/30 text-violet-400 px-2.5 py-1 rounded-md font-semibold tracking-widest border border-violet-500/30 shadow-sm shadow-violet-900/20">FEATURED</span>}
                        </div>
                        <div className="text-sm font-medium text-slate-400 mt-1">Posted {job.date}</div>
                      </td>
                      <td className="p-5 font-bold text-slate-300">{job.company}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border shadow-sm
                          ${job.status === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                            'bg-amber-900/30 text-amber-400 border-amber-500/30 shadow-amber-900/20'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-5 flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {job.status === 'Pending' && <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleApproveJob(job.id)} className="px-4 py-2 bg-slate-900/80 text-emerald-400 text-xs font-bold rounded-lg w-full h-full hover:text-emerald-300">Approve</button></BorderGlow>}
                        <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block">
                          <button onClick={() => handleFeatureJob(job.id)} className="px-4 py-2 bg-slate-900/80 text-violet-400 text-xs font-bold rounded-lg w-full h-full hover:text-violet-300">
                            {job.featured ? 'Unfeature' : 'Feature'}
                          </button>
                        </BorderGlow>
                        <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleStubAction('Edit', job.title)} className="px-4 py-2 bg-slate-900/80 text-slate-300 text-xs font-bold rounded-lg w-full h-full hover:text-slate-100">Edit</button></BorderGlow>
                        <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleDeleteJob(job.id)} className="px-4 py-2 bg-slate-900/80 text-rose-400 text-xs font-bold rounded-lg w-full h-full hover:text-rose-300">Remove</button></BorderGlow>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Company Management */}
        {activeTab === 'companies' && (
          <div className="bg-slate-900/30 rounded-3xl border border-slate-800 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800">
                  <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Company</th>
                  <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Industry</th>
                  <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {companies.map(company => (
                  <tr key={company.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-5">
                      <div className="font-semibold text-slate-200 text-base">{company.name}</div>
                      <div className="text-sm font-semibold text-amber-500 mt-0.5 drop-shadow-sm flex items-center gap-1">★ {company.rating} <span className="text-slate-400 font-medium text-xs">Rating</span></div>
                    </td>
                    <td className="p-5 font-bold text-slate-300">{company.industry}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest border shadow-sm
                        ${company.status === 'Verified' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30 shadow-emerald-900/20' : 
                          'bg-amber-900/30 text-amber-400 border-amber-500/30 shadow-amber-900/20'}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="p-5 flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      {company.status === 'Pending' && <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleVerifyCompany(company.id)} className="px-4 py-2 bg-slate-900/80 text-emerald-400 text-xs font-bold rounded-lg w-full h-full hover:text-emerald-300">Verify</button></BorderGlow>}
                      <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleStubAction('View', company.name)} className="px-4 py-2 bg-slate-900/80 text-slate-300 text-xs font-bold rounded-lg w-full h-full hover:text-slate-100">View</button></BorderGlow>
                      <BorderGlow borderRadius={8} glowRadius={15} edgeSensitivity={10} backgroundColor="#0f172a" className="inline-block"><button onClick={() => handleDeleteCompany(company.id)} className="px-4 py-2 bg-slate-900/80 text-rose-400 text-xs font-bold rounded-lg w-full h-full hover:text-rose-300">Delete</button></BorderGlow>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Content Management */}
        {activeTab === 'content' && (
          <div className="animate-in fade-in duration-500 relative z-10">
            {selectedContent ? (
              <div className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg animate-in slide-in-from-right-8 backdrop-blur-md">
                <button onClick={() => setSelectedContent(null)} className="text-sm font-bold text-slate-400 hover:text-violet-400 mb-8 flex items-center gap-2 transition-colors">
                  <span className="text-lg">←</span> Back to Categories
                </button>
                <h2 className="text-3xl font-semibold text-slate-100 mb-2">Manage {selectedContent.name}</h2>
                <p className="text-slate-400 mb-10 font-medium">Create, edit, or delete items in this category to keep your platform fresh.</p>
                <div className="p-16 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center text-center bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                  <div className="text-5xl mb-6 opacity-40 grayscale">📂</div>
                  <h3 className="font-semibold text-xl text-slate-200 mb-2">No {selectedContent.name} Found</h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium max-w-xs">You currently don't have any items here. Start by creating a new one!</p>
                  <button className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-900/50 hover:shadow-xl hover:-translate-y-1 transition-all">Add New Item</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Career Blogs', count: 42, icon: '📝' },
                  { name: 'Company Stories', count: 15, icon: '🏢' },
                  { name: 'Success Stories', count: 28, icon: '🌟' },
                  { name: 'FAQs', count: 35, icon: '❓' },
                  { name: 'Help Center', count: 12, icon: '🛟' },
                  { name: 'Job Categories', count: 24, icon: '📂' },
                  { name: 'Skills', count: 450, icon: '⚡' },
                  { name: 'Locations', count: 120, icon: '📍' },
                  { name: 'Homepage Banners', count: 3, icon: '🖼️' }
                ].map((item, i) => (
                   <div key={i} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 shadow-lg flex justify-between items-center hover:shadow-xl hover:border-slate-700 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group backdrop-blur-md">
                     <div className="flex gap-4 items-center">
                       <div className="w-12 h-12 rounded-2xl bg-violet-900/30 text-xl flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors shadow-inner border border-violet-500/20">{item.icon}</div>
                       <div>
                         <h3 className="font-semibold text-slate-200 text-lg group-hover:text-violet-400 transition-colors">{item.name}</h3>
                         <p className="text-sm font-bold text-slate-400">{item.count} items configured</p>
                       </div>
                     </div>
                     <button onClick={() => setSelectedContent(item)} className="text-sm font-semibold text-violet-400 bg-violet-900/30 border border-violet-500/30 px-5 py-2.5 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">Manage</button>
                   </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. Reports & Analytics */}
        {activeTab === 'reports' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 shadow-lg flex flex-col h-96 hover:shadow-xl transition-shadow backdrop-blur-md">
                 <h3 className="font-semibold text-slate-200 mb-6 text-lg">User Growth Trend</h3>
                 <div className="w-full flex-grow flex items-end justify-between gap-3">
                   {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                     <div key={i} className="w-full bg-slate-800 rounded-t-lg relative group overflow-hidden" style={{height: `${h}%`}}>
                       <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                       <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-300 rounded-t-lg opacity-80" style={{height: '100%'}}></div>
                     </div>
                   ))}
                 </div>
                 <div className="w-full flex justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-4 border-t border-slate-800 pt-4">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                 </div>
               </div>

               <div className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 shadow-lg flex flex-col h-96 hover:shadow-xl transition-shadow backdrop-blur-md">
                 <h3 className="font-semibold text-slate-200 mb-6 text-lg">Job Posting Trends</h3>
                 <div className="w-full flex-grow flex items-end justify-between gap-3">
                   {[80, 60, 95, 40, 70, 50, 85].map((h, i) => (
                     <div key={i} className="w-full bg-slate-800 rounded-t-lg relative group overflow-hidden" style={{height: `${h}%`}}>
                       <div className="w-full bg-gradient-to-t from-violet-500 to-fuchsia-400 rounded-t-lg opacity-80" style={{height: '100%'}}></div>
                     </div>
                   ))}
                 </div>
                 <div className="w-full flex justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-4 border-t border-slate-800 pt-4">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* 7. Notification Management */}
        {activeTab === 'notifications' && (
          <div className="bg-slate-900/30 p-10 rounded-3xl border border-slate-800 shadow-lg max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 relative z-10 backdrop-blur-md">
             <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
                <div className="w-12 h-12 bg-violet-900/50 text-violet-400 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-violet-500/20">📣</div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-100">Broadcast Notification</h3>
                  <p className="text-slate-400 font-medium text-sm">Send alerts directly to your users' devices and dashboards.</p>
                </div>
             </div>
             <form className="space-y-6" onSubmit={handleSendNotification}>
               <div>
                 <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Target Audience</label>
                 <select className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-slate-200 shadow-sm">
                   <option>All Users</option>
                   <option>Job Seekers Only</option>
                   <option>Employers Only</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Notification Type</label>
                 <div className="flex flex-wrap gap-4">
                   <label className="flex items-center gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 font-bold text-sm text-slate-200 cursor-pointer hover:bg-slate-900 transition-colors shadow-sm"><input type="checkbox" defaultChecked className="w-4 h-4 text-violet-600 rounded bg-slate-900 border-slate-700" /> Email</label>
                   <label className="flex items-center gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 font-bold text-sm text-slate-200 cursor-pointer hover:bg-slate-900 transition-colors shadow-sm"><input type="checkbox" defaultChecked className="w-4 h-4 text-violet-600 rounded bg-slate-900 border-slate-700" /> Push Notification</label>
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Subject / Title</label>
                 <input type="text" required placeholder="e.g. Scheduled Maintenance Alert" className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-bold text-slate-200 shadow-sm placeholder-slate-600" />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Message Body</label>
                 <textarea rows={5} required placeholder="Write your message here..." className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 outline-none resize-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium text-slate-200 shadow-sm placeholder-slate-600"></textarea>
               </div>
               <button type="submit" disabled={!!notificationStatus} className="w-full py-4 mt-4 text-white font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg">
                 {notificationStatus === "Sending..." ? "Transmitting..." : "Send Notification Now"}
               </button>
             </form>
          </div>
        )}

      </main>
    </div>
  );
}
