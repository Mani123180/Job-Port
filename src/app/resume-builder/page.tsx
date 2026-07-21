"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

// Mock template data for categorization
const TEMPLATES = [
  { id: 1, name: "Classic Professional", category: "Professional", type: "classic" },
  { id: 2, name: "Executive Pro", category: "Professional", type: "classic" },
  { id: 3, name: "Modern Two-Column", category: "Modern", type: "modern" },
  { id: 4, name: "Startup Modern", category: "Modern", type: "modern" },
  { id: 5, name: "Minimal Clean", category: "Minimal", type: "minimal" },
  { id: 6, name: "Tech Minimalist", category: "Minimal", type: "minimal" },
  { id: 7, name: "Creative Header", category: "Creative", type: "creative" },
  { id: 8, name: "ATS Optimizer", category: "ATS-Friendly", type: "classic" },
];

export default function ResumeBuilderPage() {
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard', 'templates', 'editor', 'analytics'
  const [activeAccordion, setActiveAccordion] = useState("personal");
  const [activeTemplateCat, setActiveTemplateCat] = useState("All Templates");
  const [showAiModal, setShowAiModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Resume Data State for 2-way binding
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    experience: [
      { id: 1, company: "", title: "", startDate: "", endDate: "", desc: "" }
    ],
    skills: ""
  });

  const handleInputChange = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpChange = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  // Fake AI Generator
  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowAiModal(false);
      setResumeData(prev => ({
        ...prev,
        summary: "Results-driven Senior Software Engineer with 5+ years of experience designing and implementing scalable web applications using React and Next.js. Proven track record of improving system performance by 40% and leading cross-functional teams to deliver enterprise-grade software solutions on time."
      }));
      alert("AI optimization complete! Your summary has been professionally rewritten.");
    }, 2000);
  };

  // Dynamic ATS Score Calculation
  const analytics = useMemo(() => {
    let score = 0;
    const missing = [];

    // Basic Info Check
    if (resumeData.firstName && resumeData.lastName) score += 10;
    else missing.push({ type: 'error', text: 'Missing Full Name.' });

    if (resumeData.email && resumeData.phone) score += 15;
    else missing.push({ type: 'error', text: 'Missing Contact Information (Email or Phone).' });

    if (resumeData.linkedin) score += 5;
    else missing.push({ type: 'warning', text: 'Add your LinkedIn URL to boost credibility.' });

    // Summary Check
    if (resumeData.summary && resumeData.summary.length > 30) score += 20;
    else missing.push({ type: 'error', text: 'Professional Summary is too short or missing.' });

    // Experience Check
    if (resumeData.experience.length > 0 && resumeData.experience[0].desc && resumeData.experience[0].desc.length > 20) {
      score += 30;
      const descLower = resumeData.experience[0].desc.toLowerCase();
      if (!descLower.includes("led") && !descLower.includes("improved") && !descLower.includes("developed")) {
         missing.push({ type: 'warning', text: 'Use more strong action verbs in Experience (e.g., Led, Improved, Developed).' });
      }
    } else {
       missing.push({ type: 'error', text: 'Missing Work Experience details or responsibilities.' });
    }

    // Skills Check
    if (resumeData.skills && resumeData.skills.split(',').length >= 3) {
      score += 20;
    } else {
      missing.push({ type: 'warning', text: 'Add at least 3 distinct skills to pass ATS keyword filters.' });
    }

    return { score, missing };
  }, [resumeData]);

  // Filter Templates
  const filteredTemplates = TEMPLATES.filter(t => activeTemplateCat === "All Templates" || t.category === activeTemplateCat);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Builder Top Nav */}
      <header className="bg-white border-b border-gray-200 py-3 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-extrabold text-blue-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
            <div className="hidden md:flex bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setActiveView('dashboard')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeView === 'dashboard' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Dashboard</button>
              <button onClick={() => setActiveView('templates')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeView === 'templates' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Templates</button>
              <button onClick={() => setActiveView('editor')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeView === 'editor' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Editor</button>
              <button onClick={() => setActiveView('analytics')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeView === 'analytics' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Analytics</button>
            </div>
          </div>
          
          <div className="flex gap-2">
             {activeView === 'editor' && (
               <>
                 <button onClick={() => setShowAiModal(true)} className="hidden md:flex px-4 py-2 bg-purple-100 text-purple-700 font-bold rounded-lg text-sm items-center gap-2 hover:bg-purple-200 transition-colors">
                   ✨ AI Assistant
                 </button>
                 <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 hidden md:block">Save Draft</button>
                 <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm shadow-sm hover:bg-blue-700 flex items-center gap-2">
                   Download <span className="text-blue-200 text-xs">(PDF / DOCX)</span>
                 </button>
               </>
             )}
          </div>
        </div>
      </header>

      {/* VIEWS */}
      
      {/* 1. Dashboard View */}
      {activeView === 'dashboard' && (
        <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
              <p className="text-gray-500">Manage and track your application documents.</p>
            </div>
            <button onClick={() => setActiveView('templates')} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
              <span className="text-xl">+</span> Create New Resume
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resume Card (Dynamic Score) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
               <div className="aspect-[1/1.4] bg-gray-100 rounded-xl mb-4 relative overflow-hidden border border-gray-200">
                 <div className="absolute inset-0 bg-white shadow-sm p-4 m-2 rounded-lg opacity-80 pointer-events-none text-[6px] font-serif">
                   <div className="font-bold text-[8px] mb-1">{resumeData.firstName} {resumeData.lastName}</div>
                   <div className="text-blue-600 mb-2">{resumeData.title}</div>
                   <div className="bg-gray-200 h-px w-full mb-2"></div>
                   <div className="line-clamp-3 text-gray-500 mb-3">{resumeData.summary}</div>
                   <div className="font-bold border-b border-gray-200 mb-1">Experience</div>
                   <div className="text-gray-700 line-clamp-4">{resumeData.experience[0]?.desc}</div>
                 </div>
                 <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setActiveView('editor')} className="px-4 py-2 bg-white text-gray-900 font-bold rounded-lg text-sm mb-2 hover:bg-gray-100">Edit Resume</button>
                    <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700">Download</button>
                 </div>
               </div>
               <h3 className="font-bold text-gray-900 line-clamp-1">{resumeData.title || "Untitled Resume"}</h3>
               <p className="text-xs text-gray-500 mb-3">Last edited: Just now</p>
               <div className="flex items-center gap-2">
                 <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full transition-all" style={{width: `${analytics.score}%`}}></div></div>
                 <span className="text-xs font-bold text-green-600">{analytics.score}%</span>
               </div>
            </div>

            {/* Blank Create Card */}
            <div onClick={() => setActiveView('templates')} className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer min-h-[300px]">
               <div className="text-4xl mb-2">+</div>
               <div className="font-bold">Create New</div>
            </div>
          </div>
        </main>
      )}

      {/* 2. Templates View (Dynamic Filtering) */}
      {activeView === 'templates' && (
        <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl animate-in fade-in duration-300">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose a Template</h1>
            <p className="text-gray-500 text-lg">Select an ATS-friendly design to start building your resume.</p>
          </div>

          <div className="flex overflow-x-auto gap-4 mb-8 pb-2 justify-center">
             {['All Templates', 'Professional', 'Modern', 'Minimal', 'Creative', 'ATS-Friendly'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveTemplateCat(cat)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${activeTemplateCat === cat ? 'bg-gray-900 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {filteredTemplates.map(temp => (
               <div key={temp.id} className="group cursor-pointer">
                 <div className="aspect-[1/1.4] bg-white border border-gray-200 rounded-xl shadow-sm mb-4 relative overflow-hidden group-hover:border-blue-500 transition-colors flex flex-col">
                    
                    {/* Render different mock visuals based on type */}
                    {temp.type === 'classic' && (
                      <div className="p-4 w-full h-full">
                        <div className="text-center border-b-2 border-gray-900 pb-2 mb-2">
                          <div className="font-bold text-gray-900 text-xs tracking-widest uppercase">{temp.name}</div>
                          <div className="bg-gray-300 h-1 w-1/2 mx-auto mt-2"></div>
                        </div>
                        <div className="bg-gray-200 h-1 w-full mb-1"></div>
                        <div className="bg-gray-200 h-1 w-full mb-1"></div>
                        <div className="bg-gray-200 h-1 w-3/4 mb-3"></div>
                        <div className="bg-gray-400 h-2 w-1/3 mb-2"></div>
                        <div className="bg-gray-200 h-12 w-full mb-2"></div>
                      </div>
                    )}

                    {temp.type === 'modern' && (
                      <div className="flex w-full h-full">
                        <div className="w-1/3 bg-blue-50 h-full p-2 border-r border-blue-100">
                          <div className="w-8 h-8 rounded-full bg-blue-200 mx-auto mb-2"></div>
                          <div className="bg-blue-300 h-1 w-full mb-1"></div>
                          <div className="bg-blue-300 h-1 w-3/4 mb-4"></div>
                        </div>
                        <div className="w-2/3 p-2">
                          <div className="font-bold text-[8px] text-gray-800 mb-1">{temp.name}</div>
                          <div className="bg-gray-400 h-1 w-1/2 mb-1"></div>
                          <div className="bg-gray-300 h-1 w-1/3 mb-4"></div>
                          <div className="bg-gray-200 h-1 w-full mb-1"></div>
                          <div className="bg-gray-200 h-1 w-full mb-1"></div>
                        </div>
                      </div>
                    )}

                    {temp.type === 'minimal' && (
                      <div className="p-4 w-full h-full">
                        <div className="text-left mb-4">
                          <div className="font-bold text-xs text-gray-800 mb-1">{temp.name}</div>
                          <div className="bg-gray-400 h-2 w-1/2 mb-1"></div>
                          <div className="bg-gray-200 h-1 w-1/3"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-1/4"><div className="bg-gray-300 h-1 w-full"></div></div>
                          <div className="w-3/4"><div className="bg-gray-200 h-12 w-full"></div></div>
                        </div>
                      </div>
                    )}

                    {temp.type === 'creative' && (
                      <div className="w-full h-full">
                        <div className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 w-full mb-2 flex items-center px-4">
                          <div className="text-white font-bold text-[8px]">{temp.name}</div>
                        </div>
                        <div className="px-4">
                          <div className="bg-gray-300 h-2 w-1/3 mb-4"></div>
                          <div className="bg-gray-200 h-1 w-full mb-1"></div>
                          <div className="bg-gray-200 h-1 w-full mb-1"></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <button onClick={() => setActiveView('editor')} className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">Use Template</button>
                    </div>
                 </div>
                 <h3 className="font-bold text-gray-900 text-center text-sm">{temp.name}</h3>
                 <p className="text-xs text-gray-500 text-center uppercase tracking-wider">{temp.category}</p>
               </div>
             ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No templates found in this category.
            </div>
          )}
        </main>
      )}

      {/* 3. Comprehensive Editor View */}
      {activeView === 'editor' && (
        <main className="flex-grow flex container mx-auto px-4 py-6 gap-6 h-[calc(100vh-73px)] animate-in fade-in duration-300">
          
          {/* Left Side: Extended Form Editor */}
          <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-y-auto p-4 custom-scrollbar">
             
             {/* Accordion List */}
             <div className="space-y-3">
               
               {/* Personal Info */}
               <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                 <button onClick={() => setActiveAccordion('personal')} className={`w-full p-4 flex justify-between items-center font-bold transition-colors ${activeAccordion === 'personal' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                   <span>1. Personal Information</span>
                   <span>{activeAccordion === 'personal' ? '−' : '+'}</span>
                 </button>
                 {activeAccordion === 'personal' && (
                   <div className="p-5 bg-white grid grid-cols-2 gap-4">
                     <div><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">First Name</label><input type="text" value={resumeData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter First Name" /></div>
                     <div><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Last Name</label><input type="text" value={resumeData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Last Name" /></div>
                     <div><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Professional Title</label><input type="text" value={resumeData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Professional Title" /></div>
                     <div><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Email</label><input type="email" value={resumeData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Email" /></div>
                     <div><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Phone</label><input type="text" value={resumeData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Phone Number" /></div>
                     <div className="col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1 uppercase">LinkedIn URL</label><input type="text" value={resumeData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter LinkedIn URL" /></div>
                   </div>
                 )}
               </div>

               {/* Summary */}
               <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                 <button onClick={() => setActiveAccordion('summary')} className={`w-full p-4 flex justify-between items-center font-bold transition-colors ${activeAccordion === 'summary' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                   <span>2. Professional Summary</span>
                   <span>{activeAccordion === 'summary' ? '−' : '+'}</span>
                 </button>
                 {activeAccordion === 'summary' && (
                   <div className="p-5 bg-white">
                     <div className="flex justify-between items-end mb-2">
                       <label className="block text-xs font-bold text-gray-600 uppercase">Summary Statement</label>
                       <button onClick={() => setShowAiModal(true)} className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:underline bg-purple-50 px-2 py-1 rounded">✨ Generate with AI</button>
                     </div>
                     <textarea rows={5} value={resumeData.summary} onChange={(e) => handleInputChange('summary', e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write a brief overview of your career..."></textarea>
                   </div>
                 )}
               </div>

               {/* Experience */}
               <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                 <button onClick={() => setActiveAccordion('experience')} className={`w-full p-4 flex justify-between items-center font-bold transition-colors ${activeAccordion === 'experience' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                   <span>3. Work Experience</span>
                   <span>{activeAccordion === 'experience' ? '−' : '+'}</span>
                 </button>
                 {activeAccordion === 'experience' && (
                   <div className="p-5 bg-white">
                     {resumeData.experience.map(exp => (
                        <div key={exp.id} className="border border-gray-200 p-4 rounded-xl mb-4 bg-gray-50">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Company</label><input type="text" value={exp.company} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Job Title</label><input type="text" value={exp.title} onChange={e => handleExpChange(exp.id, 'title', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Start Date</label><input type="text" value={exp.startDate} onChange={e => handleExpChange(exp.id, 'startDate', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Jan 2020" /></div>
                            <div><label className="block text-xs font-bold text-gray-600 mb-1">End Date</label><input type="text" value={exp.endDate} onChange={e => handleExpChange(exp.id, 'endDate', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Present" /></div>
                          </div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Responsibilities & Achievements</label>
                          <textarea rows={3} value={exp.desc} onChange={e => handleExpChange(exp.id, 'desc', e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                     ))}
                     <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">+ Add Another Experience</button>
                   </div>
                 )}
               </div>

               {/* Skills */}
               <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                 <button onClick={() => setActiveAccordion('skills')} className={`w-full p-4 flex justify-between items-center font-bold transition-colors ${activeAccordion === 'skills' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                   <span>4. Skills & Languages</span>
                   <span>{activeAccordion === 'skills' ? '−' : '+'}</span>
                 </button>
                 {activeAccordion === 'skills' && (
                   <div className="p-5 bg-white">
                     <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Technical & Soft Skills (comma separated)</label>
                     <textarea rows={2} value={resumeData.skills} onChange={(e) => handleInputChange('skills', e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="React, Python, Communication..."></textarea>
                   </div>
                 )}
               </div>
             </div>
          </div>

          {/* Right Side: Live Preview & Toolbar */}
          <div className="w-1/2 bg-gray-800 rounded-2xl flex flex-col overflow-hidden relative">
             {/* Toolbar */}
             <div className="bg-gray-900 px-4 py-3 flex justify-between items-center text-white text-sm border-b border-gray-700 shadow-sm z-10">
               <div className="flex gap-4 items-center">
                 <span className="text-gray-400 font-medium">Zoom</span>
                 <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                   <button className="px-3 py-1 hover:bg-gray-700">−</button>
                   <span className="px-3 py-1 font-bold">100%</span>
                   <button className="px-3 py-1 hover:bg-gray-700">+</button>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-gray-400 text-xs">Auto-saved just now</span>
               </div>
             </div>

             {/* Live A4 Preview */}
             <div className="flex-grow flex justify-center p-8 overflow-y-auto custom-scrollbar relative">
                
                {/* Simulated A4 Paper linked to state */}
                <div className="w-full max-w-[500px] h-max min-h-[707px] bg-white shadow-2xl p-8 text-gray-900 font-serif relative">
                   <h1 className="text-3xl font-bold uppercase mb-1">{resumeData.firstName || "First Name"} {resumeData.lastName || "Last Name"}</h1>
                   <div className="text-md text-blue-700 mb-3 font-semibold">{resumeData.title || "Professional Title"}</div>
                   <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-600 mb-4 border-b pb-3">
                     <span>{resumeData.email || "email@example.com"}</span>
                     <span>• {resumeData.phone || "+1 (555) 000-0000"}</span>
                     <span>• {resumeData.linkedin || "linkedin.com/in/username"}</span>
                   </div>
                   
                   <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-1 uppercase tracking-wider">Summary</h2>
                   <p className="text-[11px] mb-4 text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                     {resumeData.summary || "Your professional summary will appear here. Write a brief overview of your career and goals."}
                   </p>
                   
                   <h2 className="text-sm font-bold border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">Experience</h2>
                   <div className="space-y-4 mb-4">
                     {resumeData.experience.map(exp => (
                       <div key={exp.id}>
                         <div className="flex justify-between items-baseline mb-0.5">
                           <h3 className="font-bold text-xs">{exp.title || "Job Title"}</h3>
                           <span className="text-[10px] text-gray-500">{exp.startDate || "Start Date"} - {exp.endDate || "End Date"}</span>
                         </div>
                         <div className="text-[11px] text-blue-700 font-semibold mb-1.5">{exp.company || "Company Name"}</div>
                         <p className="text-[11px] text-gray-700 whitespace-pre-wrap pl-2 border-l-2 border-gray-200">
                           {exp.desc || "List your key responsibilities and achievements here..."}
                         </p>
                       </div>
                     ))}
                   </div>

                   <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-1 uppercase tracking-wider">Skills</h2>
                   <p className="text-[11px] text-gray-700 break-words">
                     {resumeData.skills || "Your technical and soft skills will appear here."}
                   </p>
                </div>

             </div>
          </div>
        </main>
      )}

      {/* 4. Dynamic Analytics View */}
      {activeView === 'analytics' && (
        <main className="container mx-auto px-4 py-12 flex-grow max-w-5xl animate-in fade-in duration-300">
           <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dynamic ATS Analytics</h1>
            <p className="text-gray-500 text-lg">See how your live resume performs against industry-standard Applicant Tracking Systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
              <div className={`text-7xl font-black mb-4 transition-colors ${analytics.score >= 80 ? 'text-green-500' : analytics.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                {analytics.score}<span className="text-3xl text-gray-400">/100</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ATS Compatibility Score</h3>
              <p className="text-gray-500 text-sm">
                {analytics.score >= 80 ? "Excellent! Your resume is highly compatible with ATS filters." : 
                 analytics.score >= 50 ? "Good, but you need to add more details to pass strict ATS filters." : 
                 "Critical: Your resume lacks the minimum information required for ATS systems."}
              </p>
              <button onClick={() => setActiveView('editor')} className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors">Fix Issues in Editor</button>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Completion</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-grow bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${analytics.score >= 80 ? 'bg-green-500' : analytics.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${analytics.score}%`}}></div>
                </div>
                <span className={`font-bold text-xl ${analytics.score >= 80 ? 'text-green-500' : analytics.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{analytics.score}%</span>
              </div>
              
              <h4 className="font-bold text-gray-900 text-sm mb-3">Action Items to Improve Score:</h4>
              
              {analytics.missing.length === 0 ? (
                <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3">
                  <span className="text-xl">✅</span> No missing sections! Your resume looks great.
                </div>
              ) : (
                <ul className="space-y-3">
                  {analytics.missing.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm p-3 rounded-xl border ${item.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                      <span className={`font-bold text-lg leading-none ${item.type === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>!</span> 
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      )}

      {/* AI Modal Overlay */}
      {showAiModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
             {isGenerating && (
               <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-10">
                 <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                 <div className="font-bold text-purple-900">AI is analyzing your profile...</div>
                 <div className="text-sm text-gray-500 mt-2">Optimizing keywords for ATS systems</div>
               </div>
             )}
             
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4">✨</div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Resume Assistant</h2>
             <p className="text-gray-600 text-sm mb-6">Let our AI analyze your current input and generate a highly optimized professional summary and keyword list tailored for ATS tracking.</p>
             
             <div className="space-y-3 mb-8">
               <label className="flex items-center gap-3 p-3 border border-purple-200 rounded-xl bg-purple-50 cursor-pointer">
                 <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 focus:ring-purple-500" />
                 <span className="font-semibold text-purple-900 text-sm">Rewrite Professional Summary</span>
               </label>
               <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                 <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 focus:ring-purple-500" />
                 <span className="font-semibold text-gray-700 text-sm">Improve Action Verbs</span>
               </label>
               <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                 <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 focus:ring-purple-500" />
                 <span className="font-semibold text-gray-700 text-sm">Check Grammar & Spelling</span>
               </label>
             </div>

             <div className="flex gap-3">
               <button onClick={() => setShowAiModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
               <button onClick={handleGenerateAI} className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700">Optimize Now</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
