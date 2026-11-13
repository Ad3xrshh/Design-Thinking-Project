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
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveRole('tri-view')}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84A27] rounded-lg"
          >
            <SafeBiteLogo className="w-8 h-8" />
            <span className="font-display font-extrabold text-xl tracking-tight text-[#17181C]">
              SafeBite
            </span>
          </button>

          {/* Zone 2: Concise Navigation Links / Role Switcher */}
          <nav
            aria-label="Workspace views"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none"
          >
            {roles.map((r) => {
              const isActive = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#17181C] text-white'
                      : 'text-stone-600 hover:text-[#17181C] hover:bg-stone-200/60'
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

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              onClick={() => setShowFraudExplainer(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#E84A27] hover:bg-[#D13B19] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
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
