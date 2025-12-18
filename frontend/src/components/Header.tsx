// SiteRadar - Header Component (Refined Minimalist)

import React from 'react';
import { useApp } from '../context/AppContext';
import { RadarIcon, PassportIcon } from './ui/Icons';

const Header: React.FC = () => {
  const { state } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-paper-50/95 backdrop-blur-sm border-b border-paper-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="text-gold-500">
              <RadarIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-display text-ink-800 tracking-tight">
                SiteRadar
              </h1>
            </div>
          </div>

          {/* Passport Badge */}
          <button
            data-testid="passport-toggle"
            className="flex items-center gap-2 px-3.5 py-1.5 text-sm text-ink-600 bg-paper-100 hover:bg-paper-200 rounded-full transition-colors"
          >
            <PassportIcon className="w-4 h-4" />
            <span className="font-medium">Passport</span>
            {state.passport.length > 0 && (
              <span className="bg-gold-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-medium">
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
