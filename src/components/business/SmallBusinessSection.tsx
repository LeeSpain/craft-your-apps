
import { Button } from '@/components/ui/button';
import { Building, ChevronRight } from 'lucide-react';

interface SmallBusinessSectionProps {
  handleContact: () => void;
}

const SmallBusinessSection = ({ handleContact }: SmallBusinessSectionProps) => {
  return (
    <>
      <div className="order-2 md:order-1">
        <div className="inline-flex items-center p-2 bg-blue-50 rounded-lg mb-6">
          <div className="p-2 bg-blue-100 rounded">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
          <span className="ml-2 text-blue-600 font-medium">Small Businesses & Startups</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Launch faster with powerful, affordable solutions
        </h3>
        <p className="text-gray-600 mb-6">
          We understand that small businesses need cost-effective solutions without sacrificing quality. 
          Our custom apps help you compete with larger players while staying on budget.
        </p>
        
        <ul className="space-y-3 mb-8">
          {[
            "Affordable, fixed-price packages",
            "Fast turnaround times (as quick as 2-4 weeks)",
            "Mobile-first design for modern customers",
            "Easy payment processing integration",
            "Booking and appointment systems"
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mt-1 mr-3 flex-shrink-0">
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
        
        <Button onClick={handleContact} className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </div>
      <div className="order-1 md:order-2 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
        <img 
          src="/lovable-uploads/90f17628-e973-47b8-9bbc-4435444a20f6.png" 
          alt="Small Business Solutions" 
          className="w-full h-auto rounded-xl shadow-lg object-cover" 
          loading="lazy"
        />
      </div>
    </>
  );
};

export default SmallBusinessSection;
