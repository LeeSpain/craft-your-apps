
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Brain, Lightbulb, LineChart, MessageSquare, Search } from 'lucide-react';
import { Motion } from '@/components/ui/motion';

const AISection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="inline-block px-6 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            AI-POWERED SOLUTIONS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
            Transform Your Business with Artificial Intelligence
          </h3>
          <p className="text-xl text-gray-700">
            Harness the power of AI to automate tasks, gain insights, and create exceptional customer experiences. Stay ahead of the competition with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Intelligent Automation</h4>
              <p className="text-gray-600">
                Automate repetitive tasks and workflows with AI that learns and improves over time, freeing your team to focus on high-value activities.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduce manual processes by up to 70%</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Minimize human error and improve accuracy</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
                <LineChart className="w-7 h-7 text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Predictive Analytics</h4>
              <p className="text-gray-600">
                Leverage AI to analyze data patterns, forecast trends, and make data-driven decisions that optimize your business operations and strategy.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Increase revenue with targeted predictions</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify opportunities before competitors</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
                <MessageSquare className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Conversational AI</h4>
              <p className="text-gray-600">
                Enhance customer service with intelligent chatbots and virtual assistants that understand natural language and provide personalized responses.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>24/7 customer support without human staffing</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Seamless handoff to human agents when needed</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-full opacity-70"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1677442340966-8a68710d99bc?q=80&w=1200&auto=format&fit=crop"
                alt="AI Dashboard" 
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Why AI Is the Future of Business</h3>
            <p className="text-gray-700 mb-6">
              Businesses that adopt AI now are positioning themselves to lead their industries in the coming years. AI is not just a trend—it's a fundamental shift in how businesses operate and compete.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold">Enhanced Decision Making</h4>
                  <p className="text-gray-600">AI processes vast amounts of data to provide insights humans might miss, leading to better business decisions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Search className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold">Competitive Advantage</h4>
                  <p className="text-gray-600">Early adopters of AI technologies gain significant advantages over competitors who lag behind.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold">Scalable Growth</h4>
                  <p className="text-gray-600">AI systems scale efficiently, allowing businesses to grow without proportional increases in operational costs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Integrate AI Into Your Business?</h3>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Our team of AI specialists can help you identify the right AI solutions for your specific business needs and implement them seamlessly.
          </p>
          <div className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-medium rounded-lg hover:bg-white hover:text-purple-600 transition-colors">
            Let's Discuss Your AI Strategy
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
