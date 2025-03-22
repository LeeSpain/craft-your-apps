
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { Info, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PricingTiers from '@/components/business/PricingTiers';
import BusinessHeader from '@/components/business/BusinessHeader';

const Pricing = () => {
  const { formatPrice } = useApp();
  const { toast } = useToast();
  const location = useLocation();
  const [paymentType, setPaymentType] = useState<'monthly' | 'milestone' | 'hybrid'>('monthly');
  
  // Get the selected tier from location state if available
  useEffect(() => {
    if (location.state && location.state.selectedTier) {
      // You could use this to preselect certain options in the QuoteForm
      toast({
        title: `${location.state.selectedTier} Selected`,
        description: "We've pre-selected this tier for your quote.",
      });
    }
  }, [location.state, toast]);
  
  // Standard industry packages based on the provided information
  const industryPackages = [
    {
      name: "Hairdressers & Barbershops",
      basePrice: 7500,
      description: "Online booking, customer profiles, automated reminders, payment integration, and basic analytics.",
      addOns: [
        { name: "Loyalty Program", price: 3500, description: "Points system for discounts or free services" },
        { name: "Virtual Try-On", price: 9000, description: "AR feature to test hairstyles using client photos" },
        { name: "Staff Management", price: 4500, description: "Assign bookings, track schedules & performance" }
      ],
      bgColor: "from-blue-50 to-indigo-50",
      accentColor: "blue-600"
    },
    {
      name: "Pet Care Services",
      basePrice: 9000,
      description: "Booking system, pet profiles, client portal, and secure payment processing.",
      addOns: [
        { name: "GPS Tracking", price: 6000, description: "Real-time location updates during walks" },
        { name: "Photo Updates", price: 2500, description: "Send pet photos/videos to owners" },
        { name: "AI Chatbot", price: 7000, description: "Answer FAQs automatically" }
      ],
      bgColor: "from-purple-50 to-pink-50",
      accentColor: "purple-600"
    },
    {
      name: "Real Estate Agents",
      basePrice: 37500,
      description: "Property listings, client inquiry form, virtual tours, and appointment scheduler.",
      addOns: [
        { name: "AI Recommendations", price: 9000, description: "Suggest properties based on client behavior" },
        { name: "Mortgage Calculator", price: 4500, description: "Estimate payments based on income/credit" },
        { name: "Document Hub", price: 6000, description: "Secure uploads for contracts or ID verification" }
      ],
      bgColor: "from-green-50 to-emerald-50",
      accentColor: "emerald-600"
    },
    {
      name: "Cafés & Small Restaurants",
      basePrice: 6500,
      description: "Digital menu, order ahead, table reservations, and payment gateway.",
      addOns: [
        { name: "Loyalty Program", price: 3500, description: "Buy 10 coffees, get 1 free rewards" },
        { name: "Delivery Integration", price: 6000, description: "Partner with Glovo/Just Eat for delivery" },
        { name: "QR Code Ordering", price: 2500, description: "Scan-to-order at tables" }
      ],
      bgColor: "from-orange-50 to-amber-50",
      accentColor: "amber-600"
    },
    {
      name: "Fitness Trainers & Small Gyms",
      basePrice: 8000,
      description: "Class booking, client progress tracking, payment integration, and basic video library.",
      addOns: [
        { name: "Live Streaming", price: 6000, description: "Broadcast classes in real-time" },
        { name: "AI Workout Plans", price: 7000, description: "Generate personalized routines" },
        { name: "Community Feed", price: 3500, description: "Clients share progress and interact" }
      ],
      bgColor: "from-red-50 to-orange-50",
      accentColor: "red-600"
    },
    {
      name: "Event Planners",
      basePrice: 10000,
      description: "Task checklists, RSVP management, budget tracker, and client portal.",
      addOns: [
        { name: "Seating Planner", price: 7000, description: "Drag-and-drop table arrangements" },
        { name: "Vendor Marketplace", price: 9000, description: "Connect with local photographers, caterers, etc." },
        { name: "Wedding Website", price: 4500, description: "Custom domain for the event" }
      ],
      bgColor: "from-sky-50 to-blue-50",
      accentColor: "sky-600"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Choose the perfect plan for your business needs or get a custom quote based on your specific requirements.
            </p>
          </div>
        </section>
        
        {/* Main content area */}
        <div className="container mx-auto px-4 py-12">
          {/* Pricing Tiers - Now at the top */}
          <div className="mb-16">
            <BusinessHeader 
              title="App Solutions for Every Size Business"
              subtitle="From startups to enterprises, we offer packages tailored to your specific needs and growth stage."
            />
            <PricingTiers />
          </div>
          
          {/* Quote Builder */}
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Need Something Custom?</h2>
            <p className="text-gray-600 mb-6 text-center">
              Complete this simple form to get an instant, personalized quote for your app.
            </p>
            
            <QuoteForm />
          </div>
          
          {/* Payment Plans Section */}
          <div className="mb-16 bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">Payment Options</h2>
            <p className="text-gray-700 mb-8 max-w-3xl">
              We offer flexible payment plans for small businesses and individual entrepreneurs.
              All projects start with a 30% non-refundable deposit.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Monthly Payment Plan */}
              <Card className={`border-2 ${paymentType === 'monthly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">Monthly Plan</CardTitle>
                  <CardDescription>Split payments over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">30% deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Monthly installments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">6-12 month terms</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'monthly' ? 'default' : 'outline'} 
                    className="w-full"
                    size="sm"
                    onClick={() => setPaymentType('monthly')}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Milestone-Based Plan */}
              <Card className={`border-2 ${paymentType === 'milestone' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">Stage-Based</CardTitle>
                  <CardDescription>Pay as you progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">30% deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Milestone payments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Tied to deliverables</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'milestone' ? 'default' : 'outline'} 
                    className="w-full"
                    size="sm"
                    onClick={() => setPaymentType('milestone')}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Hybrid Plan */}
              <Card className={`border-2 ${paymentType === 'hybrid' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">Hybrid Plan</CardTitle>
                  <CardDescription>Best of both worlds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">30% deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Monthly + milestone</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Customizable</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'hybrid' ? 'default' : 'outline'} 
                    className="w-full"
                    size="sm"
                    onClick={() => setPaymentType('hybrid')}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow border border-blue-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base mb-1 text-blue-800">About the 30% Non-Refundable Deposit</h3>
                  <p className="text-sm text-slate-700">
                    This covers initial discovery, planning, and design costs, demonstrates client commitment, 
                    and reduces the risk of project abandonment mid-development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Industry Packages Section */}
          <div className="mb-12 bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">Popular Industry Solutions</h2>
            <p className="text-gray-700 mb-8 max-w-3xl">
              Browse our most popular industry packages that can be customized to your needs.
            </p>
            
            <Tabs defaultValue={industryPackages[0].name.toLowerCase().replace(/\s+/g, '-')} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-white/50 backdrop-blur-sm p-1 w-full mx-auto max-w-2xl">
                {industryPackages.slice(0, 3).map((pkg) => (
                  <TabsTrigger 
                    key={pkg.name} 
                    value={pkg.name.toLowerCase().replace(/\s+/g, '-')}
                    className="text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                  >
                    {pkg.name.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {industryPackages.slice(0, 3).map((pkg) => (
                <TabsContent key={pkg.name} value={pkg.name.toLowerCase().replace(/\s+/g, '-')}>
                  <Card className={`overflow-hidden shadow-md border-0 bg-gradient-to-br ${pkg.bgColor}`}>
                    <CardHeader className="pb-2 border-b border-gray-100">
                      <CardTitle className={`text-${pkg.accentColor}`}>{pkg.name}</CardTitle>
                      <CardDescription className="text-gray-700 font-medium">
                        Base Price: {formatPrice(pkg.basePrice)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h4 className="font-medium mb-2 text-gray-800">What's Included:</h4>
                        <p className="text-gray-700 bg-white/60 p-3 rounded-lg">{pkg.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-gray-800">Top Add-Ons:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {pkg.addOns.slice(0, 2).map((addon) => (
                            <div key={addon.name} className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start">
                                <h5 className="font-medium text-sm">{addon.name}</h5>
                                <span className={`font-medium text-${pkg.accentColor} text-sm`}>{formatPrice(addon.price)}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-800">Example with {paymentType === 'monthly' ? 'Monthly' : paymentType === 'milestone' ? 'Stage-Based' : 'Hybrid'} Payment:</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm flex justify-between">
                            <span>Deposit:</span> 
                            <span className="font-medium">{formatPrice(pkg.basePrice * 0.3)}</span>
                          </p>
                          {paymentType === 'monthly' && (
                            <p className="text-sm flex justify-between">
                              <span>12 payments:</span> 
                              <span className="font-medium">{formatPrice(pkg.basePrice * 0.7 / 12)}/month</span>
                            </p>
                          )}
                          {paymentType === 'milestone' && (
                            <p className="text-sm flex justify-between">
                              <span>3 milestone payments:</span> 
                              <span className="font-medium">{formatPrice(pkg.basePrice * 0.7 / 3)} each</span>
                            </p>
                          )}
                          {paymentType === 'hybrid' && (
                            <p className="text-sm flex justify-between">
                              <span>6 payments + 2 milestones:</span> 
                              <span className="font-medium">{formatPrice(pkg.basePrice * 0.35 / 6)}/month</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* FAQ Section */}
          <section className="py-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Common questions about our pricing and payment options.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Is the 30% deposit really non-refundable?</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm">Yes, the 30% deposit is non-refundable as it covers the initial discovery, planning, and design phases which require significant resources.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Do you offer discounts for full upfront payment?</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm">Yes! Clients who pay the full project cost upfront receive a 5% discount on the total price.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
