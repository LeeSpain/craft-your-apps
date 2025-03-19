
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ChevronDown, Globe, DollarSign } from 'lucide-react';

const Header = () => {
  const { currency, setCurrency, language, setLanguage } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCurrencyDropdown = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
    if (isLanguageOpen) setIsLanguageOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
    if (isCurrencyOpen) setIsCurrencyOpen(false);
  };

  const currencies = [
    { code: 'USD', label: 'USD ($)' },
    { code: 'GBP', label: 'GBP (£)' },
    { code: 'EUR', label: 'EUR (€)' },
    { code: 'AUD', label: 'AUD (A$)' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled 
          ? 'bg-white bg-opacity-80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="font-display font-bold text-2xl tracking-tight">
            AIAppCrafter
          </a>
        </div>

        <div className="flex items-center space-x-6">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={toggleCurrencyDropdown}
              className={cn(
                'flex items-center p-2 rounded-lg text-sm font-medium transition-colors',
                isScrolled ? 'hover:bg-black/5' : 'hover:bg-white/20',
                isCurrencyOpen && (isScrolled ? 'bg-black/5' : 'bg-white/20')
              )}
            >
              <DollarSign className="h-4 w-4 mr-1 opacity-70" />
              <span>{currency}</span>
              <ChevronDown className={cn(
                "ml-1 h-4 w-4 transition-transform", 
                isCurrencyOpen ? "rotate-180" : ""
              )} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 mt-1 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out scale-in">
                <div className="py-1 animate-fade-in">
                  {currencies.map((item) => (
                    <button
                      key={item.code}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                        currency === item.code && "font-medium bg-gray-50"
                      )}
                      onClick={() => {
                        setCurrency(item.code as any);
                        setIsCurrencyOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              className={cn(
                'flex items-center p-2 rounded-lg text-sm font-medium transition-colors',
                isScrolled ? 'hover:bg-black/5' : 'hover:bg-white/20',
                isLanguageOpen && (isScrolled ? 'bg-black/5' : 'bg-white/20')
              )}
            >
              <Globe className="h-4 w-4 mr-1 opacity-70" />
              <span className="uppercase">{language}</span>
              <ChevronDown className={cn(
                "ml-1 h-4 w-4 transition-transform", 
                isLanguageOpen ? "rotate-180" : ""
              )} />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-1 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out scale-in">
                <div className="py-1 animate-fade-in">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                        language === item.code && "font-medium bg-gray-50"
                      )}
                      onClick={() => {
                        setLanguage(item.code as any);
                        setIsLanguageOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
