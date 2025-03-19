
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Check } from 'lucide-react';
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
} from '../types';
import { CUSTOM_FEATURES } from '@/lib/constants';
import { calculateTotalPrice, generateQuoteText } from '../utils';

export const useChatbotState = () => {
  const { language, currency, formatPrice, isChatbotOpen, openChatbot } = useApp();
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>(ChatState.START);
  const [isTyping, setIsTyping] = useState(false);
  const [customGoal, setCustomGoal] = useState('');
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
  const [allowMultipleSelection, setAllowMultipleSelection] = useState(false);
  const [processingUserInput, setProcessingUserInput] = useState(false);
  
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
  
  // Initial message
  useEffect(() => {
    if (isChatbotOpen && messages.length === 0) {
      sendBotMessage(
        "Hi! I'm AIAppCrafter. Let's build your dream app! What industry are you in?"
      );
      setChatState(ChatState.ASK_INDUSTRY);
      setCurrentOptions(INDUSTRY_OPTIONS);
      setAllowMultipleSelection(false);
    }
  }, [isChatbotOpen, language]);

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
      // Check if this exact message already exists to prevent duplicates
      const isDuplicate = messages.some(msg => 
        msg.sender === 'bot' && msg.content === content
      );
      
      if (!isDuplicate) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), content, sender: 'bot' },
        ]);
      }
      setIsTyping(false);
    }, typingDelay);
  };

  const sendUserMessage = (content: string) => {
    if (!content.trim() || processingUserInput) return;
    
    // Set processing flag to prevent duplicate messages
    setProcessingUserInput(true);
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content, sender: 'user' },
    ]);
    
    handleUserInput(content);
    
    // Reset processing flag after a short delay
    setTimeout(() => setProcessingUserInput(false), 1000);
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
        const featureId = option.id;
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
      
      // Move to next state - without duplicating the options display
      setChatState(ChatState.ASK_FEATURES);
      
      // Clear current options before setting new ones
      setCurrentOptions([]);
      
      // Prepare and display next message
      setTimeout(() => {
        const featureOptions = CUSTOM_FEATURES.map(feature => ({
          id: feature.id,
          label: feature.name,
          value: feature.name,
        }));
        
        sendBotMessage(
          "Great! Here are some features that might help. Which ones would you like to include?"
        );
        
        // Set options after the message is sent
        setTimeout(() => {
          setCurrentOptions(featureOptions);
        }, 300);
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
      // Create message content without price information
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
      setChatState(ChatState.ASK_CUSTOMIZATION);
      
      // Clear current options before setting new ones
      setCurrentOptions([]);
      
      // Prepare and display next message
      setTimeout(() => {
        const customizationOptions = [
          { id: 'userAccounts', label: 'User accounts or profiles', value: 'User accounts' },
          ...INTEGRATION_OPTIONS,
          ...DESIGN_STYLE_OPTIONS,
        ];
        
        sendBotMessage(
          "Almost done! A few more questions to tailor your app:"
        );
        
        // Set options after the message is sent
        setTimeout(() => {
          setCurrentOptions(customizationOptions);
        }, 300);
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
    setChatState(ChatState.COLLECT_DETAILS);
    
    // Clear current options
    setCurrentOptions([]);
    
    // Prepare and display next message
    setTimeout(() => {
      sendBotMessage(
        "Thanks for sharing! To send your custom quote, I'll need your contact details:"
      );
    }, 800);
  };

  const displayQuote = () => {
    const quoteMessage = generateQuoteText(userSelections, formatPrice);
    sendBotMessage(quoteMessage);
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
        
        // Move to next state
        setChatState(ChatState.ASK_GOALS);
        setCurrentOptions(GOALS_OPTIONS);
        setAllowMultipleSelection(true);
        
        setTimeout(() => {
          sendBotMessage(
            "Got it! What's the main goal for your app?"
          );
        }, 800);
        break;
        
      case ChatState.ASK_GOALS:
        // Parse goals from input
        const goals = input.split(',').map(goal => goal.trim());
        setUserSelections(prev => ({
          ...prev,
          goals,
        }));
        
        // Move to next state
        setChatState(ChatState.ASK_FEATURES);
        
        setTimeout(() => {
          const featureOptions = CUSTOM_FEATURES.map(feature => ({
            id: feature.id,
            label: feature.name,
            value: feature.name,
          }));
          
          setCurrentOptions(featureOptions);
          setAllowMultipleSelection(true);
          
          sendBotMessage(
            "Great! Here are some features that might help. Which ones would you like to include?"
          );
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
        
        // Move to next state
        setChatState(ChatState.ASK_CUSTOMIZATION);
        
        setTimeout(() => {
          const customizationOptions = [
            { id: 'userAccounts', label: 'User accounts or profiles', value: 'User accounts' },
            ...INTEGRATION_OPTIONS,
            ...DESIGN_STYLE_OPTIONS,
          ];
          
          setCurrentOptions(customizationOptions);
          setAllowMultipleSelection(true);
          
          sendBotMessage(
            "Almost done! A few more questions to tailor your app:"
          );
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
        
        // Move to next state
        setChatState(ChatState.COLLECT_DETAILS);
        
        setTimeout(() => {
          sendBotMessage(`Thanks for sharing! To send your custom quote, I'll need:

- Your name.
- Company name.
- Email address.
- Phone number (optional).

Let me know when you're ready!`);
        }, 800);
        break;
        
      case ChatState.SHOW_QUOTE:
        // After showing the quote, present payment options
        if (lowerInput.includes('ready') || lowerInput.includes('proceed') || lowerInput.includes('yes')) {
          setChatState(ChatState.PAYMENT_OPTIONS);
          
          setTimeout(() => {
            const splitAmount = calculateTotalPrice(userSelections) * 0.6;
            const fullAmount = calculateTotalPrice(userSelections) * 0.95;
            
            sendBotMessage(`To get started, choose your payment option:

- Split: ${formatPrice(splitAmount)} now, ${formatPrice(calculateTotalPrice(userSelections) - splitAmount)} later.
- Full: ${formatPrice(fullAmount)} upfront (save ${formatPrice(calculateTotalPrice(userSelections) - fullAmount)}).

Which works for you?`);
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
          
          setChatState(ChatState.PAYMENT_LINK);
          
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

  // Update current options based on chat state
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
          label: feature.name,
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
    setChatState(ChatState.EMAIL_SENT);
    
    setTimeout(() => {
      sendBotMessage(`Got it, ${values.name}! I'm preparing your custom quote for ${values.company}. Check your email at ${values.email} in a moment. Once you've reviewed it, click 'Confirm' on the email, and I'll show you the full quote here!`);
      
      // Show email sent notification
      toast({
        title: "Quote Sent!",
        description: `An email has been sent to ${values.email} with your custom quote.`,
      });
      
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

  return {
    messages,
    isTyping,
    chatState,
    currentOptions,
    allowMultipleSelection,
    selectedOptions,
    customGoal,
    setCustomGoal,
    submitGoals,
    submitFeatures,
    submitCustomizations,
    handleOption,
    sendUserMessage,
    onContactFormSubmit,
    userSelections
  };
};
