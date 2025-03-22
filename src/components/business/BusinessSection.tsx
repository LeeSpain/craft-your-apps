
import { ReactNode, useRef, useState, useEffect } from 'react';

interface BusinessSectionProps {
  id: string;
  children: ReactNode;
  reverse?: boolean;
}

const BusinessSection = ({ id, children, reverse = false }: BusinessSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div 
      id={id} 
      ref={sectionRef}
      className={`container mx-auto grid md:grid-cols-2 gap-12 items-center mb-32 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default BusinessSection;
