import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data database
const jobsData = [
  { id: 1, title: "Senior React Developer", company: "TechNova Solutions", location: "San Francisco, CA (Remote)", type: "Full-Time", salary: "$120k - $160k", experience: "5+ Years", tags: ["React", "TypeScript", "Next.js", "GraphQL"], desc: "TechNova Solutions is looking for a passionate Senior React Developer to lead the frontend development of our core enterprise application. You will be part of an autonomous, cross-functional team working on solving complex UI challenges and delivering a seamless user experience to millions of users worldwide." },
  { id: 2, title: "Backend Engineer", company: "DataFlow Systems", location: "New York, NY", type: "Full-Time", salary: "$130k - $170k", experience: "4+ Years", tags: ["Node.js", "Python", "AWS", "SQL"], desc: "Join our scalable backend team to build APIs that handle millions of requests per day. You will design, develop, and maintain robust microservices, optimize database queries, and ensure high availability of our systems." },
  { id: 3, title: "UI/UX Designer", company: "Creative Minds", location: "London, UK (Hybrid)", type: "Contract", salary: "$80k - $100k", experience: "3+ Years", tags: ["Figma", "Prototyping", "User Research", "Adobe XD"], desc: "Looking for a creative designer to revamp our core product interface. Must have a strong portfolio demonstrating user-centric design, wireframing, and the ability to conduct user testing sessions." },
  { id: 4, title: "Data Scientist", company: "AI Analytics", location: "Remote", type: "Full-Time", salary: "$140k - $180k", experience: "2+ Years", tags: ["Machine Learning", "Python", "SQL", "TensorFlow"], desc: "Help us extract actionable insights from big data. You will design and deploy predictive models to improve our customer retention and build data pipelines to scale our AI solutions." },
  { id: 5, title: "Product Manager", company: "Global Tech", location: "Austin, TX", type: "Full-Time", salary: "$110k - $150k", experience: "6+ Years", tags: ["Agile", "Strategy", "Leadership", "Jira"], desc: "We need a visionary Product Manager to own our SaaS platform roadmap from ideation to launch, working closely with engineering and marketing to deliver product-market fit." }
];

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = parseInt(params.id);
  const job = jobsData.find(j => j.id === jobId);

  if (!job) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
          <div className="hidden md:flex gap-6 font-medium text-gray-600 text-sm">
             <Link href="/jobs" className="text-blue-600 font-bold">Jobs</Link>
          </div>
          <Link href="/jobs" className="text-sm font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">&larr; Back to Search</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
             {/* Header Card */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-600 flex-shrink-0">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <Link href="/companies/1" className="text-lg text-blue-600 font-medium hover:underline">{job.company}</Link>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600 font-medium">
                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {job.location}</span>
                      <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Posted recently</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-6">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Salary</div>
                    <div className="font-bold text-gray-900">{job.salary}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Experience</div>
                    <div className="font-bold text-gray-900">{job.experience}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Job Type</div>
                    <div className="font-bold text-gray-900">{job.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Work Setup</div>
                    <div className="font-bold text-gray-900">{job.location.includes('Remote') ? 'Remote' : job.location.includes('Hybrid') ? 'Hybrid' : 'On-Site'}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                   {job.tags.map(tag => (
                     <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">{tag}</span>
                   ))}
                </div>
             </div>

             {/* Description Sections */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
               <section>
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                 <p className="text-gray-600 leading-relaxed">
                   {job.desc}
                 </p>
               </section>

               <section>
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                 <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed marker:text-blue-500">
                   <li>Collaborate closely with product managers, UX designers, and backend engineers.</li>
                   <li>Participate in code reviews to maintain high code quality standards.</li>
                   <li>Optimize for maximum performance and user experience.</li>
                   <li>Develop features using modern best practices and methodologies.</li>
                 </ul>
               </section>

               <section>
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex items-start gap-3">
                     <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                     <span className="text-gray-600">Comprehensive health and dental insurance</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                     <span className="text-gray-600">Unlimited PTO and flexible working hours</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                     <span className="text-gray-600">Annual learning and development stipend</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                     <span className="text-gray-600">401(k) matching up to 5%</span>
                   </div>
                 </div>
               </section>
             </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              
              {/* Actions Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <button className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mb-4">
                  Apply Now
                </button>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    Save Job
                  </button>
                  <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    Share
                  </button>
                </div>
              </div>

              {/* Company Info Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">About the Company</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500">{job.company.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-gray-900">{job.company}</div>
                    <div className="text-sm text-blue-600 font-medium">View Profile</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{job.company} is a leading provider in its industry, empowering businesses and customers globally through innovative solutions.</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Founded</span> <span className="font-semibold text-gray-900">2010</span></div>
                  <div className="flex justify-between"><span>Employees</span> <span className="font-semibold text-gray-900">500-1000</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
