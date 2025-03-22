
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { Mail, Send, MessageSquare, Check } from 'lucide-react';

const Contact = () => {
  const { openChatbot } = useApp();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    services: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          services: [...prev.services, value]
        };
      } else {
        return {
          ...prev,
          services: prev.services.filter(service => service !== value)
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        services: []
      });
    }, 5000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              Have questions or ready to start your project? We're here to help you transform your ideas into powerful applications.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-green-800">Thank You!</h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Services You're Interested In
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Custom App Development', 'Mobile Apps', 'Web Applications', 'UI/UX Design', 'Maintenance & Support'].map((service) => (
                        <div key={service} className="flex items-center">
                          <input
                            id={service.replace(/\s+/g, '-').toLowerCase()}
                            name="services"
                            type="checkbox"
                            value={service}
                            checked={formData.services.includes(service)}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={service.replace(/\s+/g, '-').toLowerCase()}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto py-3 px-8 bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Frequently Asked Questions</h2>
            
            <div className="grid gap-6 text-left">
              {[
                {
                  q: "What types of applications do you develop?",
                  a: "We develop a wide range of applications including web applications, mobile apps (iOS and Android), desktop software, and enterprise solutions. Our expertise spans various industries and use cases from e-commerce platforms to healthcare management systems."
                },
                {
                  q: "How long does it take to develop a custom application?",
                  a: "The timeline varies depending on the scope and complexity of the project. Simple applications can take 1-3 months, while more complex enterprise solutions might take 6-12 months. We'll provide a detailed timeline during our initial consultation and work with you to establish realistic milestones."
                },
                {
                  q: "What's your development process like?",
                  a: "We follow an agile development methodology with regular client touchpoints. The process typically includes discovery, planning, design, development, testing, and deployment phases, with continuous feedback and iteration to ensure the final product meets your exact requirements."
                },
                {
                  q: "Do you provide ongoing support after the app is launched?",
                  a: "Yes, we offer various support and maintenance packages to ensure your application continues to run smoothly, remains secure, and evolves with your business needs. Our support team is available for bug fixes, updates, and continuous improvements."
                },
                {
                  q: "How do you handle project pricing?",
                  a: "We offer both fixed-price and time-and-materials pricing models, depending on the nature of your project. We'll discuss the most suitable approach during our consultation and provide transparent pricing with no hidden costs."
                },
                {
                  q: "Can you help with app store submissions and distribution?",
                  a: "Absolutely! We handle the entire process of submitting your application to the App Store, Google Play Store, or other distribution platforms. We ensure your app meets all the necessary requirements and guidelines for a successful launch."
                },
                {
                  q: "Do you sign NDAs for project confidentiality?",
                  a: "Yes, we understand the importance of protecting your intellectual property and business ideas. We're happy to sign Non-Disclosure Agreements before discussing your project details to ensure complete confidentiality."
                },
                {
                  q: "What technologies do you specialize in?",
                  a: "Our team is proficient in a wide range of technologies including React, React Native, Vue.js, Angular, Node.js, Python, Swift, Kotlin, and many more. We select the most appropriate technology stack based on your specific project requirements and business goals."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
