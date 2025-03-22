
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const BespokeApps = () => {
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  
  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({...prev, [id]: true}));
  };
  
  const AppEmbed = ({ url, title }: { url: string, title: string }) => (
    <div className="w-full h-full max-h-[80vh] overflow-hidden rounded-lg border border-gray-200">
      <iframe 
        src={url} 
        title={title}
        className="w-full h-[80vh]"
        style={{ border: 'none' }}
      />
    </div>
  );
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800" 
                alt="Move Sync" 
                loading="lazy"
                onLoad={() => handleImageLoad('movesync')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['movesync'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">Move Sync</h3>
            <p className="text-gray-600 mb-4">
              Integrated fitness tracking, class bookings, and community features designed for fitness studios and users.
            </p>
            <div className="mt-auto text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-indigo-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Explore App
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-screen p-0 bg-white">
                  <AppEmbed url="https://www.move-sync.com/" title="Move Sync" />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800" 
                alt="PawPal Booking Buddy" 
                loading="lazy"
                onLoad={() => handleImageLoad('pawpal')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['pawpal'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">PawPal Booking Buddy</h3>
            <p className="text-gray-600 mb-4">
              Pet service booking, scheduling, and management platform for grooming and pet care businesses.
            </p>
            <div className="mt-auto text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-indigo-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Explore App
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-screen p-0 bg-white">
                  <AppEmbed url="https://pawpal-booking-buddy.vercel.app/" title="PawPal Booking Buddy" />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <AspectRatio ratio={16/9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800" 
                alt="AIS Pain Homes" 
                loading="lazy"
                onLoad={() => handleImageLoad('aispain')}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imagesLoaded['aispain'] ? 'opacity-100' : 'opacity-0'}`}
              />
            </AspectRatio>
            <h3 className="text-xl font-bold mb-2">AIS Pain Homes</h3>
            <p className="text-gray-600 mb-4">
              Real estate listing, property management, and client portal for the Spanish real estate market.
            </p>
            <div className="mt-auto text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-indigo-600">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Explore App
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-screen p-0 bg-white">
                  <AppEmbed url="https://aispainhomes.vercel.app/" title="AIS Pain Homes" />
                </DialogContent>
              </Dialog>
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
