import { User, Dish, Order } from '@/types';
import { generateNutrition } from './ai';

let users: User[] = [];
let dishes: Dish[] = [];
let orders: Order[] = [];

export function loadData() {
  if (typeof window === 'undefined') return;
  users = JSON.parse(localStorage.getItem('users') || '[]');
  dishes = JSON.parse(localStorage.getItem('dishes') || '[]');
  orders = JSON.parse(localStorage.getItem('orders') || '[]');
}

export function saveData() {
  if (typeof window === 'undefined') return;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('dishes', JSON.stringify(dishes));
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function initMockData() {

 
  loadData();
  if (users.length > 0) return;

  users = [
    { id: '1', name: 'Ramesh Sharma', role: 'chef', location: 'Tower A, Flat 101', lat: 28.6139, lng: 77.2090 },
    { id: '2', name: 'Priya Singh', role: 'resident', location: 'Tower B, Flat 202', lat: 28.6145, lng: 77.2085 },
    { id: '3', name: 'Rahul Rider', role: 'rider', location: 'Society Gate', lat: 28.6125, lng: 77.2100, isAvailable: true },
    { id: '4', name: 'Sneha Patel', role: 'rider', location: 'Main Road', lat: 28.6150, lng: 77.2075, isAvailable: true },
  ];

   const nutrition1 = generateNutrition('Paneer Paratha');
  const nutrition2 = generateNutrition('Chicken Biryani');

  dishes = [
    {
      id: 'd1',
      chefId: '1',
      chefName: 'Rakesh Sharma',
      name: 'Paneer Paratha',
      price: 120,
      quantity: 8,
      imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop',   // ✅ Real Paneer Paratha
      calories: nutrition1.calories,
      healthScore: nutrition1.healthScore,
      isSoldOut: false,
    },
    {
      id: 'd2',
      chefId: '1',
      chefName: 'Ramesh Sharma',
      name: 'Chicken Biryani',
      price: 180,
      quantity: 10,
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',   // ✅ Real Chicken Biryani
      calories: nutrition2.calories,
      healthScore: nutrition2.healthScore,
      isSoldOut: false,
    }
  ];

  saveData();
}


export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const role = localStorage.getItem('currentRole');
  const id = localStorage.getItem('currentUserId');
  if (!role || !id) return null;
  return users.find(u => u.id === id) || null;
}

export function loginDemo(role: 'chef' | 'resident' | 'rider', id: string) {
  localStorage.setItem('currentRole', role);
  localStorage.setItem('currentUserId', id);
}

export function createDish(chefId: string, data: { name: string; price: number; quantity: number; imageUrl: string }) {
  const nutrition = generateNutrition(data.name);
  const newDish: Dish = {
    id: 'd' + Date.now(),
    chefId,
    chefName: users.find(u => u.id === chefId)?.name || 'Chef',
    ...data,
    calories: nutrition.calories,
    healthScore: nutrition.healthScore,
    isSoldOut: false,
  };
  dishes.push(newDish);
  saveData();
  return newDish;
}

export function getAllDishes(): Dish[] {
  return dishes.filter(d => !d.isSoldOut);
}

export function createOrder(customerId: string, dishId: string, qty: number) {
  const dish = dishes.find(d => d.id === dishId);
  if (!dish || dish.quantity < qty) return null;

  const order: Order = {
    id: 'o' + Date.now(),
    customerId,
    dishId,
    dishName: dish.name,
    price: dish.price,
    quantity: qty,
    status: 'pending',
  };
  orders.push(order);
  dish.quantity -= qty;
  if (dish.quantity <= 0) dish.isSoldOut = true;
  saveData();

  // Auto-assign nearest available rider (simple simulation)
  assignNearestRider(order.id);
  return order;
}

function assignNearestRider(orderId: string) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const availableRiders = users.filter(u => u.role === 'rider' && u.isAvailable);
  if (availableRiders.length === 0) return;

  // Pick first for demo (real version would calculate distance)
  const rider = availableRiders[0];
  order.riderId = rider.id;
  order.riderName = rider.name;
  order.status = 'assigned';
  saveData();
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveData();
  }
}

export function toggleRiderAvailability(riderId: string) {
  const rider = users.find(u => u.id === riderId && u.role === 'rider');
  if (rider) {
    rider.isAvailable = !rider.isAvailable;
    saveData();
  }
}

export { users, dishes, orders };

export function updateUserProfile(userId: string, name: string, location: string) {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.name = name;
    user.location = location;
    saveData();
  }
}


