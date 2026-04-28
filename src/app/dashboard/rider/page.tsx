'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser, orders as allOrders, updateOrderStatus, toggleRiderAvailability, initMockData } from '@/lib/mockData';
import { Order } from '@/types';

export default function RiderDashboard() {
  const [user, setUser] = useState<any>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      const filtered = allOrders.filter(o => o.riderId === u.id);
      setMyOrders(filtered);
    } else {
      setUser(null);
      setMyOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    initMockData();   // Ensures mock data is loaded
    refresh();
  }, []);

  if (loading || !user) {
    return (
      <div className="max-w-4xl mx-auto p-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-2xl text-gray-500">Loading Rider Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Rider Dashboard — {user.name}</h1>
        <button 
          onClick={() => { 
            toggleRiderAvailability(user.id); 
            refresh(); 
          }} 
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition"
        >
          {user.isAvailable ? '✅ Available' : '🔴 Go Offline'}
        </button>
      </div>

      <div className="space-y-6">
        {myOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-gray-300">
            <p className="text-xl text-gray-500">No delivery jobs yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Go to Resident dashboard → Place an order<br />
              It will appear here automatically
            </p>
          </div>
        ) : (
          myOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-3xl shadow flex justify-between items-center">
              <div>
                <p className="text-xl font-medium">{order.dishName}</p>
                <p className="text-sm text-gray-500">
                  Qty: {order.quantity} • Status: <span className="capitalize font-medium">{order.status}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {order.status === 'assigned' && (
                  <button 
                    onClick={() => { updateOrderStatus(order.id, 'picked_up'); refresh(); }} 
                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl"
                  >
                    Picked Up
                  </button>
                )}
                {order.status === 'picked_up' && (
                  <button 
                    onClick={() => { updateOrderStatus(order.id, 'delivered'); refresh(); }} 
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl"
                  >
                    Delivered
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}