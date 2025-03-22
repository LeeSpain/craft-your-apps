
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';

const OffTheShelfApps = () => {
  const { openChatbot } = useApp();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Hairdresser App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Salon & Spa Booking</h3>
            <p className="text-gray-600 mb-4">
              Online booking, customer profiles, automated reminders, and payment integration for hairdressers and spas.
            </p>
            <div className="flex justify-between">
              <span className="text-blue-600 font-semibold">From $7,000</span>
              <Button size="sm" className="bg-blue-600">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="B&B App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Accommodation Manager</h3>
            <p className="text-gray-600 mb-4">
              Room booking, guest management, and payment processing for B&Bs and small hotels.
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
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Restaurant App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Restaurant Suite</h3>
            <p className="text-gray-600 mb-4">
              Table reservations, digital menus, order management, and customer loyalty for restaurants.
            </p>
            <div className="flex justify-between">
              <span className="text-blue-600 font-semibold">From $8,500</span>
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
