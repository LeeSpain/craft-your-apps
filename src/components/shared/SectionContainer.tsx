
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  id?: string;
  className?: string;
  bgColor?: string;
  children: ReactNode;
}

const SectionContainer = ({ 
  id, 
  className, 
  bgColor = "bg-white", 
  children 
}: SectionContainerProps) => {
  return (
    <section 
      id={id} 
      className={cn("py-8 px-6", bgColor, className)}
    >
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
