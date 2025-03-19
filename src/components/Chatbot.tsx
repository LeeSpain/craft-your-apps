
import { useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare, X } from 'lucide-react';
import { ChatContainer } from './chatbot/ChatContainer';
import { ChatInput } from './chatbot/ChatInput';
import { ChatState } from './chatbot/types';
import { useChatbotState } from './chatbot/hooks/useChatbotState';

const Chatbot = () => {
  const { isChatbotOpen, closeChatbot, openChatbot } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
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
    onContactFormSubmit
  } = useChatbotState();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-lg shadow-xl flex flex-col glass-card animate-scale-in">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <h3 className="font-semibold text-lg">AIAppCrafter</h3>
          <button 
            onClick={closeChatbot}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
          onContactFormSubmit={onContactFormSubmit}
          currentOptions={currentOptions}
          allowMultipleSelection={allowMultipleSelection}
          selectedOptions={selectedOptions}
          customGoal={customGoal}
          setCustomGoal={setCustomGoal}
          submitGoals={submitGoals}
          submitFeatures={submitFeatures}
          submitCustomizations={submitCustomizations}
          handleOption={handleOption}
        />
        
        {/* Input area */}
        <ChatInput onSubmit={sendUserMessage} />
      </div>
    </div>
  );
};

export default Chatbot;
