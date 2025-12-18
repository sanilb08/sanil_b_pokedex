// SiteRadar - Header Component

import React from 'react';
import { useApp } from '../context/AppContext';
import { RadarIcon, PassportIcon } from './ui/Icons';

const Header: React.FC = () => {
  const { state } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl shadow-lg shadow-amber-500/20">
              <RadarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-stone-900 tracking-tight">
                SiteRadar
              </h1>
              <p className="text-[9px] font-hand text-amber-600 uppercase tracking-[0.15em] -mt-0.5">
                AI Explorer
              </p>
            </div>
          </div>

          {/* Passport Badge */}
          <button
            data-testid="passport-toggle"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
          >
            <PassportIcon className="w-4 h-4" />
            <span>Passport</span>
            {state.passport.length > 0 && (
              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {state.passport.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
