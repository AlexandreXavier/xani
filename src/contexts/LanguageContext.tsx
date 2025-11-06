import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.warn('useLanguage must be used within a LanguageProvider. Using default values.');
    return {
      language: 'en' as const,
      toggleLanguage: () => console.warn('Language toggle not available - provider not found'),
      setLanguage: () => console.warn('Language set not available - provider not found'),
    };
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'pt' || saved === 'en') {
        return saved;
      }
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('pt') ? 'pt' : 'en';
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
