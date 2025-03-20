
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ChevronRight, Building, Building2, LineChart, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Business = () => {
  const { language, openChatbot } = useApp();
  const [visibleSections, setVisibleSections] = useState({
    small: false,
    medium: false,
    enterprise: false,
  });
  const smallRef = useRef<HTMLDivElement>(null);
  const mediumRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setVisibleSections(prev => ({
            ...prev,
            [id]: true
          }));
        }
      });
    }, observerOptions);

    if (smallRef.current) observer.observe(smallRef.current);
    if (mediumRef.current) observer.observe(mediumRef.current);
    if (enterpriseRef.current) observer.observe(enterpriseRef.current);

    return () => {
      if (smallRef.current) observer.unobserve(smallRef.current);
      if (mediumRef.current) observer.unobserve(mediumRef.current);
      if (enterpriseRef.current) observer.unobserve(enterpriseRef.current);
    };
  }, []);

  const handleContact = () => {
    openChatbot();
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto mb-20 text-center">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
          TAILORED SOLUTIONS
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Apps for businesses of all sizes
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From startups to enterprises, we build custom applications that help your business grow, 
          improve efficiency, and deliver exceptional experiences to your customers.
        </p>
      </div>

      {/* Small Businesses */}
      <div 
        id="small" 
        ref={smallRef}
        className={`container mx-auto grid md:grid-cols-2 gap-12 items-center mb-32 transition-all duration-700 ${
          visibleSections.small ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center p-2 bg-blue-50 rounded-lg mb-6">
            <div className="p-2 bg-blue-100 rounded">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <span className="ml-2 text-blue-600 font-medium">Small Businesses & Startups</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Launch faster with powerful, affordable solutions
          </h3>
          <p className="text-gray-600 mb-6">
            We understand that small businesses need cost-effective solutions without sacrificing quality. 
            Our custom apps help you compete with larger players while staying on budget.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Affordable, fixed-price packages",
              "Fast turnaround times (as quick as 2-4 weeks)",
              "Mobile-first design for modern customers",
              "Easy payment processing integration",
              "Booking and appointment systems"
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          
          <Button onClick={handleContact} className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
        <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200" 
            alt="Small Business Solutions" 
            className="w-full h-auto rounded-xl shadow-lg object-cover" 
          />
        </div>
      </div>

      {/* Medium Businesses */}
      <div 
        id="medium" 
        ref={mediumRef}
        className={`container mx-auto grid md:grid-cols-2 gap-12 items-center mb-32 transition-all duration-700 ${
          visibleSections.medium ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200" 
            alt="Medium Business Solutions" 
            className="w-full h-auto rounded-xl shadow-lg object-cover" 
          />
        </div>
        <div>
          <div className="inline-flex items-center p-2 bg-purple-50 rounded-lg mb-6">
            <div className="p-2 bg-purple-100 rounded">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <span className="ml-2 text-purple-600 font-medium">Medium Businesses</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Scale your operations with integrated solutions
          </h3>
          <p className="text-gray-600 mb-6">
            As your business grows, so do your software needs. Our custom applications help medium-sized 
            businesses streamline operations, integrate systems, and improve customer experiences.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Integration with existing systems and software",
              "Custom CRM and business management tools",
              "Staff and resource management features",
              "Advanced analytics and reporting",
              "Multi-location support and coordination"
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          
          <Button onClick={handleContact} className="bg-purple-600 hover:bg-purple-700">
            Learn More
          </Button>
        </div>
      </div>

      {/* Enterprise */}
      <div 
        id="enterprise" 
        ref={enterpriseRef}
        className={`container mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          visibleSections.enterprise ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center p-2 bg-indigo-50 rounded-lg mb-6">
            <div className="p-2 bg-indigo-100 rounded">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="ml-2 text-indigo-600 font-medium">Enterprise Solutions</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Enterprise-grade applications with uncompromising quality
          </h3>
          <p className="text-gray-600 mb-6">
            Enterprise organizations demand robust, secure, and scalable solutions. Our enterprise application 
            development delivers mission-critical software that can handle complex business requirements.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "High availability and fault-tolerant architecture",
              "Advanced security features and compliance (GDPR, HIPAA, etc.)",
              "Seamless integration with enterprise systems (SAP, Oracle, etc.)",
              "Customized workflows and business process automation",
              "Comprehensive training and ongoing support"
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <ChevronRight className="h-4 w-4 text-indigo-500" />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          
          <Button onClick={handleContact} className="bg-indigo-600 hover:bg-indigo-700">
            Contact Us
          </Button>
        </div>
        <div className="order-1 md:order-2 bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200" 
            alt="Enterprise Solutions" 
            className="w-full h-auto rounded-xl shadow-lg object-cover" 
          />
        </div>
      </div>
    </section>
  );
};

export default Business;
