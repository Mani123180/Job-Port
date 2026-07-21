"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function JobsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  
  // Just for UI demonstration since the free API doesn't always have reliable job_types
  const [selectedTypes, setSelectedTypes] = useState({
    'Full-time': false,
    'Part-time': false,
    'Contract': false
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        // This is a live daily feed of jobs
        const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Helper to format timestamp to "Posted X hours/days ago"
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
    setSelectedTypes({
      'Full-time': false,
      'Part-time': false,
      'Contract': false
    });
  };

  // Filter jobs based on search query AND sidebar filters
  const filteredJobs = jobs.filter(job => {
    // 1. Search Query Match
    const query = searchQuery.toLowerCase();
    const title = (job.title || "").toLowerCase();
    const company = (job.company_name || "").toLowerCase();
    const matchesSearch = title.includes(query) || company.includes(query);

    // 2. Remote Only Match
    const matchesRemote = remoteOnly ? job.remote === true : true;

    // 3. Job Type Match (Arbeitnow often leaves job_types empty, so we do a text search fallback)
    const anyTypeSelected = Object.values(selectedTypes).some(v => v);
    let matchesType = true;
    if (anyTypeSelected) {
      matchesType = false;
      const jobText = (title + " " + (job.description || "")).toLowerCase();
      if (selectedTypes['Full-time'] && (jobText.includes('full time') || jobText.includes('full-time') || jobText.includes('vollzeit'))) matchesType = true;
      if (selectedTypes['Part-time'] && (jobText.includes('part time') || jobText.includes('part-time') || jobText.includes('teilzeit'))) matchesType = true;
      if (selectedTypes['Contract'] && (jobText.includes('contract') || jobText.includes('freelance'))) matchesType = true;
    }

    return matchesSearch && matchesRemote && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar theme="light" />

      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Daily Live Jobs</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Browse thousands of real, up-to-the-minute job openings aggregated from around the web.</p>
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
                <button onClick={clearFilters} className="text-sm text-blue-600 font-medium hover:underline">Clear All</button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Work Setup</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={remoteOnly}
                    onChange={(e: any) => setRemoteOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-gray-700 text-sm font-medium">Remote Jobs Only</span>
                </label>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {Object.keys(selectedTypes).map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes[type]}
                        onChange={() => handleTypeToggle(type)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-gray-700 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-6 flex gap-2">
               <input 
                 type="text" 
                 placeholder="Search by job title, company, or keywords..." 
                 value={searchQuery}
                 onChange={(e: any) => setSearchQuery(e.target.value)}
                 className="flex-grow px-4 py-3 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-sm" 
               />
               <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm whitespace-nowrap">
                 Search Live Jobs
               </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Showing <span className="text-gray-900 font-bold">{filteredJobs.length}</span> live jobs</span>
            </div>

            <div className="space-y-4">
              {loading && <div className="p-8 text-center text-gray-500 font-medium">Fetching real jobs from the web...</div>}
              {error && <div className="p-8 text-center text-red-500 font-medium">Error fetching jobs: {error}</div>}
              {!loading && !error && filteredJobs.length === 0 && (
                 <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-2xl border border-gray-200">
                    No jobs found matching your filters. Try clearing them to see more jobs.
                 </div>
              )}
              
              {!loading && !error && filteredJobs.map((job, idx) => (
                <div key={job.slug || idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all group flex flex-col md:flex-row gap-6">
                   <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-gray-400 text-2xl border border-gray-100 uppercase">
                     {job.company_name ? job.company_name.charAt(0) : 'J'}
                   </div>
                   <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">{job.title}</a>
                          <div className="text-gray-500 font-medium text-sm mt-1">{job.company_name} • {job.location || 'Remote'}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip relative" title="Save Job">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {job.description ? job.description.replace(/<[^>]+>/g, '').substring(0, 200) : ''}...
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">{job.remote ? 'Remote' : 'On-Site'}</span>
                        {job.tags && job.tags.slice(0, 3).map(tag => (
                           <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-green-600 font-bold">{formatTimeAgo(job.created_at)}</span>
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
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
