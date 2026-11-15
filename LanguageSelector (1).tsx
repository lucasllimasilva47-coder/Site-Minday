import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('pt')}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
          currentLanguage === 'pt'
            ? 'bg-emerald-500 text-white shadow-lg'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
      >
        <span className="text-lg">🇧🇷</span>
        <span className="hidden sm:inline font-medium">PT</span>
      </button>
      
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-emerald-500 text-white shadow-lg'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
      >
        <span className="text-lg">🇺🇸</span>
        <span className="hidden sm:inline font-medium">EN</span>
      </button>
    </div>
  );
}


