import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  PackageOpen,
  UtensilsCrossed,
  UserX,
  MessageSquareWarning,
  CheckCircle2,
  SlidersHorizontal,
  Volume2,
  EyeOff,
  Palette,
  Send,
  Clock,
} from 'lucide-react';
import { SCAM_REPORT_OPTIONS, useOrder } from '../../context/OrderContext';
import { ScamReportCategory } from '../../types';

interface CustomerReportSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'report' | 'settings';
}

export const CustomerReportSettingsModal: React.FC<CustomerReportSettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'report',
}) => {
  const {
    activeOrders,
    currentOrder,
    scamReports,
    submitScamReport,
    customerSettings,
    updateCustomerSettings,
  } = useOrder();

  const [tab, setTab] = useState<'report' | 'settings'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<ScamReportCategory>('NEAR_NOT_DELIVERED');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    currentOrder?.id || activeOrders[0]?.id || ''
  );
  const [details, setDetails] = useState<string>('');
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketCode: string;
    label: string;
  } | null>(null);

  const latestOrderIdRef = useRef<string>(currentOrder?.id || activeOrders[0]?.id || '');
  latestOrderIdRef.current = currentOrder?.id || activeOrders[0]?.id || '';

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setSubmittedTicket(null);
      setSelectedOrderId(latestOrderIdRef.current);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: ScamReportCategory) => {
    switch (category) {
      case 'NEAR_NOT_DELIVERED':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'SEAL_OPEN':
        return <PackageOpen className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'FOOD_SPOILED':
        return <UtensilsCrossed className="w-4 h-4 text-orange-600 shrink-0" />;
      case 'RIDER_BEHAVIOUR':
        return <UserX className="w-4 h-4 text-red-600 shrink-0" />;
      case 'OTHERS':
      default:
        return <MessageSquareWarning className="w-4 h-4 text-slate-600 shrink-0" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetOrderId = selectedOrderId || currentOrder?.id || 'general';
    const created = submitScamReport(targetOrderId, selectedCategory, details);
    setSubmittedTicket({
      ticketCode: created.ticketCode,
      label: created.categoryLabel,
    });
    setDetails('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-5 bg-slate-950/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] text-[#17181C] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 mt-12 sm:mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#17181C] text-white px-4 py-3.5 flex items-center justify-between border-b border-stone-800 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E84A27] flex items-center justify-center text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold tracking-tight">
                Safety Center & Settings
              </h2>
              <p className="text-[11px] text-stone-300">
                Report scams, seal tampering, or customize portal themes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close settings panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Switch Tabs */}
        <div className="p-3 bg-white border-b border-stone-200">
          <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => {
                setTab('report');
                setSubmittedTicket(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                tab === 'report'
                  ? 'bg-[#17181C] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#E84A27]" />
              <span>Report Scam / Issue</span>
            </button>

            <button
              onClick={() => setTab('settings')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                tab === 'settings'
                  ? 'bg-[#17181C] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Portal Settings</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SCAM & DELIVERY ISSUE REPORT */}
        {tab === 'report' && (
          <div className="p-4 space-y-4">
            {submittedTicket && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Priority Escalation Filed
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-900 tabular-nums">
                    {submittedTicket.ticketCode}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Issue logged: <strong>{submittedTicket.label}</strong>. Your Handover PIN payout lock is protected and an incident audit entry was added to this order.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Target Order */}
              {activeOrders.length > 0 && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">
                    Select Order
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E84A27]"
                  >
                    {activeOrders.map((ord) => (
                      <option key={ord.id} value={ord.id}>
                        {ord.orderNumber} · {ord.restaurantName} (₹{ord.grandTotal})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Exact 5 Report Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800">
                    What went wrong with your delivery?
                  </label>
                  <span className="text-[11px] text-stone-500">Select one</span>
                </div>

                <div className="space-y-2">
                  {SCAM_REPORT_OPTIONS.map((opt) => {
                    const isSelected = selectedCategory === opt.category;
                    return (
                      <button
                        type="button"
                        key={opt.category}
                        onClick={() => setSelectedCategory(opt.category)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-white border-[#E84A27] ring-2 ring-[#E84A27]/15 shadow-xs'
                            : 'bg-white/80 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="mt-0.5">{getCategoryIcon(opt.category)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-stone-900">
                              {opt.label}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-[#E84A27] bg-[#E84A27]' : 'border-stone-300'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                            {opt.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Details / Required for Others */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">
                  {selectedCategory === 'OTHERS'
                    ? 'Describe your issue (Others)'
                    : 'Additional details (optional)'}
                </label>
                <textarea
                  rows={3}
                  required={selectedCategory === 'OTHERS'}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    selectedCategory === 'OTHERS'
                      ? 'Please describe the scam suspicion or delivery problem...'
                      : 'Add time, rider remark, or seal condition details...'
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#E84A27] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Safety Report</span>
              </button>
            </form>

            {/* Recent Reports History */}
            {scamReports.length > 0 && (
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <div className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span>Recent Safety Tickets</span>
                  <span className="text-[11px] font-mono text-stone-500 tabular-nums">
                    {scamReports.length} filed
                  </span>
                </div>
                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {scamReports.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#E84A27] tabular-nums">
                          {rep.ticketCode} · {rep.orderNumber}
                        </span>
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rep.reportedAt}
                        </span>
                      </div>
                      <div className="font-bold text-stone-900">{rep.categoryLabel}</div>
                      <p className="text-[11px] text-stone-500">{rep.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PORTAL SETTINGS */}
        {tab === 'settings' && (
          <div className="p-4 space-y-3">
            <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
              {/* Dynamic Order Stage Themes */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-violet-50 text-violet-700">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Dynamic Order-Stage Themes
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      Shifts portal colors and illustrations as food moves from kitchen prep to doorstep arrival.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={customerSettings.dynamicStageThemes}
                  onClick={() =>
                    updateCustomerSettings({
                      dynamicStageThemes: !customerSettings.dynamicStageThemes,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${
                    customerSettings.dynamicStageThemes ? 'bg-[#E84A27]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      customerSettings.dynamicStageThemes ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sound Effects */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Live Chimes & Alert Sounds
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      Play crisp audio cues when kitchen accepts, rider arrives, or PIN verifies.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={customerSettings.soundAlerts}
                  onClick={() =>
                    updateCustomerSettings({
                      soundAlerts: !customerSettings.soundAlerts,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${
                    customerSettings.soundAlerts ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      customerSettings.soundAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Auto Mask PIN */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Privacy PIN Auto-Mask
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug mt-0.5">
                      Keep Handover PIN hidden by default until you tap the reveal icon at your door.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={customerSettings.autoMaskPin}
                  onClick={() =>
                    updateCustomerSettings({
                      autoMaskPin: !customerSettings.autoMaskPin,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${
                    customerSettings.autoMaskPin ? 'bg-[#17181C]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      customerSettings.autoMaskPin ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => setTab('report')}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Need to report a scam or food issue? Open Report Form</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
