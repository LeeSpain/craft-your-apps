
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Building, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlightedFeatures: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  buttonColor: string;
  hoverColor: string;
}

const PricingTiers = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();
  const { formatPrice } = useApp();

  const handleGetStarted = (tierName: string) => {
    navigate('/pricing', { state: { selectedTier: tierName } });
  };

  const pricingTiers: PricingTier[] = [
    {
      id: 'small',
      name: 'Small Business',
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      description: 'Perfect for startups and small businesses looking to establish their digital presence.',
      features: [
        'Custom mobile-friendly website',
        'Booking or appointment system',
        'User-friendly admin dashboard',
        'Payment processing integration',
        'Basic analytics',
        'Email support'
      ],
      highlightedFeatures: [
        'Fast turnaround (2-4 weeks)',
        'Affordable fixed-price package'
      ],
      icon: <Building className="h-6 w-6 text-blue-600" />,
      color: 'blue-600',
      bgColor: 'blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      hoverColor: 'hover:border-blue-300 hover:bg-blue-50'
    },
    {
      id: 'medium',
      name: 'Medium Business',
      monthlyPrice: 3000,
      yearlyPrice: 30000,
      description: 'For growing businesses that need more advanced features and integrations.',
      features: [
        'All Small Business features',
        'Custom CRM integration',
        'Staff and resource management',
        'Advanced analytics and reporting',
        'Multi-location support',
        'Priority support'
      ],
      highlightedFeatures: [
        'Integration with existing systems',
        'Enhanced security features'
      ],
      icon: <Building2 className="h-6 w-6 text-purple-600" />,
      color: 'purple-600',
      bgColor: 'purple-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      hoverColor: 'hover:border-purple-300 hover:bg-purple-50'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 7500,
      yearlyPrice: 75000,
      description: 'Custom enterprise-grade solutions for large organizations with complex requirements.',
      features: [
        'All Medium Business features',
        'High availability architecture',
        'Advanced security compliance',
        'Enterprise system integration',
        'Business process automation',
        'Dedicated account manager'
      ],
      highlightedFeatures: [
        'Custom workflow solutions',
        'Comprehensive training & support'
      ],
      icon: <Building2 className="h-6 w-6 text-indigo-600" />,
      color: 'indigo-600',
      bgColor: 'indigo-50',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      hoverColor: 'hover:border-indigo-300 hover:bg-indigo-50'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8 text-center">
        <p className="text-yellow-800 font-medium">
          These are example prices to illustrate our pricing structure. Your actual cost will be customized to your specific needs.
        </p>
      </div>

      {/* Pricing Switch */}
      <div className="flex justify-center items-center space-x-4 mb-12">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            billingPeriod === 'monthly' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setBillingPeriod('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            billingPeriod === 'yearly' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setBillingPeriod('yearly')}
        >
          Yearly <span className="text-xs text-green-500 ml-1">Save 15%</span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.id}
            className={`border-2 border-gray-200 ${tier.hoverColor} transition-colors duration-300 relative`}
          >
            {/* Tier Icon */}
            <div className={`absolute -top-4 left-6 p-2 rounded-lg bg-${tier.bgColor}`}>
              <div className={`p-2 bg-white rounded shadow-sm`}>
                {tier.icon}
              </div>
            </div>

            <CardHeader className="pt-10">
              <CardTitle className={`text-${tier.color} text-xl`}>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className={`text-3xl font-bold text-${tier.color}`}>
                  {formatPrice(billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice)}
                </span>
                <span className="text-gray-500 ml-2">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
                <p className="text-xs text-gray-500 mt-1">Example pricing</p>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {tier.highlightedFeatures.map((feature, index) => (
                  <div key={index} className={`bg-${tier.bgColor} p-2 rounded-md flex items-start space-x-2`}>
                    <Check className={`h-5 w-5 text-${tier.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Included features:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className={`h-4 w-4 text-${tier.color} mr-2 flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <Button 
                className={`w-full ${tier.buttonColor}`} 
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-300"
                onClick={() => document.querySelector('.QuoteForm')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Custom Quote
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Need a more customized solution?</p>
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-700"
          asChild
        >
          <Link to="/contact">
            Discuss Your Project
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingTiers;
