
import { z } from "zod";

// Define the form schema with Zod
export const formSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  features: z.array(z.string()).optional(),
  customIndustry: z.string().optional(),
  paymentPlan: z.string({
    required_error: "Please select a payment plan",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

// Feature data structure
export interface Feature {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// Industry data structure
export interface Industry {
  id: string;
  name: string;
  basePrice: number;
  baseFeatures: string[];
  addOns: Feature[];
}

export interface QuoteDetails {
  basePrice: number;
  addOns: {name: string; price: number}[];
  totalPrice: number;
  deposit: number;
  remaining: number;
  monthlyPayment?: number;
  discount?: number;
  finalPrice?: number;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
}
