
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { APPS } from '@/lib/constants';
import AppCard from '@/components/AppCard';

const FeaturedAppsSection = () => {
  const { openChatbot } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "100px" } // Increased rootMargin for earlier loading
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

  const handleBuyNow = (app: any) => {
    openChatbot();
    console.log(`Buy Now clicked for ${app.name}`);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-8 px-6 bg-gray-50"
    >
      <div className="container mx-auto">
        <div 
          className={`text-center max-w-2xl mx-auto mb-6 transition-all duration-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-3xl font-bold mb-3">
            Featured Applications
          </h2>
          <p className="text-gray-600">
            Each application has been meticulously crafted with scalability, security, and user experience in mind. Browse our collection and find the perfect solution for your business.
          </p>
        </div>

        {isVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPS.slice(0, 3).map((app) => (
              <AppCard 
                key={app.id}
                app={app}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedAppsSection;
