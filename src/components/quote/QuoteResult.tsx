
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Check } from 'lucide-react';
import { QuoteDetails, FormValues, Industry } from './types';
import { useApp } from '@/context/AppContext';
import { useForm } from "react-hook-form";

interface QuoteResultProps {
  quoteDetails: QuoteDetails;
  form: ReturnType<typeof useForm<FormValues>>;
  selectedIndustry: Industry | null;
  watchPaymentPlan: string;
  onEdit: () => void;
}

export const QuoteResult: React.FC<QuoteResultProps> = ({ 
  quoteDetails, 
  form, 
  selectedIndustry,
  watchPaymentPlan,
  onEdit
}) => {
  const { formatPrice } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Your Custom Quote</h3>
        <Button 
          variant="outline" 
          onClick={onEdit}
          size="sm"
        >
          Edit Quote
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-6">
          <h4 className="font-bold text-blue-900 text-lg mb-4">
            Quote for {form.getValues("companyName")}
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-medium text-gray-800 mb-2">
                <span>Base App:</span>
                <span>{formatPrice(quoteDetails.basePrice)}</span>
              </div>
              
              {selectedIndustry && (
                <ul className="pl-5 space-y-1">
                  {selectedIndustry.baseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {quoteDetails.addOns.length > 0 && (
              <div>
                <div className="font-medium text-gray-800 mb-2">
                  Add-Ons:
                </div>
                
                <ul className="space-y-2">
                  {quoteDetails.addOns.map((addon, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{addon.name}:</span>
                      <span>{formatPrice(addon.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t border-blue-200 pt-3 mt-4">
              <div className="flex justify-between font-bold text-lg text-blue-900">
                <span>Total Cost:</span>
                <span>
                  {watchPaymentPlan === "full" && quoteDetails.finalPrice 
                    ? formatPrice(quoteDetails.finalPrice) 
                    : formatPrice(quoteDetails.totalPrice)}
                </span>
              </div>
              
              {watchPaymentPlan === "full" && quoteDetails.discount && (
                <div className="flex justify-between text-sm text-green-600 mt-1">
                  <span>You save:</span>
                  <span>{formatPrice(quoteDetails.discount)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-800 mb-3">Payment Details:</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Initial Deposit (30%):</span>
              <span className="font-medium">{formatPrice(quoteDetails.deposit)}</span>
            </div>
            
            {watchPaymentPlan === "full" && (
              <div className="flex justify-between text-sm">
                <span>Remaining Balance:</span>
                <span className="font-medium">{formatPrice(quoteDetails.finalPrice! - quoteDetails.deposit)}</span>
              </div>
            )}
            
            {watchPaymentPlan === "monthly" && quoteDetails.monthlyPayment && (
              <div className="flex justify-between text-sm">
                <span>Monthly Payments (10 months):</span>
                <span className="font-medium">{formatPrice(quoteDetails.monthlyPayment)}/month</span>
              </div>
            )}
            
            {watchPaymentPlan === "milestone" && (
              <div className="flex justify-between text-sm">
                <span>Remaining Balance (In milestones):</span>
                <span className="font-medium">{formatPrice(quoteDetails.remaining)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg border border-green-100 p-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 mb-1">Quote Sent to Your Email</h4>
              <p className="text-sm text-green-700">
                We've sent a copy of this quote to {form.getValues("email")}. 
                One of our representatives will contact you soon to discuss next steps.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="default" 
            className="w-full md:w-auto"
          >
            Accept Quote
          </Button>
        </div>
      </div>
    </div>
  );
};
