import React from 'react';
import { Columns3, User, UtensilsCrossed, Bike, ShieldCheck } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { UserRole } from '../../types';
import { SafeBiteLogo } from './CustomVisuals';

export const Navbar: React.FC = () => {
  const { activeRole, setActiveRole, setShowFraudExplainer } = useOrder();

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    {
      id: 'tri-view',
      label: '3-in-1 Sync',
      icon: <Columns3 className="w-3.5 h-3.5" />,
    },
    {
      id: 'customer',
      label: 'Customer',
      icon: <User className="w-3.5 h-3.5" />,
    },
    {
      id: 'restaurant',
      label: 'Kitchen KDS',
      icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    },
    {
      id: 'delivery',
      label: 'Rider App',
      icon: <Bike className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between min-h-16 py-2 sm:py-0 gap-y-2 gap-x-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveRole('tri-view')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27] rounded-xl px-1 py-1"
          >
            <SafeBiteLogo className="w-8 h-8" />
            <span className="font-display font-extrabold text-xl tracking-tight text-[#17181C]">
              SafeBite
            </span>
          </button>

          {/* Zone 2: Segmented Portal Switcher */}
          <nav
            aria-label="Workspace views"
            className="order-3 sm:order-none w-full sm:w-auto flex items-center justify-between sm:justify-start gap-0.5 sm:gap-1 p-1 rounded-xl bg-stone-200/65 border border-stone-200/90 overflow-x-auto scrollbar-none"
          >
            {roles.map((r) => {
              const isActive = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setActiveRole(r.id)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27] ${
                    isActive
                      ? 'bg-[#17181C] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#17181C] hover:bg-white/70'
                  }`}
                >
                  <span className={isActive ? 'text-[#E84A27]' : 'text-stone-500'}>
                    {r.icon}
                  </span>
                  <span>{r.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Guide Action */}
          <div className="shrink-0">
            <button
              onClick={() => setShowFraudExplainer(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-[#E84A27] hover:bg-[#D13B19] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27] focus-visible:ring-offset-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">How SafeBite Works</span>
              <span className="sm:hidden">Guide</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

