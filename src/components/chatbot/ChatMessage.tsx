
import React from 'react';
import { Message } from './types';
import { MessageOptions } from './MessageOptions';

interface ChatMessageProps {
  message: Message;
  handleOption: (option: any) => void;
  chatState: number;
  selectedOptions: any;
  submitGoals: () => void;
  submitFeatures: () => void;
  submitCustomizations: () => void;
  customGoal: string;
  setCustomGoal: (value: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  handleOption, 
  chatState, 
  selectedOptions,
  submitGoals,
  submitFeatures,
  submitCustomizations,
  customGoal,
  setCustomGoal
}) => {
  // Helper function to render HTML content safely
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          message.sender === 'bot' 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-blue-600 text-white'
        }`}
      >
        {message.content.includes('<div') ? (
          <div dangerouslySetInnerHTML={createMarkup(message.content)} />
        ) : (
          <p className="whitespace-pre-line">{message.content}</p>
        )}
        
        {message.options && (
          <MessageOptions 
            options={message.options}
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
      </div>
    </div>
  );
};
