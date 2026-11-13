import React, { useEffect } from 'react';
import { OrderProvider, useOrder } from './context/OrderContext';
import { Navbar } from './components/Common/Navbar';
import { ScamExplainerModal } from './components/Common/ScamExplainerModal';
import { CustomerView } from './components/CustomerView/CustomerView';
import { RestaurantView } from './components/RestaurantView/RestaurantView';
import { DeliveryView } from './components/DeliveryView/DeliveryView';
import { TriViewSimulator } from './components/SplitView/TriViewSimulator';
import { ShieldCheck, HelpCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeRole, setShowFraudExplainer } = useOrder();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeRole]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />
      <ScamExplainerModal />

      <main className="flex-1">
        {activeRole === 'tri-view' && <TriViewSimulator />}
        {activeRole === 'customer' && <CustomerView />}
        {activeRole === 'restaurant' && <RestaurantView />}
        {activeRole === 'delivery' && <DeliveryView />}
      </main>

      <footer className="bg-white border-t border-stone-200 py-3.5 px-4 text-xs text-stone-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-stone-700">
            <ShieldCheck className="w-4 h-4 text-[#E84A27]" />
            <span>SafeBite Verified Handover</span>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="text-emerald-700 font-semibold">
              Protected Against Ghost Drop-Offs & Seal Tampering
            </span>
          </div>

          <button
            onClick={() => setShowFraudExplainer(true)}
            className="text-[#E84A27] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How SafeBite Works</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}
