import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ActiveOrder,
  CartItem,
  CustomerSettings,
  MenuItem,
  OrderStatus,
  Restaurant,
  ScamReport,
  ScamReportCategory,
  UserRole,
} from '../types';
import { DEFAULT_DELIVERY_PARTNER, INITIAL_ORDERS } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface VerifyOtpResult {
  success: boolean;
  message: string;
}

export const SCAM_REPORT_OPTIONS: {
  category: ScamReportCategory;
  label: string;
  subtitle: string;
  priority: string;
}[] = [
  {
    category: 'NEAR_NOT_DELIVERED',
    label: 'Food is near, but still not delivered',
    subtitle: 'Rider is hovering nearby or marked arrived without handing over food',
    priority: 'Instant GPS & Rider Audit',
  },
  {
    category: 'SEAL_OPEN',
    label: 'Seal of the food bag is open',
    subtitle: 'Tamper-evident security sticker is broken, torn, or missing',
    priority: 'Zero-Tolerance Refund Shield',
  },
  {
    category: 'FOOD_SPOILED',
    label: 'Food package got spoiled',
    subtitle: 'Container leaked, damaged, cold, or food appears unhygienic',
    priority: 'Immediate Replacement / Refund',
  },
  {
    category: 'RIDER_BEHAVIOUR',
    label: 'Report the delivery person behaviour',
    subtitle: 'Rude conduct, pressuring for PIN before handover, or unsafe behaviour',
    priority: 'Safety Team Escalation',
  },
  {
    category: 'OTHERS',
    label: 'Others',
    subtitle: 'Any other scam suspicion, wrong items, or delivery concern',
    priority: 'Custom Priority Ticket',
  },
];

interface OrderContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeOrders: ActiveOrder[];
  currentOrderId: string | null;
  setCurrentOrderId: (id: string | null) => void;
  currentOrder?: ActiveOrder;
  cart: CartItem[];
  addToCart: (item: MenuItem, restaurant: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartRestaurantName: string | null;
  placeOrder: (address: string, notes?: string) => string;
  restaurantAcceptOrder: (orderId: string) => void;
  restaurantSealAndReady: (orderId: string) => void;
  riderPickUpOrder: (orderId: string) => void;
  riderArriveAtDoorstep: (orderId: string) => void;
  riderVerifyOtp: (orderId: string, enteredOtp: string) => VerifyOtpResult;
  regenerateCustomerOtp: (orderId: string) => void;
  verifySealByCustomer: (orderId: string) => void;
  setOrderStagePreview: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  loadScenario: (scenario: 'doorstep_ready' | 'fresh_browse' | 'kitchen_incoming') => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  showFraudExplainer: boolean;
  setShowFraudExplainer: (show: boolean) => void;
  scamReports: ScamReport[];
  submitScamReport: (
    orderId: string,
    category: ScamReportCategory,
    details: string
  ) => ScamReport;
  customerSettings: CustomerSettings;
  updateCustomerSettings: (partial: Partial<CustomerSettings>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'safebite_orders_v2';
const REPORTS_STORAGE_KEY = 'safebite_reports_v2';
const SETTINGS_STORAGE_KEY = 'safebite_settings_v2';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('tri-view');
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const [scamReports, setScamReports] = useState<ScamReport[]>(() => {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [customerSettings, setCustomerSettings] = useState<CustomerSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return {
          dynamicStageThemes: true,
          autoMaskPin: false,
          soundAlerts: true,
          ...JSON.parse(saved),
        };
      }
    } catch {
      // fallback
    }
    return {
      dynamicStageThemes: true,
      autoMaskPin: false,
      soundAlerts: true,
    };
  });

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(() => {
    return activeOrders.length > 0 ? activeOrders[0].id : null;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showFraudExplainer, setShowFraudExplainer] = useState<boolean>(false);

  const soundEnabled = customerSettings.soundAlerts;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeOrders));
    } catch {
      // ignore
    }
  }, [activeOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(scamReports));
    } catch {
      // ignore
    }
  }, [scamReports]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(customerSettings));
    } catch {
      // ignore
    }
  }, [customerSettings]);

  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  const updateCustomerSettings = (partial: Partial<CustomerSettings>) => {
    setCustomerSettings((prev) => ({ ...prev, ...partial }));
  };

  const toggleSound = () => {
    updateCustomerSettings({ soundAlerts: !customerSettings.soundAlerts });
  };

  const currentOrder = activeOrders.find((o) => o.id === currentOrderId) || activeOrders[0];

  const addToCart = (item: MenuItem, restaurant: Restaurant) => {
    soundFX.playChime();
    setCart((prev) => {
      const isDifferentRestaurant = prev.length > 0 && prev[0].restaurantId !== restaurant.id;
      const baseCart = isDifferentRestaurant ? [] : prev;

      const existing = baseCart.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return baseCart.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...baseCart,
        {
          menuItem: item,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const cartRestaurantName = cart.length > 0 ? cart[0].restaurantName : null;

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const generateSealCode = () => {
    return `SEAL-BLR-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const placeOrder = (address: string): string => {
    if (cart.length === 0) return '';
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `SB-${Math.floor(1000 + Math.random() * 9000)}-BLR`;
    const otp = generateOtp();
    const sealCode = generateSealCode();

    const itemTotal = cartTotal;
    const deliveryFee = 35;
    const platformFee = 6;
    const tax = Math.round(itemTotal * 0.05 * 10) / 10;
    const grandTotal = itemTotal + deliveryFee + platformFee + tax;

    const newOrder: ActiveOrder = {
      id: orderId,
      orderNumber,
      restaurantId: cart[0].restaurantId,
      restaurantName: cart[0].restaurantName,
      restaurantLocality: 'Koramangala, Bengaluru',
      items: cart.map((ci) => ({
        name: ci.menuItem.name,
        quantity: ci.quantity,
        price: ci.menuItem.price,
        isVeg: ci.menuItem.isVeg,
      })),
      itemTotal,
      deliveryFee,
      platformFee,
      tax,
      grandTotal,
      customerName: 'Ananya Deshmukh',
      customerPhone: '+91 99012 34567',
      deliveryAddress:
        address || 'Flat 402, Shanti Nilaya Apartments, 7th Cross, Koramangala 4th Block, Bengaluru',
      placedAt: timeStr,
      status: 'PLACED',
      handoverOtp: otp,
      otpFailedAttempts: 0,
      tamperSealCode: sealCode,
      sealVerifiedByCustomer: false,
      deliveryPartner: DEFAULT_DELIVERY_PARTNER,
      timeline: {
        placed: timeStr,
      },
      auditLogs: [
        {
          timestamp: timeStr,
          actor: 'CUSTOMER',
          event: 'Order Placed & Anti-Fraud PIN Locked',
          details: `Secure Handover PIN (${otp}) generated. Disclosed strictly to Customer view to block ghost delivery scams.`,
          badge: 'secure',
        },
      ],
    };

    setActiveOrders((prev) => [newOrder, ...prev]);
    setCurrentOrderId(orderId);
    clearCart();
    soundFX.playKitchenPing();
    return orderId;
  };

  const restaurantAcceptOrder = (orderId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'PREPARING' as OrderStatus,
          timeline: {
            ...ord.timeline,
            accepted: timeStr,
            preparing: timeStr,
          },
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'RESTAURANT',
              event: 'Order Accepted & Kitchen Preparation Started',
              details: 'Dishes queued in kitchen. Tamper-evident thermal seal queued.',
              badge: 'secure',
            },
          ],
        };
      })
    );
  };

  const restaurantSealAndReady = (orderId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playKitchenPing();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'READY_FOR_PICKUP' as OrderStatus,
          timeline: {
            ...ord.timeline,
            ready: timeStr,
          },
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'RESTAURANT',
              event: 'Package Sealed with Tamper-Evident Seal',
              details: `Security Tag ${ord.tamperSealCode} applied across bag handles. Ready for pickup.`,
              badge: 'secure',
            },
          ],
        };
      })
    );
  };

  const riderPickUpOrder = (orderId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'OUT_FOR_DELIVERY' as OrderStatus,
          timeline: {
            ...ord.timeline,
            pickedUp: timeStr,
          },
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'DELIVERY',
              event: 'Rider Collected Sealed Package',
              details: `Rider ${ord.deliveryPartner.name} verified tamper seal ${ord.tamperSealCode}. En-route to customer.`,
              badge: 'secure',
            },
          ],
        };
      })
    );
  };

  const riderArriveAtDoorstep = (orderId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'ARRIVED_DOORSTEP' as OrderStatus,
          timeline: {
            ...ord.timeline,
            arrivedDoorstep: timeStr,
          },
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'DELIVERY',
              event: 'Rider Reached Customer Doorstep',
              details: 'Rider is outside. Handover PIN required from customer to complete delivery.',
              badge: 'warning',
            },
          ],
        };
      })
    );
  };

  const riderVerifyOtp = (orderId: string, enteredOtp: string): VerifyOtpResult => {
    const order = activeOrders.find((o) => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (enteredOtp.trim() === order.handoverOtp) {
      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      setActiveOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== orderId) return ord;
          return {
            ...ord,
            status: 'DELIVERED' as OrderStatus,
            otpVerifiedAt: timeStr,
            timeline: {
              ...ord.timeline,
              delivered: timeStr,
            },
            auditLogs: [
              ...ord.auditLogs,
              {
                timestamp: timeStr,
                actor: 'DELIVERY',
                event: 'PIN Verified & Handover Authenticated',
                details: `Customer validated secret PIN (${ord.handoverOtp}). Ghost delivery scam prevented.`,
                badge: 'success',
              },
            ],
          };
        })
      );

      return {
        success: true,
        message: 'PIN Verified! Handover completed securely with full anti-fraud proof.',
      };
    } else {
      soundFX.playError();
      const newFailedCount = (order.otpFailedAttempts || 0) + 1;

      setActiveOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== orderId) return ord;
          return {
            ...ord,
            otpFailedAttempts: newFailedCount,
            auditLogs: [
              ...ord.auditLogs,
              {
                timestamp: timeStr,
                actor: 'DELIVERY',
                event: `Invalid PIN Attempt #${newFailedCount} Blocked`,
                details: `Entered "${enteredOtp}". Delivery completion refused until valid customer PIN is entered.`,
                badge: 'warning',
              },
            ],
          };
        })
      );

      return {
        success: false,
        message: `Incorrect PIN (${enteredOtp}). Ask customer to show the 4-digit code displayed in their SafeBite app.`,
      };
    }
  };

  const regenerateCustomerOtp = (orderId: string) => {
    const newOtp = generateOtp();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();

    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          handoverOtp: newOtp,
          otpFailedAttempts: 0,
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'CUSTOMER',
              event: 'Customer Regenerated Handover PIN',
              details: `New secure PIN generated: ${newOtp}. Old PIN invalidated immediately.`,
              badge: 'secure',
            },
          ],
        };
      })
    );
  };

  const verifySealByCustomer = (orderId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          sealVerifiedByCustomer: true,
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'CUSTOMER',
              event: 'Tamper-Seal Integrity Confirmed',
              details: `Customer visually verified intact sticker ${ord.tamperSealCode} before sharing PIN.`,
              badge: 'success',
            },
          ],
        };
      })
    );
  };

  const setOrderStagePreview = (orderId: string, status: OrderStatus) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playChime();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status,
          otpVerifiedAt: status === 'DELIVERED' ? ord.otpVerifiedAt || timeStr : undefined,
        };
      })
    );
  };

  const submitScamReport = (
    orderId: string,
    category: ScamReportCategory,
    details: string
  ): ScamReport => {
    const order = activeOrders.find((o) => o.id === orderId) || currentOrder;
    const option = SCAM_REPORT_OPTIONS.find((o) => o.category === category);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ticketCode = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    const report: ScamReport = {
      id: `rep-${Date.now()}`,
      ticketCode,
      orderId: order?.id || orderId,
      orderNumber: order?.orderNumber || 'GENERAL',
      category,
      categoryLabel: option?.label || 'Delivery Issue',
      details: details.trim() || option?.subtitle || 'Issue reported via SafeBite Safety Portal',
      reportedAt: timeStr,
      status: 'ESCALATED',
    };

    soundFX.playError();
    setScamReports((prev) => [report, ...prev]);

    if (order) {
      setActiveOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== order.id) return ord;
          return {
            ...ord,
            auditLogs: [
              ...ord.auditLogs,
              {
                timestamp: timeStr,
                actor: 'SYSTEM',
                event: `Safety Report Filed (${ticketCode}): ${report.categoryLabel}`,
                details: report.details,
                badge: 'warning',
              },
            ],
          };
        })
      );
    }

    return report;
  };

  const cancelOrder = (orderId: string, reason: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    soundFX.playError();
    setActiveOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'CANCELLED' as OrderStatus,
          auditLogs: [
            ...ord.auditLogs,
            {
              timestamp: timeStr,
              actor: 'CUSTOMER',
              event: 'Order Cancelled',
              details: `Reason: ${reason}`,
              badge: 'warning',
            },
          ],
        };
      })
    );
  };

  const loadScenario = (scenario: 'doorstep_ready' | 'fresh_browse' | 'kitchen_incoming') => {
    if (scenario === 'doorstep_ready') {
      setActiveOrders(INITIAL_ORDERS);
      setCurrentOrderId(INITIAL_ORDERS[0].id);
      setActiveRole('tri-view');
      soundFX.playChime();
    } else if (scenario === 'kitchen_incoming') {
      const order = {
        ...INITIAL_ORDERS[0],
        id: `ord-${Date.now()}`,
        status: 'PLACED' as OrderStatus,
        handoverOtp: '8391',
        sealVerifiedByCustomer: false,
        timeline: { placed: 'Just now' },
        auditLogs: [
          {
            timestamp: 'Just now',
            actor: 'CUSTOMER' as const,
            event: 'New Order Placed & Awaiting Kitchen Acceptance',
            details: 'PIN 8391 locked on customer device.',
            badge: 'secure' as const,
          },
        ],
      };
      setActiveOrders([order]);
      setCurrentOrderId(order.id);
      setActiveRole('restaurant');
      soundFX.playKitchenPing();
    } else if (scenario === 'fresh_browse') {
      clearCart();
      setActiveRole('customer');
    }
  };

  return (
    <OrderContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activeOrders,
        currentOrderId,
        setCurrentOrderId,
        currentOrder,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartRestaurantName,
        placeOrder,
        restaurantAcceptOrder,
        restaurantSealAndReady,
        riderPickUpOrder,
        riderArriveAtDoorstep,
        riderVerifyOtp,
        regenerateCustomerOtp,
        verifySealByCustomer,
        setOrderStagePreview,
        cancelOrder,
        loadScenario,
        soundEnabled,
        toggleSound,
        showFraudExplainer,
        setShowFraudExplainer,
        scamReports,
        submitScamReport,
        customerSettings,
        updateCustomerSettings,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
