
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
          
          {/* FAQ Section - Enhanced and moved up */}
          <section className="py-6 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Common questions about our pricing, development process, and payment options.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium">
                    Is the 30% deposit really non-refundable?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Yes, the 30% deposit is non-refundable as it covers the initial discovery, planning, and design phases 
                      which require significant resources. This deposit demonstrates client commitment and allows us to allocate 
                      the necessary team members to your project right from the start.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium">
                    Do you offer discounts for full upfront payment?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Yes! Clients who pay the full project cost upfront receive a 5% discount on the total price. 
                      This option is popular with businesses that have allocated budget and want to maximize their investment.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium">
                    How long does app development typically take?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Development timelines vary based on project complexity:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Small Business apps: 2-4 months</li>
                      <li>Medium Business apps: 4-6 months</li>
                      <li>Enterprise solutions: 6+ months</li>
                    </ul>
                    <p className="mt-2 text-gray-700">
                      We'll provide a detailed timeline during the project planning phase so you know exactly what to expect.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium">
                    What happens if I need changes after the app is launched?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      We offer a 30-day warranty period after launch to address any bugs or issues. 
                      For feature additions or significant changes after launch, we provide flexible maintenance packages 
                      starting at £500/month, or you can engage us on a project basis for specific enhancements.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium">
                    Do you provide ongoing support and maintenance?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Yes, we offer various support and maintenance packages:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Basic: Security updates and critical fixes (£500/month)</li>
                      <li>Standard: Basic + priority support and minor enhancements (£1,000/month)</li>
                      <li>Premium: Standard + dedicated support team and regular feature updates (£2,500/month)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-medium">
                    Can I make changes to my payment plan after the project starts?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      While we prefer to maintain the initially agreed payment structure, we understand that business circumstances can change. 
                      We're open to discussing modifications to payment terms if needed, but any changes must be agreed in writing
                      and may affect the project timeline.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-medium">
                    Who owns the code and intellectual property?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Once the project is fully paid for, you own 100% of the custom code and intellectual property we develop for you. 
                      This includes all designs, source code, and documentation. We may use general concepts and non-proprietary 
                      components in other projects, but your specific business logic and unique features remain exclusively yours.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
          
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
          
          {/* Industry Packages Section - Moved to bottom and modified to not show prices */}
          <div className="mb-12 bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900">Tailored Solutions by Industry</h2>
            <p className="text-gray-700 mb-8 max-w-3xl">
              Our app solutions are tailored to the specific needs of your industry.
              Complete our quote form to get detailed pricing for these packages.
            </p>
            
            <Tabs defaultValue="hairdressers" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-white/50 backdrop-blur-sm p-1 w-full mx-auto max-w-2xl">
                <TabsTrigger 
                  value="hairdressers" 
                  className="text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Hairdressers
                </TabsTrigger>
                <TabsTrigger 
                  value="petcare" 
                  className="text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Pet Care
                </TabsTrigger>
                <TabsTrigger 
                  value="realestate" 
                  className="text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Real Estate
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="hairdressers">
                <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="pb-2 border-b border-gray-100">
                    <CardTitle className="text-blue-600">Hairdressers & Barbershops</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Complete the quote form for custom pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">What's Included:</h4>
                      <p className="text-gray-700 bg-white/60 p-3 rounded-lg">
                        Online booking, customer profiles, automated reminders, payment integration, and basic analytics.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Popular Add-Ons:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">Loyalty Program</h5>
                          <p className="text-xs text-gray-600 mt-1">Points system for discounts or free services</p>
                        </div>
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">Virtual Try-On</h5>
                          <p className="text-xs text-gray-600 mt-1">AR feature to test hairstyles using client photos</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm font-medium text-gray-800">Want to see detailed pricing?</p>
                      <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700" onClick={() => document.querySelector('.QuoteForm')?.scrollIntoView({ behavior: 'smooth' })}>
                        Get Personalized Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="petcare">
                <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader className="pb-2 border-b border-gray-100">
                    <CardTitle className="text-purple-600">Pet Care Services</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Complete the quote form for custom pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">What's Included:</h4>
                      <p className="text-gray-700 bg-white/60 p-3 rounded-lg">
                        Booking system, pet profiles, client portal, service catalog, staff scheduling, payment processing, basic reports.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Popular Add-Ons:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">GPS Tracking</h5>
                          <p className="text-xs text-gray-600 mt-1">Real-time location updates during walks</p>
                        </div>
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">Photo Updates</h5>
                          <p className="text-xs text-gray-600 mt-1">Send pet photos/videos to owners</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm font-medium text-gray-800">Want to see detailed pricing?</p>
                      <Button className="mt-2 w-full bg-purple-600 hover:bg-purple-700" onClick={() => document.querySelector('.QuoteForm')?.scrollIntoView({ behavior: 'smooth' })}>
                        Get Personalized Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="realestate">
                <Card className="overflow-hidden shadow-md border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="pb-2 border-b border-gray-100">
                    <CardTitle className="text-emerald-600">Real Estate Agents</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Complete the quote form for custom pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">What's Included:</h4>
                      <p className="text-gray-700 bg-white/60 p-3 rounded-lg">
                        Property listings, virtual tours, client inquiry form, appointment scheduler, property comparisons, document storage, basic analytics.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Popular Add-Ons:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">Mortgage Calculator</h5>
                          <p className="text-xs text-gray-600 mt-1">Help clients estimate payments based on different down payments and terms</p>
                        </div>
                        <div className="bg-white/75 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h5 className="font-medium text-sm">Neighborhood Analysis</h5>
                          <p className="text-xs text-gray-600 mt-1">Provide data on schools, crime rates, and amenities in the listing area</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm font-medium text-gray-800">Want to see detailed pricing?</p>
                      <Button className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => document.querySelector('.QuoteForm')?.scrollIntoView({ behavior: 'smooth' })}>
                        Get Personalized Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
