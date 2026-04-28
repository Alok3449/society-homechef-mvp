'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { LogOut, ChefHat } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold">Society HomeChef</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs px-4 py-1.5 bg-green-100 text-green-700 rounded-3xl font-medium">
              {user.role.toUpperCase()}
            </span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}