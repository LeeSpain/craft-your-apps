
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues, Industry } from './types';
import { Check } from 'lucide-react';

interface StepFeaturesProps {
  form: UseFormReturn<FormValues>;
  selectedIndustry: Industry | null;
}

export const StepFeatures: React.FC<StepFeaturesProps> = ({ form, selectedIndustry }) => {
  const watchFeatures = form.watch("features") || [];

  if (!selectedIndustry) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Step 2: What features do you need?</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
        <h4 className="font-medium text-blue-800 mb-2">The base app includes:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {selectedIndustry.baseFeatures.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-800 mb-2">Optional Add-Ons:</h4>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                {selectedIndustry.addOns.map((addon) => (
                  <div key={addon.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 mb-2 hover:bg-gray-50">
                    <FormControl>
                      <Checkbox
                        checked={watchFeatures?.includes(addon.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = form.getValues("features") || [];
                          
                          if (checked) {
                            form.setValue("features", [...currentValues, addon.id]);
                          } else {
                            form.setValue(
                              "features",
                              currentValues.filter((value) => value !== addon.id)
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between">
                        <FormLabel className="font-medium text-gray-800">
                          {addon.name}
                        </FormLabel>
                      </div>
                      {addon.description && (
                        <p className="text-sm text-gray-500">{addon.description.split(':')[0]}</p>
                      )}
                    </div>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
