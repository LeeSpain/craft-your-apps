
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChatOption, 
  ChatState, 
  INTEGRATION_OPTIONS, 
  DESIGN_STYLE_OPTIONS 
} from './types';
import { cn } from '@/lib/utils';

interface MessageOptionsProps {
  options: ChatOption[];
  chatState: number;
  handleOption: (option: ChatOption) => void;
  selectedOptions: any;
  customGoal: string;
  setCustomGoal: (value: string) => void;
  submitGoals: () => void;
  submitFeatures: () => void;
  submitCustomizations: () => void;
}

export const MessageOptions: React.FC<MessageOptionsProps> = ({
  options,
  chatState,
  handleOption,
  selectedOptions,
  customGoal,
  setCustomGoal,
  submitGoals,
  submitFeatures,
  submitCustomizations
}) => {
  switch (chatState) {
    case ChatState.ASK_INDUSTRY:
      return (
        <div className="grid grid-cols-1 gap-2 mt-2">
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => handleOption(option)}
              className={cn(
                "text-left px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors",
                selectedOptions.industry === option.value && "bg-blue-100 border-blue-300"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      );
      
    case ChatState.ASK_GOALS:
      return (
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 gap-2">
            {options.filter(o => o.id !== 'other').map(option => (
              <div 
                key={option.id}
                className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOption({...option, selected: !selectedOptions.goals.includes(option.value)})}
              >
                <Checkbox 
                  id={`goal-${option.id}`}
                  checked={selectedOptions.goals.includes(option.value)}
                  onCheckedChange={() => handleOption({...option, selected: !selectedOptions.goals.includes(option.value)})}
                />
                <label 
                  htmlFor={`goal-${option.id}`}
                  className="cursor-pointer flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
            
            {/* Custom goal option */}
            <div 
              className="flex items-start space-x-2 mt-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
            >
              <Checkbox 
                id="goal-other"
                checked={!!customGoal}
                onCheckedChange={(checked) => {
                  if (!checked) {
                    setCustomGoal('');
                  }
                }}
              />
              <div className="flex-1">
                <label 
                  htmlFor="goal-other"
                  className="cursor-pointer"
                >
                  Something else
                </label>
                {(customGoal || selectedOptions.goals.includes('custom')) && (
                  <Textarea 
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    className="mt-1 text-sm"
                    placeholder="Tell us what you need..."
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              size="sm"
              onClick={submitGoals}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>
        </div>
      );
      
    case ChatState.ASK_FEATURES:
      return (
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 gap-2">
            {options.map(option => (
              <div 
                key={option.id}
                className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOption({...option, selected: !selectedOptions.features.includes(option.id)})}
              >
                <Checkbox 
                  id={`feature-${option.id}`}
                  checked={selectedOptions.features.includes(option.id)}
                  onCheckedChange={() => handleOption({...option, selected: !selectedOptions.features.includes(option.id)})}
                />
                <label 
                  htmlFor={`feature-${option.id}`}
                  className="cursor-pointer flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              size="sm"
              onClick={submitFeatures}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>
        </div>
      );
      
    case ChatState.ASK_CUSTOMIZATION:
      const userAccountsOption = options.find(o => o.id === 'userAccounts');
      const integrationOptions = options.filter(o => INTEGRATION_OPTIONS.some(i => i.id === o.id));
      const designOptions = options.filter(o => DESIGN_STYLE_OPTIONS.some(s => s.id === o.id));
      
      return (
        <div className="space-y-4 mt-2">
          {/* User accounts option */}
          {userAccountsOption && (
            <div 
              className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleOption({...userAccountsOption, selected: !selectedOptions.userAccounts})}
            >
              <Checkbox 
                id={`customization-${userAccountsOption.id}`}
                checked={selectedOptions.userAccounts}
                onCheckedChange={() => handleOption({...userAccountsOption, selected: !selectedOptions.userAccounts})}
              />
              <label 
                htmlFor={`customization-${userAccountsOption.id}`}
                className="cursor-pointer flex-1"
              >
                {userAccountsOption.label}
              </label>
            </div>
          )}
          
          {/* Integrations section */}
          <div className="space-y-2">
            <p className="text-sm font-medium px-1">Integrations:</p>
            {integrationOptions.map(option => (
              <div 
                key={option.id}
                className="flex items-center space-x-2 ml-4 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOption({...option, selected: !selectedOptions.integrations.includes(option.value)})}
              >
                <Checkbox 
                  id={`integration-${option.id}`}
                  checked={selectedOptions.integrations.includes(option.value)}
                  onCheckedChange={() => handleOption({...option, selected: !selectedOptions.integrations.includes(option.value)})}
                />
                <label 
                  htmlFor={`integration-${option.id}`}
                  className="cursor-pointer flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          
          {/* Design style section */}
          <div className="space-y-2">
            <p className="text-sm font-medium px-1">Design Style:</p>
            {designOptions.map(option => (
              <div 
                key={option.id}
                className="flex items-center space-x-2 ml-4 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOption({...option, selected: selectedOptions.designStyle !== option.value})}
              >
                <Checkbox 
                  id={`design-${option.id}`}
                  checked={selectedOptions.designStyle === option.value}
                  onCheckedChange={() => handleOption({...option, selected: selectedOptions.designStyle !== option.value})}
                />
                <label 
                  htmlFor={`design-${option.id}`}
                  className="cursor-pointer flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              size="sm"
              onClick={submitCustomizations}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};
