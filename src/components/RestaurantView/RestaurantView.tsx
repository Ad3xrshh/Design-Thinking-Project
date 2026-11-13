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
  BellRing,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { OrderStatus } from '../../types';

interface RestaurantViewProps {
  embedded?: boolean;
}

function getKitchenStatusMeta(status: OrderStatus): {
  label: string;
  classes: string;
  icon: React.ReactNode;
} {
  switch (status) {
    case 'PLACED':
    case 'ACCEPTED':
      return {
        label: 'New Order',
        classes: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: <BellRing className="w-3 h-3" />,
      };
    case 'PREPARING':
      return {
        label: 'Cooking',
        classes: 'bg-orange-50 text-[#E84A27] border-orange-200',
        icon: <Flame className="w-3 h-3" />,
      };
    case 'READY_FOR_PICKUP':
      return {
        label: 'Sealed · Ready',
        classes: 'bg-violet-50 text-violet-800 border-violet-200',
        icon: <Package className="w-3 h-3" />,
      };
    case 'OUT_FOR_DELIVERY':
      return {
        label: 'Out for Delivery',
        classes: 'bg-teal-50 text-teal-800 border-teal-200',
        icon: <Bike className="w-3 h-3" />,
      };
    case 'ARRIVED_DOORSTEP':
      return {
        label: 'At Doorstep',
        classes: 'bg-amber-50 text-amber-900 border-amber-200',
        icon: <Clock className="w-3 h-3" />,
      };
    case 'DELIVERED':
      return {
        label: 'Delivered',
        classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: <CheckCircle2 className="w-3 h-3" />,
      };
    case 'CANCELLED':
      return {
        label: 'Cancelled',
        classes: 'bg-rose-50 text-rose-800 border-rose-200',
        icon: <ShieldAlert className="w-3 h-3" />,
      };
  }
}

export const RestaurantView: React.FC<RestaurantViewProps> = ({ embedded = false }) => {
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

  const isSingleOrder = activeOrders.length <= 1;
  const openTicketsCount = activeOrders.filter((o) => o.status !== 'DELIVERED').length;

  return (
    <div
      className={
        embedded
          ? 'bg-[#FAF8F5] text-[#17181C] pb-6'
          : 'min-h-screen bg-[#FAF8F5] text-[#17181C] pb-14'
      }
    >
      {/* Kitchen KDS Sub-Header */}
      <div
        className={`bg-[#17181C] text-white px-4 py-3 sticky ${
          embedded ? 'top-0' : 'top-[102px] sm:top-16'
        } z-20 border-b border-stone-800`}
      >
        <div
          className={`${
            embedded ? 'w-full' : 'max-w-5xl mx-auto'
          } flex flex-wrap items-center justify-between gap-3`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#E84A27]/15 text-[#E84A27] flex items-center justify-center border border-[#E84A27]/30 shrink-0">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-sm tracking-tight truncate">
                Meghana Kitchen · KDS Terminal
              </h1>
              <p className="text-[11px] text-stone-300 truncate">
                Koramangala 5th Block · Tamper-Seal Station Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {!embedded && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111317] border border-stone-800 text-xs tabular-nums">
                <span className="text-stone-400">Open Tickets</span>
                <span className="font-mono font-bold text-white">{openTicketsCount}</span>
              </div>
            )}

            <button
              onClick={() => loadScenario('kitchen_incoming')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#E84A27] text-white hover:bg-[#D13B19] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Incoming Order</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          embedded ? 'px-3.5 pt-3.5 space-y-3.5' : 'max-w-5xl mx-auto px-4 pt-5 sm:pt-6 space-y-5'
        }`}
      >
        {/* Zero-Fraud Kitchen Protocol Banner */}
        <div
          className={`bg-[#17181C] rounded-2xl p-4 sm:p-5 text-white border border-stone-800 flex flex-col ${
            embedded ? 'gap-3' : 'md:flex-row md:items-center md:justify-between gap-4'
          }`}
        >
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

          <div className="bg-white/5 border border-white/15 px-3 py-2 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-1.5 shrink-0 self-start md:self-auto whitespace-nowrap">
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

        {/* Active Orders Queue */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-sm sm:text-base font-bold text-[#17181C] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E84A27]" />
              <span className="tabular-nums">
                Active Kitchen Queue ({activeOrders.length})
              </span>
            </h2>
            <span className="text-xs text-stone-600 font-medium">
              Synchronized across all 3 portals
            </span>
          </div>

          <div
            className={
              embedded || isSingleOrder
                ? 'grid grid-cols-1 gap-4'
                : 'grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'
            }
          >
            {activeOrders.map((order) => {
              const isSelected = order.id === (currentOrder?.id || activeOrders[0]?.id);
              const isSealedOrBeyond = [
                'READY_FOR_PICKUP',
                'OUT_FOR_DELIVERY',
                'ARRIVED_DOORSTEP',
                'DELIVERED',
              ].includes(order.status);
              const statusMeta = getKitchenStatusMeta(order.status);

              return (
                <div
                  key={order.id}
                  onClick={() => setCurrentOrderId(order.id)}
                  className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[#E84A27] border-transparent shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div>
                    {/* Order Header */}
                    <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-extrabold text-sm text-[#17181C] tabular-nums">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-bold whitespace-nowrap ${statusMeta.classes}`}
                          >
                            {statusMeta.icon}
                            <span>{statusMeta.label}</span>
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 truncate">
                          {order.customerName} · {order.placedAt}
                        </p>
                      </div>

                      <div className="text-right tabular-nums shrink-0">
                        <div className="font-mono font-extrabold text-sm text-[#17181C]">
                          ₹{order.grandTotal}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold">
                          Paid Online
                        </div>
                      </div>
                    </div>

                    {/* Ticket + Tamper Seal layout */}
                    <div
                      className={
                        !embedded && isSingleOrder
                          ? 'grid grid-cols-1 md:grid-cols-12 gap-4 py-3.5 border-b border-stone-100'
                          : 'py-3 space-y-3 border-b border-stone-100'
                      }
                    >
                      {/* Dishes */}
                      <div
                        className={
                          !embedded && isSingleOrder ? 'md:col-span-7 space-y-2' : 'space-y-2'
                        }
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                          <span>Preparation Ticket</span>
                          <span className="text-[11px] font-medium text-stone-600 tabular-nums">
                            {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2 text-xs bg-stone-50 px-3 py-2 rounded-xl border border-stone-200/70"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center text-[7px] font-bold shrink-0 ${
                                    item.isVeg
                                      ? 'border-emerald-600 text-emerald-600'
                                      : 'border-rose-600 text-rose-600'
                                  }`}
                                >
                                  ●
                                </span>
                                <span className="font-mono text-[11px] font-extrabold text-[#17181C] bg-white border border-stone-200 px-1.5 py-0.5 rounded tabular-nums shrink-0">
                                  {item.quantity}×
                                </span>
                                <span className="font-semibold text-stone-900 truncate">
                                  {item.name}
                                </span>
                              </div>
                              <span
                                className={`text-[11px] font-bold shrink-0 ${
                                  isSealedOrBeyond ? 'text-emerald-700' : 'text-amber-700'
                                }`}
                              >
                                {isSealedOrBeyond ? 'Packed' : 'Prep'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tamper Seal Code */}
                      <div
                        className={`${
                          !embedded && isSingleOrder ? 'md:col-span-5' : ''
                        } rounded-xl p-3.5 border flex flex-col justify-between space-y-2 ${
                          isSealedOrBeyond
                            ? 'bg-emerald-50/50 border-emerald-200/90'
                            : 'bg-violet-50/60 border-violet-200/90'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                            <Package
                              className={`w-4 h-4 shrink-0 ${
                                isSealedOrBeyond ? 'text-emerald-700' : 'text-violet-700'
                              }`}
                            />
                            <span>Tamper-Evident Seal</span>
                          </div>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-white text-violet-900 border border-violet-200 tabular-nums shrink-0">
                            {order.tamperSealCode}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          Apply thermal adhesive strip across handles before rider pickup.
                        </p>
                        <div className="text-[11px] font-bold flex items-center gap-1.5 pt-0.5">
                          {isSealedOrBeyond ? (
                            <span className="text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Seal applied &amp; logged</span>
                            </span>
                          ) : (
                            <span className="text-amber-800 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-700" />
                              <span>Awaiting kitchen seal</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Assigned Rider */}
                    <div className="py-2.5 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Bike className="w-4 h-4 text-[#E84A27] shrink-0" />
                        <span className="text-stone-600">Rider:</span>
                        <strong className="text-stone-900 truncate">
                          {order.deliveryPartner.name}
                        </strong>
                      </div>
                      <span className="text-[11px] font-mono text-stone-600 shrink-0 tabular-nums">
                        {order.deliveryPartner.vehicleNo.split('(')[0].trim()}
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
                        className="w-full py-3 px-4 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27]"
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        <span>Accept Order &amp; Start Cooking</span>
                      </button>
                    )}

                    {order.status === 'PREPARING' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restaurantSealAndReady(order.id);
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Apply Tamper-Seal &amp; Mark Ready</span>
                      </button>
                    )}

                    {order.status === 'READY_FOR_PICKUP' && (
                      <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 text-xs text-violet-950 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-violet-700 shrink-0" />
                          <span>Sealed on Counter</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-[#E84A27] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Open Rider App →
                        </button>
                      </div>
                    )}

                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Bike className="w-4 h-4 text-teal-700 shrink-0" />
                          <span>Rider En-Route</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-teal-800 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Track Rider →
                        </button>
                      </div>
                    )}

                    {order.status === 'ARRIVED_DOORSTEP' && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>At Doorstep · Awaiting PIN</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRole('delivery');
                          }}
                          className="font-bold text-[#E84A27] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Rider View →
                        </button>
                      </div>
                    )}

                    {order.status === 'DELIVERED' && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Handover Authenticated</span>
                        </span>
                        <span className="font-mono font-semibold text-emerald-800 tabular-nums shrink-0">
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

