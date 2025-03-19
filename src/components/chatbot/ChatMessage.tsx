
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

  // Helper function to convert markdown-like syntax
  const formatContent = (content: string) => {
    if (content.includes('<div') || content.includes('<button')) {
      return content; // Already HTML, don't process
    }
    
    // Process markdown headings and bold text
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-lg font-bold mt-3 mb-2">$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3 class="text-md font-bold mt-2 mb-1">$1</h3>');
    
    // Convert line breaks to <br> tags
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  return (
    <div className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}>
      <div 
        className={`rounded-lg px-4 py-3 max-w-[85%] shadow-sm ${
          message.sender === 'bot' 
            ? 'bg-white border border-gray-200 text-gray-800' 
            : 'bg-blue-600 text-white'
        }`}
      >
        {message.content.includes('<div') || message.content.includes('<button') ? (
          <div dangerouslySetInnerHTML={createMarkup(message.content)} />
        ) : (
          <div dangerouslySetInnerHTML={createMarkup(formatContent(message.content))} />
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
