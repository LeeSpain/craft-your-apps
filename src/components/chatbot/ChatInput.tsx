
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ChatInputProps {
  onSubmit: (content: string) => void;
  options?: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  allowMultipleSelection?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  options = [], 
  allowMultipleSelection = false 
}) => {
  const [userInput, setUserInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we have selected options, submit those instead of the text input
    if (options.length > 0 && selectedOptions.length > 0) {
      const selectedLabels = options
        .filter(option => selectedOptions.includes(option.id))
        .map(option => option.label)
        .join(', ');
      
      onSubmit(selectedLabels);
      setSelectedOptions([]);
    } else if (userInput.trim()) {
      // Otherwise submit the text input as usual
      onSubmit(userInput);
      setUserInput('');
    }
  };

  const handleOptionToggle = (value: string) => {
    if (allowMultipleSelection) {
      setSelectedOptions(prev => 
        prev.includes(value)
          ? prev.filter(id => id !== value)
          : [...prev, value]
      );
    } else {
      setSelectedOptions([value]);
      // For single selection, we can submit immediately
      const selectedOption = options.find(option => option.id === value);
      if (selectedOption) {
        onSubmit(selectedOption.label);
        setSelectedOptions([]);
      }
    }
  };

  return (
    <div className="border-t bg-gray-50">
      {options.length > 0 && (
        <div className="p-4 pb-0">
          {allowMultipleSelection ? (
            <ToggleGroup type="multiple" className="flex flex-col gap-2">
              {options.map(option => (
                <ToggleGroupItem
                  key={option.id}
                  value={option.id}
                  aria-label={option.label}
                  className="w-full justify-start text-left px-4 py-3 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-blue-50 transition-colors"
                  onClick={() => handleOptionToggle(option.id)}
                  data-state={selectedOptions.includes(option.id) ? "on" : "off"}
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          ) : (
            <RadioGroup className="flex flex-col gap-2">
              {options.map(option => (
                <div 
                  key={option.id}
                  className="flex items-center space-x-2 cursor-pointer w-full px-4 py-3 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-blue-50 transition-colors"
                  onClick={() => handleOptionToggle(option.id)}
                >
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                  />
                  <label htmlFor={option.id} className="w-full cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
          {allowMultipleSelection && selectedOptions.length > 0 && (
            <div className="flex justify-end mt-3 mb-4">
              <Button 
                size="sm"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center p-4">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mr-2 border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10 w-10 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
