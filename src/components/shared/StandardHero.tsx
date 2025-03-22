
import React, { ReactNode } from 'react';

interface StandardHeroProps {
  title: string;
  subtitle: string;
  bgColor?: string;
  children?: ReactNode;
}

const StandardHero = ({ 
  title, 
  subtitle, 
  bgColor = "from-blue-50 to-white",
  children 
}: StandardHeroProps) => {
  return (
    <section className={`py-16 px-6 bg-gradient-to-b ${bgColor}`}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          {title}
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
};

export default StandardHero;
