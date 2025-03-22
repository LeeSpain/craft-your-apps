
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const CTASection = () => {
  const { openChatbot } = useApp();
  
  return (
    <section className="py-20 px-6 bg-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Don't see exactly what you're looking for? Our team can build a custom application tailored to your specific business needs.
        </p>
        <Button 
          onClick={openChatbot}
          size="lg" 
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Get a Custom Quote
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
