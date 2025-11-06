import React from 'react';
import { useLanguage } from '@contexts/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function LanguageToggle({ className = '', showLabel = true }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-md border border-skin-fill border-opacity-40 bg-skin-fill hover:bg-skin-accent hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-skin-accent focus:ring-offset-2 ${className}`}
      title={`Switch to ${language === 'en' ? 'Portuguese' : 'English'}`}
    >
      <span className="text-base font-bold">
        {language === 'en' ? 'PT' : 'EN'}
      </span>
      {showLabel && (
        <span className="uppercase">
          {language === 'en' ? 'PT' : 'EN'}
        </span>
      )}
    </button>
  );
}
