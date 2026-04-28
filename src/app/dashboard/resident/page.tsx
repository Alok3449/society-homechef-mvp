// 'use client';
// import { useEffect, useState } from 'react';
// import { getCurrentUser, getAllDishes, createOrder } from '@/lib/mockData';
// import DishCard from '@/components/DishCard';
// import { Dish } from '@/types';

// export default function ResidentDashboard() {
//   const [dishes, setDishes] = useState<Dish[]>([]);
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const u = getCurrentUser();
//     setUser(u);
//     setDishes(getAllDishes());
//   }, []);

//   const handleOrder = (dishId: string) => {
//     if (!user) return;
//     const order = createOrder(user.id, dishId, 1);
//     if (order) alert(`✅ Order placed! Rider assigned automatically.`);
//     setDishes(getAllDishes());
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-8">Good morning, {user?.name} 👋</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {dishes.map(dish => (
//           <DishCard key={dish.id} dish={dish} onOrder={handleOrder} />
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser, getAllDishes, createOrder } from '@/lib/mockData';
import DishCard from '@/components/DishCard';
import { Dish } from '@/types';

export default function ResidentDashboard() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'veg' | 'high-protein' | 'low-calorie'>('all');

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    const all = getAllDishes();
    setDishes(all);
    setFilteredDishes(all);
  }, []);

  const applyFilter = (newFilter: typeof filter) => {
    setFilter(newFilter);
    let filtered = dishes;

    if (newFilter === 'veg') {
      filtered = dishes.filter(d => d.name.toLowerCase().includes('veg') || d.name.toLowerCase().includes('paneer') || d.name.toLowerCase().includes('dal'));
    } else if (newFilter === 'high-protein') {
      filtered = dishes.filter(d => d.name.toLowerCase().includes('chicken') || d.name.toLowerCase().includes('paneer') || d.name.toLowerCase().includes('egg'));
    } else if (newFilter === 'low-calorie') {
      filtered = dishes.filter(d => d.calories < 400);
    }
    setFilteredDishes(filtered);
  };

  const handleOrder = (dishId: string) => {
    if (!user) return;
    const order = createOrder(user.id, dishId, 1);
    if (order) {
      alert(`✅ Order placed! Rider assigned automatically.`);
      setDishes(getAllDishes());
      applyFilter(filter);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Good morning, {user?.name} 👋</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button onClick={() => applyFilter('all')} className={`px-6 py-3 rounded-3xl font-medium ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100'}`}>All Dishes</button>
        <button onClick={() => applyFilter('veg')} className={`px-6 py-3 rounded-3xl font-medium ${filter === 'veg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>🌱 Veg</button>
        <button onClick={() => applyFilter('high-protein')} className={`px-6 py-3 rounded-3xl font-medium ${filter === 'high-protein' ? 'bg-orange-600 text-white' : 'bg-gray-100'}`}>💪 High Protein</button>
        <button onClick={() => applyFilter('low-calorie')} className={`px-6 py-3 rounded-3xl font-medium ${filter === 'low-calorie' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>🔥 Low Calorie</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} onOrder={handleOrder} />
        ))}
      </div>
    </div>
  );
}