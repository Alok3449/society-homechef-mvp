export type Role = 'chef' | 'resident' | 'rider';

export interface User {
  id: string;
  name: string;
  role: Role;
  location: string;
  lat: number;
  lng: number;
  isAvailable?: boolean;
}

export interface Dish {
  id: string;
  chefId: string;
  chefName: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  calories: number;
  healthScore: number;
  isSoldOut: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  dishId: string;
  dishName: string;
  price: number;
  quantity: number;
  status: 'pending' | 'assigned' | 'picked_up' | 'delivered';
  riderId?: string;
  riderName?: string;
}