import React from 'react';
import {
  User,
  UtensilsCrossed,
  Bike,
  ShieldCheck,
  Sparkles,
  Maximize2,
  Lock,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
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
  } = useOrder();

  const order = currentOrder || activeOrders[0];

  return (
    <div className="min-h-screen bg-[#111317] text-stone-100 pb-16">
      {/* Simulator Toolbar */}
      <div className="bg-[#17181C] border-b border-stone-800 px-4 py-3 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E84A27]/15 text-[#E84A27] flex items-center justify-center border border-[#E84A27]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm sm:text-base text-white">
                3-in-1 Live Delivery Synchronization
              </h1>
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
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold transition-colors cursor-pointer"
                >
                  1. Kitchen Packs & Seals
                </button>
                <button
                  onClick={() => {
                    riderPickUpOrder(order.id);
                    riderArriveAtDoorstep(order.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-semibold transition-colors cursor-pointer"
                >
                  2. Rider to Doorstep
                </button>
              </>
            )}

            <button
              onClick={() => loadScenario('kitchen_incoming')}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold transition-colors cursor-pointer"
            >
              Kitchen Prep Demo
            </button>

            <button
              onClick={() => loadScenario('doorstep_ready')}
              className="px-3 py-1.5 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold transition-colors cursor-pointer"
            >
              Reset Doorstep Demo
            </button>

            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 cursor-pointer"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Customer Frame */}
          <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
            <div className="px-3.5 py-2.5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E84A27]/20 text-[#E84A27] flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Customer Portal</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Handover PIN & Report Settings</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveRole('customer')}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Expand Customer View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-[700px] overflow-y-auto bg-[#FAF8F5] text-[#17181C]">
              <CustomerView />
            </div>
          </div>

          {/* Kitchen Frame */}
          <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
            <div className="px-3.5 py-2.5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Restaurant Kitchen (KDS)</div>
                  <div className="text-[11px] text-stone-400">Tamper-Seal Station</div>
                </div>
              </div>

              <button
                onClick={() => setActiveRole('restaurant')}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Expand Kitchen View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-[700px] overflow-y-auto bg-[#FAF8F5] text-[#17181C]">
              <RestaurantView />
            </div>
          </div>

          {/* Rider Frame */}
          <div className="flex flex-col bg-[#17181C] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
            <div className="px-3.5 py-2.5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Delivery Partner App</div>
                  <div className="text-[11px] text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Enter Customer PIN to Finish</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveRole('delivery')}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Expand Rider View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-[700px] overflow-y-auto bg-[#111317] text-stone-100">
              <DeliveryView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
