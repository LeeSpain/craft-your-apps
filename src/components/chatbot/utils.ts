
import { CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { UserSelections } from './types';

// Calculate total price based on user selections
export const calculateTotalPrice = (userSelections: UserSelections): number => {
  let total = BASE_PRICE;
  
  // Add selected features
  userSelections.features.forEach(featureId => {
    const feature = CUSTOM_FEATURES.find(f => f.id === featureId);
    if (feature) {
      total += feature.price;
    }
  });
  
  // Add additional costs for customizations
  if (userSelections.customizations.userAccounts) {
    total += 3000; // Additional cost for user account system
  }
  
  // Each integration adds additional cost
  total += userSelections.customizations.integrations.length * 1500;
  
  return total;
};

// Generate quote message text
export const generateQuoteText = (userSelections: UserSelections, formatPrice: (price: number) => string): string => {
  const total = calculateTotalPrice(userSelections);
  const splitAmount = Math.round(total * 0.6);
  const fullAmount = Math.round(total * 0.95);
  const discount = Math.round(total * 0.05);
  
  // Get selected features details
  const selectedFeatures = CUSTOM_FEATURES.filter(feature => 
    userSelections.features.includes(feature.id)
  );
  
  let quoteMessage = `## Your Custom App Quote\n\n`;
  quoteMessage += `**Industry:** ${userSelections.industry}\n`;
  
  if (userSelections.goals.length > 0) {
    quoteMessage += `**Main Goals:** ${userSelections.goals.join(', ')}\n\n`;
  }
  
  quoteMessage += `### Price Breakdown\n\n`;
  quoteMessage += `- **Base App Development:** ${formatPrice(BASE_PRICE)}\n`;
  
  if (selectedFeatures.length > 0) {
    quoteMessage += `\n**Selected Features:**\n`;
    selectedFeatures.forEach(feature => {
      quoteMessage += `- **${feature.name}:** ${formatPrice(feature.price)}\n  _${feature.description}_\n`;
    });
  }
  
  quoteMessage += `\n**Customizations:**\n`;
  if (userSelections.customizations.userAccounts) {
    quoteMessage += `- **User Account System:** ${formatPrice(3000)}\n`;
  }
  
  if (userSelections.customizations.integrations.length > 0) {
    const integrationCost = userSelections.customizations.integrations.length * 1500;
    quoteMessage += `- **Integrations:** ${formatPrice(integrationCost)}\n  _${userSelections.customizations.integrations.join(', ')}_\n`;
  }
  
  quoteMessage += `\n**Design Style:** ${userSelections.customizations.designStyle}\n\n`;
  
  quoteMessage += `### Total Investment: ${formatPrice(total)}\n\n`;
  quoteMessage += `**Estimated Timeline:** 3-6 months\n\n`;
  quoteMessage += `### Payment Options\n\n`;
  quoteMessage += `1. **Split Payment:** ${formatPrice(splitAmount)} now, ${formatPrice(total - splitAmount)} on completion\n`;
  quoteMessage += `2. **Full Payment:** ${formatPrice(fullAmount)} upfront (save ${formatPrice(discount)} with 5% discount)\n\n`;
  
  quoteMessage += `Ready to proceed? Let me know which payment option you prefer!`;
  
  return quoteMessage;
};
