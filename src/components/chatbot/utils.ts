
import { CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { UserSelections } from './types';

// Calculate total price based on user selections
export const calculateTotalPrice = (userSelections: UserSelections): number => {
  let total = BASE_PRICE;
  
  userSelections.features.forEach(featureId => {
    const feature = CUSTOM_FEATURES.find(f => f.id === featureId);
    if (feature) {
      total += feature.price;
    }
  });
  
  return total;
};

// Generate quote message text
export const generateQuoteText = (userSelections: UserSelections, formatPrice: (price: number) => string): string => {
  const total = calculateTotalPrice(userSelections);
  const splitAmount = total * 0.6;
  const fullAmount = total * 0.95;
  
  // Get selected features details
  const selectedFeatures = CUSTOM_FEATURES.filter(feature => 
    userSelections.features.includes(feature.id)
  );
  
  let quoteMessage = `Base (${userSelections.industry} App): ${formatPrice(BASE_PRICE)}\n`;
  
  selectedFeatures.forEach(feature => {
    quoteMessage += `${feature.name}: ${formatPrice(feature.price)}\n`;
  });
  
  quoteMessage += `\nTotal: ${formatPrice(total)}\n`;
  quoteMessage += `Timeline: 3-6 months\n\n`;
  quoteMessage += `Payment Options:\n`;
  quoteMessage += `- Split: 60% now (${formatPrice(splitAmount)}), 40% on completion (${formatPrice(total - splitAmount)})\n`;
  quoteMessage += `- Full: ${formatPrice(fullAmount)} upfront (save ${formatPrice(total - fullAmount)} with 5% off)\n\n`;
  quoteMessage += `Ready to proceed? Let me know!`;
  
  return quoteMessage;
};
