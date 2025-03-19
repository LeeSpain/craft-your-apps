
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message, ChatState } from './types';
import { ContactForm } from './ContactForm';
import { ContactFormData } from './types';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatState: ChatState;
  handleOption: (option: any) => void;
  selectedOptions: any;
  submitGoals: () => void;
  submitFeatures: () => void;
  submitCustomizations: () => void;
  customGoal: string;
  setCustomGoal: (value: string) => void;
  onContactFormSubmit: (values: ContactFormData) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping,
  messagesEndRef,
  chatState,
  onContactFormSubmit
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          handleOption={() => {}}
          chatState={chatState}
          selectedOptions={{}}
          submitGoals={() => {}}
          submitFeatures={() => {}}
          submitCustomizations={() => {}}
          customGoal=""
          setCustomGoal={() => {}}
        />
      ))}
      
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
