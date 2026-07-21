"use client";

import Link from "next/link";
import { useState } from "react";

export default function InterviewPrepPage() {
  const [activeCategory, setActiveCategory] = useState("hr");
  const [mockState, setMockState] = useState("idle"); // idle, starting, active, finished
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const mockQuestions = [
    { q: "Tell me about yourself.", tips: "Keep it under 2 minutes. Start with your present, touch on your past, and finish with your future goals aligning with this company." },
    { q: "What is your greatest strength?", tips: "Choose a strength that is highly relevant to the job description and back it up with a specific, quantifiable example." },
    { q: "Describe a difficult challenge you overcame.", tips: "Use the STAR method: Situation, Task, Action, Result. Focus 70% of your answer on the Action and Result." }
  ];

  const startMockInterview = () => {
    setMockState("starting");
    setTimeout(() => {
      setMockState("active");
      setCurrentQIndex(0);
      setShowAnswer(false);
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setMockState("finished");
    }
  };

  const categories = [
    { id: "hr", name: "HR Questions", icon: "🤝" },
    { id: "tech", name: "Technical Questions", icon: "💻" },
    { id: "aptitude", name: "Aptitude Tests", icon: "🧠" },
    { id: "coding", name: "Coding Challenges", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">Job<span className="text-gray-900">Portal</span></Link>
          <div className="hidden md:flex gap-6 font-medium text-gray-600 text-sm">
             <Link href="/interview-prep" className="text-blue-600 font-bold">Interview Prep</Link>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Ace Your Next Interview</h1>
          <p className="text-purple-200 text-lg mb-8">Practice with curated questions, take mock tests, and solve coding challenges designed by industry experts.</p>
          <button onClick={startMockInterview} className="px-8 py-4 bg-white text-purple-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105">
            Start a Mock Interview
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="lg:w-1/4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-900 px-4 mb-2">Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 font-semibold transition-colors ${activeCategory === cat.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            {activeCategory === 'hr' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Top HR Questions</h2>
                  
                  <div className="space-y-4">
                    {[
                      { q: "Tell me about yourself.", a: "Focus on your professional journey, highlight key achievements, and connect your past experience to the requirements of the job you're applying for." },
                      { q: "Why do you want to work here?", a: "Research the company beforehand. Mention specific products, their company culture, or recent news that genuinely interests you." },
                      { q: "What is your greatest weakness?", a: "Choose a real but manageable weakness, and more importantly, discuss the actionable steps you've taken to improve upon it." },
                      { q: "Where do you see yourself in 5 years?", a: "Align your career goals with the potential growth trajectory within the company. Show ambition but remain realistic." },
                      { q: "Why should we hire you?", a: "Highlight your unique skills and experiences that directly match the job description. Show enthusiasm and readiness to contribute immediately." },
                      { q: "Tell me about a time you overcame a challenge.", a: "Use the STAR method (Situation, Task, Action, Result). Clearly explain the problem, the specific actions you took, and the positive outcome." },
                      { q: "How do you handle stress and pressure?", a: "Give a concrete example of a stressful situation and explain the techniques you use to stay organized, focused, and calm." },
                      { q: "What are your salary expectations?", a: "Provide a realistic salary range based on market research for the role and your experience level. Express openness to negotiation." },
                      { q: "Why are you leaving your current job?", a: "Keep it positive. Focus on seeking new challenges, growth opportunities, or a better alignment with your long-term career goals." },
                      { q: "Do you have any questions for us?", a: "Always say yes! Ask about the team dynamics, the biggest challenges the company is facing right now, or the typical career path for this role." }
                    ].map((item, i) => (
                      <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                        <summary className="p-5 font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center hover:bg-gray-100 transition-colors">
                          {item.q}
                          <span className="text-purple-600 group-open:rotate-180 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </span>
                        </summary>
                        <div className="p-5 pt-0 text-gray-600 border-t border-gray-200 bg-white">
                          <p className="mt-4"><strong className="text-gray-900">How to answer:</strong> {item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'tech' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Questions</h2>
                  <div className="space-y-4">
                    {[
                      { q: "What is the Virtual DOM in React?", a: "It is a lightweight copy of the actual DOM. React uses it to batch updates and apply only the necessary changes to the real DOM, improving performance." },
                      { q: "Explain closures in JavaScript.", a: "A closure is a function that remembers the variables from its lexical scope even after the outer function has finished executing." },
                      { q: "What are the four pillars of Object-Oriented Programming (OOP)?", a: "Encapsulation, Abstraction, Inheritance, and Polymorphism." },
                      { q: "How does Node.js handle concurrency?", a: "Node.js uses an event-driven, non-blocking I/O model with a single-threaded event loop to handle multiple concurrent operations efficiently." },
                      { q: "What is the difference between SQL and NoSQL databases?", a: "SQL databases are relational and structured with predefined schemas, while NoSQL databases are non-relational, document-oriented, and highly flexible." }
                    ].map((item, i) => (
                      <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                        <summary className="p-5 font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center hover:bg-gray-100 transition-colors">
                          {item.q}
                          <span className="text-purple-600 group-open:rotate-180 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </span>
                        </summary>
                        <div className="p-5 pt-0 text-gray-600 border-t border-gray-200 bg-white">
                          <p className="mt-4"><strong className="text-gray-900">Answer:</strong> {item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeCategory === 'aptitude' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Aptitude Tests</h2>
                  <div className="space-y-4">
                    {[
                      { q: "If a train 120 meters long passes a pole in 6 seconds, what is its speed?", a: "Speed = Distance / Time = 120 / 6 = 20 meters per second." },
                      { q: "A can do work in 10 days, B can do it in 15 days. How long if they work together?", a: "(1/10) + (1/15) = (3+2)/30 = 5/30 = 1/6. Therefore, they will take 6 days." },
                      { q: "Find the missing number in the series: 2, 6, 12, 20, 30, ?", a: "The differences are 4, 6, 8, 10. The next difference is 12. So, 30 + 12 = 42." },
                      { q: "If CAT is coded as 3120, how is DOG coded?", a: "Based on alphabetical positions: D=4, O=15, G=7. So DOG is coded as 4157." }
                    ].map((item, i) => (
                      <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                        <summary className="p-5 font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center hover:bg-gray-100 transition-colors">
                          {item.q}
                          <span className="text-purple-600 group-open:rotate-180 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </span>
                        </summary>
                        <div className="p-5 pt-0 text-gray-600 border-t border-gray-200 bg-white">
                          <p className="mt-4"><strong className="text-gray-900">Solution:</strong> {item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'coding' && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Coding Challenges</h2>
                  <div className="space-y-4">
                    {[
                      { q: "Two Sum: Given an array and a target sum, return indices of two numbers.", a: "Use a Hash Map to store the difference between the target and current value as you iterate. Time complexity: O(n)." },
                      { q: "Reverse a Linked List.", a: "Maintain three pointers: prev, current, and next. Iterate through the list and reverse the 'next' links iteratively or recursively." },
                      { q: "Find the first non-repeating character in a string.", a: "Use a Hash Map or Array to count character frequencies, then iterate the string to find the first character with a count of 1." },
                      { q: "Merge two sorted arrays.", a: "Use two pointers starting from the beginning of both arrays. Compare elements and push the smaller one into a new array." }
                    ].map((item, i) => (
                      <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                        <summary className="p-5 font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center hover:bg-gray-100 transition-colors">
                          {item.q}
                          <span className="text-purple-600 group-open:rotate-180 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </span>
                        </summary>
                        <div className="p-5 pt-0 text-gray-600 border-t border-gray-200 bg-white">
                          <p className="mt-4"><strong className="text-gray-900">Approach:</strong> {item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mock Interview Overlay */}
      {mockState !== 'idle' && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden text-center">
            
            {mockState === 'starting' && (
              <div className="py-12">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Preparing your Mock Interview...</h2>
                <p className="text-gray-500">Setting up camera, microphone, and generating questions...</p>
              </div>
            )}

            {mockState === 'active' && (
              <div className="py-8">
                <div className="flex justify-between items-center mb-8">
                  <span className="bg-purple-100 text-purple-700 font-bold px-4 py-1 rounded-full text-sm">Question {currentQIndex + 1} of {mockQuestions.length}</span>
                  <button onClick={() => setMockState('idle')} className="text-gray-400 hover:text-gray-700 font-bold">End Session</button>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-12">"{mockQuestions[currentQIndex].q}"</h2>
                
                {showAnswer ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><span className="text-xl">💡</span> Expert Tip</h3>
                    <p className="text-green-700">{mockQuestions[currentQIndex].tips}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200 flex flex-col items-center justify-center min-h-[150px]">
                    <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-3 animate-pulse">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
                    </div>
                    <p className="text-gray-500 font-medium">Listening to your answer...</p>
                  </div>
                )}
                
                <div className="flex justify-center gap-4">
                  {!showAnswer ? (
                    <button onClick={() => setShowAnswer(true)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors">Finish Answering & See Tips</button>
                  ) : (
                    <button onClick={nextQuestion} className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">Next Question</button>
                  )}
                </div>
              </div>
            )}

            {mockState === 'finished' && (
              <div className="py-12">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview Complete!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Great job! You practiced all the questions in this mock session. Review the expert tips to improve your delivery for the real thing.</p>
                <button onClick={() => setMockState('idle')} className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">Return to Dashboard</button>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
