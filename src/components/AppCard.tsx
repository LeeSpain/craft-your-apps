
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { AppData } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Link } from 'react-router-dom';

interface AppCardProps {
  app: AppData;
  onBuyNow: (app: AppData) => void;
}

const AppCard = ({ app, onBuyNow }: AppCardProps) => {
  const { language, formatPrice } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-500 hover-up overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {isVisible && (
          <AspectRatio ratio={16/9}>
            <img 
              src={app.image} 
              alt={app.name}
              loading="lazy" 
              onLoad={handleImageLoad}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
                "hover:scale-105 transition-transform duration-500"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </AspectRatio>
        )}
      </div>
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{app.name}</h3>
          <div className="bg-purple-50 px-3 py-1 rounded-full">
            <span className="text-purple-700 font-medium">{formatPrice(app.price)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{app.shortDescription}</p>
        
        <div className="mt-auto flex gap-3">
          <Button 
            onClick={() => onBuyNow(app)}
            className="flex-1 button-hover bg-purple-600 hover:bg-purple-700"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {getTranslation('portfolio.buyNow', language)}
          </Button>
          
          <Button 
            variant="outline" 
            className="button-hover border-purple-200 hover:bg-purple-50"
            onClick={() => window.open(app.demoLink, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {getTranslation('portfolio.viewDemo', language)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
