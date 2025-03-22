
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/portfolio/HeroSection';
import PortfolioSection from '@/components/portfolio/PortfolioSection';
import ProcessSection from '@/components/portfolio/ProcessSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import CTASection from '@/components/portfolio/CTASection';
import OffTheShelfApps from '@/components/portfolio/OffTheShelfApps';
import BespokeApps from '@/components/portfolio/BespokeApps';
import AISection from '@/components/portfolio/AISection';
import { ShoppingCart, Wrench } from 'lucide-react';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* AI Section */}
        <AISection />
        
        {/* Off-the-Shelf Apps Section */}
        <PortfolioSection 
          id="off-the-shelf"
          title="Off-the-Shelf Apps"
          subtitle="Ready-to-launch applications designed for common business needs"
          icon={<ShoppingCart className="h-8 w-8 text-purple-600" />}
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
        
        {/* Process Section */}
        <ProcessSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioPage;
