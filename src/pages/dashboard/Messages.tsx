
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, PaperclipIcon, User } from 'lucide-react';

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  
  // Mock conversation data
  const [conversations] = useState([
    {
      id: 1,
      contact: 'John Doe',
      role: 'Lead Developer',
      avatar: 'JD',
      messages: [
        {
          id: 1,
          content: 'Hi there! I wanted to give you an update on the app development progress.',
          sender: 'John Doe',
          timestamp: '10:30 AM',
          isRead: true,
        },
        {
          id: 2,
          content: 'That would be great! How is everything going?',
          sender: 'me',
          timestamp: '10:35 AM',
          isRead: true,
        },
        {
          id: 3,
          content: 'We\'re making good progress on the core features. The user authentication system is complete, and we\'re now working on the dashboard interface.',
          sender: 'John Doe',
          timestamp: '10:40 AM',
          isRead: true,
        },
        {
          id: 4,
          content: 'Would you like to schedule a call to go through the latest updates in more detail?',
          sender: 'John Doe',
          timestamp: '10:41 AM',
          isRead: true,
        },
      ],
    },
    {
      id: 2,
      contact: 'Jane Smith',
      role: 'UI/UX Designer',
      avatar: 'JS',
      messages: [
        {
          id: 1,
          content: 'I\'ve uploaded the new design mockups for the app. Could you review them when you have a moment?',
          sender: 'Jane Smith',
          timestamp: 'Yesterday',
          isRead: true,
        },
      ],
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row gap-6">
      {/* Conversations list */}
      <Card className="md:w-1/3">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Your conversations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium flex-shrink-0">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{conversation.contact}</h3>
                      <span className="text-xs text-gray-500">
                        {conversation.messages[conversation.messages.length - 1].timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active conversation */}
      <Card className="flex-1 flex flex-col h-full">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              JD
            </div>
            <div>
              <CardTitle className="text-lg">John Doe</CardTitle>
              <CardDescription>Lead Developer</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {conversations[0].messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="border-t p-4 bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-500"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
