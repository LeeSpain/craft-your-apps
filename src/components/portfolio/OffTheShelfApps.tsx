
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OffTheShelfApps = () => {
  const { openChatbot } = useApp();
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  
  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({...prev, [id]: true}));
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800" 
                alt="E-commerce Stores" 
                loading="lazy"
                onLoad={() => handleImageLoad('ecommerce')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['ecommerce'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">E-commerce Stores</h3>
            <p className="text-gray-600 mb-4">
              Product catalogs, shopping carts, payment gateways, order tracking, AR fitting. Branding, logo uploads, product details, pricing, color schemes.
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
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" 
                alt="Food and Beverage" 
                loading="lazy"
                onLoad={() => handleImageLoad('food')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['food'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Food and Beverage</h3>
            <p className="text-gray-600 mb-4">
              Ordering, menu management, payments, delivery tracking, loyalty programs. Restaurant branding, menu items, delivery zones, promotional offers.
            </p>
            <div className="flex justify-between">
              <span className="text-blue-600 font-semibold">From $7,500</span>
              <Button size="sm" className="bg-blue-600">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=800" 
                alt="Personal Services" 
                loading="lazy"
                onLoad={() => handleImageLoad('services')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['services'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Personal Services</h3>
            <p className="text-gray-600 mb-4">
              Scheduling, client management, bookings, video call integration, payments. Service offerings, availability, branding, client communication.
            </p>
            <div className="flex justify-between">
              <span className="text-blue-600 font-semibold">From $6,500</span>
              <Button size="sm" className="bg-blue-600">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button size="lg" className="bg-blue-600" asChild>
          <Link to="/pricing">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Browse All Apps
          </Link>
        </Button>
      </div>
    </>
  );
};

export default OffTheShelfApps;
