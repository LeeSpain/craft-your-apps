
import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'USD' | 'GBP' | 'EUR' | 'AUD';
type Language = 'en' | 'es' | 'fr' | 'de';

interface AppContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  exchangeRates: Record<Currency, number>;
  formatPrice: (price: number) => string;
}

const defaultExchangeRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.77,
  EUR: 0.90,
  AUD: 1.50,
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('en');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);

  useEffect(() => {
    // In a real application, we would fetch the latest exchange rates
    // For now, we'll use the hardcoded rates
    // Example of fetching from OpenExchangeRates API:
    // const fetchExchangeRates = async () => {
    //   try {
    //     const response = await fetch(
    //       'https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID'
    //     );
    //     const data = await response.json();
    //     setExchangeRates({
    //       USD: 1,
    //       GBP: data.rates.GBP,
    //       EUR: data.rates.EUR,
    //       AUD: data.rates.AUD,
    //     });
    //   } catch (error) {
    //     console.error('Failed to fetch exchange rates:', error);
    //   }
    // };
    // fetchExchangeRates();
  }, []);

  // Load saved preferences from localStorage if available
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as Currency;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('currency', currency);
    localStorage.setItem('language', language);
  }, [currency, language]);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  const formatPrice = (price: number): string => {
    const rate = exchangeRates[currency];
    const convertedPrice = price * rate;
    
    return `${currencySymbols[currency]}${Math.round(convertedPrice).toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        isChatbotOpen,
        openChatbot,
        closeChatbot,
        exchangeRates,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
