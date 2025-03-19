
import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageSquare } from 'lucide-react';
import LeadForm from './LeadForm';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
}

enum ChatState {
  START,
  ASK_INTENT,
  BUY_FLOW,
  CUSTOM_FLOW,
  CUSTOM_INDUSTRY,
  CUSTOM_FEATURES,
  QUOTE_GENERATION,
  LEAD_FORM,
  THANK_YOU,
}

const Chatbot = () => {
  const { language, currency, formatPrice, isChatbotOpen, closeChatbot } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>(ChatState.START);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  // Initial message
  useEffect(() => {
    if (isChatbotOpen && messages.length === 0) {
      sendBotMessage(getTranslation('chatbot.welcome', language));
      
      setTimeout(() => {
        setChatState(ChatState.ASK_INTENT);
        sendBotMessage(getTranslation('chatbot.buyOrCustom', language));
      }, 1000);
    }
  }, [isChatbotOpen, language]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Show form when in LEAD_FORM state
  useEffect(() => {
    if (chatState === ChatState.LEAD_FORM && formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatState]);

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
      case ChatState.ASK_INTENT:
        if (lowerInput.includes('buy') || lowerInput.includes('purchase') || lowerInput.includes('ready')) {
          setChatState(ChatState.BUY_FLOW);
          
          setTimeout(() => {
            const appOptions = APPS.map(app => `${app.name} (${formatPrice(app.price)})`).join(', ');
            sendBotMessage(`${getTranslation('chatbot.whichApp', language)} ${appOptions}`);
          }, 800);
        } else if (lowerInput.includes('custom') || lowerInput.includes('build') || lowerInput.includes('tailor')) {
          setChatState(ChatState.CUSTOM_INDUSTRY);
          
          setTimeout(() => {
            sendBotMessage(getTranslation('chatbot.customIndustry', language));
          }, 800);
        } else {
          sendBotMessage(getTranslation('chatbot.buyOrCustom', language));
        }
        break;
        
      case ChatState.BUY_FLOW:
        // Try to match with an app
        const matchedApp = APPS.find(app => 
          lowerInput.includes(app.name.toLowerCase()) || 
          app.id.toLowerCase().includes(lowerInput)
        );
        
        if (matchedApp) {
          setSelectedApp(matchedApp.id);
          
          setTimeout(() => {
            sendBotMessage(`${matchedApp.name} is ${formatPrice(matchedApp.price)}—one-time fee, ready to use. To proceed with purchase, please share your details.`);
            setChatState(ChatState.LEAD_FORM);
          }, 800);
        } else {
          const appOptions = APPS.map(app => `${app.name} (${formatPrice(app.price)})`).join(', ');
          sendBotMessage(`I didn't recognize that app. Please select from: ${appOptions}`);
        }
        break;
        
      case ChatState.CUSTOM_INDUSTRY:
        setSelectedIndustry(input);
        setChatState(ChatState.CUSTOM_FEATURES);
        
        setTimeout(() => {
          const featureOptions = CUSTOM_FEATURES.map(feature => `${feature.name} (${formatPrice(feature.price)})`).join(', ');
          sendBotMessage(`${getTranslation('chatbot.customExtras', language)} ${featureOptions}`);
        }, 800);
        break;
        
      case ChatState.CUSTOM_FEATURES:
        // Parse selected features
        const featuresInput = input.toLowerCase();
        const selectedFeaturesList = CUSTOM_FEATURES.filter(feature => 
          featuresInput.includes(feature.name.toLowerCase())
        ).map(feature => feature.id);
        
        setSelectedFeatures(selectedFeaturesList);
        setChatState(ChatState.QUOTE_GENERATION);
        
        setTimeout(() => {
          // Calculate quote
          const basePrice = BASE_PRICE;
          let totalPrice = basePrice;
          
          const selectedFeaturesDetails = CUSTOM_FEATURES.filter(feature => 
            selectedFeaturesList.includes(feature.id)
          );
          
          selectedFeaturesDetails.forEach(feature => {
            totalPrice += feature.price;
          });
          
          // Format quote details
          let quoteMessage = `${getTranslation('chatbot.quote', language)}\n\n`;
          quoteMessage += `Base: ${formatPrice(basePrice)}\n`;
          
          selectedFeaturesDetails.forEach(feature => {
            quoteMessage += `${feature.name}: ${formatPrice(feature.price)}\n`;
          });
          
          quoteMessage += `\nTotal: ${formatPrice(totalPrice)}\n`;
          quoteMessage += `Timeline: 3-6 months\n\n`;
          quoteMessage += `Payment options:\n`;
          quoteMessage += `- Split: 60% now (${formatPrice(totalPrice * 0.6)}), 40% on completion (${formatPrice(totalPrice * 0.4)})\n`;
          quoteMessage += `- Full: 5% off (${formatPrice(totalPrice * 0.95)}, save ${formatPrice(totalPrice * 0.05)})\n\n`;
          quoteMessage += `To proceed with this custom quote, please share your details.`;
          
          sendBotMessage(quoteMessage);
          setChatState(ChatState.LEAD_FORM);
        }, 1200);
        break;
        
      default:
        break;
    }
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setChatState(ChatState.THANK_YOU);
    
    // Append user info to chat
    setMessages((prev) => [
      ...prev,
      { 
        id: Date.now().toString(), 
        content: `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nIndustry: ${formData.industry || 'Not provided'}`, 
        sender: 'user' 
      },
    ]);
    
    setTimeout(() => {
      sendBotMessage(`Thanks, ${formData.name}! Your ${selectedApp ? 'purchase' : 'custom quote'} for ${formData.company} has been processed. Please check your email for next steps and confirmation details.`);
    }, 1000);
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
        onClick={() => openChatbot()}
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
                  <div className="whitespace-pre-line">{message.content}</div>
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
        
        {/* Lead form (when in LEAD_FORM state) */}
        {chatState === ChatState.LEAD_FORM && (
          <div ref={formContainerRef} className="bg-gray-50 border-t border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Please complete this form to proceed:</h4>
            <LeadForm 
              onSubmit={handleFormSubmit} 
              isCustom={selectedApp === null}
            />
          </div>
        )}
        
        {/* Input area (hidden in LEAD_FORM and THANK_YOU states) */}
        {chatState !== ChatState.LEAD_FORM && chatState !== ChatState.THANK_YOU && (
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
