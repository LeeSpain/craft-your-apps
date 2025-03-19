import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { getTranslation } from '@/lib/translations';
import { APPS, CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Send, MessageSquare, Mail, Check, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  options?: ChatOption[];
}

interface ChatOption {
  id: string;
  label: string;
  value: string;
  selected?: boolean;
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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});

const INDUSTRY_OPTIONS = [
  { id: 'hairdresser', label: 'Hairdressers & Barbershops', value: 'Hairdressers & Barbershops' },
  { id: 'petcare', label: 'Pet Care Services', value: 'Pet Care Services' },
  { id: 'realestate', label: 'Real Estate Agents', value: 'Real Estate Agents' },
  { id: 'cafe', label: 'Cafés & Small Restaurants', value: 'Cafés & Small Restaurants' },
  { id: 'fitness', label: 'Fitness Trainers & Small Gyms', value: 'Fitness Trainers & Small Gyms' },
  { id: 'events', label: 'Event Planners', value: 'Event Planners' },
  { id: 'homeservices', label: 'Home Services', value: 'Home Services' },
  { id: 'retail', label: 'Retail Shops', value: 'Retail Shops' },
  { id: 'education', label: 'Tutors & Educators', value: 'Tutors & Educators' },
  { id: 'auto', label: 'Auto Repair & Detailing', value: 'Auto Repair & Detailing' },
  { id: 'nails', label: 'Nail Salons & Beauty Therapists', value: 'Nail Salons & Beauty Therapists' },
  { id: 'photography', label: 'Photographers', value: 'Photographers' },
  { id: 'community', label: 'Community Groups', value: 'Community Groups' },
  { id: 'childcare', label: 'Childcare Providers', value: 'Childcare Providers' },
  { id: 'emergency', label: 'Emergency Services', value: 'Emergency Services' },
];

const GOALS_OPTIONS = [
  { id: 'bookings', label: 'Streamline bookings and scheduling', value: 'Streamline bookings and scheduling' },
  { id: 'connect', label: 'Connect with clients through chat', value: 'Connect with clients through chat' },
  { id: 'recommendations', label: 'Provide AI-powered recommendations', value: 'Provide AI-powered recommendations' },
  { id: 'notifications', label: 'Send notifications and reminders', value: 'Send notifications and reminders' },
  { id: 'other', label: 'Something else (please specify)', value: 'custom' },
];

const DESIGN_STYLE_OPTIONS = [
  { id: 'modern', label: 'Modern', value: 'Modern' },
  { id: 'minimalist', label: 'Minimalist', value: 'Minimalist' },
  { id: 'bold', label: 'Bold', value: 'Bold' },
  { id: 'standard', label: 'Standard', value: 'Standard' },
];

const INTEGRATION_OPTIONS = [
  { id: 'calendar', label: 'Calendar (Google, Apple, etc.)', value: 'Calendar' },
  { id: 'payment', label: 'Payment Systems (Stripe, PayPal)', value: 'Payment Systems' },
  { id: 'social', label: 'Social Media', value: 'Social Media' },
  { id: 'maps', label: 'Maps & Location Services', value: 'Maps & Location' },
];

const Chatbot = () => {
  const { language, currency, formatPrice, isChatbotOpen, closeChatbot, openChatbot } = useApp();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>(ChatState.START);
  const [isTyping, setIsTyping] = useState(false);
  const [customGoal, setCustomGoal] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<{
    industry: string | null;
    goals: string[];
    features: string[];
    userAccounts: boolean;
    integrations: string[];
    designStyle: string | null;
  }>({
    industry: null,
    goals: [],
    features: [],
    userAccounts: false,
    integrations: [],
    designStyle: null,
  });
  
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
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
    },
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial message
  useEffect(() => {
    if (isChatbotOpen && messages.length === 0) {
      sendBotMessageWithOptions(
        "Hi! I'm AIAppCrafter. Let's build your dream app! What industry are you in?",
        INDUSTRY_OPTIONS
      );
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

  const sendBotMessageWithOptions = (content: string, options: ChatOption[]) => {
    setIsTyping(true);
    
    // Calculate typing delay based on content length, minimum 500ms
    const typingDelay = Math.max(500, Math.min(content.length * 20, 2000));
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content, sender: 'bot', options },
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

  const handleOption = (option: ChatOption) => {
    // Update the selected option in the message
    setMessages(prev => 
      prev.map(msg => {
        if (msg.options && msg.options.some(opt => opt.id === option.id)) {
          return {
            ...msg,
            options: msg.options.map(opt => 
              opt.id === option.id 
                ? { ...opt, selected: !opt.selected } 
                : opt
            )
          };
        }
        return msg;
      })
    );
    
    // Handle different option types based on current state
    switch (chatState) {
      case ChatState.ASK_INDUSTRY:
        setSelectedOptions(prev => ({...prev, industry: option.value}));
        setUserSelections(prev => ({...prev, industry: option.value}));
        sendUserMessage(option.value);
        break;
        
      case ChatState.ASK_GOALS:
        if (option.id === 'other' && option.selected) {
          // Handle custom goal input
        } else {
          const newGoals = option.selected 
            ? [...selectedOptions.goals.filter(g => g !== option.value), option.value]
            : selectedOptions.goals.filter(g => g !== option.value);
            
          setSelectedOptions(prev => ({...prev, goals: newGoals}));
        }
        break;
        
      case ChatState.ASK_FEATURES:
        const featureId = CUSTOM_FEATURES.find(f => f.name === option.value)?.id || '';
        const newFeatures = option.selected
          ? [...selectedOptions.features.filter(f => f !== featureId), featureId]
          : selectedOptions.features.filter(f => f !== featureId);
          
        setSelectedOptions(prev => ({...prev, features: newFeatures}));
        break;
        
      case ChatState.ASK_CUSTOMIZATION:
        if (option.id === 'userAccounts') {
          setSelectedOptions(prev => ({...prev, userAccounts: !prev.userAccounts}));
        } else if (INTEGRATION_OPTIONS.some(i => i.id === option.id)) {
          const newIntegrations = option.selected
            ? [...selectedOptions.integrations.filter(i => i !== option.value), option.value]
            : selectedOptions.integrations.filter(i => i !== option.value);
            
          setSelectedOptions(prev => ({...prev, integrations: newIntegrations}));
        } else if (DESIGN_STYLE_OPTIONS.some(s => s.id === option.id)) {
          setSelectedOptions(prev => ({...prev, designStyle: option.value}));
        }
        break;
    }
  };

  const submitGoals = () => {
    // Create the response message content
    let selectedGoalsList = [...selectedOptions.goals];
    if (customGoal) {
      selectedGoalsList.push(customGoal);
    }
    
    const goalsMessage = selectedGoalsList.join(", ");
    
    // Send the user message with selected goals
    if (selectedGoalsList.length > 0) {
      sendUserMessage(goalsMessage);
      
      // Update user selections
      setUserSelections(prev => ({
        ...prev,
        goals: selectedGoalsList,
      }));
      
      // Move to next state
      setTimeout(() => {
        const featureOptions = CUSTOM_FEATURES.map(feature => ({
          id: feature.id,
          label: `${feature.name}: ${formatPrice(feature.price)}`,
          value: feature.name,
        }));
        
        sendBotMessageWithOptions(
          "Great! Here are some features that might help. Which ones would you like to include?",
          featureOptions
        );
        setChatState(ChatState.ASK_FEATURES);
      }, 800);
    } else {
      // Prompt user to select at least one goal
      toast({
        title: "Select Goals",
        description: "Please select at least one goal for your app.",
        variant: "destructive",
      });
    }
  };

  const submitFeatures = () => {
    if (selectedOptions.features.length > 0) {
      // Create message content
      const features = CUSTOM_FEATURES.filter(f => 
        selectedOptions.features.includes(f.id)
      ).map(f => f.name);
      
      const featuresMessage = features.join(", ");
      
      // Send user message
      sendUserMessage(featuresMessage);
      
      // Update user selections
      setUserSelections(prev => ({
        ...prev,
        features: selectedOptions.features,
      }));
      
      // Move to next state
      setTimeout(() => {
        const customizationOptions = [
          { id: 'userAccounts', label: 'User accounts or profiles', value: 'User accounts' },
          ...INTEGRATION_OPTIONS,
          ...DESIGN_STYLE_OPTIONS,
        ];
        
        sendBotMessageWithOptions(
          "Almost done! A few more questions to tailor your app:",
          customizationOptions
        );
        setChatState(ChatState.ASK_CUSTOMIZATION);
      }, 800);
    } else {
      toast({
        title: "Select Features",
        description: "Please select at least one feature for your app.",
        variant: "destructive",
      });
    }
  };

  const submitCustomizations = () => {
    // Create message content
    let customizationMessage = [];
    
    if (selectedOptions.userAccounts) {
      customizationMessage.push("User accounts: Yes");
    }
    
    if (selectedOptions.integrations.length > 0) {
      customizationMessage.push(`Integrations: ${selectedOptions.integrations.join(', ')}`);
    }
    
    if (selectedOptions.designStyle) {
      customizationMessage.push(`Design style: ${selectedOptions.designStyle}`);
    }
    
    const message = customizationMessage.join(", ");
    
    // Send user message
    sendUserMessage(message);
    
    // Update user selections
    setUserSelections(prev => ({
      ...prev,
      customizations: {
        userAccounts: selectedOptions.userAccounts,
        integrations: selectedOptions.integrations,
        designStyle: selectedOptions.designStyle || 'Standard',
      },
    }));
    
    // Move to next state
    setTimeout(() => {
      sendBotMessage(
        "Thanks for sharing! To send your custom quote, I'll need your contact details:"
      );
      setChatState(ChatState.COLLECT_DETAILS);
    }, 800);
  };

  const handleUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    switch (chatState) {
      case ChatState.ASK_INDUSTRY:
        if (!selectedOptions.industry) {
          // If no industry was selected via buttons
          const foundIndustry = INDUSTRY_OPTIONS.find(
            opt => lowerInput.includes(opt.value.toLowerCase())
          );
          
          if (foundIndustry) {
            setSelectedOptions(prev => ({...prev, industry: foundIndustry.value}));
            setUserSelections(prev => ({...prev, industry: foundIndustry.value}));
          } else {
            // Use the input as a custom industry
            setSelectedOptions(prev => ({...prev, industry: input}));
            setUserSelections(prev => ({...prev, industry: input}));
          }
        }
        
        setTimeout(() => {
          sendBotMessageWithOptions(
            "Got it! What's the main goal for your app?",
            GOALS_OPTIONS
          );
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

  const onContactFormSubmit = (values: z.infer<typeof contactFormSchema>) => {
    setUserSelections(prev => ({
      ...prev,
      contactInfo: {
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone || '',
      },
    }));
    
    // Send message with collected data
    sendUserMessage(`Name: ${values.name}, Company: ${values.company}, Email: ${values.email}${values.phone ? `, Phone: ${values.phone}` : ''}`);
    
    // Simulate sending email
    setTimeout(() => {
      sendBotMessage(`Got it, ${values.name}! I'm preparing your custom quote for ${values.company}. Check your email at ${values.email} in a moment. Once you've reviewed it, click 'Confirm' on the email, and I'll show you the full quote here!`);
      
      // Show email sent notification
      toast({
        title: "Quote Sent!",
        description: `An email has been sent to ${values.email} with your custom quote.`,
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
                <a href="?quoteConfirmed=true&email=${encodeURIComponent(values.email)}" class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
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

  // Render chat option buttons
  const renderOptions = (options: ChatOption[]) => {
    switch (chatState) {
      case ChatState.ASK_INDUSTRY:
        return (
          <div className="grid grid-cols-1 gap-2 mt-2">
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => handleOption(option)}
                className={cn(
                  "text-left px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors",
                  selectedOptions.industry === option.value && "bg-blue-100 border-blue-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
        
      case ChatState.ASK_GOALS:
        return (
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 gap-2">
              {options.filter(o => o.id !== 'other').map(option => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox 
                    id={`goal-${option.id}`}
                    checked={selectedOptions.goals.includes(option.value)}
                    onCheckedChange={() => handleOption({...option, selected: !selectedOptions.goals.includes(option.value)})}
                  />
                  <label 
                    htmlFor={`goal-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
              
              {/* Custom goal option */}
              <div className="flex items-start space-x-2 mt-2">
                <Checkbox 
                  id="goal-other"
                  checked={!!customGoal}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setCustomGoal('');
                    }
                  }}
                />
                <div className="flex-1">
                  <label 
                    htmlFor="goal-other"
                    className="text-sm cursor-pointer"
                  >
                    Something else
                  </label>
                  {(customGoal || selectedOptions.goals.includes('custom')) && (
                    <Textarea 
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="Tell us what you need..."
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                size="sm"
                onClick={submitGoals}
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case ChatState.ASK_FEATURES:
        return (
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 gap-2">
              {options.map(option => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox 
                    id={`feature-${option.id}`}
                    checked={selectedOptions.features.includes(option.id)}
                    onCheckedChange={() => handleOption({...option, selected: !selectedOptions.features.includes(option.id)})}
                  />
                  <label 
                    htmlFor={`feature-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                size="sm"
                onClick={submitFeatures}
              >
                Next
              </Button>
            </div>
          </div>
        );
        
      case ChatState.ASK_CUSTOMIZATION:
        const userAccountsOption = options.find(o => o.id === 'userAccounts');
        const integrationOptions = options.filter(o => INTEGRATION_OPTIONS.some(i => i.id === o.id));
        const designOptions = options.filter(o => DESIGN_STYLE_OPTIONS.some(s => s.id === o.id));
        
        return (
          <div className="space-y-4 mt-2">
            {/* User accounts option */}
            {userAccountsOption && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`customization-${userAccountsOption.id}`}
                  checked={selectedOptions.userAccounts}
                  onCheckedChange={() => handleOption({...userAccountsOption, selected: !selectedOptions.userAccounts})}
                />
                <label 
                  htmlFor={`customization-${userAccountsOption.id}`}
                  className="text-sm cursor-pointer"
                >
                  {userAccountsOption.label}
                </label>
              </div>
            )}
            
            {/* Integrations section */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Integrations:</p>
              {integrationOptions.map(option => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-2 ml-4"
                >
                  <Checkbox 
                    id={`integration-${option.id}`}
                    checked={selectedOptions.integrations.includes(option.value)}
                    onCheckedChange={() => handleOption({...option, selected: !selectedOptions.integrations.includes(option.value)})}
                  />
                  <label 
                    htmlFor={`integration-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            
            {/* Design style section */}
            <div className="
