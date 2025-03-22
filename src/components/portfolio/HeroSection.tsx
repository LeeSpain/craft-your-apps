
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SectionContainer from '@/components/shared/SectionContainer';

const HeroSection = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
              Solutions for Every Business
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              From ready-to-launch applications to fully custom solutions, we deliver digital products that drive growth and efficiency. Find the perfect match for your business needs.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
              <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
                <img 
                  src="public/lovable-uploads/90f17628-e973-47b8-9bbc-4435444a20f6.png"
                  alt="Business Solutions" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
