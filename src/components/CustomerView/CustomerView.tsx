import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Search,
  ShieldCheck,
  ShieldAlert,
  Star,
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  Eye,
  EyeOff,
  RefreshCw,
  Phone,
  CheckCircle2,
  ArrowRight,
  Package,
  Bike,
  Lock,
  Check,
  Copy,
  Settings,
  Flame,
  KeyRound,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { RESTAURANTS } from '../../data/mockData';
import { OrderStatus, Restaurant } from '../../types';
import {
  CategoryIcon,
  FoodImage,
  StageIllustration,
  getStageTheme,
} from '../Common/CustomVisuals';
import { CustomerReportSettingsModal } from './CustomerReportSettingsModal';

const STAGE_PREVIEW_STEPS: { status: OrderStatus; label: string }[] = [
  { status: 'PLACED', label: 'Ordered' },
  { status: 'PREPARING', label: 'Cooking' },
  { status: 'READY_FOR_PICKUP', label: 'Sealed' },
  { status: 'OUT_FOR_DELIVERY', label: 'Delivering' },
  { status: 'ARRIVED_DOORSTEP', label: 'At Door' },
  { status: 'DELIVERED', label: 'Delivered' },
];

export const CustomerView: React.FC = () => {
  const {
    currentOrder,
    cart,
    addToCart,
    updateQuantity,
    cartTotal,
    cartRestaurantName,
    placeOrder,
    regenerateCustomerOtp,
    verifySealByCustomer,
    setOrderStagePreview,
    setActiveRole,
    scamReports,
    customerSettings,
  } = useOrder();

  const [activeTab, setActiveTab] = useState<'browse' | 'tracking'>(
    currentOrder && currentOrder.status !== 'DELIVERED' ? 'tracking' : 'browse'
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<'report' | 'settings'>('report');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterVegOnly, setFilterVegOnly] = useState<boolean>(false);
  const [filterRating4Plus, setFilterRating4Plus] = useState<boolean>(false);
  const [filterFastDelivery, setFilterFastDelivery] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(() => !customerSettings.autoMaskPin);
  const [copiedOtp, setCopiedOtp] = useState<boolean>(false);
  const [mealRating, setMealRating] = useState<number>(0);
  const [customerAddress, setCustomerAddress] = useState<string>(
    'Flat 402, Shanti Nilaya Apartments, 7th Cross, Koramangala 4th Block, Bengaluru'
  );

  useEffect(() => {
    if (customerSettings.autoMaskPin) {
      setShowOtp(false);
    }
  }, [customerSettings.autoMaskPin]);

  const categories = [
    'All',
    'Biryani',
    'South Indian',
    'Burgers',
    'Pizza',
    'Desserts',
    'Chai & Snacks',
    'Momos',
  ];

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q) ||
        r.cuisine.some((c) => c.toLowerCase().includes(q)) ||
        r.menu.some(
          (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );

      if (!matchesSearch) return false;

      if (selectedCategory !== 'All') {
        const matchesCategory =
          r.cuisine.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          r.menu.some((m) => m.category.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!matchesCategory) return false;
      }

      if (filterVegOnly && !r.menu.some((m) => m.isVeg)) return false;
      if (filterRating4Plus && r.rating < 4.5) return false;
      if (filterFastDelivery && r.deliveryTimeMins > 24) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, filterVegOnly, filterRating4Plus, filterFastDelivery]);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    placeOrder(customerAddress);
    setShowCartModal(false);
    setSelectedRestaurant(null);
    setActiveTab('tracking');
  };

  const handleCopyOtp = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const openReportPortal = (tab: 'report' | 'settings' = 'report') => {
    setSettingsInitialTab(tab);
    setShowSettingsModal(true);
  };

  const activeStageTheme =
    activeTab === 'tracking' && currentOrder
      ? getStageTheme(currentOrder.status, customerSettings.dynamicStageThemes)
      : null;

  const orderReportsCount = currentOrder
    ? scamReports.filter((r) => r.orderId === currentOrder.id).length
    : scamReports.length;

  return (
    <div
      className={`min-h-screen pb-24 transition-colors duration-500 ${
        activeStageTheme ? activeStageTheme.pageBg : 'bg-[#FAF8F5]'
      }`}
    >
      {/* Top Location, Navigation & Top-Right Safety/Settings Control */}
      <div className="bg-white/90 backdrop-blur-md border-b border-stone-200/90 px-4 py-2.5 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Location & Customer Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#17181C] text-[#FAF8F5] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#E84A27]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#17181C]">
                <span className="truncate">Koramangala 4th Block</span>
                <span className="text-stone-400" aria-hidden="true">·</span>
                <span className="text-stone-500 font-medium">Bengaluru</span>
              </div>
              <div className="text-[11px] text-stone-500 truncate">
                Ananya Deshmukh · Flat 402
              </div>
            </div>
          </div>

          {/* Center/Right Controls + Top-Right Settings & Scam Report Gear */}
          <div className="flex items-center gap-2 ml-auto">
            {currentOrder && (
              <button
                onClick={() => setActiveTab('tracking')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'tracking'
                    ? 'bg-[#E84A27] text-white shadow-xs'
                    : 'bg-white text-stone-800 border border-stone-200 hover:border-[#E84A27]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Track #{currentOrder.orderNumber.split('-')[1]}</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('browse');
                setSelectedRestaurant(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-[#17181C] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Restaurants</span>
            </button>

            {/* TOP-RIGHT CORNER SETTINGS & SCAM REPORT TRIGGER */}
            <button
              onClick={() => openReportPortal('report')}
              aria-label="Safety Settings and Report Scam"
              title="Settings & Report Delivery Scam"
              className="group relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-rose-700 group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline">Report & Settings</span>
              {orderReportsCount > 0 && (
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-700 text-white tabular-nums">
                  {orderReportsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 pt-5">
        {/* ======================================================== */}
        {/* TAB 1: DYNAMIC THEME ORDER TRACKING & HANDOVER PIN       */}
        {/* ======================================================== */}
        {activeTab === 'tracking' && currentOrder && activeStageTheme && (
          <motion.div
            key={currentOrder.status}
            initial={{ opacity: 0.85, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* 1. DYNAMIC STAGE ATMOSPHERE HERO CARD */}
            <div
              className={`rounded-2xl bg-gradient-to-br ${activeStageTheme.cardGradient} p-5 shadow-md overflow-hidden relative`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/80 font-medium">
                    <span className="font-mono font-bold text-white tabular-nums">
                      {currentOrder.orderNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{currentOrder.restaurantName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeStageTheme.badgeText}</span>
                  </div>

                  <h1 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight text-balance">
                    {activeStageTheme.headline}
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 max-w-xl leading-relaxed">
                    {activeStageTheme.subline}
                  </p>
                </div>

                {/* Custom Animated Stage Illustration */}
                <StageIllustration
                  status={currentOrder.status}
                  restaurantName={currentOrder.restaurantName}
                />
              </div>

              {/* Interactive Stage Theme Switcher Strip (Explore stage themes live!) */}
              <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Stage Theme:</span>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {STAGE_PREVIEW_STEPS.map((step) => {
                    const isCurrent = currentOrder.status === step.status;
                    return (
                      <button
                        key={step.status}
                        onClick={() => setOrderStagePreview(currentOrder.id, step.status)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                          isCurrent
                            ? 'bg-white text-[#17181C] shadow-xs'
                            : 'bg-white/10 text-white/85 hover:bg-white/20'
                        }`}
                      >
                        {step.label}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-mono font-bold text-white tabular-nums flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/80" />
                  <span>{activeStageTheme.etaLabel}</span>
                </div>
              </div>
            </div>

            {/* 2. INTERACTIVE 4-STAGE JOURNEY STEPPER (NO STATIC EMOJIS) */}
            <div className={`bg-white rounded-2xl p-4 border ${activeStageTheme.borderColor}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    key: 'kitchen',
                    title: 'Kitchen Firing',
                    sub: currentOrder.timeline.preparing || 'Queued',
                    active: [
                      'PLACED',
                      'ACCEPTED',
                      'PREPARING',
                      'READY_FOR_PICKUP',
                      'OUT_FOR_DELIVERY',
                      'ARRIVED_DOORSTEP',
                      'DELIVERED',
                    ].includes(currentOrder.status),
                    icon: <Flame className="w-4 h-4" />,
                  },
                  {
                    key: 'seal',
                    title: 'Tamper Sealed',
                    sub: currentOrder.tamperSealCode,
                    active: [
                      'READY_FOR_PICKUP',
                      'OUT_FOR_DELIVERY',
                      'ARRIVED_DOORSTEP',
                      'DELIVERED',
                    ].includes(currentOrder.status),
                    icon: <Package className="w-4 h-4" />,
                  },
                  {
                    key: 'transit',
                    title: 'Out for Delivery',
                    sub: currentOrder.timeline.pickedUp || 'Awaiting pickup',
                    active: ['OUT_FOR_DELIVERY', 'ARRIVED_DOORSTEP', 'DELIVERED'].includes(
                      currentOrder.status
                    ),
                    icon: <Bike className="w-4 h-4" />,
                  },
                  {
                    key: 'handover',
                    title:
                      currentOrder.status === 'DELIVERED' ? 'PIN Verified' : 'Handover PIN',
                    sub:
                      currentOrder.status === 'DELIVERED'
                        ? currentOrder.otpVerifiedAt || 'Completed'
                        : currentOrder.status === 'ARRIVED_DOORSTEP'
                        ? 'Share now'
                        : 'Locked',
                    active: ['ARRIVED_DOORSTEP', 'DELIVERED'].includes(currentOrder.status),
                    completed: currentOrder.status === 'DELIVERED',
                    icon:
                      currentOrder.status === 'DELIVERED' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <KeyRound className="w-4 h-4" />
                      ),
                  },
                ].map((step) => (
                  <div
                    key={step.key}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-2.5 ${
                      step.completed
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : step.active
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        step.completed
                          ? 'bg-emerald-600 text-white'
                          : step.active
                          ? 'bg-[#E84A27] text-white'
                          : 'bg-stone-200/70 text-stone-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{step.title}</div>
                      <div
                        className={`text-[10px] font-mono truncate tabular-nums ${
                          step.completed
                            ? 'text-emerald-700'
                            : step.active
                            ? 'text-stone-300'
                            : 'text-stone-400'
                        }`}
                      >
                        {step.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. INTERACTIVE HANDOVER PIN VAULT + TAMPER SEAL INSPECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              {/* Handover PIN Vault */}
              <div className="md:col-span-7 bg-[#17181C] text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm border border-stone-800">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Customer-Only Handover PIN</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => regenerateCustomerOtp(currentOrder.id)}
                      className="flex items-center gap-1 text-[11px] text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors font-semibold cursor-pointer"
                      title="Generate a fresh PIN"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Rotate PIN</span>
                    </button>
                    <button
                      onClick={() => setShowOtp(!showOtp)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title={showOtp ? 'Mask PIN' : 'Reveal PIN'}
                    >
                      {showOtp ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {currentOrder.handoverOtp.split('').map((digit, i) => (
                      <motion.div
                        key={`${currentOrder.handoverOtp}-${i}-${showOtp}`}
                        initial={{ rotateX: -75, opacity: 0.4 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.22, delay: i * 0.04 }}
                        className="w-11 h-14 rounded-xl bg-white text-[#17181C] flex items-center justify-center font-mono font-extrabold text-2xl tabular-nums shadow-sm"
                      >
                        {showOtp ? digit : '•'}
                      </motion.div>
                    ))}

                    <button
                      onClick={() => handleCopyOtp(currentOrder.handoverOtp)}
                      className="ml-1 h-14 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                      title="Copy PIN"
                    >
                      {copiedOtp ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-stone-300 max-w-xs leading-relaxed">
                    {currentOrder.status === 'ARRIVED_DOORSTEP' ? (
                      <span className="text-amber-300 font-bold">
                        {currentOrder.deliveryPartner.name} is outside. Verify the bag seal, then share this PIN verbally.
                      </span>
                    ) : currentOrder.status === 'DELIVERED' ? (
                      <span className="text-emerald-300 font-bold">
                        PIN verified at {currentOrder.otpVerifiedAt}. Handover closed cleanly.
                      </span>
                    ) : (
                      <span>
                        Keep secret. Share <strong>only</strong> after receiving your sealed food bag in person.
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-amber-400" />
                    Never share over phone call or SMS
                  </span>
                  <button
                    onClick={() => openReportPortal('report')}
                    className="text-rose-400 hover:text-rose-300 font-semibold underline cursor-pointer"
                  >
                    Report issue
                  </button>
                </div>
              </div>

              {/* Interactive Tamper Seal & Quick Scam Report Card */}
              <div className="md:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Tamper-Seal Check</span>
                    <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-200 tabular-nums">
                      {currentOrder.tamperSealCode}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    Before sharing your Handover PIN, verify the adhesive security strip across the bag handles is unbroken.
                  </p>
                </div>

                {currentOrder.sealVerifiedByCustomer ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Seal verified intact by you</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => verifySealByCustomer(currentOrder.id)}
                      className="w-full py-2 px-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Bag Seal Is Intact</span>
                    </button>
                    <button
                      onClick={() => openReportPortal('report')}
                      className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Seal Open or Scam? Report Now</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Meal Rating Card when DELIVERED */}
            {currentOrder.status === 'DELIVERED' && (
              <div className="bg-emerald-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="font-display text-sm font-bold">
                    How was your SafeBite delivery experience?
                  </div>
                  <p className="text-xs text-emerald-200">
                    Your feedback helps reward honest partners like {currentOrder.deliveryPartner.name}.
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMealRating(star)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-transform active:scale-90 cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= mealRating
                            ? 'fill-amber-300 text-amber-300'
                            : 'text-emerald-300/60'
                        }`}
                      />
                    </button>
                  ))}
                  {mealRating > 0 && (
                    <span className="ml-2 text-xs font-bold text-emerald-200">
                      Rated {mealRating}/5
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 4. DELIVERY PARTNER CARD */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <FoodImage
                  src={currentOrder.deliveryPartner.photoUrl}
                  alt={currentOrder.deliveryPartner.name}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#17181C]">
                    <span>{currentOrder.deliveryPartner.name}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-700 tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                      {currentOrder.deliveryPartner.rating}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    EV Fleet · {currentOrder.deliveryPartner.vehicleNo} ·{' '}
                    <span className="tabular-nums">{currentOrder.deliveryPartner.tripsCount}+</span> safe trips
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${currentOrder.deliveryPartner.phone}`}
                  onClick={(e) => e.preventDefault()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
                <button
                  onClick={() => setActiveRole('delivery')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#17181C] text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Bike className="w-3.5 h-3.5 text-[#E84A27]" />
                  <span>Open Rider App</span>
                </button>
              </div>
            </div>

            {/* 5. ORDER SUMMARY & AUDIT LOGS (TWO-COLUMN ON DESKTOP) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Order Receipt */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <h3 className="font-display text-sm font-bold text-stone-900">
                    Order Summary
                  </h3>
                  <span className="text-xs text-stone-500">{currentOrder.restaurantName}</span>
                </div>

                <div className="divide-y divide-stone-100">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center text-[7px] font-bold ${
                            item.isVeg
                              ? 'border-emerald-600 text-emerald-600'
                              : 'border-rose-600 text-rose-600'
                          }`}
                        >
                          ●
                        </span>
                        <span className="font-semibold text-stone-800">
                          {item.name} <span className="text-stone-400">× {item.quantity}</span>
                        </span>
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-1 text-xs text-stone-600 tabular-nums">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span>₹{currentOrder.itemTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery & Platform Fee</span>
                    <span>₹{currentOrder.deliveryFee + currentOrder.platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (GST)</span>
                    <span>₹{currentOrder.tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Paid</span>
                    <span className="text-emerald-700">₹{currentOrder.grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Anti-Fraud Audit Log */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#E84A27]" />
                    <span>Handover Security Trail</span>
                  </h3>
                  <span className="text-[11px] font-mono text-stone-500 tabular-nums">
                    {currentOrder.auditLogs.length} events
                  </span>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {currentOrder.auditLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          log.badge === 'success'
                            ? 'bg-emerald-600'
                            : log.badge === 'warning'
                            ? 'bg-rose-600'
                            : 'bg-[#E84A27]'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-stone-900 truncate">{log.event}</span>
                          <span className="text-[10px] text-stone-400 font-mono tabular-nums shrink-0">
                            {log.timestamp}
                          </span>
                        </div>
                        {log.details && (
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                            {log.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: EDITORIAL CULINARY BROWSE VIEW                    */}
        {/* ======================================================== */}
        {activeTab === 'browse' && !selectedRestaurant && (
          <div className="space-y-5">
            {/* Editorial Banner */}
            <div className="rounded-2xl bg-[#17181C] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="text-xs font-semibold text-[#E84A27]">
                  Tamper-Sealed Kitchens · Handover PIN Verified
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight text-balance">
                  Curated Bengaluru Kitchens With Zero-Scam Delivery
                </h2>
                <p className="text-xs sm:text-sm text-stone-300">
                  Every bag carries a physical tamper seal and unlocks only with your private 4-digit PIN.
                </p>
              </div>
              <button
                onClick={() => openReportPortal('settings')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Customize Stage Themes
              </button>
            </div>

            {/* Interactive Category Buttons with Custom SVG Culinary Icons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#17181C] text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-[#E84A27]'
                    }`}
                  >
                    <CategoryIcon category={cat} active={isActive} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Search & Quick Filter Toggles */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search biryani, dosa, burgers, sourdough..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E84A27]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={() => setFilterVegOnly(!filterVegOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterVegOnly
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-xs border border-emerald-600 flex items-center justify-center text-[6px] text-emerald-600">
                    ●
                  </span>
                  <span>Pure Veg</span>
                </button>

                <button
                  onClick={() => setFilterRating4Plus(!filterRating4Plus)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterRating4Plus
                      ? 'bg-amber-50 border-amber-500 text-amber-900'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.5+ Rated</span>
                </button>

                <button
                  onClick={() => setFilterFastDelivery(!filterFastDelivery)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterFastDelivery
                      ? 'bg-rose-50 border-[#E84A27] text-[#E84A27]'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-[#E84A27]" />
                  <span>Under 25m</span>
                </button>

                <span className="text-xs text-stone-500 font-medium whitespace-nowrap ml-auto tabular-nums">
                  {filteredRestaurants.length} kitchens
                </span>
              </div>
            </div>

            {/* Restaurants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRestaurants.map((restaurant) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18 }}
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-stone-100">
                    <FoodImage
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                    {restaurant.discountBadge && (
                      <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-extrabold tracking-wide">
                        {restaurant.discountBadge}
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-bold text-base text-[#17181C] group-hover:text-[#E84A27] transition-colors truncate">
                          {restaurant.name}
                        </h3>
                        <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 tabular-nums shrink-0">
                          <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                          {restaurant.rating}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate mt-0.5">
                        {restaurant.cuisine.join(' · ')}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 tabular-nums">
                      <span className="font-semibold text-stone-800">
                        {restaurant.deliveryTimeMins} mins · {restaurant.distanceKm} km
                      </span>
                      <span>₹{restaurant.priceForTwo} for two</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
                <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
                <h3 className="font-display text-base font-bold text-stone-800">
                  No kitchens match your filters
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setFilterVegOnly(false);
                    setFilterRating4Plus(false);
                    setFilterFastDelivery(false);
                  }}
                  className="px-4 py-2 bg-[#E84A27] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* RESTAURANT MENU VIEW                                     */}
        {/* ======================================================== */}
        {activeTab === 'browse' && selectedRestaurant && (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="text-xs font-bold text-stone-600 hover:text-[#17181C] flex items-center gap-1 cursor-pointer"
            >
              ← Back to all kitchens
            </button>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-display text-xl font-extrabold text-[#17181C]">
                    {selectedRestaurant.name}
                  </h1>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedRestaurant.cuisine.join(' · ')} · {selectedRestaurant.locality}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs tabular-nums">
                  <div className="font-bold text-emerald-700 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                    <span>
                      {selectedRestaurant.rating} ({selectedRestaurant.ratingCount})
                    </span>
                  </div>
                  <div className="font-bold text-stone-800 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#E84A27]" />
                    <span>{selectedRestaurant.deliveryTimeMins} mins</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#E84A27] shrink-0" />
                <span>
                  <strong>SafeBite Tamper-Seal Partner:</strong> Orders leave sealed and require your Handover PIN.
                </span>
              </div>
            </div>

            {/* Menu List */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 divide-y divide-stone-100">
              {selectedRestaurant.menu.map((dish) => {
                const cartItem = cart.find((ci) => ci.menuItem.id === dish.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={dish.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span
                          className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center text-[7px] font-bold ${
                            dish.isVeg
                              ? 'border-emerald-600 text-emerald-600'
                              : 'border-rose-600 text-rose-600'
                          }`}
                        >
                          ●
                        </span>
                        {dish.bestseller && (
                          <span className="font-bold text-[#E84A27]">Bestseller</span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-sm sm:text-base text-[#17181C]">
                        {dish.name}
                      </h3>
                      <div className="font-mono font-bold text-xs text-stone-900 tabular-nums">
                        ₹{dish.price}
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-lg">
                        {dish.description}
                      </p>
                    </div>

                    <div className="relative w-24 h-24 shrink-0 flex flex-col items-center">
                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        className="w-24 h-20 rounded-xl object-cover border border-stone-200"
                      />

                      <div className="absolute -bottom-2">
                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(dish, selectedRestaurant)}
                            className="px-4 py-1.5 bg-white border border-stone-300 hover:border-[#E84A27] text-[#E84A27] font-extrabold text-xs rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#17181C] text-white rounded-lg shadow-xs font-extrabold text-xs px-2 py-1 gap-2.5">
                            <button
                              onClick={() => updateQuantity(dish.id, -1)}
                              className="hover:text-[#E84A27] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono tabular-nums">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(dish.id, 1)}
                              className="hover:text-[#E84A27] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-4 inset-x-0 max-w-md mx-auto px-4 z-40"
          >
            <div className="bg-[#17181C] text-white rounded-2xl p-3 px-4 shadow-xl flex items-center justify-between border border-stone-800">
              <div>
                <div className="text-xs font-bold tabular-nums">
                  {cart.reduce((s, c) => s + c.quantity, 0)} items · ₹{cartTotal}
                </div>
                <div className="text-[11px] text-stone-400 truncate max-w-[180px]">
                  {cartRestaurantName}
                </div>
              </div>

              <button
                onClick={() => setShowCartModal(true)}
                className="bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      {showCartModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setShowCartModal(false)}
        >
          <div
            className="bg-[#FAF8F5] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#17181C]">
                  Review & Place Order
                </h2>
                <p className="text-xs text-stone-500">From {cartRestaurantName}</p>
              </div>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-xs font-bold text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E84A27]" />
                <span>Delivery Address</span>
              </div>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E84A27]"
              />
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-3 divide-y divide-stone-100 text-xs">
              {cart.map((item) => (
                <div key={item.menuItem.id} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="font-semibold text-stone-800">{item.menuItem.name}</span>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.menuItem.id, -1)} className="cursor-pointer">-</button>
                      <span className="font-mono font-bold tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.menuItem.id, 1)} className="cursor-pointer">+</button>
                    </div>
                    <span className="font-mono font-bold text-stone-900 w-12 text-right tabular-nums">
                      ₹{item.menuItem.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Handover PIN Shield Included</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                A dynamic 4-digit PIN locks on your phone so delivery cannot be falsified.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3 tabular-nums">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery + Platform Fee</span>
                <span>₹41</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span>₹{(cartTotal * 0.05).toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#17181C] pt-2 border-t border-stone-200">
                <span>To Pay</span>
                <span className="text-[#E84A27]">
                  ₹{(cartTotal + 35 + 6 + cartTotal * 0.05).toFixed(1)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Place Order & Forge Handover PIN</span>
            </button>
          </div>
        </div>
      )}

      {/* TOP-RIGHT SETTINGS & REPORT SCAM MODAL */}
      <CustomerReportSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        initialTab={settingsInitialTab}
      />
    </div>
  );
};
