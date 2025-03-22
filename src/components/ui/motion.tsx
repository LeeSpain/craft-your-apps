
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  threshold?: number;
}

export const Motion = ({ 
  children, 
  className, 
  delay = 0, 
  direction = 'up', 
  distance = 20,
  threshold = 0.1
}: MotionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold, rootMargin: "10px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const getTransformStyle = () => {
    if (direction === 'up') return `translateY(${distance}px)`;
    if (direction === 'down') return `translateY(-${distance}px)`;
    if (direction === 'left') return `translateX(${distance}px)`;
    if (direction === 'right') return `translateX(-${distance}px)`;
    return `translateY(${distance}px)`;
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransformStyle(),
      }}
    >
      {children}
    </div>
  );
};
