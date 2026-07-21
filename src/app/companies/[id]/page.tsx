"use client";

import Link from "next/link";
import { useState } from "react";

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
          <div className="hidden md:flex gap-6 font-medium text-gray-600 text-sm">
             <Link href="/companies" className="text-blue-600 font-bold">Companies</Link>
          </div>
          <Link href="/companies" className="text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">&larr; Back to Companies</Link>
        </div>
      </header>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white pt-16 pb-32">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
             <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-xl flex-shrink-0 -mb-20 z-10 border-4 border-gray-50">
                <div className="w-full h-full bg-blue-100 rounded-2xl flex items-center justify-center text-4xl font-black text-blue-600">T</div>
             </div>
             <div className="flex-grow text-center md:text-left mt-6 md:mt-0">
               <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                 <h1 className="text-4xl md:text-5xl font-bold">TechNova Solutions</h1>
                 <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                   Verified
                 </span>
               </div>
               <p className="text-blue-200 text-lg">Empowering global businesses to scale effectively using cutting-edge cloud infrastructure.</p>
             </div>
             <div className="flex gap-3">
               <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                 Follow Company
               </button>
               <button className="px-6 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-colors">
                 Share
               </button>
             </div>
           </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Basic Info */}
          <aside className="lg:w-1/3 space-y-6 -mt-12 z-20">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6 text-lg border-b pb-2">Basic Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>
                  <div>
                    <div className="text-gray-500 font-medium">Industry</div>
                    <div className="font-semibold text-gray-900">Software & Cloud Infrastructure</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
                  <div>
                    <div className="text-gray-500 font-medium">Founded Year</div>
                    <div className="font-semibold text-gray-900">2010</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                  <div>
                    <div className="text-gray-500 font-medium">Headquarters</div>
                    <div className="font-semibold text-gray-900">San Francisco, CA</div>
                    <div className="text-gray-500 text-xs mt-1">Branches: New York, London, Berlin</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
                  <div>
                    <div className="text-gray-500 font-medium">Company Size</div>
                    <div className="font-semibold text-gray-900">5,000 - 10,000 Employees</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg></div>
                  <div>
                    <div className="text-gray-500 font-medium">Website</div>
                    <a href="#" className="font-semibold text-blue-600 hover:underline">www.technovasolutions.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                 <div className="text-gray-500 font-medium text-sm mb-3">Connect with us</div>
                 <div className="flex gap-2">
                   <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-colors">in</div>
                   <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white cursor-pointer transition-colors">tw</div>
                   <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white cursor-pointer transition-colors">ig</div>
                 </div>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="lg:w-2/3">
             
             {/* Navigation Tabs */}
             <div className="flex overflow-x-auto border-b border-gray-200 mb-8 pb-px">
               {[
                 { id: 'about', label: 'About Company' },
                 { id: 'jobs', label: 'Open Positions' },
                 { id: 'reviews', label: 'Reviews & Ratings' },
                 { id: 'stories', label: 'Life & Stories' },
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`px-6 py-4 font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}
                 >
                   {tab.label}
                 </button>
               ))}
             </div>

             {/* Tab 1: About Company */}
             {activeTab === 'about' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                   <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
                   <p className="text-gray-600 leading-relaxed mb-6">
                     TechNova Solutions is a global leader in cloud infrastructure and enterprise software. We build scalable, secure, and intuitive platforms that help businesses transition to the cloud seamlessly. Our mission is to democratize technology access and foster innovation in every sector.
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                     <div className="bg-blue-50 p-6 rounded-2xl">
                       <h3 className="text-xl font-bold text-blue-900 mb-2">Our Mission</h3>
                       <p className="text-blue-800 text-sm">To empower every organization on the planet to achieve more through reliable and accessible cloud infrastructure.</p>
                     </div>
                     <div className="bg-purple-50 p-6 rounded-2xl">
                       <h3 className="text-xl font-bold text-purple-900 mb-2">Our Vision</h3>
                       <p className="text-purple-800 text-sm">A world where technology operates silently in the background, allowing human creativity to thrive at the forefront.</p>
                     </div>
                   </div>

                   <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Core Values</h3>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                     <li className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Innovation First</li>
                     <li className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Customer Obsession</li>
                     <li className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Integrity & Trust</li>
                     <li className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Diversity & Inclusion</li>
                   </ul>
                 </div>

                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                   <h2 className="text-2xl font-bold text-gray-900 mb-4">CSR & Culture</h2>
                   <p className="text-gray-600 mb-4">
                     <strong>Diversity & Inclusion:</strong> We believe a diverse workforce builds better products. Our ERGs (Employee Resource Groups) actively shape our policies.
                   </p>
                   <p className="text-gray-600 mb-4">
                     <strong>Corporate Social Responsibility:</strong> TechNova has committed to being 100% carbon neutral by 2030 and donates 1% of equity to global education initiatives.
                   </p>
                 </div>
               </div>
             )}

             {/* Tab 2: Open Positions */}
             {activeTab === 'jobs' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Job Openings (12)</h2>
                 
                 {[
                   { title: "Senior React Developer", type: "Full-Time", location: "Remote" },
                   { title: "Backend Engineer (Node.js)", type: "Contract", location: "San Francisco, CA" },
                   { title: "Marketing Intern", type: "Internship", location: "New York, NY" },
                   { title: "Product Designer", type: "Full-Time", location: "Remote" }
                 ].map((job, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-blue-300 transition-colors">
                     <div>
                       <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
                       <div className="flex gap-3 text-sm text-gray-500 font-medium">
                         <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> {job.type}</span>
                         <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {job.location}</span>
                       </div>
                     </div>
                     <button className="px-6 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                       Apply Now
                     </button>
                   </div>
                 ))}
                 <button className="w-full py-4 text-center font-bold text-gray-600 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors mt-4">
                   View All 12 Openings
                 </button>
               </div>
             )}

             {/* Tab 3: Reviews */}
             {activeTab === 'reviews' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Ratings</h2>
                   
                   <div className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-100 pb-8 mb-8">
                     <div className="text-center">
                       <div className="text-6xl font-black text-gray-900 mb-2">4.8</div>
                       <div className="text-yellow-400 text-2xl tracking-widest mb-1">★★★★★</div>
                       <div className="text-gray-500 text-sm font-medium">Based on 1,245 reviews</div>
                     </div>
                     <div className="flex-grow space-y-3 w-full">
                       {[
                         { label: 'Work-Life Balance', score: '4.9' },
                         { label: 'Salary & Benefits', score: '4.7' },
                         { label: 'Career Growth', score: '4.8' },
                         { label: 'Management', score: '4.6' },
                         { label: 'Job Security', score: '4.8' },
                       ].map(rating => (
                         <div key={rating.label} className="flex items-center justify-between text-sm">
                           <span className="w-1/3 text-gray-600 font-medium">{rating.label}</span>
                           <div className="w-1/2 bg-gray-100 rounded-full h-2 overflow-hidden mx-4">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(parseFloat(rating.score) / 5) * 100}%` }}></div>
                           </div>
                           <span className="font-bold text-gray-900">{rating.score}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <h3 className="font-bold text-xl text-gray-900 mb-4">Employee Reviews</h3>
                   <div className="space-y-6">
                     <div className="border border-gray-100 p-6 rounded-2xl">
                       <div className="flex justify-between items-start mb-4">
                         <div>
                           <div className="font-bold text-gray-900">Great place to learn and grow</div>
                           <div className="text-sm text-gray-500">Software Engineer • Current Employee</div>
                         </div>
                         <div className="text-yellow-400 text-lg">★★★★★</div>
                       </div>
                       <div className="space-y-3 text-sm">
                         <div><strong className="text-green-600">Pros:</strong> Amazing work culture, flexible hours, and cutting-edge tech stack. Management is very supportive.</div>
                         <div><strong className="text-red-600">Cons:</strong> Can be fast-paced during product launches, which might require extra hours occasionally.</div>
                         <div className="pt-2 text-gray-500 italic border-t border-gray-50 mt-2">✓ Recommends this company</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {/* Tab 4: Stories */}
             {activeTab === 'stories' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 group cursor-pointer">
                     <div className="h-48 bg-gray-200 relative overflow-hidden">
                       {/* Placeholder for video/image */}
                       <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center backdrop-blur text-blue-600 pl-1">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                          </div>
                       </div>
                     </div>
                     <div className="p-6">
                       <h3 className="font-bold text-gray-900 mb-2">Office Tour: San Francisco HQ</h3>
                       <p className="text-sm text-gray-600">Take a look inside our newly renovated headquarters featuring collaborative spaces and a rooftop garden.</p>
                     </div>
                   </div>

                   <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
                     <div className="h-48 bg-purple-100 flex items-center justify-center text-4xl">📸</div>
                     <div className="p-6">
                       <h3 className="font-bold text-gray-900 mb-2">Annual Hackathon 2025</h3>
                       <p className="text-sm text-gray-600">Our engineering team innovating and building internal tools over a 48-hour coding sprint.</p>
                     </div>
                   </div>
                 </div>

                 <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                   <h2 className="text-2xl font-bold text-blue-900 mb-4">Employee Testimonial</h2>
                   <blockquote className="text-lg text-blue-800 italic mb-6">
                     "Joining TechNova was the best career decision I've made. The sheer scale of problems we solve on a daily basis is incredible, and the support from leadership ensures you never feel overwhelmed."
                   </blockquote>
                   <div className="font-bold text-blue-900">— Sarah Jenkins, Engineering Manager</div>
                 </div>
               </div>
             )}

          </div>
        </div>
      </main>
    </div>
  );
}
