// 'use client';
// import { useEffect, useState } from 'react';
// import { getCurrentUser, createDish, dishes as allDishes } from '@/lib/mockData';
// import { Dish } from '@/types';
// import { Plus } from 'lucide-react';

// export default function ChefDashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [myDishes, setMyDishes] = useState<Dish[]>([]);
//   const [form, setForm] = useState({ name: '', price: 0, quantity: 5, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop' });

//   useEffect(() => {
//     const u = getCurrentUser();
//     if (u) {
//       setUser(u);
//       setMyDishes(allDishes.filter(d => d.chefId === u.id));
//     }
//   }, []);

//   const publish = () => {
//     if (!user) return;
//     const newDish = createDish(user.id, form);
//     setMyDishes(prev => [...prev, newDish]);
//     setForm({ name: '', price: 0, quantity: 5, imageUrl: 'https://picsum.photos/id/1015/600/400' });
//     alert('Dish published! AI nutrition auto-generated.');
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-8">Chef Dashboard — {user?.name}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Publish form */}
//         <div className="bg-white p-8 rounded-3xl shadow">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Plus /> Publish Dish of the Day</h2>
//           <input type="text" placeholder="Dish Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-2xl px-5 py-4 mb-4" />
//           <div className="grid grid-cols-2 gap-4">
//             <input type="number" placeholder="Price ₹" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="border rounded-2xl px-5 py-4" />
//             <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="border rounded-2xl px-5 py-4" />
//           </div>
//           <button onClick={publish} className="mt-8 w-full bg-green-600 text-white py-5 text-lg font-medium rounded-3xl">Publish → AI Nutrition Generated Instantly</button>
//         </div>

//         {/* Active listings */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6">Your Active Listings</h2>
//           {myDishes.map(d => (
//             <div key={d.id} className="bg-white p-6 rounded-3xl shadow mb-4 flex gap-6">
//               <img src={d.imageUrl} className="w-28 h-28 object-cover rounded-2xl" alt="" />
//               <div className="flex-1">
//                 <div className="flex justify-between">
//                   <h3 className="font-semibold text-xl">{d.name}</h3>
//                   <span className="text-2xl font-bold text-green-600">₹{d.price}</span>
//                 </div>
//                 <p className="text-sm text-gray-500">Calories: {d.calories} kcal • Health Score: {d.healthScore}/10</p>
//                 <p className="text-sm mt-2">Qty left: <span className="font-medium">{d.quantity}</span></p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';
// import { getCurrentUser, createDish, dishes as allDishes, updateUserProfile } from '@/lib/mockData';
// import { Dish } from '@/types';
// import { Plus, User } from 'lucide-react';

// export default function ChefDashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [myDishes, setMyDishes] = useState<Dish[]>([]);
  
//   // Profile form state
//   const [profile, setProfile] = useState({ name: '', location: '' });
//   const [isEditingProfile, setIsEditingProfile] = useState(false);

//   // Dish form state
//   const [form, setForm] = useState({
//     name: '',
//     price: 0,
//     quantity: 5,
//     imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop'
//   });

//   useEffect(() => {
//     const u = getCurrentUser();
//     if (u) {
//       setUser(u);
//       setProfile({ name: u.name, location: u.location });
//       setMyDishes(allDishes.filter(d => d.chefId === u.id));
//     }
//   }, []);

//   const saveProfile = () => {
//     if (!user) return;
//     updateUserProfile(user.id, profile.name, profile.location);
//     setUser({ ...user, name: profile.name, location: profile.location });
//     setIsEditingProfile(false);
//     alert('✅ Profile updated successfully!');
//   };

//   const publish = () => {
//     if (!user) return;
//     const newDish = createDish(user.id, form);
//     setMyDishes(prev => [...prev, newDish]);
//     setForm({
//       name: '',
//       price: 0,
//       quantity: 5,
//       imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop'
//     });
//     alert('Dish published! AI nutrition auto-generated.');
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-8">Chef Dashboard</h1>

//       {/* PROFILE SECTION - NEW */}
//       <div className="bg-white p-8 rounded-3xl shadow mb-10">
//         <div className="flex items-center gap-3 mb-6">
//           <User className="w-8 h-8 text-orange-500" />
//           <h2 className="text-2xl font-semibold">Your Profile</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Full Name</label>
//             <input
//               type="text"
//               value={profile.name}
//               onChange={e => setProfile({ ...profile, name: e.target.value })}
//               className="w-full border rounded-2xl px-5 py-4"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Location in Society</label>
//             <input
//               type="text"
//               value={profile.location}
//               onChange={e => setProfile({ ...profile, location: e.target.value })}
//               className="w-full border rounded-2xl px-5 py-4"
//               placeholder="Tower A, Flat 101"
//             />
//           </div>
//         </div>

//         <button
//           onClick={saveProfile}
//           className="mt-6 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-3xl font-medium"
//         >
//           Save Profile
//         </button>

//         {user && (
//           <p className="text-sm text-gray-500 mt-4">
//             Current: <span className="font-medium">{user.name}</span> • {user.location}
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Publish Dish */}
//         <div className="bg-white p-8 rounded-3xl shadow">
//           <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//             <Plus /> Publish Dish of the Day
//           </h2>
//           <input
//             type="text"
//             placeholder="Dish Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//             className="w-full border rounded-2xl px-5 py-4 mb-4"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               placeholder="Price ₹"
//               value={form.price}
//               onChange={e => setForm({ ...form, price: Number(e.target.value) })}
//               className="border rounded-2xl px-5 py-4"
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={form.quantity}
//               onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
//               className="border rounded-2xl px-5 py-4"
//             />
//           </div>
//           <button
//             onClick={publish}
//             className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-5 text-lg font-medium rounded-3xl"
//           >
//             Publish → AI Nutrition Generated Instantly
//           </button>
//         </div>

//         {/* Active Listings */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6">Your Active Listings</h2>
//           {myDishes.length === 0 ? (
//             <p className="text-gray-500">No dishes published yet</p>
//           ) : (
//             myDishes.map(d => (
//               <div key={d.id} className="bg-white p-6 rounded-3xl shadow mb-4 flex gap-6">
//                 <img src={d.imageUrl} className="w-28 h-28 object-cover rounded-2xl" alt="" />
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <h3 className="font-semibold text-xl">{d.name}</h3>
//                     <span className="text-2xl font-bold text-green-600">₹{d.price}</span>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     Calories: {d.calories} kcal • Health Score: {d.healthScore}/10
//                   </p>
//                   <p className="text-sm mt-2">
//                     Qty left: <span className="font-medium">{d.quantity}</span>
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser, createDish, dishes as allDishes, updateUserProfile } from '@/lib/mockData';
import { Dish } from '@/types';
import { Plus, User, XCircle } from 'lucide-react';

export default function ChefDashboard() {
  const [user, setUser] = useState<any>(null);
  const [myDishes, setMyDishes] = useState<Dish[]>([]);
  
  const [profile, setProfile] = useState({ name: '', location: '' });
  const [isEditingProfile] = useState(false);

  const [form, setForm] = useState({
    name: '',
    price: 0,
    quantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop'
  });

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u);
      setProfile({ name: u.name, location: u.location });
      setMyDishes(allDishes.filter(d => d.chefId === u.id));
    }
  }, []);

  const saveProfile = () => {
    if (!user) return;
    updateUserProfile(user.id, profile.name, profile.location);
    setUser({ ...user, name: profile.name, location: profile.location });
    alert('✅ Profile updated!');
  };

  const publish = () => {
    if (!user) return;
    const newDish = createDish(user.id, form);
    setMyDishes(prev => [...prev, newDish]);
    setForm({ name: '', price: 0, quantity: 5, imageUrl: form.imageUrl });
    alert('Dish published! AI nutrition auto-generated.');
  };

  const markSoldOut = (dishId: string) => {
    const dish = allDishes.find(d => d.id === dishId);
    if (dish) {
      dish.isSoldOut = true;
      setMyDishes(prev => prev.filter(d => d.id !== dishId));
      alert('✅ Marked as Sold Out');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Chef Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-white p-8 rounded-3xl shadow mb-10">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-semibold">Your Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full border rounded-2xl px-5 py-4" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location in Society</label>
            <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full border rounded-2xl px-5 py-4" placeholder="Tower A, Flat 101" />
          </div>
        </div>
        <button onClick={saveProfile} className="mt-6 px-8 py-4 bg-orange-500 text-white rounded-3xl">Save Profile</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Publish Form */}
        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Plus /> Publish Dish of the Day</h2>
          <input type="text" placeholder="Dish Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-2xl px-5 py-4 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price ₹" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="border rounded-2xl px-5 py-4" />
            <input type="number" placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} className="border rounded-2xl px-5 py-4" />
          </div>
          <button onClick={publish} className="mt-8 w-full bg-green-600 text-white py-5 text-lg font-medium rounded-3xl">Publish → AI Nutrition Generated Instantly</button>
        </div>

        {/* Active Listings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Active Listings</h2>
          {myDishes.length === 0 ? (
            <p className="text-gray-500">No active dishes</p>
          ) : (
            myDishes.map(d => (
              <div key={d.id} className="bg-white p-6 rounded-3xl shadow mb-4 flex gap-6 items-center">
                <img src={d.imageUrl} className="w-28 h-28 object-cover rounded-2xl" alt="" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-xl">{d.name}</h3>
                    <span className="text-2xl font-bold text-green-600">₹{d.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">Calories: {d.calories} kcal • Health Score: {d.healthScore}/10</p>
                  <p className="text-sm mt-1">Qty left: <span className="font-medium">{d.quantity}</span></p>
                </div>
                <button 
                  onClick={() => markSoldOut(d.id)}
                  className="flex items-center gap-2 px-5 py-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-2xl text-sm font-medium"
                >
                  <XCircle size={18} /> Mark Sold Out
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}