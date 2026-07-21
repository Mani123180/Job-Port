import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resources Module</h1>
          <Link href="/" className="text-blue-600 font-medium hover:underline">Back to Home</Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Resources section</h2>
          <p className="text-gray-600">This module is part of the comprehensive Job Portal system. UI implementation pending based on design mockups.</p>
        </div>
      </main>
    </div>
  );
}
