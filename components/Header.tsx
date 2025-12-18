
import React from 'react';
import { CompassIcon, BookOpenIcon } from './icons';

interface HeaderProps {
    onTogglePassport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTogglePassport }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="bg-accent p-2 rounded-xl shadow-lg shadow-accent/20">
              <CompassIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-display font-extrabold text-primary tracking-tight">NomadGuide</h1>
              <p className="text-[10px] font-hand text-accent uppercase tracking-[0.2em] leading-none">Your AI Explorer</p>
            </div>
          </div>
          <button
            onClick={onTogglePassport}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-primary bg-muted rounded-full hover:bg-gray-100 transition-all border border-gray-100"
          >
            <BookOpenIcon className="h-4 w-4" />
            My Passport
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
