
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const StartupApps = () => {
  const { openChatbot } = useApp();
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
              alt="HealthTech App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">HealthTech Solutions</h3>
            <p className="text-gray-600 mb-4">
              AI-powered health platforms, appointment booking, and telemedicine integration with investor-ready metrics.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-purple-600" onClick={openChatbot}>
                Request Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
              alt="FinTech App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">FinTech Platforms</h3>
            <p className="text-gray-600 mb-4">
              Budget tracking, investment recommendations, and secure payment processing with scalable architecture.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-purple-600" onClick={openChatbot}>
                Request Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <img 
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
              alt="EdTech App" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">EdTech Innovations</h3>
            <p className="text-gray-600 mb-4">
              Interactive learning modules, progress tracking, and gamification designed to scale with user growth.
            </p>
            <div className="mt-auto text-center">
              <Button className="w-full bg-purple-600" onClick={openChatbot}>
                Request Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button size="lg" className="bg-purple-600" onClick={openChatbot}>
          <Rocket className="mr-2 h-5 w-5" />
          Request a Consultation
        </Button>
        <Button size="lg" variant="outline" onClick={openChatbot}>
          Learn About MVP Development
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          <strong>Confidentiality Note:</strong> All startup projects are protected under strict NDAs. 
          We do not disclose client names or specific app details to protect your competitive advantage.
        </p>
      </div>
    </>
  );
};

export default StartupApps;
