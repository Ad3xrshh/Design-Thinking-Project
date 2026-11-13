import React, { useState } from 'react';
import { motion } from 'motion/react';
import { OrderStatus } from '../../types';
import { UtensilsCrossed } from 'lucide-react';

export const SafeBiteLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="11" fill="#17181C" />
    <path
      d="M20 6L31 10.6V19.2C31 26.2 26.2 31.8 20 34C13.8 31.8 9 26.2 9 19.2V10.6L20 6Z"
      fill="#E84A27"
      fillOpacity="0.18"
      stroke="#E84A27"
      strokeWidth="2"
    />
    <path
      d="M14.5 22.5C14.5 19.46 16.96 17 20 17C23.04 17 25.5 19.46 25.5 22.5H14.5Z"
      fill="#FAF8F5"
    />
    <circle cx="20" cy="15.2" r="1.4" fill="#FAF8F5" />
    <rect x="13" y="23.8" width="14" height="2" rx="1" fill="#10B981" />
  </svg>
);

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const FoodImage: React.FC<FoodImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 text-stone-500 p-3 text-center ${className}`}
      >
        <UtensilsCrossed className="w-6 h-6 text-[#E84A27] mb-1 opacity-80" />
        <span className="text-[10px] font-semibold text-stone-600 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const CategoryIcon: React.FC<{ category: string; active?: boolean }> = ({
  category,
  active,
}) => {
  const stroke = active ? '#FFFFFF' : '#E84A27';
  const secondary = active ? '#FDE68A' : '#17181C';

  switch (category) {
    case 'Biryani':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M4 13C4 17.4 7.6 20 12 20C16.4 20 20 17.4 20 13H4Z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7 10C7 8.5 8 7.5 8 6M12 10C12 8.5 13 7.5 13 6M17 10C17 8.5 18 7.5 18 6" stroke={secondary} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'South Indian':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M4 17L12 7L20 17H4Z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="17" cy="8" r="2.2" stroke={secondary} strokeWidth="1.6" />
        </svg>
      );
    case 'Burgers':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M5 10C5 6.8 8.1 5 12 5C15.9 5 19 6.8 19 10H5Z" stroke={stroke} strokeWidth="1.8" />
          <path d="M4 13.5H20" stroke={secondary} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 17H19C19 18.7 17.7 19.5 16 19.5H8C6.3 19.5 5 18.7 5 17Z" stroke={stroke} strokeWidth="1.8" />
        </svg>
      );
    case 'Pizza':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M12 4L20 19C15 20.5 9 20.5 4 19L12 4Z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="1.2" fill={secondary} />
          <circle cx="10" cy="16" r="1.2" fill={secondary} />
          <circle cx="14.5" cy="15.5" r="1.2" fill={secondary} />
        </svg>
      );
    case 'Desserts':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M7 13H17L15 19H9L7 13Z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7.5 13C7.5 10.2 9.5 8 12 8C14.5 8 16.5 10.2 16.5 13" stroke={secondary} strokeWidth="1.8" />
          <circle cx="12" cy="5.5" r="1.4" fill={stroke} />
        </svg>
      );
    case 'Chai & Snacks':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M6 10H16V15C16 17.8 13.8 20 11 20C8.2 20 6 17.8 6 15V10Z" stroke={stroke} strokeWidth="1.8" />
          <path d="M16 11.5H18C19.1 11.5 20 12.4 20 13.5C20 14.6 19.1 15.5 18 15.5H16" stroke={stroke} strokeWidth="1.8" />
          <path d="M9 7V5M13 7V5" stroke={secondary} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'Momos':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path d="M4 15C4 10.5 7.6 7 12 7C16.4 7 20 10.5 20 15C20 17.5 16.4 19 12 19C7.6 19 4 17.5 4 15Z" stroke={stroke} strokeWidth="1.8" />
          <path d="M9 7.8L12 11L15 7.8" stroke={secondary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" stroke={stroke} strokeWidth="1.8" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" stroke={secondary} strokeWidth="1.8" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" stroke={secondary} strokeWidth="1.8" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" stroke={stroke} strokeWidth="1.8" />
        </svg>
      );
  }
};

export interface StageThemeConfig {
  pageBg: string;
  cardGradient: string;
  borderColor: string;
  badgeText: string;
  badgeClass: string;
  headline: string;
  subline: string;
  etaLabel: string;
  accentHex: string;
}

export function getStageTheme(status: OrderStatus, enabled: boolean): StageThemeConfig {
  if (!enabled) {
    return {
      pageBg: 'bg-[#FAF8F5]',
      cardGradient: 'from-[#17181C] to-[#272A33] text-white',
      borderColor: 'border-stone-200',
      badgeText: status.replace(/_/g, ' '),
      badgeClass: 'text-stone-700',
      headline: 'Live Order Tracking',
      subline: 'Your SafeBite order is protected with tamper-seal & handover PIN security.',
      etaLabel: '12–16 mins',
      accentHex: '#E84A27',
    };
  }

  switch (status) {
    case 'PLACED':
    case 'ACCEPTED':
      return {
        pageBg: 'bg-gradient-to-b from-[#EFF4FF] via-[#F7F9FF] to-[#FAF8F5]',
        cardGradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB] text-white',
        borderColor: 'border-blue-200/90',
        badgeText: 'Order Locked & PIN Forged',
        badgeClass: 'text-blue-700',
        headline: 'Order Confirmed & Vault Armed',
        subline: 'Your unique 4-digit Handover PIN is generated exclusively on your device.',
        etaLabel: '24–28 mins',
        accentHex: '#2563EB',
      };
    case 'PREPARING':
      return {
        pageBg: 'bg-gradient-to-b from-[#FFF4ED] via-[#FFF9F4] to-[#FAF8F5]',
        cardGradient: 'from-[#9A3412] via-[#C2410C] to-[#E84A27] text-white',
        borderColor: 'border-orange-200/90',
        badgeText: 'Kitchen Hearth Active',
        badgeClass: 'text-[#C2410C]',
        headline: 'Chef Is Firing Up Your Order',
        subline: 'Fresh ingredients are cooking now. Tamper-evident thermal seal is queued.',
        etaLabel: '18–22 mins',
        accentHex: '#E84A27',
      };
    case 'READY_FOR_PICKUP':
      return {
        pageBg: 'bg-gradient-to-b from-[#F5F3FF] via-[#FAF8FF] to-[#FAF8F5]',
        cardGradient: 'from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] text-white',
        borderColor: 'border-violet-200/90',
        badgeText: 'Tamper-Seal Locked',
        badgeClass: 'text-violet-700',
        headline: 'Bag Sealed & Ready for Rider',
        subline: 'Thermal security sticker applied across handles. Awaiting rider pickup.',
        etaLabel: '14–16 mins',
        accentHex: '#7C3AED',
      };
    case 'OUT_FOR_DELIVERY':
      return {
        pageBg: 'bg-gradient-to-b from-[#ECFEFF] via-[#F4FCFD] to-[#FAF8F5]',
        cardGradient: 'from-[#0F4C5C] via-[#0E7490] to-[#0D9488] text-white',
        borderColor: 'border-teal-200/90',
        badgeText: 'Express Transit Active',
        badgeClass: 'text-teal-700',
        headline: 'Your Meal Is On The Move',
        subline: 'Rider verified the tamper seal and is cruising toward your neighbourhood.',
        etaLabel: '6–9 mins',
        accentHex: '#0D9488',
      };
    case 'ARRIVED_DOORSTEP':
      return {
        pageBg: 'bg-gradient-to-b from-[#FEF2EE] via-[#FFF8F5] to-[#FAF8F5]',
        cardGradient: 'from-[#17181C] via-[#2C1810] to-[#B93815] text-white',
        borderColor: 'border-[#E84A27]/40',
        badgeText: 'Valet At Your Doorstep',
        badgeClass: 'text-[#E84A27]',
        headline: 'Rider Has Reached Your Door',
        subline: 'Inspect the intact tamper seal first, then share your secret 4-digit PIN.',
        etaLabel: 'Arrived Now',
        accentHex: '#E84A27',
      };
    case 'DELIVERED':
      return {
        pageBg: 'bg-gradient-to-b from-[#ECFDF5] via-[#F4FBF8] to-[#FAF8F5]',
        cardGradient: 'from-[#064E3B] via-[#047857] to-[#10B981] text-white',
        borderColor: 'border-emerald-200/90',
        badgeText: 'Handover Verified',
        badgeClass: 'text-emerald-700',
        headline: 'Verified Safe Handover Complete',
        subline: 'PIN authenticated at your doorstep. Enjoy your fresh meal with zero worries.',
        etaLabel: 'Delivered',
        accentHex: '#059669',
      };
    case 'CANCELLED':
    default:
      return {
        pageBg: 'bg-gradient-to-b from-[#FFF1F2] via-[#FFF8F8] to-[#FAF8F5]',
        cardGradient: 'from-[#881337] via-[#9F1239] to-[#BE123C] text-white',
        borderColor: 'border-rose-200',
        badgeText: 'Order Cancelled',
        badgeClass: 'text-rose-700',
        headline: 'Order Cancelled',
        subline: 'Your payment protection is active.',
        etaLabel: 'Closed',
        accentHex: '#BE123C',
      };
  }
}

export const StageIllustration: React.FC<{ status: OrderStatus; restaurantName: string }> = ({
  status,
  restaurantName,
}) => {
  if (status === 'PLACED' || status === 'ACCEPTED') {
    return (
      <div className="relative w-24 h-20 flex items-center justify-center shrink-0">
        <div className="absolute w-16 h-16 rounded-full border border-blue-300/40 animate-radar" />
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 relative z-10">
          <rect x="20" y="34" width="40" height="30" rx="8" fill="white" fillOpacity="0.16" stroke="white" strokeWidth="2.2" />
          <path d="M28 34V26C28 19.4 33.4 14 40 14C46.6 14 52 19.4 52 26V34" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="48" r="4.5" fill="#FDE047" />
          <path d="M40 52.5V56.5" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (status === 'PREPARING') {
    return (
      <div className="relative w-24 h-20 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
          {/* Rising steam wisps */}
          <path d="M29 28C27 24 31 21 29 17" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" className="animate-steam-1" />
          <path d="M40 26C38 22 42 19 40 15" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" className="animate-steam-2" />
          <path d="M51 28C49 24 53 21 51 17" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" className="animate-steam-3" />
          {/* Cooking pot */}
          <path d="M18 37H62V49C62 56.7 55.7 63 48 63H32C24.3 63 18 56.7 18 49V37Z" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.2" />
          <path d="M13 40H18M62 40H67" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 34H56" stroke="#FDBA74" strokeWidth="2.2" strokeLinecap="round" />
          {/* Flame underneath */}
          <path d="M33 69H47" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (status === 'READY_FOR_PICKUP') {
    return (
      <div className="relative w-24 h-20 flex items-center justify-center shrink-0 overflow-hidden rounded-xl">
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
          <rect x="20" y="26" width="40" height="40" rx="6" fill="white" fillOpacity="0.16" stroke="white" strokeWidth="2.2" />
          <path d="M32 26V21C32 17.7 35.6 15 40 15C44.4 15 48 17.7 48 21V26" stroke="#DDD6FE" strokeWidth="2.2" />
          {/* Tamper Seal Band */}
          <rect x="17" y="40" width="46" height="11" rx="3" fill="#FDE047" />
          <path d="M25 45.5H55" stroke="#4C1D95" strokeWidth="2.2" strokeDasharray="3 3" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-y-2 w-6 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan pointer-events-none" />
      </div>
    );
  }

  if (status === 'OUT_FOR_DELIVERY') {
    return (
      <div className="relative w-32 h-20 flex flex-col justify-center shrink-0">
        <svg viewBox="0 0 130 70" fill="none" className="w-full h-full">
          {/* Route arc */}
          <path
            d="M14 50 C 40 20, 88 20, 114 50"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Kitchen start pin */}
          <circle cx="14" cy="50" r="5" fill="#99F6E4" />
          {/* Home end pin */}
          <circle cx="114" cy="50" r="6" fill="#FDE047" />
          {/* Gliding Scooter Rider */}
          <g className="animate-scooter">
            <circle cx="56" cy="36" r="4.5" stroke="white" strokeWidth="2" fill="#0F4C5C" />
            <circle cx="74" cy="36" r="4.5" stroke="white" strokeWidth="2" fill="#0F4C5C" />
            <path d="M56 36L62 26H71L74 36" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="53" y="20" width="9" height="7" rx="1.5" fill="#E84A27" stroke="white" strokeWidth="1.2" />
            <path d="M44 26H50M42 30H48" stroke="#99F6E4" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
        <div className="text-[10px] text-teal-100 text-center truncate -mt-1">
          {restaurantName} → Your Door
        </div>
      </div>
    );
  }

  if (status === 'ARRIVED_DOORSTEP') {
    return (
      <div className="relative w-24 h-20 flex items-center justify-center shrink-0">
        <div className="absolute w-16 h-16 rounded-full border-2 border-[#E84A27] animate-radar" />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="relative z-10 w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center"
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
            <path d="M20 7L32 17V32H24V23H16V32H8V17L20 7Z" fill="#FAF8F5" fillOpacity="0.95" />
            <circle cx="20" cy="17" r="2.2" fill="#E84A27" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // DELIVERED or default
  return (
    <div className="relative w-24 h-20 flex items-center justify-center shrink-0">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-16 rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11">
          <path
            d="M24 6L38 11.5V22.5C38 31.2 32 38.2 24 41C16 38.2 10 31.2 10 22.5V11.5L24 6Z"
            fill="#ECFDF5"
            stroke="#A7F3D0"
            strokeWidth="2"
          />
          <path
            d="M17.5 24L22 28.5L31 19"
            stroke="#047857"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};
