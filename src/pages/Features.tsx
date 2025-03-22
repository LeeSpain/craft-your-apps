
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { Wand2, Code, LayoutGrid, Shield, BarChart, Sparkles } from 'lucide-react';

const Features = () => {
  const { openChatbot } = useApp();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
              Powerful Features for Modern Applications
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              Discover the comprehensive set of tools and capabilities that power our custom application development services.
            </p>
          </div>
        </section>

        {/* Features Tabs */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex mb-8">
                <TabsTrigger 
                  value="design"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger 
                  value="development"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  Development
                </TabsTrigger>
                <TabsTrigger 
                  value="security"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="design" className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center p-2 bg-purple-50 rounded-lg mb-4">
                      <div className="p-2 bg-purple-100 rounded">
                        <Wand2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="ml-2 text-purple-600 font-medium">User-Centric Design</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Beautiful, intuitive interfaces</h3>
                    <p className="text-gray-700 mb-6">
                      We create custom user interfaces that are beautiful, intuitive, and optimized for the target audience. 
                      Our designs are responsive, accessible, and aligned with your brand identity.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Responsive design for all devices",
                        "Accessibility compliance (WCAG standards)",
                        "User flow optimization",
                        "Interactive prototyping",
                        "Design system creation"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-purple-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1200" 
                      alt="UI Design" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                </div>

                <Separator className="my-12" />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200" 
                      alt="UX Research" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="inline-flex items-center p-2 bg-blue-50 rounded-lg mb-4">
                      <div className="p-2 bg-blue-100 rounded">
                        <LayoutGrid className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="ml-2 text-blue-600 font-medium">UX Research</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Evidence-based design decisions</h3>
                    <p className="text-gray-700 mb-6">
                      Our design process begins with thorough research to understand your users, their needs, behaviors, and pain points. 
                      This evidence-based approach ensures we create solutions that truly resonate with users.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "User interviews and surveys",
                        "Competitive analysis",
                        "Usability testing",
                        "Heatmaps and user flow analytics",
                        "Iterative design improvements"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="development" className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center p-2 bg-indigo-50 rounded-lg mb-4">
                      <div className="p-2 bg-indigo-100 rounded">
                        <Code className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="ml-2 text-indigo-600 font-medium">Modern Tech Stack</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Cutting-edge technologies</h3>
                    <p className="text-gray-700 mb-6">
                      We leverage the latest frameworks, languages, and tools to build fast, scalable, and maintainable applications 
                      that meet modern standards and can evolve with your business.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "React, Vue, Angular for frontend development",
                        "Node.js, Django, Laravel for backend systems",
                        "Native mobile development (iOS & Android)",
                        "Cloud-based infrastructure (AWS, Azure, GCP)",
                        "Containerization and microservices architecture"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-indigo-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                      alt="Modern Tech Stack" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                </div>
                
                <Separator className="my-12" />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                      alt="Analytics Dashboard" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="inline-flex items-center p-2 bg-green-50 rounded-lg mb-4">
                      <div className="p-2 bg-green-100 rounded">
                        <BarChart className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="ml-2 text-green-600 font-medium">Advanced Analytics</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Data-driven insights</h3>
                    <p className="text-gray-700 mb-6">
                      Our applications include powerful analytics capabilities that help you understand user behavior, 
                      track performance metrics, and make informed business decisions.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Custom dashboards with real-time data",
                        "User behavior tracking and analysis",
                        "Performance monitoring and optimization",
                        "Business intelligence reporting",
                        "A/B testing capabilities"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-green-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center p-2 bg-red-50 rounded-lg mb-4">
                      <div className="p-2 bg-red-100 rounded">
                        <Shield className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="ml-2 text-red-600 font-medium">Enterprise Security</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Robust protection for your data</h3>
                    <p className="text-gray-700 mb-6">
                      Security is built into every layer of our applications. We implement industry best practices for 
                      data protection, authentication, and compliance with relevant regulations.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "End-to-end encryption for sensitive data",
                        "Multi-factor authentication",
                        "Role-based access control",
                        "Regular security audits and penetration testing",
                        "Compliance with GDPR, HIPAA, SOC 2, etc."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-red-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1200" 
                      alt="Security" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                </div>
                
                <Separator className="my-12" />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                      alt="AI Features" 
                      className="w-full h-auto rounded-xl shadow-lg" 
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="inline-flex items-center p-2 bg-amber-50 rounded-lg mb-4">
                      <div className="p-2 bg-amber-100 rounded">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="ml-2 text-amber-600 font-medium">AI Integration</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Smart applications powered by AI</h3>
                    <p className="text-gray-700 mb-6">
                      Enhance your applications with artificial intelligence capabilities that automate tasks, 
                      provide personalized experiences, and unlock new business opportunities.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Predictive analytics and forecasting",
                        "Natural language processing for chatbots",
                        "Image and speech recognition",
                        "Recommendation engines",
                        "Automated content generation"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-amber-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Features;
