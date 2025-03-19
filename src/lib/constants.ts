
export interface AppData {
  id: string;
  name: string;
  shortDescription: string;
  demoLink: string;
  price: number;
  image: string;
}

export const APPS: AppData[] = [
  {
    id: 'move-sync',
    name: 'Move-Sync',
    shortDescription: 'Streamline workplace commutes with shuttle tracking, desk booking, and parking.',
    demoLink: 'https://move-sync.com',
    price: 15000,
    image: '/placeholder.svg'
  },
  {
    id: 'pawpal',
    name: 'Pawpal Booking Buddy',
    shortDescription: 'Simplify pet care with a booking system for grooming and more.',
    demoLink: 'https://pawpal.example.com',
    price: 10000,
    image: '/placeholder.svg'
  },
  {
    id: 'ai-spain-homes',
    name: 'AI Spain Homes',
    shortDescription: 'Find properties fast with a smart real estate app.',
    demoLink: 'https://aispain.example.com',
    price: 12000,
    image: '/placeholder.svg'
  },
  {
    id: 'ice-alarm',
    name: 'Ice Alarm Spain',
    shortDescription: 'Stay safe with real-time alerts for emergencies.',
    demoLink: 'https://icealarm.example.com',
    price: 8000,
    image: '/placeholder.svg'
  },
  {
    id: 'f1-mates',
    name: 'F1 Mates',
    shortDescription: 'Connect F1 fans with race updates and community features.',
    demoLink: 'https://f1mates.example.com',
    price: 7000,
    image: '/placeholder.svg'
  }
];

export interface CustomFeature {
  id: string;
  name: string;
  price: number;
}

export const CUSTOM_FEATURES: CustomFeature[] = [
  {
    id: 'ai-recommendations',
    name: 'AI Recommendations',
    price: 20000
  },
  {
    id: 'chatroom',
    name: 'Chatroom',
    price: 10000
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    price: 20000
  },
  {
    id: 'notifications',
    name: 'Notifications',
    price: 5000
  },
  {
    id: 'multilingual',
    name: 'Multilingual',
    price: 10000
  }
];

export const BASE_PRICE = 30000;
