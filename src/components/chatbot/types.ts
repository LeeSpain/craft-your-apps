
import { z } from "zod";

export interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  options?: ChatOption[];
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
  selected?: boolean;
}

export enum ChatState {
  START,
  ASK_INDUSTRY,
  ASK_GOALS,
  ASK_FEATURES,
  ASK_CUSTOMIZATION,
  COLLECT_DETAILS,
  EMAIL_SENT,
  SHOW_QUOTE,
  PAYMENT_OPTIONS,
  PAYMENT_LINK,
  THANK_YOU,
}

export interface UserSelections {
  industry: string;
  goals: string[];
  features: string[];
  customizations: {
    userAccounts: boolean;
    integrations: string[];
    designStyle: string;
  };
  contactInfo: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  quoteConfirmed: boolean;
  paymentOption: 'split' | 'full' | null;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const INDUSTRY_OPTIONS = [
  { id: 'hairdresser', label: 'Hairdressers & Barbershops', value: 'Hairdressers & Barbershops' },
  { id: 'petcare', label: 'Pet Care Services', value: 'Pet Care Services' },
  { id: 'realestate', label: 'Real Estate Agents', value: 'Real Estate Agents' },
  { id: 'cafe', label: 'Cafés & Small Restaurants', value: 'Cafés & Small Restaurants' },
  { id: 'fitness', label: 'Fitness Trainers & Small Gyms', value: 'Fitness Trainers & Small Gyms' },
  { id: 'events', label: 'Event Planners', value: 'Event Planners' },
  { id: 'homeservices', label: 'Home Services', value: 'Home Services' },
  { id: 'retail', label: 'Retail Shops', value: 'Retail Shops' },
  { id: 'education', label: 'Tutors & Educators', value: 'Tutors & Educators' },
  { id: 'auto', label: 'Auto Repair & Detailing', value: 'Auto Repair & Detailing' },
];

export const GOALS_OPTIONS = [
  { id: 'bookings', label: 'Streamline bookings and scheduling', value: 'Streamline bookings and scheduling' },
  { id: 'connect', label: 'Connect with clients through chat', value: 'Connect with clients through chat' },
  { id: 'recommendations', label: 'Provide AI-powered recommendations', value: 'Provide AI-powered recommendations' },
  { id: 'notifications', label: 'Send notifications and reminders', value: 'Send notifications and reminders' },
  { id: 'other', label: 'Something else (please specify)', value: 'custom' },
];

export const DESIGN_STYLE_OPTIONS = [
  { id: 'modern', label: 'Modern', value: 'Modern' },
  { id: 'minimalist', label: 'Minimalist', value: 'Minimalist' },
  { id: 'bold', label: 'Bold', value: 'Bold' },
  { id: 'standard', label: 'Standard', value: 'Standard' },
];

export const INTEGRATION_OPTIONS = [
  { id: 'calendar', label: 'Calendar (Google, Apple, etc.)', value: 'Calendar' },
  { id: 'payment', label: 'Payment Systems (Stripe, PayPal)', value: 'Payment Systems' },
  { id: 'social', label: 'Social Media', value: 'Social Media' },
  { id: 'maps', label: 'Maps & Location Services', value: 'Maps & Location' },
];
