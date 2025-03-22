
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const BespokeApps = () => {
  const { openChatbot } = useApp();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
              alt="Custom CRM" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
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
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="Workflow Automation" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
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
            <img 
              src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
              alt="Custom Booking System" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
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
      
      <div className="flex justify-center gap-4">
        <Button size="lg" className="bg-indigo-600" onClick={openChatbot}>
          <Wrench className="mr-2 h-5 w-5" />
          Build Your Custom Quote
        </Button>
        <Button size="lg" variant="outline" onClick={openChatbot}>
          Discuss Your Project
        </Button>
      </div>
    </>
  );
};

export default BespokeApps;
