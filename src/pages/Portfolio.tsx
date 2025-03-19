
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, AppData } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Chatbot from '@/components/Chatbot';

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
    // Open chatbot with the specific app pre-selected
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
              Our Premium Application Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our collection of ready-to-launch applications designed to solve real business problems. Choose from our showcase or let us tailor a solution for your unique needs.
            </p>
          </div>
        </section>
        
        {/* Portfolio Grid */}
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
                Ready-To-Launch Applications
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
        
        {/* Process Section */}
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
        
        {/* Testimonials */}
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
        
        {/* CTA Section */}
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
