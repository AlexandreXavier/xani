import React from 'react';
import { LanguageProvider } from '@contexts/LanguageContext';

interface LanguageWrapperProps {
  children: React.ReactNode;
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
