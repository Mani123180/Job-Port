import Link from "next/link";
import ShinyText from "../components/ShinyText";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-100 overflow-hidden selection:bg-violet-500/30">
      {/* Navigation */}
      <Navbar theme="dark" />

      <main className="flex-grow">
        {/* Large Hero Banner with Glowing Wave Background */}
        <section className="relative pt-32 pb-40 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Glowing Background Elements */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none overflow-hidden">
            <div className="absolute w-full max-w-[1200px] h-[300px] bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 opacity-20 blur-[120px] rounded-full top-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[600px] h-[200px] bg-violet-500 opacity-10 blur-[100px] rounded-full top-1/2 -translate-y-1/2 mix-blend-screen"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">

            
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-100 mb-8 leading-[1.1]">
              Discover Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">Dream Career</span> Today
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Connect with top companies, explore thousands of opportunities, and take the next step in your career journey with confidence.
            </p>
            
            {/* Job Search */}
            <div className="bg-slate-900/50 backdrop-blur-md p-4 md:p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-3 md:gap-2 max-w-4xl mx-auto border border-slate-800 transform transition-all hover:border-violet-500/30">
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="flex-grow px-6 py-4 rounded-2xl md:rounded-full bg-slate-950/30 md:bg-transparent border border-slate-800 md:border-transparent text-slate-100 placeholder-slate-500 focus:bg-slate-900/30 focus:ring-0 outline-none transition-all text-lg"
              />
              <div className="h-10 w-px bg-slate-800 hidden md:block self-center"></div>
              <input 
                type="text" 
                placeholder="City, state, or remote" 
                className="flex-grow px-6 py-4 rounded-2xl md:rounded-full bg-slate-950/30 md:bg-transparent border border-slate-800 md:border-transparent text-slate-100 placeholder-slate-500 focus:bg-slate-900/30 focus:ring-0 outline-none transition-all text-lg"
              />
              <Link href="/jobs" className="px-10 py-4 bg-violet-600 text-white font-bold text-lg rounded-2xl md:rounded-full hover:bg-violet-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center">
                Search
              </Link>
            </div>
            
          </div>
        </section>

        {/* Top Companies */}
        <section className="py-12 border-y border-slate-900 bg-slate-900/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider md:tracking-widest uppercase mb-8 whitespace-nowrap"><ShinyText text="Trusted by industry leaders" speed={2} color="#64748b" shineColor="#e2e8f0" /></h2>
            <div className="overflow-hidden w-full relative">
              <div className="flex w-[200%] animate-[marqueeRight_20s_linear_infinite] opacity-50 grayscale hover:grayscale-0 transition-all duration-500 hover:[animation-play-state:paused]">
                {/* First Set */}
                <div className="w-1/2 flex justify-around items-center">
                  <div className="text-2xl font-black text-slate-200">Google</div>
                  <div className="text-2xl font-black text-slate-200">Microsoft</div>
                  <div className="text-2xl font-black text-slate-200">Amazon</div>
                  <div className="text-2xl font-black text-slate-200">Netflix</div>
                  <div className="text-2xl font-black text-slate-200">Meta</div>
                </div>
                {/* Second Set (Duplicate for smooth infinite scroll) */}
                <div className="w-1/2 flex justify-around items-center">
                  <div className="text-2xl font-black text-slate-200">Google</div>
                  <div className="text-2xl font-black text-slate-200">Microsoft</div>
                  <div className="text-2xl font-black text-slate-200">Amazon</div>
                  <div className="text-2xl font-black text-slate-200">Netflix</div>
                  <div className="text-2xl font-black text-slate-200">Meta</div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Featured & Latest Jobs */}
        <section className="py-24 bg-slate-900/20 relative border-t border-slate-900">
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4"><ShinyText text="Featured Jobs" speed={2} color="#f1f5f9" shineColor="#8b5cf6" /></h2>
              <p className="text-lg text-slate-400">Hand-picked opportunities from top employers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, title: 'Senior Product Designer', company: 'TechNova Inc.', location: 'San Francisco, CA', tags: ['Figma', 'UI/UX', '$120k-$150k'], type: 'FULL TIME' },
                { id: 2, title: 'Frontend Developer', company: 'WebSphere Ltd.', location: 'Remote', tags: ['React', 'Next.js', '$100k-$130k'], type: 'FULL TIME' },
                { id: 3, title: 'Backend Engineer', company: 'DataFlow Systems', location: 'New York, NY', tags: ['Node.js', 'PostgreSQL', '$130k-$160k'], type: 'CONTRACT' },
                { id: 4, title: 'Marketing Manager', company: 'GrowthX', location: 'Austin, TX', tags: ['SEO', 'Content', '$90k-$110k'], type: 'FULL TIME' },
                { id: 5, title: 'Data Scientist', company: 'AI Core', location: 'Seattle, WA', tags: ['Python', 'Machine Learning', '$140k-$180k'], type: 'FULL TIME' },
                { id: 6, title: 'DevOps Engineer', company: 'CloudNet', location: 'Remote', tags: ['AWS', 'Kubernetes', '$125k-$155k'], type: 'FULL TIME' },
              ].map((job) => (
                <div key={job.id} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 hover:border-violet-500/50 hover:bg-slate-900/50 transition-all group backdrop-blur-md">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center text-xl font-bold text-slate-200 border border-slate-700">
                      C{job.id}
                    </div>
                    <span className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-violet-500/20">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-violet-400 transition-colors">{job.title}</h3>
                  <p className="text-slate-400 mb-4 font-medium">{job.company} • {job.location}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/jobs/${job.id}`} className="block w-full py-3 text-center text-slate-200 font-bold border border-slate-700 rounded-xl hover:bg-violet-600 hover:border-violet-500 hover:text-white transition-all">
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
               <Link href="/jobs" className="inline-flex px-8 py-4 bg-slate-800 text-slate-200 font-bold rounded-full hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">
                View All Jobs
              </Link>
            </div>
          </div>
        </section>

        {/* CTAs: Resume Builder & Interview Prep */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-12 rounded-3xl relative overflow-hidden backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4"><ShinyText text="Build Your Resume" speed={2} color="#e2e8f0" shineColor="#6366f1" /></h3>
                  <p className="text-slate-400 mb-8 text-lg">Create a professional resume in minutes with our AI-powered builder and land your dream job faster.</p>
                  <Link href="/resume-builder" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    Build Resume Now
                  </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 grayscale">📄</div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-12 rounded-3xl relative overflow-hidden backdrop-blur-sm group hover:border-violet-500/30 transition-all">
                <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4"><ShinyText text="Interview Preparation" speed={2} color="#e2e8f0" shineColor="#8b5cf6" /></h3>
                  <p className="text-slate-400 mb-8 text-lg">Practice with mock interviews, coding challenges, and HR questions curated by industry experts.</p>
                  <Link href="/interview-prep" className="inline-block px-8 py-4 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                    Start Practicing
                  </Link>
                </div>
                <div className="absolute -right-10 -bottom-10 text-9xl opacity-5 grayscale">🎯</div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics & Newsletter */}
        <section className="py-24 relative overflow-hidden border-t border-slate-900">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/30 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center md:text-left">
              <div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">10k+</div>
                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Active Jobs</div>
              </div>
              <div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">500+</div>
                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Companies</div>
              </div>
              <div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">2M+</div>
                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Candidates</div>
              </div>
              <div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">150+</div>
                <div className="text-slate-500 font-medium uppercase tracking-wider text-sm">Countries</div>
              </div>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800 p-12 rounded-3xl backdrop-blur-md relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4"><ShinyText text="Never Miss an Opportunity" speed={2} color="#e2e8f0" shineColor="#8b5cf6" /></h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">Subscribe to our newsletter to get the latest job alerts, career tips, and market insights delivered to your inbox.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input type="email" placeholder="Enter your email address" className="flex-grow px-6 py-4 rounded-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all" required />
                  <button type="submit" className="px-8 py-4 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="text-3xl font-extrabold tracking-tighter mb-6 flex items-center gap-2">
                <span className="text-slate-100">Job</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Portal</span>
              </Link>
              <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-md">Connecting talent with opportunity across the globe. Your next great adventure starts here. Find jobs, build your resume, and prepare for interviews all in one place.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-slate-800 hover:text-white hover:border-slate-700 cursor-pointer transition-all">in</div>
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-slate-800 hover:text-white hover:border-slate-700 cursor-pointer transition-all">tw</div>
                <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center hover:bg-slate-800 hover:text-white hover:border-slate-700 cursor-pointer transition-all">fb</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">For Candidates</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><Link href="/jobs" className="hover:text-violet-400 transition-colors">Browse Jobs</Link></li>
                <li><Link href="/companies" className="hover:text-violet-400 transition-colors">Browse Companies</Link></li>
                <li><Link href="/internships" className="hover:text-violet-400 transition-colors">Internships</Link></li>
                <li><Link href="/resume-builder" className="hover:text-violet-400 transition-colors">Resume Builder</Link></li>
                <li><Link href="/seeker/dashboard" className="hover:text-violet-400 transition-colors">Candidate Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">For Employers</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><Link href="/employer/dashboard" className="hover:text-violet-400 transition-colors">Employer Dashboard</Link></li>
                <li><Link href="/employer/post-job" className="hover:text-violet-400 transition-colors">Post a Job</Link></li>
                <li><Link href="/pricing" className="hover:text-violet-400 transition-colors">Pricing</Link></li>
                <li><Link href="/admin/dashboard" className="hover:text-violet-400 transition-colors">Admin Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-200">Resources</h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><Link href="/resources" className="hover:text-violet-400 transition-colors">Career Advice</Link></li>
                <li><Link href="/interview-prep" className="hover:text-violet-400 transition-colors">Interview Prep</Link></li>
                <li><Link href="/faq" className="hover:text-violet-400 transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-violet-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-center text-slate-600 font-medium">
            <p className="mb-2">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
            <p>Designed &amp; Powered by <span className="text-violet-400 font-semibold">Zen4Tech Solutions</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
