
import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DollarSign, PoundSterling, Euro, Currency } from 'lucide-react';

const CurrencySelector = () => {
  const { currency, setCurrency } = useApp();
  
  const getCurrencyIcon = () => {
    switch(currency) {
      case 'USD':
        return <DollarSign className="h-4 w-4 text-white" />;
      case 'GBP':
        return <PoundSterling className="h-4 w-4 text-white" />;
      case 'EUR':
        return <Euro className="h-4 w-4 text-white" />;
      case 'AUD':
        return <Currency className="h-4 w-4 text-white" />;
      default:
        return <DollarSign className="h-4 w-4 text-white" />;
    }
  };
  
  const getButtonClass = () => {
    switch(currency) {
      case 'USD':
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
      case 'GBP':
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case 'EUR':
        return "bg-gradient-to-r from-cyan-500 to-blue-600";
      case 'AUD':
        return "bg-gradient-to-r from-emerald-500 to-cyan-600";
      default:
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
    }
  };
  
  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as any)}>
      <SelectTrigger className={`w-24 h-9 text-xs border-none text-white ${getButtonClass()} hover:opacity-90 transition-all font-medium rounded-md shadow-md`}>
        <div className="flex items-center">
          {getCurrencyIcon()}
          <SelectValue placeholder={currency} className="ml-1" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD" className="flex items-center">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-indigo-600" /> USD ($)
          </div>
        </SelectItem>
        <SelectItem value="GBP" className="flex items-center">
          <div className="flex items-center">
            <PoundSterling className="h-4 w-4 mr-1 text-blue-600" /> GBP (£)
          </div>
        </SelectItem>
        <SelectItem value="EUR" className="flex items-center">
          <div className="flex items-center">
            <Euro className="h-4 w-4 mr-1 text-cyan-600" /> EUR (€)
          </div>
        </SelectItem>
        <SelectItem value="AUD" className="flex items-center">
          <div className="flex items-center">
            <Currency className="h-4 w-4 mr-1 text-emerald-600" /> AUD (A$)
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
