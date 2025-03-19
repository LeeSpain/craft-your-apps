
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const { language, openChatbot } = useApp();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = section.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Background blur effects */}
      <div className="absolute top-20 -left-24 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-500"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-30"></div>
      
      <div className="container mx-auto text-center z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            <p className="text-blue-600 text-sm font-medium">AIAppCrafter.com</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            {getTranslation('hero.title', language)}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            {getTranslation('hero.subtitle', language)}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-700">
            <Button 
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto px-8 py-6 text-base button-hover bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              {getTranslation('hero.exploreButton', language)}
            </Button>
            
            <Button 
              onClick={openChatbot}
              variant="outline" 
              className="w-full sm:w-auto px-8 py-6 text-base button-hover bg-white border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-md hover:shadow-lg transition-all"
            >
              {getTranslation('hero.chatButton', language)}
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse cursor-pointer" 
          onClick={scrollToPortfolio}
        >
          <ArrowDown className="h-10 w-10 text-blue-500 opacity-70" />
        </div>
      </div>
      
      {/* Decorative element - Top right */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-4 border-blue-100 opacity-30"></div>
      
      {/* Decorative element - Bottom left */}
      <div className="absolute bottom-20 left-20 w-20 h-20 rounded-xl border-4 border-purple-100 opacity-30"></div>
    </section>
  );
};

export default Hero;
