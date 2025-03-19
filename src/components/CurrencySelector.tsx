
import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const CurrencySelector = () => {
  const { currency, setCurrency } = useApp();
  
  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as any)}>
      <SelectTrigger className="w-20 h-8 text-xs border-none bg-gray-100 hover:bg-gray-200">
        <SelectValue placeholder={currency} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD ($)</SelectItem>
        <SelectItem value="GBP">GBP (£)</SelectItem>
        <SelectItem value="EUR">EUR (€)</SelectItem>
        <SelectItem value="AUD">AUD (A$)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
