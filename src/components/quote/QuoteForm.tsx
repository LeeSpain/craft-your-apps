
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

import { FormValues, formSchema, QuoteDetails, Industry } from './types';
import { findIndustryById } from './utils';
import { calculateQuote } from './utils';
import { ProgressSteps } from './ProgressSteps';
import { StepIndustry } from './StepIndustry';
import { StepFeatures } from './StepFeatures';
import { StepPayment } from './StepPayment';
import { StepContact } from './StepContact';
import { QuoteResult } from './QuoteResult';

export const QuoteForm = () => {
  const { formatPrice } = useApp();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      features: [],
      customIndustry: "",
      paymentPlan: "",
      name: "",
      companyName: "",
      email: "",
      phone: "",
    },
  });

  // Watch for industry changes to update the available features
  const watchIndustry = form.watch("industry");
  const watchPaymentPlan = form.watch("paymentPlan");

  // Update selected industry when watchIndustry changes
  React.useEffect(() => {
    const industry = findIndustryById(watchIndustry);
    setSelectedIndustry(industry || null);
  }, [watchIndustry]);

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    const quote = calculateQuote(data, selectedIndustry);
    if (quote) {
      setQuoteDetails(quote);
      setShowQuote(true);
      
      // Show success toast
      toast({
        title: "Quote Generated Successfully!",
        description: `A copy has been sent to ${data.email}`,
      });
    }
  };

  // Handle next step
  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger("industry");
      if (isValid) setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      const isValid = await form.trigger("paymentPlan");
      if (isValid) setCurrentStep(4);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden QuoteForm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">AIAppCrafter Quote Builder</h2>
        <p className="text-blue-100">
          Hi there! 👋 Welcome to AIAppCrafter. Let's build your dream app! Fill out this quick form, and we'll send you a custom quote instantly.
        </p>
      </div>

      <div className="p-6">
        {!showQuote ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Progress Steps */}
              <ProgressSteps currentStep={currentStep} />

              {/* Step 1: Industry Selection */}
              {currentStep === 1 && <StepIndustry form={form} />}

              {/* Step 2: Features Selection */}
              {currentStep === 2 && <StepFeatures form={form} selectedIndustry={selectedIndustry} />}

              {/* Step 3: Payment Plan */}
              {currentStep === 3 && <StepPayment form={form} />}

              {/* Step 4: Contact Details */}
              {currentStep === 4 && <StepContact form={form} />}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 4 ? (
                  <Button 
                    type="button" 
                    onClick={handleNext}
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    Get Your Quote
                  </Button>
                )}
              </div>
            </form>
          </Form>
        ) : (
          <QuoteResult 
            quoteDetails={quoteDetails!} 
            form={form} 
            selectedIndustry={selectedIndustry}
            watchPaymentPlan={watchPaymentPlan}
            onEdit={() => setShowQuote(false)}
          />
        )}
      </div>
    </div>
  );
};
