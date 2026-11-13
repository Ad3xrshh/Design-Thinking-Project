import React from 'react';
import { ShieldAlert, ShieldCheck, X, ArrowRight } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { SafeBiteLogo } from './CustomVisuals';

export const ScamExplainerModal: React.FC = () => {
  const { showFraudExplainer, setShowFraudExplainer, loadScenario } = useOrder();

  if (!showFraudExplainer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      onClick={() => setShowFraudExplainer(false)}
    >
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#17181C] text-white border-b border-stone-800 p-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <SafeBiteLogo className="w-9 h-9" />
            <div>
              <h2 className="font-display text-base font-bold text-white">
                How SafeBite Stops Delivery Scams
              </h2>
              <p className="text-xs text-stone-300">
                Eliminating fake drop-offs, broken seals, and missing meal disputes
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFraudExplainer(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Problem vs Solution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs mb-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                The Common Delivery Scam
              </div>
              <ul className="text-xs text-rose-950 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Ghost Drop-offs:</strong> Rider marks food delivered from streets away and keeps the meal.
                </li>
                <li>
                  <strong>Seal Tampering:</strong> Unsealed bags allow items to go missing in transit.
                </li>
                <li>
                  <strong>No Proof:</strong> Customer is charged while platform lacks physical handover proof.
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                The SafeBite Handover Shield
              </div>
              <ul className="text-xs text-emerald-950 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Customer Secret PIN:</strong> 4-digit PIN lives exclusively on your screen until handover.
                </li>
                <li>
                  <strong>Tamper-Seal Verification:</strong> Kitchen seals bags with trackable codes you inspect first.
                </li>
                <li>
                  <strong>Instant Scam Reporting:</strong> Report stuck riders, open seals, or spoiled packages in 1 tap.
                </li>
              </ul>
            </div>
          </div>

          {/* 3 Steps */}
          <div className="space-y-2.5">
            <h3 className="font-display text-sm font-bold text-stone-900">
              How It Works In Practice
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-xl text-xs">
                <div className="w-6 h-6 rounded-lg bg-[#17181C] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  01
                </div>
                <div>
                  <div className="font-bold text-stone-900">Order & Forge Secret PIN</div>
                  <div className="text-stone-600 mt-0.5">
                    Your device generates a unique 4-digit PIN (e.g. <span className="font-mono font-bold">4829</span>). Neither the kitchen nor the rider can view it.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-xl text-xs">
                <div className="w-6 h-6 rounded-lg bg-violet-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  02
                </div>
                <div>
                  <div className="font-bold text-stone-900">Kitchen Applies Tamper Seal</div>
                  <div className="text-stone-600 mt-0.5">
                    The kitchen locks the bag with <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-800">SEAL-BLR-9042</code> before rider pickup.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-xl text-xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  03
                </div>
                <div>
                  <div className="font-bold text-stone-900">Inspect Seal & Share PIN</div>
                  <div className="text-stone-600 mt-0.5">
                    Confirm the seal is intact at your door, then verbally share your PIN to authorize completion.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="bg-[#17181C] text-white p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white">Test Doorstep Handover Live</div>
              <div className="text-[11px] text-stone-300 mt-0.5">
                Try entering an invalid PIN in the Rider App to see anti-scam lockout in action.
              </div>
            </div>
            <button
              onClick={() => {
                setShowFraudExplainer(false);
                loadScenario('doorstep_ready');
              }}
              className="px-4 py-2 bg-[#E84A27] hover:bg-[#D13B19] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
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
