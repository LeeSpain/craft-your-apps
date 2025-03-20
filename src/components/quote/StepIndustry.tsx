
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from './types';
import { INDUSTRIES } from './data';

interface StepIndustryProps {
  form: UseFormReturn<FormValues>;
}

export const StepIndustry: React.FC<StepIndustryProps> = ({ form }) => {
  const watchIndustry = form.watch("industry");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Step 1: What industry are you in?</h3>
      
      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Select your industry</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                // Reset features when industry changes
                form.setValue("features", []);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {watchIndustry === "other" && (
        <FormField
          control={form.control}
          name="customIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify your industry</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your industry" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
