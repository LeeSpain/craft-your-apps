
import { FormValues, QuoteDetails, Industry } from './types';
import { INDUSTRIES } from './data';

export const calculateQuote = (
  data: FormValues, 
  selectedIndustry: Industry | null
): QuoteDetails | null => {
  if (!selectedIndustry) return null;
  
  const basePrice = selectedIndustry.basePrice;
  
  // Calculate add-ons total
  const selectedAddOns = selectedIndustry.addOns.filter(
    addon => data.features?.includes(addon.id)
  );
  
  const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = basePrice + addOnsTotal;
  
  // Calculate payment details based on selected plan
  const deposit = Math.round(totalPrice * 0.3);
  const remaining = totalPrice - deposit;
  
  let monthlyPayment, discount, finalPrice;
  
  if (data.paymentPlan === "full") {
    discount = Math.round(totalPrice * 0.05);
    finalPrice = totalPrice - discount;
  } else if (data.paymentPlan === "monthly") {
    monthlyPayment = Math.round(remaining / 10); // Assuming 10 monthly payments
  }
  
  return {
    basePrice,
    addOns: selectedAddOns.map(addon => ({ name: addon.name, price: addon.price })),
    totalPrice,
    deposit,
    remaining,
    monthlyPayment,
    discount,
    finalPrice
  };
};

export const findIndustryById = (id: string): Industry | undefined => {
  return INDUSTRIES.find(industry => industry.id === id);
};
