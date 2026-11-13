export type OrderStatus =
  | 'PLACED'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'ARRIVED_DOORSTEP'
  | 'DELIVERED'
  | 'CANCELLED';

export type UserRole = 'customer' | 'restaurant' | 'delivery' | 'tri-view';

export type ScamReportCategory =
  | 'NEAR_NOT_DELIVERED'
  | 'SEAL_OPEN'
  | 'FOOD_SPOILED'
  | 'RIDER_BEHAVIOUR'
  | 'OTHERS';

export interface ScamReport {
  id: string;
  ticketCode: string;
  orderId: string;
  orderNumber: string;
  category: ScamReportCategory;
  categoryLabel: string;
  details: string;
  reportedAt: string;
  status: 'ESCALATED' | 'UNDER_REVIEW';
}

export interface CustomerSettings {
  dynamicStageThemes: boolean;
  autoMaskPin: boolean;
  soundAlerts: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  rating: number;
  votes: number;
  image: string;
  category: string;
  bestseller?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  ratingCount: string;
  deliveryTimeMins: number;
  distanceKm: number;
  priceForTwo: number;
  image: string;
  locality: string;
  discountBadge?: string;
  menu: MenuItem[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicleNo: string;
  rating: number;
  tripsCount: number;
  photoUrl: string;
}

export interface AuditLogEntry {
  timestamp: string;
  actor: 'CUSTOMER' | 'RESTAURANT' | 'DELIVERY' | 'SYSTEM';
  event: string;
  details?: string;
  badge?: 'secure' | 'warning' | 'success';
}

export interface ActiveOrder {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  restaurantLocality: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    isVeg: boolean;
  }[];
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  tax: number;
  grandTotal: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  placedAt: string;
  status: OrderStatus;
  handoverOtp: string;
  otpFailedAttempts: number;
  otpVerifiedAt?: string;
  tamperSealCode: string;
  sealVerifiedByCustomer?: boolean;
  deliveryPartner: DeliveryPartner;
  timeline: {
    placed?: string;
    accepted?: string;
    preparing?: string;
    ready?: string;
    pickedUp?: string;
    arrivedDoorstep?: string;
    delivered?: string;
  };
  auditLogs: AuditLogEntry[];
}
