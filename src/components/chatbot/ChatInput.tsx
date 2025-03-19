
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(userInput);
      setUserInput('');
      // Reset the submission state after a short delay
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  return (
    <div className="border-t bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mr-2 border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10 w-10 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
