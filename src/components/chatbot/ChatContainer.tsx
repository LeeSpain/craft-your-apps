
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message, ChatState } from './types';
import { ContactForm } from './ContactForm';
import { ContactFormData } from './types';
import { MessageOptions } from './MessageOptions';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatState: ChatState;
  onContactFormSubmit: (values: ContactFormData) => void;
  currentOptions: any[];
  allowMultipleSelection: boolean;
  selectedOptions: any;
  customGoal: string;
  setCustomGoal: (value: string) => void;
  submitGoals: () => void;
  submitFeatures: () => void;
  submitCustomizations: () => void;
  handleOption: (option: any) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping,
  messagesEndRef,
  chatState,
  onContactFormSubmit,
  currentOptions,
  allowMultipleSelection,
  selectedOptions,
  customGoal,
  setCustomGoal,
  submitGoals,
  submitFeatures,
  submitCustomizations,
  handleOption
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
        />
      ))}
      
      {currentOptions.length > 0 && (
        <MessageOptions
          options={currentOptions}
          chatState={chatState}
          handleOption={handleOption}
          selectedOptions={selectedOptions}
          customGoal={customGoal}
          setCustomGoal={setCustomGoal}
          submitGoals={submitGoals}
          submitFeatures={submitFeatures}
          submitCustomizations={submitCustomizations}
        />
      )}
      
      {isTyping && (
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
      )}
      
      {chatState === ChatState.COLLECT_DETAILS && messages.length > 0 && (
        <ContactForm onSubmit={onContactFormSubmit} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
