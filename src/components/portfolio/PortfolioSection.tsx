
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PortfolioSectionProps {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  bgColor?: string;
  children: ReactNode;
}

const PortfolioSection = ({
  id,
  title,
  subtitle,
  icon,
  bgColor = 'bg-white',
  children
}: PortfolioSectionProps) => {
  const [isVisible, setIsVisible] = useState(true); // Default to visible for faster initial render
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={cn("py-10 px-6", bgColor)}
    >
      <div className="container mx-auto">
        <div 
          className={cn(
            "text-center max-w-3xl mx-auto mb-8 transition-all duration-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-white shadow-md">
              {icon}
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            {title}
          </h2>
          <p className="text-gray-600">
            {subtitle}
          </p>
        </div>
        
        <div 
          className={cn(
            "transition-all duration-300 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
