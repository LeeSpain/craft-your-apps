
import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageSquare, Mail, Check } from 'lucide-react';
import LeadForm from './LeadForm';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
}

enum ChatState {
  START,
  ASK_INDUSTRY,
  ASK_GOALS,
  ASK_FEATURES,
  ASK_CUSTOMIZATION,
  COLLECT_DETAILS,
  EMAIL_SENT,
  SHOW_QUOTE,
  PAYMENT_OPTIONS,
  PAYMENT_LINK,
  THANK_YOU,
}

interface UserSelections {
  industry: string;
  goals: string[];
  features: string[];
  customizations: {
    userAccounts: boolean;
    integrations: string[];
    designStyle: string;
  };
  contactInfo: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  quoteConfirmed: boolean;
  paymentOption: 'split' | 'full' | null;
}

const Chatbot = () => {
  const { language, currency, formatPrice, isChatbotOpen, closeChatbot, openChatbot } = useApp();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>(ChatState.START);
  const [isTyping, setIsTyping] = useState(false);
  const [userSelections, setUserSelections] = useState<UserSelections>({
    industry: '',
    goals: [],
    features: [],
    customizations: {
      userAccounts: false,
      integrations: [],
      designStyle: '',
    },
    contactInfo: {
      name: '',
      company: '',
      email: '',
      phone: '',
    },
    quoteConfirmed: false,
    paymentOption: null,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  // Initial message
  useEffect(() => {
    if (isChatbotOpen && messages.length === 0) {
      sendBotMessage("Hi! I'm AIAppCrafter. Let's build your dream app! What industry are you in? (e.g., pet care, real estate, team productivity, fan community)");
      setChatState(ChatState.ASK_INDUSTRY);
    }
  }, [isChatbotOpen, language]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle URL params for email confirmation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirmed = params.get('quoteConfirmed');
    const email = params.get('email');
    
    if (confirmed === 'true' && email) {
      // Find the user by email and set as confirmed
      if (userSelections.contactInfo.email === email || !userSelections.contactInfo.email) {
        openChatbot();
        if (!userSelections.contactInfo.email) {
          // If user refreshed the page, we'll simulate having their data
          setUserSelections(prev => ({
            ...prev,
            industry: 'Pet care',
            goals: ['Streamline bookings', 'Connect with clients'],
            features: ['ai-recommendations', 'chatroom'],
            customizations: {
              userAccounts: true,
              integrations: ['Google Calendar'],
              designStyle: 'Modern',
            },
            contactInfo: {
              name: 'John Doe',
              company: 'PetStoreX',
              email: email,
              phone: '555-1234',
            },
            quoteConfirmed: true,
          }));
        } else {
          setUserSelections(prev => ({
            ...prev,
            quoteConfirmed: true,
          }));
        }
        
        setChatState(ChatState.SHOW_QUOTE);
        sendBotMessage(`Thanks for confirming! Here's your full quote:`);
        displayQuote();
      }
    }
  }, [isChatbotOpen]);

  const sendBotMessage = (content: string) => {
    setIsTyping(true);
    
    // Calculate typing delay based on content length, minimum 500ms
    const typingDelay = Math.max(500, Math.min(content.length * 20, 2000));
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content, sender: 'bot' },
      ]);
      setIsTyping(false);
    }, typingDelay);
  };

  const sendUserMessage = (content: string) => {
    if (!content.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content, sender: 'user' },
    ]);
    setUserInput('');
    
    handleUserInput(content);
  };

  const handleUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    switch (chatState) {
      case ChatState.ASK_INDUSTRY:
        setUserSelections(prev => ({
          ...prev,
          industry: input,
        }));
        
        setTimeout(() => {
          sendBotMessage(`Got it! What's the main goal for your app? For example:
            
- Streamline bookings and scheduling.
- Connect with clients through chat.
- Provide AI-powered recommendations.
- Send notifications and reminders.
- Something else?`);
          
          setChatState(ChatState.ASK_GOALS);
        }, 800);
        break;
        
      case ChatState.ASK_GOALS:
        // Parse goals from input
        const goals = input.split(',').map(goal => goal.trim());
        setUserSelections(prev => ({
          ...prev,
          goals,
        }));
        
        setTimeout(() => {
          const featuresList = CUSTOM_FEATURES.map(feature => 
            `- ${feature.name}: ${feature.name === 'AI Recommendations' ? 'Smart suggestions for bookings.' : 
              feature.name === 'Chatroom' ? 'Real-time communication with clients.' :
              feature.name === 'AI Chatbot' ? '24/7 automated support.' :
              feature.name === 'Notifications' ? 'Reminders for appointments.' :
              'Reach a global audience.'}`
          ).join('\n');
          
          sendBotMessage(`Great! Here are some features that might help:\n\n${featuresList}\n\nWhich ones would you like to include?`);
          setChatState(ChatState.ASK_FEATURES);
        }, 800);
        break;
        
      case ChatState.ASK_FEATURES:
        // Parse selected features
        const selectedFeatures = CUSTOM_FEATURES
          .filter(feature => input.toLowerCase().includes(feature.name.toLowerCase()))
          .map(feature => feature.id);
        
        setUserSelections(prev => ({
          ...prev,
          features: selectedFeatures,
        }));
        
        setTimeout(() => {
          sendBotMessage(`Almost done! A few more questions to tailor your app:

- Do you need user accounts or profiles?
- Should the app integrate with any existing tools (e.g., calendars, payment systems)?
- Do you have a preferred design style (e.g., modern, minimalist, bold)?`);
          
          setChatState(ChatState.ASK_CUSTOMIZATION);
        }, 800);
        break;
        
      case ChatState.ASK_CUSTOMIZATION:
        // Parse customization options
        const userAccounts = lowerInput.includes('yes') || lowerInput.includes('account');
        const integrations = [];
        if (lowerInput.includes('google') || lowerInput.includes('calendar')) {
          integrations.push('Google Calendar');
        }
        if (lowerInput.includes('payment') || lowerInput.includes('stripe')) {
          integrations.push('Payment System');
        }
        
        let designStyle = '';
        if (lowerInput.includes('modern')) designStyle = 'Modern';
        else if (lowerInput.includes('minimalist')) designStyle = 'Minimalist';
        else if (lowerInput.includes('bold')) designStyle = 'Bold';
        else designStyle = 'Standard';
        
        setUserSelections(prev => ({
          ...prev,
          customizations: {
            userAccounts,
            integrations,
            designStyle,
          },
        }));
        
        setTimeout(() => {
          sendBotMessage(`Thanks for sharing! To send your custom quote, I'll need:

- Your name.
- Company name.
- Email address.
- Phone number (optional).

Let me know when you're ready!`);
          
          setChatState(ChatState.COLLECT_DETAILS);
        }, 800);
        break;
        
      case ChatState.COLLECT_DETAILS:
        // Check if input looks like it contains basic contact info
        if (input.includes(',')) {
          // Try to parse contact details from comma-separated input
          const parts = input.split(',').map(part => part.trim());
          
          if (parts.length >= 3) {
            const contactInfo = {
              name: parts[0],
              company: parts[1],
              email: parts[2],
              phone: parts.length > 3 ? parts[3] : '',
            };
            
            setUserSelections(prev => ({
              ...prev,
              contactInfo,
            }));
            
            // Simulate sending email
            setTimeout(() => {
              sendBotMessage(`Got it, ${contactInfo.name}! I'm preparing your custom quote for ${contactInfo.company}. Check your email at ${contactInfo.email} in a moment. Once you've reviewed it, click 'Confirm' on the email, and I'll show you the full quote here!`);
              
              // Show email sent notification
              toast({
                title: "Quote Sent!",
                description: `An email has been sent to ${contactInfo.email} with your custom quote.`,
              });
              
              setChatState(ChatState.EMAIL_SENT);
              
              // For demo purposes, show a message about how to simulate confirmation
              setTimeout(() => {
                sendBotMessage("For this demo, you can simulate confirming the quote by clicking the button below:");
                
                // In a real app, this would be handled by the user clicking a link in the actual email
                setTimeout(() => {
                  setMessages(prev => [
                    ...prev,
                    { 
                      id: Date.now().toString(), 
                      content: `
                      <div class="flex justify-center mt-2">
                        <a href="?quoteConfirmed=true&email=${encodeURIComponent(contactInfo.email)}" class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                          <Mail class="w-4 h-4" /> Simulate Email Confirmation
                        </a>
                      </div>
                      `, 
                      sender: 'bot' 
                    },
                  ]);
                }, 500);
              }, 1500);
            }, 1500);
          } else {
            sendBotMessage("I need at least your name, company, and email. Please provide all three separated by commas.");
          }
        } else {
          sendBotMessage("Please provide your name, company, email, and optional phone separated by commas. For example: John Doe, PetStoreX, john@petstorex.com, 555-1234");
        }
        break;
      
      case ChatState.SHOW_QUOTE:
        // After showing the quote, present payment options
        if (lowerInput.includes('ready') || lowerInput.includes('proceed') || lowerInput.includes('yes')) {
          setTimeout(() => {
            const splitAmount = calculateTotalPrice() * 0.6;
            const fullAmount = calculateTotalPrice() * 0.95;
            
            sendBotMessage(`To get started, choose your payment option:

- Split: ${formatPrice(splitAmount)} now, ${formatPrice(calculateTotalPrice() - splitAmount)} later.
- Full: ${formatPrice(fullAmount)} upfront (save ${formatPrice(calculateTotalPrice() - fullAmount)}).

Which works for you?`);
            
            setChatState(ChatState.PAYMENT_OPTIONS);
          }, 800);
        }
        break;
        
      case ChatState.PAYMENT_OPTIONS:
        let paymentOption: 'split' | 'full' | null = null;
        
        if (lowerInput.includes('split')) {
          paymentOption = 'split';
        } else if (lowerInput.includes('full')) {
          paymentOption = 'full';
        }
        
        if (paymentOption) {
          setUserSelections(prev => ({
            ...prev,
            paymentOption,
          }));
          
          setTimeout(() => {
            sendBotMessage(`Great! Here's your payment link: [Stripe Payment Link]. Once payment is confirmed, we'll get started on your app!`);
            
            // In a real app, this would be a link to Stripe checkout
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                { 
                  id: Date.now().toString(), 
                  content: `
                  <div class="flex justify-center mt-2">
                    <button class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Check class="w-4 h-4" /> Proceed to Payment
                    </button>
                  </div>
                  `, 
                  sender: 'bot' 
                },
              ]);
              
              setChatState(ChatState.PAYMENT_LINK);
            }, 500);
          }, 800);
        } else {
          sendBotMessage("Please choose either 'Split' or 'Full' payment option.");
        }
        break;
        
      default:
        sendBotMessage("I'm not sure what to do next. Let's start over. What industry are you in?");
        setChatState(ChatState.ASK_INDUSTRY);
        break;
    }
  };

  const calculateTotalPrice = () => {
    let total = BASE_PRICE;
    
    userSelections.features.forEach(featureId => {
      const feature = CUSTOM_FEATURES.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
      }
    });
    
    return total;
  };

  const displayQuote = () => {
    const total = calculateTotalPrice();
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
    
    sendBotMessage(quoteMessage);
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    setUserSelections(prev => ({
      ...prev,
      contactInfo: {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone || '',
      },
    }));
    
    // Simulate sending email
    setTimeout(() => {
      sendBotMessage(`Got it, ${formData.name}! I'm preparing your custom quote for ${formData.company}. Check your email at ${formData.email} in a moment. Once you've reviewed it, click 'Confirm' on the email, and I'll show you the full quote here!`);
      
      // Show email sent notification
      toast({
        title: "Quote Sent!",
        description: `An email has been sent to ${formData.email} with your custom quote.`,
      });
      
      setChatState(ChatState.EMAIL_SENT);
      
      // For demo purposes, show a message about how to simulate confirmation
      setTimeout(() => {
        sendBotMessage("For this demo, you can simulate confirming the quote by clicking the button below:");
        
        // In a real app, this would be handled by the user clicking a link in the actual email
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now().toString(), 
              content: `
              <div class="flex justify-center mt-2">
                <a href="?quoteConfirmed=true&email=${encodeURIComponent(formData.email)}" class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  <Mail class="w-4 h-4" /> Simulate Email Confirmation
                </a>
              </div>
              `, 
              sender: 'bot' 
            },
          ]);
        }, 500);
      }, 1500);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendUserMessage(userInput);
    }
  };

  if (!isChatbotOpen) {
    return (
      <button 
        onClick={openChatbot}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        {/* Chat header */}
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h3 className="font-medium">Chat with AIAppCrafter</h3>
          <button onClick={closeChatbot} className="text-white hover:text-blue-200 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[50vh]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-3 chat-message-in",
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  )}
                >
                  {message.content.includes('<div') ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : (
                    <div className="whitespace-pre-line">{message.content}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-xl p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area (hidden in certain states) */}
        {chatState !== ChatState.COLLECT_DETAILS && chatState !== ChatState.THANK_YOU && (
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
