
import { Button } from '@/components/ui/button';
import { Building2, ChevronRight } from 'lucide-react';

interface EnterpriseSectionProps {
  handleContact: () => void;
}

const EnterpriseSection = ({ handleContact }: EnterpriseSectionProps) => {
  return (
    <>
      <div className="order-2 md:order-1">
        <div className="inline-flex items-center p-2 bg-indigo-50 rounded-lg mb-6">
          <div className="p-2 bg-indigo-100 rounded">
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>
          <span className="ml-2 text-indigo-600 font-medium">Enterprise Solutions</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Enterprise-grade applications with uncompromising quality
        </h3>
        <p className="text-gray-600 mb-6">
          Enterprise organizations demand robust, secure, and scalable solutions. Our enterprise application 
          development delivers mission-critical software that can handle complex business requirements.
        </p>
        
        <ul className="space-y-3 mb-8">
          {[
            "High availability and fault-tolerant architecture",
            "Advanced security features and compliance (GDPR, HIPAA, etc.)",
            "Seamless integration with enterprise systems (SAP, Oracle, etc.)",
            "Customized workflows and business process automation",
            "Comprehensive training and ongoing support"
          ].map((item, i) => (
            <li key={i} className="flex items-start">
              <div className="mt-1 mr-3 flex-shrink-0">
                <ChevronRight className="h-4 w-4 text-indigo-500" />
              </div>
              <p>{item}</p>
            </li>
          ))}
        </ul>
        
        <Button onClick={handleContact} className="bg-indigo-600 hover:bg-indigo-700">
          Contact Us
        </Button>
      </div>
      <div className="order-1 md:order-2 bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl">
        <img 
          src="/lovable-uploads/cd8e3ceb-647c-4fde-99d2-dfe1dce01580.png" 
          alt="Enterprise Solutions" 
          className="w-full h-auto rounded-xl shadow-lg object-cover"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default EnterpriseSection;
