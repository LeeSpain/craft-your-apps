
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, AppData } from '@/lib/constants';
import AppCard from './AppCard';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const { language } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleBuyNow = (app: AppData) => {
    // Redirect to contact page instead of opening chatbot
    window.location.href = '/contact';
    console.log(`Buy Now clicked for ${app.name}`);
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 px-6 bg-gray-50"
    >
      <div className="container mx-auto">
        <div 
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            {getTranslation('portfolio.title', language)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-800">
            {getTranslation('portfolio.subtitle', language)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APPS.map((app) => (
            <AppCard 
              key={app.id}
              app={app}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>

        <div 
          className={`mt-20 bg-white rounded-2xl p-10 shadow-lg max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl font-bold mb-4 text-purple-700">
            {getTranslation('custom.title', language)}
          </h3>
          <p className="text-gray-600 mb-8">
            {getTranslation('custom.subtitle', language)}
          </p>
          <Button 
            className="px-8 py-4 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg button-hover"
            asChild
          >
            <Link to="/contact">
              {getTranslation('custom.chatButton', language)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
