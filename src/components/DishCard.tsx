'use client';
import { Dish } from '@/types';

interface Props { dish: Dish; onOrder: (id: string) => void; }

export default function DishCard({ dish, onOrder }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
      <img src={dish.imageUrl} alt={dish.name} className="w-full h-56 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold">{dish.name}</h3>
            <p className="text-gray-500">by {dish.chefName}</p>
          </div>
          <p className="text-3xl font-bold text-green-600">₹{dish.price}</p>
        </div>

        <div className="flex gap-8 mt-6 text-sm">
          <div>🔥 {dish.calories} kcal</div>
          <div>⭐ {dish.healthScore}/10</div>
        </div>

        <button onClick={() => onOrder(dish.id)} className="mt-8 w-full py-5 bg-black text-white rounded-3xl text-lg font-medium hover:bg-gray-800 transition">Order Now</button>
      </div>
    </div>
  );
}