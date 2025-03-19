import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Check, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const { formatPrice, openChatbot } = useApp();
  const { toast } = useToast();
  const [paymentType, setPaymentType] = useState<'monthly' | 'milestone' | 'hybrid'>('monthly');
  
  // Automatically open the chatbot when the pricing page loads
  useEffect(() => {
    openChatbot();
  }, [openChatbot]);
  
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
      ]
    },
    {
      name: "Pet Care Services",
      basePrice: 9000,
      description: "Booking system, pet profiles, client portal, and secure payment processing.",
      addOns: [
        { name: "GPS Tracking", price: 6000, description: "Real-time location updates during walks" },
        { name: "Photo Updates", price: 2500, description: "Send pet photos/videos to owners" },
        { name: "AI Chatbot", price: 7000, description: "Answer FAQs automatically" }
      ]
    },
    {
      name: "Real Estate Agents",
      basePrice: 37500,
      description: "Property listings, client inquiry form, virtual tours, and appointment scheduler.",
      addOns: [
        { name: "AI Recommendations", price: 9000, description: "Suggest properties based on client behavior" },
        { name: "Mortgage Calculator", price: 4500, description: "Estimate payments based on income/credit" },
        { name: "Document Hub", price: 6000, description: "Secure uploads for contracts or ID verification" }
      ]
    },
    {
      name: "Cafés & Small Restaurants",
      basePrice: 6500,
      description: "Digital menu, order ahead, table reservations, and payment gateway.",
      addOns: [
        { name: "Loyalty Program", price: 3500, description: "Buy 10 coffees, get 1 free rewards" },
        { name: "Delivery Integration", price: 6000, description: "Partner with Glovo/Just Eat for delivery" },
        { name: "QR Code Ordering", price: 2500, description: "Scan-to-order at tables" }
      ]
    },
    {
      name: "Fitness Trainers & Small Gyms",
      basePrice: 8000,
      description: "Class booking, client progress tracking, payment integration, and basic video library.",
      addOns: [
        { name: "Live Streaming", price: 6000, description: "Broadcast classes in real-time" },
        { name: "AI Workout Plans", price: 7000, description: "Generate personalized routines" },
        { name: "Community Feed", price: 3500, description: "Clients share progress and interact" }
      ]
    },
    {
      name: "Event Planners",
      basePrice: 10000,
      description: "Task checklists, RSVP management, budget tracker, and client portal.",
      addOns: [
        { name: "Seating Planner", price: 7000, description: "Drag-and-drop table arrangements" },
        { name: "Vendor Marketplace", price: 9000, description: "Connect with local photographers, caterers, etc." },
        { name: "Wedding Website", price: 4500, description: "Custom domain for the event" }
      ]
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Get Your Personalized Quote</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Use our AI assistant to get a custom quote based on your specific needs,
              or browse our standard industry packages below.
            </p>
          </div>
        </section>
        
        {/* Main content area with side-by-side layout */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chatbot takes 1/3 of the width on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px] border">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                  <h2 className="font-semibold text-lg">AI Quote Builder</h2>
                  <p className="text-sm text-blue-100">Get a personalized quote for your app</p>
                </div>
                <div className="h-[530px]">
                  <Chatbot />
                </div>
              </div>
            </div>
            
            {/* Payment Plans Section - takes 2/3 of the width */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
                <p className="text-gray-600 mb-6">
                  We offer flexible payment plans for small businesses and individual entrepreneurs.
                  All projects start with a 30% non-refundable deposit.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Monthly Payment Plan */}
                  <Card className={`border-2 ${paymentType === 'monthly' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-xl">Monthly Plan</CardTitle>
                      <CardDescription>Split payments over time</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">30% deposit to start</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Monthly installments</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
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
                  <Card className={`border-2 ${paymentType === 'milestone' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-xl">Stage-Based</CardTitle>
                      <CardDescription>Pay as you progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">30% deposit to start</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Milestone payments</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
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
                  <Card className={`border-2 ${paymentType === 'hybrid' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-xl">Hybrid Plan</CardTitle>
                      <CardDescription>Best of both worlds</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">30% deposit to start</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Monthly + milestone</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
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
                
                <div className="mt-6 bg-white p-4 rounded-lg shadow border">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-base mb-1">About the 30% Non-Refundable Deposit</h3>
                      <p className="text-sm text-gray-700">
                        This covers initial discovery, planning, and design costs, demonstrates client commitment, 
                        and reduces the risk of project abandonment mid-development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Industry Packages Section - simplified version */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Popular Industry Solutions</h2>
                <p className="text-gray-600 mb-6">
                  Browse our most popular industry packages that can be customized to your needs.
                </p>
                
                <Tabs defaultValue={industryPackages[0].name.toLowerCase().replace(/\s+/g, '-')}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    {industryPackages.slice(0, 3).map((pkg) => (
                      <TabsTrigger 
                        key={pkg.name} 
                        value={pkg.name.toLowerCase().replace(/\s+/g, '-')}
                      >
                        {pkg.name.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {industryPackages.slice(0, 3).map((pkg) => (
                    <TabsContent key={pkg.name} value={pkg.name.toLowerCase().replace(/\s+/g, '-')}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{pkg.name}</CardTitle>
                          <CardDescription>Base Price: {formatPrice(pkg.basePrice)}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">What's Included:</h4>
                            <p className="text-gray-700">{pkg.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Top Add-Ons:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {pkg.addOns.slice(0, 2).map((addon) => (
                                <div key={addon.name} className="border rounded-lg p-3">
                                  <div className="flex justify-between items-start">
                                    <h5 className="font-medium text-sm">{addon.name}</h5>
                                    <span className="font-medium text-blue-600 text-sm">{formatPrice(addon.price)}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">{addon.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium">Example with {paymentType === 'monthly' ? 'Monthly' : paymentType === 'milestone' ? 'Stage-Based' : 'Hybrid'} Payment:</p>
                            <p className="text-sm">Deposit: {formatPrice(pkg.basePrice * 0.3)}</p>
                            {paymentType === 'monthly' && (
                              <p className="text-sm">12 payments: {formatPrice(pkg.basePrice * 0.7 / 12)}/month</p>
                            )}
                            {paymentType === 'milestone' && (
                              <p className="text-sm">3 milestone payments of {formatPrice(pkg.basePrice * 0.7 / 3)} each</p>
                            )}
                            {paymentType === 'hybrid' && (
                              <p className="text-sm">6 payments of {formatPrice(pkg.basePrice * 0.35 / 6)}/month + 2 milestones</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section - simplified */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
