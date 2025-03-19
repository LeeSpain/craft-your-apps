
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
  
  const handleContactClick = () => {
    // Open the chatbot when "Request Quote" is clicked
    openChatbot();
  };
  
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
            <Button 
              onClick={handleContactClick}
              size="lg" 
              className="mt-6 bg-white text-blue-600 hover:bg-gray-100"
            >
              Open AI Quote Builder
            </Button>
          </div>
        </section>
        
        {/* Payment Plans Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Payment Options</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer flexible payment plans for small businesses and individual entrepreneurs.
                All projects start with a 30% non-refundable deposit.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Monthly Payment Plan */}
              <Card className={`border-2 ${paymentType === 'monthly' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                  <CardDescription>Split payments over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>30% non-refundable deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Remaining balance split into monthly installments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>6-12 month payment terms available</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automated recurring payments</span>
                    </li>
                  </ul>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">Example (€12,000 app):</p>
                    <p className="text-sm">€3,600 deposit</p>
                    <p className="text-sm">€700/month for 12 months</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'monthly' ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => setPaymentType('monthly')}
                  >
                    Select This Plan
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Milestone-Based Plan */}
              <Card className={`border-2 ${paymentType === 'milestone' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Stage-Based Plan</CardTitle>
                  <CardDescription>Pay as your project progresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>30% non-refundable deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Remaining balance split into milestone payments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Payments tied to project deliverables</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Clear milestone definitions in contract</span>
                    </li>
                  </ul>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">Example (€15,000 app):</p>
                    <p className="text-sm">€4,500 deposit</p>
                    <p className="text-sm">€3,500 at design approval</p>
                    <p className="text-sm">€4,000 at development completion</p>
                    <p className="text-sm">€3,000 at testing & launch</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'milestone' ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => setPaymentType('milestone')}
                  >
                    Select This Plan
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Hybrid Plan */}
              <Card className={`border-2 ${paymentType === 'hybrid' ? 'border-blue-500' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Hybrid Plan</CardTitle>
                  <CardDescription>Best of both worlds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>30% non-refundable deposit to start</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Combination of monthly & milestone payments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Customizable to your cash flow needs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Balanced risk for both parties</span>
                    </li>
                  </ul>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">Example (€18,000 app):</p>
                    <p className="text-sm">€5,400 deposit</p>
                    <p className="text-sm">€1,000/month for 6 months</p>
                    <p className="text-sm">€2,000 at design approval</p>
                    <p className="text-sm">€2,600 at launch</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={paymentType === 'hybrid' ? 'default' : 'outline'} 
                    className="w-full"
                    onClick={() => setPaymentType('hybrid')}
                  >
                    Select This Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Why a 30% Non-Refundable Deposit?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Covers initial discovery, planning, and design costs</li>
                    <li>• Demonstrates client commitment to the project</li>
                    <li>• Reduces risk of project abandonment mid-development</li>
                    <li>• Standard industry practice for custom development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industry Packages Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Standardized Industry Packages</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our pre-defined packages for different industries. Each can be customized with add-ons.
              </p>
            </div>
            
            <Tabs defaultValue={industryPackages[0].name.toLowerCase().replace(/\s+/g, '-')}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                {industryPackages.slice(0, 6).map((pkg) => (
                  <TabsTrigger 
                    key={pkg.name} 
                    value={pkg.name.toLowerCase().replace(/\s+/g, '-')}
                    className="text-xs md:text-sm"
                  >
                    {pkg.name.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {industryPackages.map((pkg) => (
                <TabsContent key={pkg.name} value={pkg.name.toLowerCase().replace(/\s+/g, '-')}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>Base Price: {formatPrice(pkg.basePrice)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">What's Included:</h4>
                        <p className="text-gray-700">{pkg.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Available Add-Ons:</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {pkg.addOns.map((addon) => (
                            <div key={addon.name} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium">{addon.name}</h5>
                                <span className="font-medium text-blue-600">{formatPrice(addon.price)}</span>
                              </div>
                              <p className="text-sm text-gray-600">{addon.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Example Full Package:</h4>
                        <p>Base Package + Top Add-Ons: {formatPrice(pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price)}</p>
                        <div className="mt-2">
                          <p className="text-sm"><strong>With {paymentType === 'monthly' ? 'Monthly' : paymentType === 'milestone' ? 'Stage-Based' : 'Hybrid'} Payment Plan:</strong></p>
                          <p className="text-sm">• Deposit (30%): {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.3)}</p>
                          {paymentType === 'monthly' && (
                            <p className="text-sm">• 12 monthly payments: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.7 / 12)} each</p>
                          )}
                          {paymentType === 'milestone' && (
                            <>
                              <p className="text-sm">• Design Approval: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.25)}</p>
                              <p className="text-sm">• Development Completion: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.25)}</p>
                              <p className="text-sm">• Testing & Launch: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.2)}</p>
                            </>
                          )}
                          {paymentType === 'hybrid' && (
                            <>
                              <p className="text-sm">• 6 monthly payments: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.35 / 6)} each</p>
                              <p className="text-sm">• Design Milestone: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.15)}</p>
                              <p className="text-sm">• Launch Milestone: {formatPrice((pkg.basePrice + pkg.addOns[0].price + pkg.addOns[1].price) * 0.2)}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button onClick={handleContactClick}>Request Quote</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Custom Quote Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Don't see your industry listed, or need a highly specialized app? 
              Our AI assistant will help create a tailored solution that meets your exact needs.
            </p>
            <Button size="lg" onClick={handleContactClick}>
              Get AI-Powered Quote
            </Button>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Common questions about our pricing and payment options.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Is the 30% deposit really non-refundable?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Yes, the 30% deposit is non-refundable as it covers the initial discovery, planning, and design phases which require significant resources. This policy ensures commitment from clients and protects our team's time investment.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Can I switch payment plans mid-project?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>In some cases, we can adjust payment plans if your financial situation changes. This requires discussion with our team and may involve contract amendments. We aim to be flexible while ensuring project continuity.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Do you offer discounts for full upfront payment?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Yes! Clients who pay the full project cost upfront receive a 5% discount on the total price. This is our way of rewarding clients who are able to make the full investment at the start.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We accept bank transfers, credit cards, and PayPal. For recurring payments in monthly plans, we use secure payment processors like Stripe to automate the process and provide you with proper invoices.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Include the Chatbot component directly in the page */}
      <Chatbot />
    </div>
  );
};

export default Pricing;
