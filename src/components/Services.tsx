
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Code, LineChart, ShieldCheck, Zap, CircleUserRound, Smartphone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Services = () => {
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

  const serviceItems = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom App Development",
      description: "Bespoke applications built from the ground up to meet your unique business requirements and workflows."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile-First Design",
      description: "Responsive applications that work flawlessly across all devices, with special attention to mobile experiences."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI Integration",
      description: "Leverage the power of artificial intelligence to automate processes and gain valuable insights."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Development",
      description: "Security-first approach with regular audits, penetration testing, and compliance with industry standards."
    },
    {
      icon: <CircleUserRound className="h-6 w-6" />,
      title: "User Experience Design",
      description: "Intuitive interfaces and engaging user experiences that keep your customers coming back."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Analytics & Reporting",
      description: "Comprehensive analytics and customized reporting tools to help you make data-driven decisions."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gray-50"
    >
      <div className="container mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            We build apps that transform businesses
          </h2>
          <p className="text-lg text-gray-600">
            From concept to launch and beyond, we provide end-to-end application development services
            tailored to your business goals and user needs.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-10'
        }`}>
          {serviceItems.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3 bg-blue-50 inline-block rounded-xl mb-5">
                <div className="text-blue-600">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            onClick={openChatbot}
            className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            Discuss Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
