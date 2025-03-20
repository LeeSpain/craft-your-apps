
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const { openChatbot } = useApp();
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

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-gradient-to-b from-indigo-50 via-blue-50 to-white"
    >
      {/* Background blur effects */}
      <div className="absolute top-20 -left-24 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-500"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-30"></div>
      
      <div className="container mx-auto text-center z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            <p className="text-purple-700 text-sm font-medium">CUSTOM APP DEVELOPMENT</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            Transforming Business Ideas Into Powerful Applications
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            We build custom apps that drive growth, streamline operations, and create exceptional user experiences.
            Trusted by startups, SMBs, and enterprise organizations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-700">
            <Button 
              onClick={scrollToServices}
              className="w-full sm:w-auto px-8 py-6 text-base button-hover bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Our Services
            </Button>
            
            <Button 
              onClick={openChatbot}
              variant="outline" 
              className="w-full sm:w-auto px-8 py-6 text-base button-hover bg-white/80 border-purple-200 hover:bg-purple-50 hover:border-purple-300 shadow-md hover:shadow-lg transition-all"
            >
              Get a Quote
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-900">
            <p className="text-gray-600 text-sm w-full mb-4">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* Company logos with gradient backgrounds */}
              <div className="h-10 w-28 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center shadow-sm">
                <div className="h-5 w-20 bg-blue-700 opacity-70 rounded-md"></div>
              </div>
              <div className="h-10 w-32 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center shadow-sm">
                <div className="h-5 w-24 bg-purple-700 opacity-70 rounded-md"></div>
              </div>
              <div className="h-10 w-24 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg flex items-center justify-center shadow-sm">
                <div className="h-5 w-16 bg-teal-700 opacity-70 rounded-md"></div>
              </div>
              <div className="h-10 w-28 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg flex items-center justify-center shadow-sm">
                <div className="h-5 w-20 bg-amber-700 opacity-70 rounded-md"></div>
              </div>
              <div className="h-10 w-32 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg flex items-center justify-center shadow-sm">
                <div className="h-5 w-24 bg-red-700 opacity-70 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" 
          onClick={scrollToServices}
        >
          <ArrowDown className="h-10 w-10 text-purple-500 opacity-70" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-4 border-purple-100 opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 rounded-xl border-4 border-blue-100 opacity-30"></div>
    </section>
  );
};

export default Hero;
