import React, { useState } from 'react';
import {
  Bike,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Navigation,
  Package,
  Wallet,
  Clock,
  Delete,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export const DeliveryView: React.FC = () => {
  const {
    activeOrders,
    currentOrder,
    riderPickUpOrder,
    riderArriveAtDoorstep,
    riderVerifyOtp,
    setActiveRole,
    scamReports,
  } = useOrder();

  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBypassScamModal, setShowBypassScamModal] = useState<boolean>(false);

  const order = currentOrder || activeOrders[0];

  const handleKeypadPress = (val: string) => {
    if (enteredOtp.length < 4) {
      setEnteredOtp(enteredOtp + val);
      setErrorMessage(null);
    }
  };

  const handleBackspace = () => {
    setEnteredOtp((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    setEnteredOtp('');
    setErrorMessage(null);
  };

  const handleSubmitOtp = () => {
    if (!order) return;
    if (enteredOtp.length !== 4) {
      setErrorMessage('Please enter all 4 digits of the PIN given by customer.');
      return;
    }

    const result = riderVerifyOtp(order.id, enteredOtp);
    if (result.success) {
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleFillFromCustomer = () => {
    if (order) {
      setEnteredOtp(order.handoverOtp);
      setErrorMessage(null);
    }
  };

  const orderReports = order ? scamReports.filter((r) => r.orderId === order.id) : [];

  return (
    <div className="min-h-screen bg-[#111317] text-stone-100 pb-16">
      {/* Rider Top Bar */}
      <div className="bg-[#17181C] border-b border-stone-800 px-4 py-3 sticky top-16 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E84A27] text-white flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white">Rahul Sharma</span>
                <span className="text-[11px] font-semibold text-emerald-400">On Duty</span>
              </div>
              <p className="text-[11px] text-stone-400 tabular-nums">
                KA 05 ER 8421 · 4.88★
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#111317] border border-stone-800 px-3 py-1.5 rounded-xl">
            <Wallet className="w-4 h-4 text-[#E84A27]" />
            <div className="text-right tabular-nums">
              <div className="text-[10px] text-stone-400">Today</div>
              <div className="font-mono text-xs font-bold text-white">₹865.00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pt-4 space-y-3.5">
        {/* Live Escalation Alert if Customer Filed a Scam Report */}
        {orderReports.length > 0 && (
          <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-xs text-rose-100 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-rose-200">
                Customer Safety Escalation ({orderReports[0].ticketCode})
              </div>
              <div className="text-[11px] text-rose-300 mt-0.5">
                {orderReports[0].categoryLabel}
              </div>
            </div>
          </div>
        )}

        {!order ? (
          <div className="p-6 text-center bg-[#17181C] rounded-2xl border border-stone-800 text-stone-400 text-xs">
            No active delivery orders assigned.
          </div>
        ) : (
          <>
            {/* Active Task Card */}
            <div className="bg-[#17181C] rounded-2xl p-4 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="font-mono font-bold text-[#E84A27]">{order.orderNumber}</span>
                  <span className="text-stone-600" aria-hidden="true">·</span>
                  <span className="text-stone-300">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} items · ₹{order.grandTotal}
                  </span>
                </div>

                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PIN Protected</span>
                </span>
              </div>

              {/* Pickup & Drop Points */}
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E84A27] mt-1 shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 font-semibold">Pickup Kitchen</div>
                    <div className="font-bold text-white">{order.restaurantName}</div>
                    <div className="text-stone-400 text-[11px]">{order.restaurantLocality}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 font-semibold">Customer Drop</div>
                    <div className="font-bold text-white">{order.customerName}</div>
                    <div className="text-stone-300 text-[11px] leading-snug">
                      {order.deliveryAddress}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-[#111317] rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-violet-400" />
                  <span>Tamper-Seal Code</span>
                </span>
                <span className="font-mono font-bold text-violet-300 tabular-nums">
                  {order.tamperSealCode}
                </span>
              </div>
            </div>

            {/* Stage Actions */}
            {order.status === 'PLACED' || order.status === 'PREPARING' ? (
              <div className="bg-[#17181C] rounded-2xl p-5 border border-stone-800 text-center space-y-2.5">
                <Clock className="w-6 h-6 text-amber-400 mx-auto" />
                <h3 className="font-display text-sm font-bold text-white">
                  Kitchen Is Preparing Order
                </h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  {order.restaurantName} is cooking and applying tamper seal {order.tamperSealCode}.
                </p>
                <button
                  onClick={() => setActiveRole('restaurant')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Open Kitchen View →
                </button>
              </div>
            ) : order.status === 'READY_FOR_PICKUP' ? (
              <div className="bg-[#17181C] rounded-2xl p-4 border border-violet-500/40 space-y-3">
                <div className="flex items-center gap-2 text-violet-300 text-xs font-bold">
                  <Package className="w-4 h-4" />
                  <span>Sealed Bag Ready on Counter</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Verify sticker <strong className="font-mono">{order.tamperSealCode}</strong> is intact across bag handles before departing.
                </p>
                <button
                  onClick={() => riderPickUpOrder(order.id)}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Seal & Pick Up Food</span>
                </button>
              </div>
            ) : order.status === 'OUT_FOR_DELIVERY' ? (
              <div className="bg-[#17181C] rounded-2xl p-4 border border-teal-500/40 space-y-3">
                {/* Animated SVG GPS Route Strip */}
                <div className="rounded-xl bg-[#0B0D10] border border-stone-800 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-teal-400" />
                      <span>Active Navigation</span>
                    </span>
                    <span className="font-mono font-bold text-teal-300 tabular-nums">
                      1.2 km · 4 mins
                    </span>
                  </div>

                  <svg viewBox="0 0 260 56" fill="none" className="w-full h-14">
                    <path
                      d="M22 40 C 80 12, 180 12, 238 40"
                      stroke="#2DD4BF"
                      strokeOpacity="0.45"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />
                    <circle cx="22" cy="40" r="6" fill="#E84A27" />
                    <circle cx="238" cy="40" r="6" fill="#10B981" />
                    <g className="animate-scooter">
                      <circle cx="122" cy="27" r="4.5" stroke="#FFFFFF" strokeWidth="2" fill="#111317" />
                      <circle cx="138" cy="27" r="4.5" stroke="#FFFFFF" strokeWidth="2" fill="#111317" />
                      <path d="M122 27L127 18H135L138 27" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                      <rect x="119" y="12" width="8" height="6" rx="1.5" fill="#E84A27" />
                    </g>
                  </svg>

                  <div className="text-[11px] text-stone-400 truncate">
                    To: {order.deliveryAddress}
                  </div>
                </div>

                <button
                  onClick={() => riderArriveAtDoorstep(order.id)}
                  className="w-full py-2.5 bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Mark Arrived at Doorstep</span>
                </button>
              </div>
            ) : order.status === 'ARRIVED_DOORSTEP' ? (
              <div className="bg-[#17181C] rounded-2xl p-4 border-2 border-[#E84A27] space-y-3">
                <div className="p-2.5 bg-[#E84A27]/15 border border-[#E84A27]/30 rounded-xl">
                  <div className="flex items-center gap-1.5 text-[#FF8A70] font-bold text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Customer Handover PIN Required</span>
                  </div>
                  <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                    Hand over the sealed bag first, then ask <strong>{order.customerName}</strong> for the 4-digit PIN on her phone.
                  </p>
                </div>

                {/* 4-Digit Input Boxes */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2.5">
                    {[0, 1, 2, 3].map((idx) => {
                      const digit = enteredOtp[idx];
                      const isFilled = digit !== undefined;
                      return (
                        <div
                          key={idx}
                          className={`w-10 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xl tabular-nums border transition-all ${
                            isFilled
                              ? 'bg-[#111317] border-[#E84A27] text-white'
                              : 'bg-[#111317]/60 border-stone-700 text-stone-500'
                          }`}
                        >
                          {digit || '•'}
                        </div>
                      );
                    })}
                  </div>

                  {errorMessage && (
                    <div className="p-2 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200 text-[11px] font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {order.otpFailedAttempts > 0 && (
                    <div className="text-[11px] text-amber-400 font-semibold tabular-nums">
                      Failed attempts: {order.otpFailedAttempts} (Anti-scam lock active)
                    </div>
                  )}
                </div>

                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-2 max-w-[230px] mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeypadPress(num)}
                      className="h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-mono font-bold text-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={handleClear}
                    className="h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => handleKeypadPress('0')}
                    className="h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-mono font-bold text-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    onClick={handleBackspace}
                    aria-label="Backspace"
                    className="h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 flex items-center justify-center cursor-pointer"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleSubmitOtp}
                    disabled={enteredOtp.length !== 4}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                      enteredOtp.length === 4
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify PIN & Complete Delivery</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFillFromCustomer}
                      className="flex-1 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-xl text-[11px] font-semibold cursor-pointer"
                    >
                      Autofill PIN ({order.handoverOtp})
                    </button>

                    <button
                      onClick={() => setShowBypassScamModal(true)}
                      className="py-1.5 px-3 bg-stone-900 hover:bg-rose-950/50 border border-stone-700 hover:border-rose-500/50 text-stone-300 hover:text-rose-300 rounded-xl text-[11px] font-semibold cursor-pointer"
                    >
                      Try Bypass Scam
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#17181C] rounded-2xl p-5 border border-emerald-500/40 text-center space-y-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Handover Authenticated
                  </h3>
                  <p className="text-xs text-stone-400 tabular-nums">
                    Verified with customer PIN at {order.otpVerifiedAt}.
                  </p>
                </div>

                <div className="bg-[#111317] p-3 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-1 text-left max-w-xs mx-auto tabular-nums">
                  <div className="flex justify-between">
                    <span>Base Trip Fare</span>
                    <span>₹35.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance (2.1 km)</span>
                    <span>₹10.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>SafeBite Handover Bonus</span>
                    <span>+₹10.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1.5 border-t border-stone-800">
                    <span>Total Credited</span>
                    <span className="text-emerald-400">₹55.00</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveRole('tri-view')}
                  className="px-4 py-2 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to 3-in-1 Sync
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Anti-Bypass Modal */}
      {showBypassScamModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setShowBypassScamModal(false)}
        >
          <div
            className="bg-[#17181C] border-2 border-rose-500 rounded-2xl max-w-sm w-full p-5 shadow-xl text-white space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 text-rose-400">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  Delivery Completion Refused
                </h3>
                <p className="text-[11px] text-rose-300">Anti-Fraud Lockout Triggered</p>
              </div>
            </div>

            <div className="bg-rose-950/50 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-100 space-y-1.5 leading-relaxed">
              <p>
                Without SafeBite, riders could mark food delivered blocks away without meeting you.
              </p>
              <p className="font-bold text-amber-300">
                SafeBite requires the customer&apos;s 4-digit Handover PIN before payout or completion unlocks.
              </p>
            </div>

            <button
              onClick={() => setShowBypassScamModal(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Understood — Collect Customer PIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
