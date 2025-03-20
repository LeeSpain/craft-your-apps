
import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from './types';
import { PAYMENT_PLANS } from './data';

interface StepPaymentProps {
  form: UseFormReturn<FormValues>;
}

export const StepPayment: React.FC<StepPaymentProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Step 3: How would you like to pay?</h3>
      
      <FormField
        control={form.control}
        name="paymentPlan"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel>Select a payment plan</FormLabel>
            {PAYMENT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-start space-x-3 p-4 rounded-lg border ${
                  field.value === plan.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                } cursor-pointer transition-colors`}
                onClick={() => form.setValue("paymentPlan", plan.id)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  field.value === plan.id 
                    ? 'border-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {field.value === plan.id && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-gray-800">{plan.name.split(' (')[0]}</p>
                  <p className="text-sm text-gray-500">{plan.description.split(' and ')[0]}</p>
                </div>
              </div>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
