
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BespokeApps = () => {
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
                src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                alt="Custom CRM" 
                loading="lazy"
                onLoad={() => handleImageLoad('crm')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['crm'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Custom CRM Systems</h3>
            <p className="text-gray-600 mb-4">
              Integrated inventory management, customer loyalty programs, and advanced analytics tailored to your business.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="Workflow Automation" 
                loading="lazy"
                onLoad={() => handleImageLoad('workflow')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['workflow'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Workflow Automation</h3>
            <p className="text-gray-600 mb-4">
              Real-time tracking, route optimization, and process management customized for your operations.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Custom Booking System" 
                loading="lazy"
                onLoad={() => handleImageLoad('enterprise')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['enterprise'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Enterprise Integration</h3>
            <p className="text-gray-600 mb-4">
              Seamless integration with existing systems, data migration, and custom API development.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-indigo-600" onClick={openChatbot}>
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button size="lg" className="bg-indigo-600" asChild>
          <Link to="/contact">
            <Wrench className="mr-2 h-5 w-5" />
            Build Your Custom Quote
          </Link>
        </Button>
      </div>
    </>
  );
};

export default BespokeApps;
