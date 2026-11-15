import { useState, useEffect, useCallback } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Tenta detectar o idioma do navegador
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('minday.lang');
      if (saved && (saved === 'pt' || saved === 'en')) {
        return saved;
      }
      
      // Detecta idioma do navegador
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'pt' || browserLang === 'en') {
        return browserLang;
      }
    }
    return 'pt'; // Padrão em português
  });

  const t = useCallback((key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations.pt[key] || key;
  }, [currentLanguage]);

  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('minday.lang', lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
    changeLanguage(newLang);
  }, [currentLanguage, changeLanguage]);

  // Salva o idioma no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('minday.lang', currentLanguage);
    }
  }, [currentLanguage]);

  return {
    currentLanguage,
    t,
    changeLanguage,
    toggleLanguage,
    isPortuguese: currentLanguage === 'pt',
    isEnglish: currentLanguage === 'en'
  };
}


