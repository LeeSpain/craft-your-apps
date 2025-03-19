
import React from 'react';
import { Message } from './types';

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
  message
}) => {
  // Helper function to render HTML content safely
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  // Helper function to convert markdown-like syntax and clean price values
  const formatContent = (content: string) => {
    if (content.includes('<div') || content.includes('<button')) {
      return content; // Already HTML, don't process
    }
    
    // Remove price values from feature descriptions
    let formatted = content.replace(/: \$\d+(,\d+)?/g, '');
    
    // Process markdown headings and bold text
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2 text-blue-800">$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-3 mb-1 text-blue-700">$1</h3>');
    
    // Format lists, removing any price mentions
    formatted = formatted.replace(/^- (.*?)(?:: \$\d+(,\d+)?)?$/gm, '<div class="flex gap-2 py-1"><span class="text-blue-600">•</span><span>$1</span></div>');
    
    // Format line breaks
    formatted = formatted.replace(/\n\n/g, '<div class="my-2"></div>');
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
          <div dangerouslySetInnerHTML={createMarkup(formatContent(message.content))} className="chat-message-content" />
        )}
      </div>
    </div>
  );
};
