
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface LeadFormProps {
  onSubmit: (formData: FormData) => void;
  isCustom?: boolean;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
}

const LeadForm = ({ onSubmit, isCustom = false }: LeadFormProps) => {
  const { language } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.company || !formData.email || (isCustom && !formData.industry)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      toast({
        title: "Success!",
        description: getTranslation('form.thanks', language),
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('form.name', language)} *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('form.company', language)} *
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('form.email', language)} *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          {getTranslation('form.phone', language)}
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      
      {isCustom && (
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            {getTranslation('form.industry', language)} *
          </label>
          <Input
            id="industry"
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleChange}
            required={isCustom}
            className="w-full"
          />
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full button-hover bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          getTranslation('form.submit', language)
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
