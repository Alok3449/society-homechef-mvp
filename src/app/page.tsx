'use client';
import { useEffect } from 'react';
import { initMockData, loginDemo } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    initMockData();
  }, []);

  const login = (role: any, id: string) => {
    loginDemo(role, id);
    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="text-5xl font-bold mb-3">🍳 Society HomeChef</h1>
        <p className="text-gray-600 mb-10">Hyperlocal • Gated Community • Fresh Daily</p>

        <div className="space-y-4">
          <button onClick={() => login('chef', '1')} className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold rounded-2xl transition">Login as HomeChef (Ramesh)</button>
          <button onClick={() => login('resident', '2')} className="w-full py-5 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold rounded-2xl transition">Login as Resident (Priya)</button>
          <button onClick={() => login('rider', '3')} className="w-full py-5 bg-purple-500 hover:bg-purple-600 text-white text-xl font-semibold rounded-2xl transition">Login as Rider (Rahul)</button>
        </div>

        <p className="text-xs text-gray-400 mt-12">Demo MVP • All 3 roles fully functional • AI nutrition auto-generated</p>
      </div>
    </div>
  );
}