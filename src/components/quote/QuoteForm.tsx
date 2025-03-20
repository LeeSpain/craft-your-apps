import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronDown, ChevronRight, Mail, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

// Define the form schema with Zod
const formSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  features: z.array(z.string()).optional(),
  customIndustry: z.string().optional(),
  paymentPlan: z.string({
    required_error: "Please select a payment plan",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});

// Feature data structure
interface Feature {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// Industry data structure
interface Industry {
  id: string;
  name: string;
  basePrice: number;
  baseFeatures: string[];
  addOns: Feature[];
}

const INDUSTRIES: Industry[] = [
  {
    id: "hairdressers",
    name: "Hairdressers & Barbershops",
    basePrice: 7500,
    baseFeatures: [
      "Online booking",
      "Customer profiles",
      "Payment integration",
      "Automated reminders",
      "Service menu",
      "Staff management",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with points redeemable for discounts or free services." },
      { id: "products", name: "Product Sales", price: 500, description: "Sell products directly through the app." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track appointments, loyalty points, and purchase history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for updates and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "petcare",
    name: "Pet Care Services",
    basePrice: 9000,
    baseFeatures: [
      "Booking system",
      "Pet profiles",
      "Client portal",
      "Service catalog",
      "Staff scheduling",
      "Payment processing",
      "Basic reports"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with points redeemable for discounts or free services." },
      { id: "products", name: "Product Sales", price: 500, description: "Sell pet food and supplies directly through the app." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Pet owners can track appointments, vaccination records, and purchase history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for updates and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "realestate",
    name: "Real Estate Agents",
    basePrice: 37500,
    baseFeatures: [
      "Property listings",
      "Virtual tours",
      "Client inquiry form",
      "Appointment scheduler",
      "Property comparisons",
      "Document storage",
      "Basic analytics"
    ],
    addOns: [
      { id: "mortgage", name: "Mortgage Calculator", price: 500, description: "Help clients estimate payments based on different down payments and terms." },
      { id: "neighborhood", name: "Neighborhood Analysis", price: 1000, description: "Provide data on schools, crime rates, and amenities in the listing area." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can save favorites, track viewings, and manage documents." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for new listings and updates." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "cafe",
    name: "Cafés & Small Restaurants",
    basePrice: 6500,
    baseFeatures: [
      "Digital menu",
      "Order ahead",
      "Table reservations",
      "Payment gateway",
      "Inventory tracking",
      "Staff scheduling",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat customers with points for free items." },
      { id: "delivery", name: "Delivery Integration", price: 1000, description: "Connect with local delivery services or offer your own delivery." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Customers can track orders, favorite items, and redemption history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "Push notifications for specials and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track food costs, popular items, and revenue by time of day." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "fitness",
    name: "Fitness Trainers & Small Gyms",
    basePrice: 8000,
    baseFeatures: [
      "Class booking",
      "Client progress tracking",
      "Payment integration",
      "Basic video library",
      "Membership management",
      "Trainer scheduling",
      "Basic analytics"
    ],
    addOns: [
      { id: "workouts", name: "Workout Builder", price: 1000, description: "Create and assign custom workout plans to clients." },
      { id: "nutrition", name: "Nutrition Tracking", price: 1000, description: "Allow clients to log meals and track macros." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track progress, book classes, and view assigned workouts." },
      { id: "streaming", name: "Live Streaming", price: 1500, description: "Host virtual classes through the app." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track attendance patterns, retention rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "events",
    name: "Event Planners",
    basePrice: 10000,
    baseFeatures: [
      "Task checklists",
      "RSVP management",
      "Budget tracker",
      "Vendor management",
      "Timeline builder",
      "Client portal",
      "Basic analytics"
    ],
    addOns: [
      { id: "seating", name: "Seating Planner", price: 1000, description: "Interactive drag-and-drop seating chart creation." },
      { id: "vendors", name: "Vendor Marketplace", price: 1500, description: "Connect clients with florists, caterers, photographers, etc." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track progress, approve vendors, and manage guest lists." },
      { id: "communication", name: "Guest Communication", price: 500, description: "Send updates and collect information from attendees." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track budget allocation, attendance rates, and vendor performance." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "home",
    name: "Home Services",
    basePrice: 7500,
    baseFeatures: [
      "Service booking",
      "Customer profiles",
      "Quote generator",
      "Payment processing",
      "Job scheduling",
      "Staff management",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with discounts or free services." },
      { id: "materials", name: "Materials Inventory", price: 1000, description: "Track parts and materials used for jobs." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track appointments, view service history, and pay invoices." },
      { id: "communication", name: "Communication Tools", price: 500, description: "SMS notifications for appointment reminders and tech arrival times." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track service efficiency, customer satisfaction, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "retail",
    name: "Retail Shops",
    basePrice: 8500,
    baseFeatures: [
      "Product catalog",
      "Shopping cart",
      "Payment processing",
      "Order management",
      "Inventory tracking",
      "Customer accounts",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward customers with points for purchases." },
      { id: "wishlist", name: "Wishlist Feature", price: 500, description: "Allow customers to save items for later." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Customers can track orders, returns, and redemption history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "Push notifications for sales and new arrivals." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track purchase patterns, inventory turnover, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "other",
    name: "Other",
    basePrice: 10000,
    baseFeatures: [
      "Basic user accounts",
      "Admin dashboard",
      "Content management",
      "Basic search",
      "Notification system",
      "Payment integration",
      "Basic analytics"
    ],
    addOns: [
      { id: "custom1", name: "Custom Feature 1", price: 1000, description: "Tailored to your specific business needs." },
      { id: "custom2", name: "Custom Feature 2", price: 1000, description: "Tailored to your specific business needs." },
      { id: "dashboard", name: "User Dashboard", price: 500, description: "Personalized user experience with account management." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  }
];

// Payment plans
const PAYMENT_PLANS = [
  { id: "full", name: "Full Payment (5% discount)", description: "Pay the total upfront and get a 5% discount" },
  { id: "monthly", name: "Monthly Payments", description: "30% deposit to start, then monthly payments over 6-12 months" },
  { id: "milestone", name: "Milestone Payments", description: "30% deposit to start, then payments at key project stages" }
];

export const QuoteForm = () => {
  const { formatPrice } = useApp();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<{
    basePrice: number;
    addOns: {name: string; price: number}[];
    totalPrice: number;
    deposit: number;
    remaining: number;
    monthlyPayment?: number;
    discount?: number;
    finalPrice?: number;
  } | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
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
  const watchFeatures = form.watch("features") || [];
  const watchPaymentPlan = form.watch("paymentPlan");

  // Update selected industry when watchIndustry changes
  React.useEffect(() => {
    const industry = INDUSTRIES.find(ind => ind.id === watchIndustry);
    setSelectedIndustry(industry || null);
  }, [watchIndustry]);

  // Calculate quote based on selections
  const calculateQuote = (data: z.infer<typeof formSchema>) => {
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

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const quote = calculateQuote(data);
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
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
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === currentStep 
                          ? 'bg-blue-600 text-white' 
                          : step < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step < currentStep ? <Check className="h-4 w-4" /> : step}
                    </div>
                    <span className="text-xs mt-1 text-gray-500">
                      {step === 1 ? 'Industry' : 
                       step === 2 ? 'Features' : 
                       step === 3 ? 'Payment' : 'Contact'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Industry Selection */}
              {currentStep === 1 && (
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
              )}

              {/* Step 2: Features Selection */}
              {currentStep === 2 && selectedIndustry && (
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
                                    {/* Removed price display */}
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
              )}

              {/* Step 3: Payment Plan */}
              {currentStep === 3 && (
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
              )}

              {/* Step 4: Contact Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Step 4: Your Contact Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Smith" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your Business" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="you@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+34 123 456 789" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

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
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Your Custom Quote</h3>
              <Button 
                variant="outline" 
                onClick={() => setShowQuote(false)}
                size="sm"
              >
                Edit Quote
              </Button>
            </div>
            
            {quoteDetails && (
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
                  <h4 className="
