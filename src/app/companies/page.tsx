"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'featured', 'verified', 'top'
  
  // Sidebar Filter States
  const [filters, setFilters] = useState({
    industry: "",
    size: "",
    location: "",
    hiring: false
  });

  useEffect(() => {
    async function fetchLiveCompanies() {
      try {
        const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
        if (!res.ok) throw new Error("Failed to fetch live data");
        const data = await res.json();
        const jobs = data.data || [];
        
        const companyMap = new Map();
        
        // Arrays for simulating diverse company attributes since the API only gives job data
        const industries = ["Software", "Finance", "Healthcare", "Logistics", "Design"];
        const sizes = ["100 - 500", "500 - 1,000", "1,000 - 5,000", "5,000+"];
        
        jobs.forEach((job, index) => {
           const cName = job.company_name;
           if (!cName) return;

           if (!companyMap.has(cName)) {
              // Create unique pseudo-random attributes based on company name length to keep it consistent
              const nameLen = cName.length;
              companyMap.set(cName, {
                 id: encodeURIComponent(cName), // Use company name as a safe URL ID
                 name: cName,
                 industry: industries[nameLen % industries.length],
                 location: job.location || "Remote",
                 size: sizes[nameLen % sizes.length],
                 rating: (4.0 + (nameLen % 10) / 10).toFixed(1), // Between 4.0 and 4.9
                 jobs: 1,
                 verified: nameLen % 2 === 0,
                 featured: nameLen % 3 === 0,
                 desc: job.description ? job.description.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : `Discover careers, culture, and open positions at ${cName}.`
              });
           } else {
              const comp = companyMap.get(cName);
              comp.jobs += 1; // Increment job count for this company
              if (!comp.location || comp.location === "Remote") {
                comp.location = job.location || comp.location;
              }
           }
        });
        
        // Sort by job count descending
        const companyList = Array.from(companyMap.values()).sort((a, b) => b.jobs - a.jobs);
        setCompanies(companyList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveCompanies();
  }, []);

  const filteredCompanies = companies.filter(c => {
    // Search
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Tabs
    if (activeTab === "featured" && !c.featured) return false;
    if (activeTab === "verified" && !c.verified) return false;
    if (activeTab === "top" && parseFloat(c.rating) < 4.7) return false;
    
    // Sidebar Filters
    if (filters.industry && c.industry !== filters.industry) return false;
    if (filters.size && c.size !== filters.size) return false;
    // Location: simple text match for the dropdown values
    if (filters.location && !c.location.includes(filters.location.split(',')[0])) return false;
    if (filters.hiring && c.jobs === 0) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
          <div className="hidden md:flex gap-6 font-medium text-gray-600 text-sm">
             <Link href="/companies" className="text-blue-600 font-bold">Companies</Link>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Live Company Directory</h1>
          <p className="text-gray-400 text-lg mb-8">Browse actively hiring companies, read reviews, and explore their open positions.</p>
          
          <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-xl">
             <input 
               type="text" 
               placeholder="Search Live Companies (e.g., TechNova)..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="flex-grow px-6 py-4 bg-transparent text-gray-900 placeholder-gray-500 outline-none rounded-xl" 
             />
             <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
               Search
             </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
                <button onClick={() => setFilters({industry:"", size:"", location:"", hiring:false})} className="text-sm text-blue-600 font-medium hover:underline">Clear All</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm">Industry</h3>
                  <select 
                    value={filters.industry} 
                    onChange={e => setFilters({...filters, industry: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 cursor-pointer"
                  >
                    <option value="">All Industries</option>
                    <option value="Software">Software</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm">Company Size</h3>
                  <select 
                    value={filters.size} 
                    onChange={e => setFilters({...filters, size: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 cursor-pointer"
                  >
                    <option value="">All Sizes</option>
                    <option value="100 - 500">100 - 500 Employees</option>
                    <option value="500 - 1,000">500 - 1,000 Employees</option>
                    <option value="1,000 - 5,000">1,000 - 5,000 Employees</option>
                    <option value="5,000+">5,000+ Employees</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm">Location</h3>
                  <select 
                    value={filters.location} 
                    onChange={e => setFilters({...filters, location: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 cursor-pointer"
                  >
                    <option value="">All Locations</option>
                    <option value="San Francisco">San Francisco, CA</option>
                    <option value="New York">New York, NY</option>
                    <option value="Remote">Remote</option>
                    <option value="Munich">Munich</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm">Hiring Status</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.hiring}
                      onChange={e => setFilters({...filters, hiring: e.target.checked})}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className="text-sm text-gray-700">Actively Hiring</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Directory Listing */}
          <div className="lg:w-3/4">
            
            {/* Tabbed Navigation for Directory Views */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
              {[
                { id: 'all', label: 'All Companies' },
                { id: 'featured', label: 'Featured Companies', icon: '⭐' },
                { id: 'verified', label: 'Verified Companies', icon: '✅' },
                { id: 'top', label: 'Top Rated Companies', icon: '🏆' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap text-sm transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {tab.icon && <span>{tab.icon}</span>}
                  {tab.label}
                </button>
              ))}
            </div>

            {loading && <div className="py-12 text-center text-gray-500 font-medium bg-white rounded-3xl border border-gray-200">Aggregating live companies...</div>}
            {error && <div className="py-12 text-center text-red-500 font-medium bg-white rounded-3xl border border-gray-200">Error: {error}</div>}

            {!loading && !error && (
              <div className="mb-4 text-gray-600 font-medium">
                Showing <span className="font-bold text-gray-900">{filteredCompanies.length}</span> live companies
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {!loading && !error && filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                     <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-400 text-3xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-gray-100 uppercase shadow-sm">
                       {company.name.charAt(0)}
                     </div>
                     <div className="flex flex-col items-end gap-2">
                       <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-bold border border-green-100 shadow-sm">
                         <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                         {company.rating}
                       </div>
                       {company.verified && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-sm">Verified</span>}
                     </div>
                   </div>
                   
                   <Link href={`/companies/${company.id}`} className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors block mb-1 truncate" title={company.name}>{company.name}</Link>
                   <p className="text-gray-500 text-sm mb-4 truncate">{company.industry} • {company.location}</p>
                   
                   <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{company.desc}</p>
                   
                   <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                     <Link href={`/companies/${company.id}`} className="text-blue-600 font-bold text-sm hover:underline bg-blue-50 px-3 py-1.5 rounded-lg shadow-sm">View Profile</Link>
                     <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                       <span className="text-blue-600 font-bold">{company.jobs}</span> Live Jobs
                     </span>
                   </div>
                </div>
              ))}
              
              {!loading && !error && filteredCompanies.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500 font-medium">
                  No companies found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
