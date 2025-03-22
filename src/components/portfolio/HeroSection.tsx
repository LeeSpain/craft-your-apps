
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SectionContainer from '@/components/shared/SectionContainer';

const HeroSection = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
          Solutions for Every Business
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          From ready-to-launch applications to fully custom solutions, we deliver digital products that drive growth and efficiency. Find the perfect match for your business needs.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
