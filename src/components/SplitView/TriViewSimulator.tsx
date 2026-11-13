import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  User,
  UtensilsCrossed,
  Bike,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Maximize2,
  Lock,
  Volume2,
  VolumeX,
  Package,
  KeyRound,
  ArrowDown,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { SafeBiteLogo } from '../Common/CustomVisuals';
import { CustomerView } from '../CustomerView/CustomerView';
import { RestaurantView } from '../RestaurantView/RestaurantView';
import { DeliveryView } from '../DeliveryView/DeliveryView';

export const TriViewSimulator: React.FC = () => {
  const {
    activeOrders,
    currentOrder,
    setActiveRole,
    loadScenario,
    restaurantAcceptOrder,
    restaurantSealAndReady,
    riderPickUpOrder,
    riderArriveAtDoorstep,
    soundEnabled,
    toggleSound,
    setShowFraudExplainer,
  } = useOrder();

  const dashboardRef = useRef<HTMLElement | null>(null);
  const order = currentOrder || activeOrders[0];

  const scrollToLiveDemo = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const problems = [
    {
      title: 'Ghost Drop-offs',
      description:
        'Riders can falsely mark orders delivered from down the street without physically reaching the customer.',
    },
    {
      title: 'Seal Tampering',
      description:
        'Unsealed or loosely packed food bags allow items to be opened, spilled, or compromised during transit.',
    },
    {
      title: 'No Physical Handover Proof',
      description:
        'Customers are left without reliable, verifiable evidence when disputing a missing or incomplete delivery.',
    },
  ];

  const solutions = [
    {
      title: 'Customer-Only Secret PIN',
      description:
        'A 4-digit handover PIN lives exclusively on the customer screen—invisible to both kitchen and rider until doorstep meetup.',
    },
    {
      title: 'Serialized Tamper-Evident Bag Seal',
      description:
        'Kitchens lock every bag with a unique trackable seal code so customers can inspect package integrity first.',
    },
    {
      title: 'Invalid PIN Protection & Anti-Bypass Lockout',
      description:
        'Incorrect PIN entries are blocked and counted, preventing riders from closing a delivery without physical confirmation.',
    },
    {
      title: 'Security Audit Trail & Instant Incident Reporting',
      description:
        'Every handoff step is logged with timestamps alongside one-tap reporting for open seals, spoiled food, or suspicious delays.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#17181C]">
      {/* ============================================================ */}
      {/* PHASE 1: PRODUCT INTRODUCTION & TWO-LAYER SECURITY HERO       */}
      {/* ============================================================ */}
      <section className="border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Brand Lockup, Headline, Value Prop & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center space-y-6"
            >
              {/* Brand Identity & Quiet Metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <SafeBiteLogo className="w-9 h-9" />
                  <span className="font-display font-extrabold text-lg tracking-tight text-[#17181C]">
                    SafeBite
                  </span>
                </div>
                <span className="text-stone-300" aria-hidden="true">
                  ·
                </span>
                <span className="text-xs font-semibold text-stone-600">
                  Verified Handover Food Delivery
                </span>
              </div>

              {/* Headline & Concise Explanation */}
              <div className="space-y-4">
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-tight text-[#17181C] text-balance max-w-2xl">
                  Your food. Your proof. Your protection.
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  SafeBite brings verifiable physical accountability to every meal delivery. By pairing tamper-evident kitchen packaging with a customer-held handover PIN, orders cannot be marked complete until sealed food reaches your hands.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={scrollToLiveDemo}
                  className="px-5 py-3 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white text-sm font-bold transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27] focus-visible:ring-offset-2"
                >
                  <span>Explore Live Demo</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowFraudExplainer(true)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#17181C] border border-stone-300 text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17181C] focus-visible:ring-offset-2"
                >
                  <HelpCircle className="w-4 h-4 text-[#E84A27]" />
                  <span>How SafeBite Works</span>
                </button>
              </div>

              {/* Quiet Editorial Footnote */}
              <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Dual-layer doorstep verification
                </span>
                <span className="text-stone-300 hidden sm:inline" aria-hidden="true">
                  ·
                </span>
                <span>Interactive Customer, Kitchen KDS, and Rider simulation below</span>
              </div>
            </motion.div>

            {/* Right Column: Two-Layer Security Architecture Presentation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 bg-[#17181C] text-white rounded-2xl p-6 sm:p-7 border border-stone-800 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#E84A27]">
                  Two-Layer Security Architecture
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                  Physical Seal Meets Digital Handover Proof
                </h2>
              </div>

              <div className="space-y-4">
                {/* Layer 1: Serialized Kitchen Tamper Seal */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#E84A27]/15 text-[#E84A27] flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-stone-400">
                          Layer 01 · Kitchen Dispatch
                        </div>
                        <h3 className="font-display text-sm font-bold text-white">
                          Serialized Tamper-Evident Kitchen Seal
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Every bag is locked across its handles with a unique serialized seal code before leaving the kitchen, letting you confirm the package was never opened in transit.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] border-t border-white/10">
                    <span className="text-stone-400">Active seal format</span>
                    <span className="font-mono font-bold text-stone-100 tabular-nums">
                      SEAL-BLR-9042
                    </span>
                  </div>
                </div>

                {/* Layer 2: Customer-Only Four-Digit Handover PIN */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-stone-400">
                          Layer 02 · Doorstep Release
                        </div>
                        <h3 className="font-display text-sm font-bold text-white">
                          Customer-Only Four-Digit Handover PIN
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Generated strictly on the customer&apos;s device and hidden from both kitchen and rider apps. Delivery completion stays locked until you inspect the bag and share the PIN in person.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] border-t border-white/10">
                    <span className="text-stone-400 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>Kitchen &amp; rider blind</span>
                    </span>
                    <div className="flex items-center gap-1 font-mono font-bold text-xs tabular-nums">
                      {['4', '8', '2', '9'].map((digit, idx) => (
                        <span
                          key={idx}
                          className="w-5 h-6 rounded bg-white text-[#17181C] flex items-center justify-center text-[11px]"
                        >
                          {digit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PHASE 1: PROBLEM VS. SOLUTION COMPARISON SECTION              */}
      {/* ============================================================ */}
      <section className="bg-[#FAF8F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="max-w-2xl space-y-2 mb-8">
            <div className="text-xs font-semibold text-[#E84A27]">
              Why SafeBite Exists
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17181C] text-balance">
              Closing the trust gap between kitchen dispatch and your doorstep
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Conventional delivery apps rely on one-sided GPS status updates. SafeBite replaces assumptions with mutual physical and cryptographic proof.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Problem Column */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/70 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-rose-700">
                        Without Verification
                      </div>
                      <h3 className="font-display text-base font-bold text-[#17181C]">
                        The Delivery Scam Problem
                      </h3>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {problems.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-[#17181C]">
                          {item.title}
                        </div>
                        <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
                Result: Customers absorb financial loss while platforms lack verifiable doorstep evidence.
              </div>
            </div>

            {/* Solution Column */}
            <div className="lg:col-span-7 bg-[#17181C] text-white rounded-2xl border border-stone-800 p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-400">
                        The SafeBite Protocol
                      </div>
                      <h3 className="font-display text-base font-bold text-white">
                        Verified Handover Solution
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solutions.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-1.5"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {item.title}
                        </div>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed pl-6">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-stone-300">
                  Test every safeguard across Customer, Kitchen, and Rider portals below.
                </span>
                <button
                  onClick={scrollToLiveDemo}
                  className="text-xs font-bold text-[#E84A27] hover:text-[#FF785A] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Jump to 3-in-1 Simulator</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EXISTING 3-IN-1 SYNCHRONIZATION DASHBOARD (PRESERVED INTACT) */}
      {/* ============================================================ */}
      <section
        id="live-sync-dashboard"
        ref={dashboardRef}
        className="scroll-mt-16 bg-[#111317] text-stone-100 pb-14"
      >
        {/* Simulator Toolbar */}
        <div className="bg-[#17181C] border-b border-stone-800 px-4 py-3 sticky top-[102px] sm:top-16 z-30">
          <div className="max-w-[1550px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#E84A27]/15 text-[#E84A27] flex items-center justify-center border border-[#E84A27]/30 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display font-bold text-sm sm:text-base text-white">
                    3-in-1 Live Delivery Synchronization
                  </h2>
                  {order && (
                    <>
                      <span className="text-stone-600 hidden sm:inline" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-xs font-mono font-semibold text-stone-300 tabular-nums">
                        {order.orderNumber} ({order.status.replace(/_/g, ' ')})
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-stone-400">
                  Watch Customer, Kitchen KDS, and Rider Portal react together across every order stage.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {order && (
                <>
                  <button
                    onClick={() => {
                      restaurantAcceptOrder(order.id);
                      restaurantSealAndReady(order.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    1. Kitchen Packs &amp; Seals
                  </button>
                  <button
                    onClick={() => {
                      riderPickUpOrder(order.id);
                      riderArriveAtDoorstep(order.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    2. Rider to Doorstep
                  </button>
                </>
              )}

              <button
                onClick={() => loadScenario('kitchen_incoming')}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Kitchen Prep Demo
              </button>

              <button
                onClick={() => loadScenario('doorstep_ready')}
                className="px-3 py-1.5 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reset Doorstep Demo
              </button>

              <button
                onClick={toggleSound}
                aria-label="Toggle Sound"
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 shrink-0 cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-stone-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Device Frames */}
        <div className="max-w-[1550px] mx-auto px-3 sm:px-6 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {/* Customer Frame */}
            <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between gap-2 bg-[#17181C]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#E84A27]/15 text-[#E84A27] border border-[#E84A27]/30 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">Customer Portal</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 truncate">
                      <Lock className="w-3 h-3 shrink-0" />
                      <span className="truncate">Handover PIN &amp; Report Settings</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRole('customer')}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Expand Customer View"
                  aria-label="Expand Customer View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-[660px] overflow-y-auto overflow-x-hidden bg-[#FAF8F5] text-[#17181C]">
                <CustomerView embedded />
              </div>
            </div>

            {/* Kitchen Frame */}
            <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between gap-2 bg-[#17181C]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      Restaurant Kitchen (KDS)
                    </div>
                    <div className="text-[11px] text-violet-300 flex items-center gap-1 truncate">
                      <Package className="w-3 h-3 shrink-0" />
                      <span className="truncate">Tamper-Seal Station</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRole('restaurant')}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Expand Kitchen View"
                  aria-label="Expand Kitchen View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-[660px] overflow-y-auto overflow-x-hidden bg-[#FAF8F5] text-[#17181C]">
                <RestaurantView embedded />
              </div>
            </div>

            {/* Rider Frame */}
            <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
              <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between gap-2 bg-[#17181C]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      Delivery Partner App
                    </div>
                    <div className="text-[11px] text-amber-300 flex items-center gap-1 truncate">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span className="truncate">Enter Customer PIN to Finish</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRole('delivery')}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Expand Rider View"
                  aria-label="Expand Rider View"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="h-[660px] overflow-y-auto overflow-x-hidden bg-[#111317] text-stone-100">
                <DeliveryView embedded />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
