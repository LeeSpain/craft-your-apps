
import { Button } from '@/components/ui/button';
import { Building2, ChevronRight } from 'lucide-react';

interface MediumBusinessSectionProps {
  handleContact: () => void;
}

const MediumBusinessSection = ({ handleContact }: MediumBusinessSectionProps) => {
  return (
    <>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
        <img 
          src="/lovable-uploads/16951d9d-ae4e-4bd1-97d1-7bb1b16c0cfc.png" 
          alt="Medium Business Solutions" 
          className="w-full h-auto rounded-xl shadow-lg object-cover"
          loading="lazy" 
        />
      </div>
      <div>
        <div className="inline-flex items-center p-2 bg-purple-50 rounded-lg mb-6">
          <div className="p-2 bg-purple-100 rounded">
            <Building2 className="h-6 w-6 text-purple-600" />
          </div>
          <span className="ml-2 text-purple-600 font-medium">Medium Businesses</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Scale your operations with integrated solutions
        </h3>
        <p className="text-gray-600 mb-6">
          As your business grows, so do your software needs. Our custom applications help medium-sized 
          businesses streamline operations, integrate systems, and improve customer experiences.
        </p>
        
        <ul className="space-y-3 mb-8">
          {[
            "Integration with existing systems and software",
            "Custom CRM and business management tools",
            "Staff and resource management features",
            "Advanced analytics and reporting",
            "Multi-location support and coordination"
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mt-1 mr-3 flex-shrink-0">
                <ChevronRight className="h-4 w-4 text-purple-500" />
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
        
        <Button onClick={handleContact} className="bg-purple-600 hover:bg-purple-700">
          Learn More
        </Button>
      </div>
    </>
  );
};

export default MediumBusinessSection;
