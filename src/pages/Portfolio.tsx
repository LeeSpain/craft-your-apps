import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, AppData } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ShoppingCart, Wrench, Rocket, ExternalLink } from 'lucide-react';
import Chatbot from '@/components/Chatbot';
import PortfolioSection from '@/components/portfolio/PortfolioSection';

const PortfolioPage = () => {
  const { language, openChatbot } = useApp();
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
    openChatbot();
    console.log(`Buy Now clicked for ${app.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions for Every Business
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From ready-to-launch applications to fully custom solutions, we deliver digital products that drive growth and efficiency. Find the perfect match for your business needs.
            </p>
          </div>
        </section>
        
        {/* Off-the-Shelf Apps Section */}
        <PortfolioSection 
          id="off-the-shelf"
          title="Off-the-Shelf Apps"
          subtitle="Ready-to-launch applications designed for common business needs"
          icon={<ShoppingCart className="h-8 w-8 text-blue-600" />}
          bgColor="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Hairdresser App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Salon & Spa Booking</h3>
                <p className="text-gray-600 mb-4">
                  Online booking, customer profiles, automated reminders, and payment integration for hairdressers and spas.
                </p>
                <div className="flex justify-between">
                  <span className="text-blue-600 font-semibold">From $7,000</span>
                  <Button size="sm" className="bg-blue-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="B&B App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Accommodation Manager</h3>
                <p className="text-gray-600 mb-4">
                  Room booking, guest management, and payment processing for B&Bs and small hotels.
                </p>
                <div className="flex justify-between">
                  <span className="text-blue-600 font-semibold">From $8,000</span>
                  <Button size="sm" className="bg-blue-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Restaurant App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Restaurant Suite</h3>
                <p className="text-gray-600 mb-4">
                  Table reservations, digital menus, order management, and customer loyalty for restaurants.
                </p>
                <div className="flex justify-between">
                  <span className="text-blue-600 font-semibold">From $8,500</span>
                  <Button size="sm" className="bg-blue-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse All Apps
            </Button>
            <Button size="lg" variant="outline" onClick={openChatbot}>
              Get Started
            </Button>
          </div>
        </PortfolioSection>
        
        {/* Bespoke Apps Section */}
        <PortfolioSection 
          id="bespoke"
          title="Bespoke Apps"
          subtitle="Tailored applications designed for your specific business needs"
          icon={<Wrench className="h-8 w-8 text-indigo-600" />}
          bgColor="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                  alt="Custom CRM" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Custom CRM Systems</h3>
                <p className="text-gray-600 mb-4">
                  Integrated inventory management, customer loyalty programs, and advanced analytics tailored to your business.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Workflow Automation" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Workflow Automation</h3>
                <p className="text-gray-600 mb-4">
                  Real-time tracking, route optimization, and process management customized for your operations.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                  alt="Custom Booking System" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Enterprise Integration</h3>
                <p className="text-gray-600 mb-4">
                  Seamless integration with existing systems, data migration, and custom API development.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-indigo-600" onClick={openChatbot}>
              <Wrench className="mr-2 h-5 w-5" />
              Build Your Custom Quote
            </Button>
            <Button size="lg" variant="outline" onClick={openChatbot}>
              Discuss Your Project
            </Button>
          </div>
        </PortfolioSection>
        
        {/* Startup Apps Section */}
        <PortfolioSection 
          id="startup"
          title="Startup Apps (Investment-Ready)"
          subtitle="MVP applications designed to attract investors and demonstrate growth potential"
          icon={<Rocket className="h-8 w-8 text-purple-600" />}
          bgColor="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
                  alt="HealthTech App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">HealthTech Solutions</h3>
                <p className="text-gray-600 mb-4">
                  AI-powered health platforms, appointment booking, and telemedicine integration with investor-ready metrics.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-purple-600" onClick={openChatbot}>
                    Request Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                  alt="FinTech App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">FinTech Platforms</h3>
                <p className="text-gray-600 mb-4">
                  Budget tracking, investment recommendations, and secure payment processing with scalable architecture.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-purple-600" onClick={openChatbot}>
                    Request Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                  alt="EdTech App" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">EdTech Innovations</h3>
                <p className="text-gray-600 mb-4">
                  Interactive learning modules, progress tracking, and gamification designed to scale with user growth.
                </p>
                <div className="mt-auto text-center">
                  <Button className="w-full bg-purple-600" onClick={openChatbot}>
                    Request Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600" onClick={openChatbot}>
              <Rocket className="mr-2 h-5 w-5" />
              Request a Consultation
            </Button>
            <Button size="lg" variant="outline" onClick={openChatbot}>
              Learn About MVP Development
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Confidentiality Note:</strong> All startup projects are protected under strict NDAs. 
              We do not disclose client names or specific app details to protect your competitive advantage.
            </p>
          </div>
        </PortfolioSection>
        
        {/* Existing Grid Section */}
        <section 
          ref={sectionRef}
          className="py-16 px-6 bg-gray-50"
        >
          <div className="container mx-auto">
            <div 
              className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-6">
                Featured Applications
              </h2>
              <p className="text-gray-600">
                Each application has been meticulously crafted with scalability, security, and user experience in mind. Browse our collection and find the perfect solution for your business.
              </p>
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
          </div>
        </section>
        
        {/* Process Section - Keep existing section */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-gray-600">
                Getting started with one of our premium applications is simple and straightforward.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Choose Your App</h3>
                  <p className="text-gray-600">
                    Browse our portfolio and select the application that best fits your business needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Customize Options</h3>
                  <p className="text-gray-600">
                    Discuss customization options with our team to tailor the app to your specific requirements.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-blue-600 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Launch & Support</h3>
                  <p className="text-gray-600">
                    We handle the deployment and provide ongoing support to ensure your application runs smoothly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials - Keep existing section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">Client Success Stories</h2>
              <p className="text-gray-600">
                Hear from businesses that have transformed their operations with our applications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <p className="text-gray-600 italic mb-6">
                    "The Move-Sync app revolutionized how our employees commute to work. The shuttle tracking feature alone has saved us countless hours of productivity."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Operations Director, TechCorp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <p className="text-gray-600 italic mb-6">
                    "Implementing the AI Spain Homes application allowed us to match clients with properties 3x faster than our previous system. The ROI has been remarkable."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-bold">Miguel Fernandez</h4>
                      <p className="text-sm text-gray-500">CEO, Coastal Properties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Keep existing section */}
        <section className="py-20 px-6 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Don't see exactly what you're looking for? Our team can build a custom application tailored to your specific business needs.
            </p>
            <Button 
              onClick={openChatbot}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get a Custom Quote
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default PortfolioPage;
