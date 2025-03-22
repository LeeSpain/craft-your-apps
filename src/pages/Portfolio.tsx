
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import HeroSection from '@/components/portfolio/HeroSection';
import PortfolioSection from '@/components/portfolio/PortfolioSection';
import FeaturedAppsSection from '@/components/portfolio/FeaturedAppsSection';
import ProcessSection from '@/components/portfolio/ProcessSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import CTASection from '@/components/portfolio/CTASection';
import OffTheShelfApps from '@/components/portfolio/OffTheShelfApps';
import BespokeApps from '@/components/portfolio/BespokeApps';
import StartupApps from '@/components/portfolio/StartupApps';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { ShoppingCart, Wrench, Rocket } from 'lucide-react';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Off-the-Shelf Apps Section */}
        <PortfolioSection 
          id="off-the-shelf"
          title="Off-the-Shelf Apps"
          subtitle="Ready-to-launch applications designed for common business needs"
          icon={<ShoppingCart className="h-8 w-8 text-blue-600" />}
          bgColor="bg-white"
        >
          <OffTheShelfApps />
        </PortfolioSection>
        
        {/* Bespoke Apps Section */}
        <PortfolioSection 
          id="bespoke"
          title="Bespoke Apps"
          subtitle="Tailored applications designed for your specific business needs"
          icon={<Wrench className="h-8 w-8 text-indigo-600" />}
          bgColor="bg-gray-50"
        >
          <BespokeApps />
        </PortfolioSection>
        
        {/* Startup Apps Section */}
        <PortfolioSection 
          id="startup"
          title="Startup Apps (Investment-Ready)"
          subtitle="MVP applications designed to attract investors and demonstrate growth potential"
          icon={<Rocket className="h-8 w-8 text-purple-600" />}
          bgColor="bg-white"
        >
          <StartupApps />
        </PortfolioSection>
        
        {/* Quote Builder Section */}
        <section id="quote-builder" className="py-12 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-4">AI Quote Builder</h2>
              <p className="text-gray-600">
                Get an instant quote for your project using our interactive AI-powered quote builder. 
                Customize features, payments, and more.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>
        
        {/* Featured Apps Grid Section */}
        <FeaturedAppsSection />
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default PortfolioPage;
