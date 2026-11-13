import React, { useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  X,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { SafeBiteLogo } from './CustomVisuals';

export const ScamExplainerModal: React.FC = () => {
  const { showFraudExplainer, setShowFraudExplainer, loadScenario } = useOrder();

  useEffect(() => {
    if (!showFraudExplainer) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFraudExplainer(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showFraudExplainer, setShowFraudExplainer]);

  if (!showFraudExplainer) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scam-explainer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs"
      onClick={() => setShowFraudExplainer(false)}
    >
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#17181C] text-white border-b border-stone-800 px-5 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <SafeBiteLogo className="w-9 h-9 shrink-0" />
            <div className="min-w-0">
              <h2
                id="scam-explainer-title"
                className="font-display text-base sm:text-lg font-bold text-white truncate"
              >
                How SafeBite Stops Delivery Scams
              </h2>
              <p className="text-xs text-stone-300 truncate">
                Eliminating fake drop-offs, broken seals, and missing meal disputes
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFraudExplainer(false)}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Problem vs Solution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 text-rose-900 font-display font-bold text-sm pb-2.5 mb-3 border-b border-rose-200/80">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>The Common Delivery Scam</span>
              </div>
              <ul className="text-xs text-rose-950 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ghost Drop-offs:</strong> Rider marks food delivered from streets away and keeps the meal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Seal Tampering:</strong> Unsealed bags allow items to go missing in transit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Proof:</strong> Customer is charged while platform lacks physical handover proof.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 text-emerald-900 font-display font-bold text-sm pb-2.5 mb-3 border-b border-emerald-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The SafeBite Handover Shield</span>
              </div>
              <ul className="text-xs text-emerald-950 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Customer Secret PIN:</strong> 4-digit PIN lives exclusively on your screen until handover.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tamper-Seal Verification:</strong> Kitchen seals bags with trackable codes you inspect first.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant Scam Reporting:</strong> Report stuck riders, open seals, or spoiled packages in 1 tap.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3 Steps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm sm:text-base font-bold text-[#17181C]">
                How It Works In Practice
              </h3>
              <span className="text-[11px] font-medium text-stone-600">
                Two-layer physical + digital lock
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-stone-200 rounded-2xl text-xs shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-[#17181C] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  01
                </div>
                <div className="space-y-0.5">
                  <div className="font-display font-bold text-sm text-[#17181C]">
                    Order &amp; Forge Secret PIN
                  </div>
                  <div className="text-stone-600 leading-relaxed">
                    Your device generates a unique 4-digit PIN (e.g.{' '}
                    <span className="font-mono font-bold text-[#17181C] bg-stone-100 px-1.5 py-0.5 rounded">
                      4829
                    </span>
                    ). Neither the kitchen nor the rider can view it.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-stone-200 rounded-2xl text-xs shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-violet-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  02
                </div>
                <div className="space-y-0.5">
                  <div className="font-display font-bold text-sm text-[#17181C]">
                    Kitchen Applies Tamper Seal
                  </div>
                  <div className="text-stone-600 leading-relaxed">
                    The kitchen locks the bag with{' '}
                    <code className="bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded font-mono font-bold text-violet-900">
                      SEAL-BLR-9042
                    </code>{' '}
                    before rider pickup.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-white border border-stone-200 rounded-2xl text-xs shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  03
                </div>
                <div className="space-y-0.5">
                  <div className="font-display font-bold text-sm text-[#17181C]">
                    Inspect Seal &amp; Share PIN
                  </div>
                  <div className="text-stone-600 leading-relaxed">
                    Confirm the seal is intact at your door, then verbally share your PIN to authorize completion.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="bg-[#17181C] text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-stone-800">
            <div>
              <div className="font-display text-sm font-bold text-white">
                Test Doorstep Handover Live
              </div>
              <div className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Try entering an invalid PIN in the Rider App to see anti-scam lockout in action.
              </div>
            </div>
            <button
              onClick={() => {
                setShowFraudExplainer(false);
                loadScenario('doorstep_ready');
              }}
              className="px-4 py-2.5 bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

