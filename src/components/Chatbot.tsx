import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { CUSTOM_FEATURES, BASE_PRICE } from '@/lib/constants';
import { X, MessageSquare, Mail, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import { ChatContainer } from './chatbot/ChatContainer';
import { ChatInput } from './chatbot/ChatInput';
import { 
  ChatState, 
  Message, 
  UserSelections, 
  ChatOption,
  INDUSTRY_OPTIONS,
  GOALS_OPTIONS,
  INTEGRATION_OPTIONS,
  DESIGN_STYLE_OPTIONS, 
  ContactFormData
} from './chatbot/types';
import { calculateTotalPrice, generateQuoteText } from './chatbot/utils';

const Chatbot = () => {
  const { language, currency, formatPrice, isChatbotOpen, closeChatbot, openChatbot } = useApp();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
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
    
    handleUserInput(content);
  };

  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
  const [allowMultipleSelection, setAllowMultipleSelection] = useState(false);

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
        setCurrentOptions([]); // Clear current options after selection
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
            const splitAmount = calculateTotalPrice(userSelections) * 0.6;
            const fullAmount = calculateTotalPrice(userSelections) * 0.95;
            
            sendBotMessage(`To get started, choose your payment option:

- Split: ${formatPrice(splitAmount)} now, ${formatPrice(calculateTotalPrice(userSelections) - splitAmount)} later.
- Full: ${formatPrice(fullAmount)} upfront (save ${formatPrice(calculateTotalPrice(userSelections) - fullAmount)}).

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

  useEffect(() => {
    switch (chatState) {
      case ChatState.ASK_INDUSTRY:
        setCurrentOptions(INDUSTRY_OPTIONS);
        setAllowMultipleSelection(false);
        break;
      case ChatState.ASK_GOALS:
        setCurrentOptions(GOALS_OPTIONS);
        setAllowMultipleSelection(true);
        break;
      case ChatState.ASK_FEATURES:
        setCurrentOptions(CUSTOM_FEATURES.map(feature => ({
          id: feature.id,
          label: `${feature.name}: ${formatPrice(feature.price)}`,
          value: feature.name,
        })));
        setAllowMultipleSelection(true);
        break;
      case ChatState.ASK_CUSTOMIZATION:
        const customizationOptions = [
          { id: 'userAccounts', label: 'User accounts or profiles', value: 'User accounts' },
          ...INTEGRATION_OPTIONS,
          ...DESIGN_STYLE_OPTIONS,
        ];
        setCurrentOptions(customizationOptions);
        setAllowMultipleSelection(true);
        break;
      default:
        setCurrentOptions([]);
        setAllowMultipleSelection(false);
    }
  }, [chatState, formatPrice]);

  const displayQuote = () => {
    const quoteMessage = generateQuoteText(userSelections, formatPrice);
    sendBotMessage(quoteMessage);
  };

  const onContactFormSubmit = (values: ContactFormData) => {
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
    <div className="fixed bottom-0 right-0 w-full sm:w-96 h-[80vh] bg-white rounded-t-lg shadow-lg flex flex-col z-50">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">AIAppCrafter</h3>
        <button 
          onClick={closeChatbot}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Chat messages */}
      <ChatContainer 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        chatState={chatState}
        handleOption={handleOption}
        selectedOptions={selectedOptions}
        submitGoals={submitGoals}
        submitFeatures={submitFeatures}
        submitCustomizations={submitCustomizations}
        customGoal={customGoal}
        setCustomGoal={setCustomGoal}
        onContactFormSubmit={onContactFormSubmit}
      />
      
      {/* Input area */}
      <ChatInput 
        onSubmit={sendUserMessage} 
        options={currentOptions} 
        allowMultipleSelection={allowMultipleSelection}
      />
    </div>
  );
};

export default Chatbot;
