
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Client Success Stories</h2>
          <p className="text-gray-600">
            Hear from businesses that have transformed their operations with our applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-0">
              <p className="text-gray-600 italic mb-6">
                "The Move-Sync app revolutionized how our employees commute to work. The shuttle tracking feature alone has saved us countless hours of productivity."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Operations Director, TechCorp</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-6 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-0">
              <p className="text-gray-600 italic mb-6">
                "Implementing the AI Spain Homes application allowed us to match clients with properties 3x faster than our previous system. The ROI has been remarkable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Miguel Fernandez</h4>
                  <p className="text-sm text-gray-500">CEO, Coastal Properties</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
