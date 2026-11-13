import React from 'react';
import {
  UtensilsCrossed,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Package,
  Bike,
  Sparkles,
  Flame,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export const RestaurantView: React.FC = () => {
  const {
    activeOrders,
    setCurrentOrderId,
    currentOrder,
    restaurantAcceptOrder,
    restaurantSealAndReady,
    setActiveRole,
    loadScenario,
    scamReports,
  } = useOrder();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16">
      {/* Kitchen KDS Sub-Header */}
      <div className="bg-[#17181C] text-white px-4 py-3 sticky top-16 z-30 border-b border-stone-800">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E84A27]/15 text-[#E84A27] flex items-center justify-center border border-[#E84A27]/30">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm sm:text-base tracking-tight">
                Meghana Kitchen · KDS Terminal
              </h1>
              <p className="text-[11px] text-stone-400">
                Koramangala 5th Block · Tamper-Seal Station Active
              </p>
            </div>
          </div>

          <button
            onClick={() => loadScenario('kitchen_incoming')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#E84A27] text-white hover:bg-[#D13B19] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Incoming Order</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-5 space-y-4">
        {/* Zero-Fraud Kitchen Protocol Banner */}
        <div className="bg-[#17181C] rounded-2xl p-4 text-white border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-white">
                Zero-Fraud Kitchen Seal Protocol
              </h2>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed max-w-xl">
                Customer Handover PINs remain encrypted away from kitchen terminals. Cook fresh, apply the serialized tamper seal across bag handles, and hand over to the rider.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-1.5 shrink-0">
            <Lock className="w-3.5 h-3.5" />
            <span>Customer PIN Encrypted</span>
          </div>
        </div>

        {/* Active Scam / Seal Incident Alert for Kitchen */}
        {scamReports.length > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-rose-900">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">
                Customer Safety Report Logged ({scamReports[0].ticketCode})
              </div>
              <p className="text-[11px] text-rose-800 mt-0.5">
                {scamReports[0].orderNumber}: {scamReports[0].categoryLabel}
              </p>
            </div>
          </div>
        )}

        {/* Active Orders Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-[#17181C] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E84A27]" />
              <span>Active Kitchen Queue ({activeOrders.length})</span>
            </h2>
            <span className="text-xs text-stone-500">Synchronized across all 3 portals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map((order) => {
              const isSelected = order.id === (currentOrder?.id || activeOrders[0]?.id);

              return (
                <div
                  key={order.id}
                  onClick={() => setCurrentOrderId(order.id)}
                  className={`bg-white rounded-2xl border transition-all p-4 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[#E84A27] border-transparent shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#17181C] tabular-nums">
                            {order.orderNumber}
                          </span>
                          <span className="text-stone-300" aria-hidden="true">·</span>
                          <span className="text-xs font-bold text-[#E84A27]">
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {order.customerName} · {order.placedAt}
                        </p>
                      </div>

                      <div className="text-right tabular-nums">
                        <div className="font-mono font-bold text-sm text-[#17181C]">
                          ₹{order.grandTotal}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">Paid Online</div>
                      </div>
                    </div>

                    {/* Dishes */}
                    <div className="py-3 space-y-2 border-b border-stone-100">
                      <div className="text-xs font-bold text-stone-700">Preparation Ticket</div>
                      <div className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs bg-stone-50 px-3 py-2 rounded-xl border border-stone-100"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[8px] ${
                                  item.isVeg ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                ●
                              </span>
                              <span className="font-bold text-stone-900">
                                {item.quantity}× {item.name}
                              </span>
                            </div>
                            <span className="text-stone-500 text-[11px] font-medium">Prep</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tamper Seal Code */}
                    <div className="py-3 border-b border-stone-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                          <Package className="w-4 h-4 text-violet-700" />
                          <span>Bag Tamper-Evident Seal</span>
                        </div>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-violet-50 text-violet-800 border border-violet-200 tabular-nums">
                          {order.tamperSealCode}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Apply thermal adhesive strip across handles before rider pickup.
                      </p>
                    </div>

                    {/* Assigned Rider */}
                    <div className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-[#E84A27]" />
                        <span className="text-stone-500">Rider:</span>
                        <strong className="text-stone-900">{order.deliveryPartner.name}</strong>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        {order.deliveryPartner.vehicleNo.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2">
                    {order.status === 'PLACED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restaurantAcceptOrder(order.id);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        <span>Accept Order & Start Cooking</span>
                      </button>
                    )}

                    {order.status === 'PREPARING' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restaurantSealAndReady(order.id);
                        }}
                        className="w-full py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Apply Tamper-Seal & Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'READY_FOR_PICKUP' && (
                      <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-violet-700" />
                          <span>Sealed on Counter</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-[#E84A27] hover:underline cursor-pointer"
                        >
                          Open Rider App →
                        </button>
                      </div>
                    )}

                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Bike className="w-4 h-4 text-teal-700" />
                          <span>Rider En-Route</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-teal-800 hover:underline cursor-pointer"
                        >
                          Track Rider →
                        </button>
                      </div>
                    )}

                    {order.status === 'ARRIVED_DOORSTEP' && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-4 h-4 text-amber-700" />
                          <span>At Doorstep · Awaiting PIN</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-[#E84A27] hover:underline cursor-pointer"
                        >
                          Rider View →
                        </button>
                      </div>
                    )}

                    {order.status === 'DELIVERED' && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Handover Authenticated</span>
                        </span>
                        <span className="font-mono text-emerald-700 tabular-nums">
                          {order.otpVerifiedAt}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
