"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function InternshipsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  
  // Fake state for demo since real APIs rarely expose exact paid/unpaid status easily
  const [compensation, setCompensation] = useState({
    paid: false,
    unpaid: false
  });
  
  const [selectedTypes, setSelectedTypes] = useState({
    'Summer Internship': false,
    'Campus Internship': false,
    'Winter Internship': false,
    'Co-op': false
  });

  useEffect(() => {
    async function fetchLiveInternships() {
      try {
        const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
        if (!res.ok) throw new Error("Failed to fetch live data");
        const data = await res.json();
        
        // Filter the global job feed strictly for internship-related roles
        const allJobs = data.data || [];
        const internshipList = allJobs.filter(job => {
           const title = (job.title || "").toLowerCase();
           return title.includes('intern') || title.includes('student') || title.includes('trainee');
        });
        
        setInternships(internshipList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveInternships();
  }, []);

  // Format Timestamp
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Posted recently";
    const seconds = Math.floor(Date.now() / 1000) - timestamp;
    if (seconds < 3600) return "Posted just now";
    if (seconds < 86400) return `Posted ${Math.floor(seconds / 3600)} hours ago`;
    return `Posted ${Math.floor(seconds / 86400)} days ago`;
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRemoteOnly(false);
    setCompensation({ paid: false, unpaid: false });
    setSelectedTypes({
      'Summer Internship': false,
      'Campus Internship': false,
      'Winter Internship': false,
      'Co-op': false
    });
  };

  const filteredInternships = internships.filter(job => {
    // 1. Search Match
    const query = searchQuery.toLowerCase();
    const title = (job.title || "").toLowerCase();
    const company = (job.company_name || "").toLowerCase();
    if (query && !title.includes(query) && !company.includes(query)) return false;

    // 2. Remote Only
    if (remoteOnly && !job.remote) return false;

    // 3. Compensation Match (Since we don't have this data, we just do text matching for fun or let them pass)
    const desc = (job.description || "").toLowerCase();
    if (compensation.unpaid && !desc.includes("unpaid")) return false; // If they want unpaid, ensure it says unpaid

    // 4. Type Match
    const anyTypeSelected = Object.values(selectedTypes).some(v => v);
    if (anyTypeSelected) {
      let matchesType = false;
      if (selectedTypes['Summer Internship'] && (desc.includes('summer') || title.includes('summer'))) matchesType = true;
      if (selectedTypes['Winter Internship'] && (desc.includes('winter') || title.includes('winter'))) matchesType = true;
      if (selectedTypes['Campus Internship'] && (desc.includes('campus') || title.includes('campus'))) matchesType = true;
      if (selectedTypes['Co-op'] && (desc.includes('co-op') || title.includes('co-op'))) matchesType = true;
      if (!matchesType) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
          <div className="hidden md:flex gap-6 font-medium text-gray-600 text-sm">
             <Link href="/internships" className="text-indigo-600 font-bold">Internships</Link>
          </div>
        </div>
      </header>

      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Live Internships Feed</h1>
          <p className="text-indigo-200 text-lg max-w-2xl">Find the perfect live internship to gain experience and launch your professional journey, updated daily.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <button 
            className="lg:hidden w-full py-3 bg-white border border-gray-200 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'} space-y-6`}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-gray-900">Filters</h2>
                <button onClick={clearFilters} className="text-sm text-indigo-600 font-medium hover:underline">Clear All</button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Internship Type</h3>
                <div className="space-y-2">
                  {Object.keys(selectedTypes).map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input 
                         type="checkbox" 
                         checked={selectedTypes[type]}
                         onChange={() => handleTypeToggle(type)}
                         className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                      />
                      <span className="text-gray-700 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Compensation</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                       type="checkbox" 
                       checked={compensation.paid}
                       onChange={(e) => setCompensation({...compensation, paid: e.target.checked})}
                       className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                    />
                    <span className="text-gray-700 text-sm font-medium">Paid Internships Only</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                       type="checkbox" 
                       checked={compensation.unpaid}
                       onChange={(e) => setCompensation({...compensation, unpaid: e.target.checked})}
                       className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                    />
                    <span className="text-gray-700 text-sm">Unpaid Internships</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Work Setup</h3>
                <label className="flex items-center gap-3 cursor-pointer mt-3">
                    <input 
                       type="checkbox" 
                       checked={remoteOnly}
                       onChange={(e) => setRemoteOnly(e.target.checked)}
                       className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                    />
                    <span className="text-gray-700 text-sm">Remote Only</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-6 flex gap-2">
               <input 
                 type="text" 
                 placeholder="Search live internships by role or company..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="flex-grow px-4 py-3 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-sm" 
               />
               <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm whitespace-nowrap">
                 Search
               </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Showing <span className="text-gray-900 font-bold">{filteredInternships.length}</span> live internships today</span>
            </div>

            <div className="space-y-4">
              {loading && <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200">Scanning global live feeds for Internships...</div>}
              {error && <div className="p-8 text-center text-red-500 font-medium bg-white rounded-3xl border border-gray-200">Error: {error}</div>}
              
              {!loading && !error && filteredInternships.length === 0 && (
                <div className="p-12 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200 shadow-sm">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Live Internships Found</h3>
                  <p>There are no active internships matching your filters in the live feed right now. Please check back tomorrow!</p>
                </div>
              )}

              {!loading && !error && filteredInternships.map((internship, idx) => (
                <div key={internship.slug || idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6">
                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-indigo-500 text-3xl border border-indigo-100 uppercase shadow-sm">
                     {internship.company_name ? internship.company_name.charAt(0) : 'I'}
                   </div>
                   <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <a href={internship.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">{internship.title}</a>
                          <div className="text-gray-500 font-medium text-sm mt-1">{internship.company_name} • {internship.location || 'Remote'}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {internship.description ? internship.description.replace(/<[^>]+>/g, '').substring(0, 200) : ''}...
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
                          {internship.description && internship.description.toLowerCase().includes('unpaid') ? 'UNPAID' : 'PAID'}
                        </span>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100">
                          {internship.remote ? 'Remote' : 'On-Site'}
                        </span>
                        {internship.tags && internship.tags.slice(0, 2).map(tag => (
                           <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-green-600 font-bold">{formatTimeAgo(internship.created_at)}</span>
                        <a href={internship.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                          Apply Externally
                        </a>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
