
import { Industry, PaymentPlan } from './types';

// Industries data
export const INDUSTRIES: Industry[] = [
  {
    id: "hairdressers",
    name: "Hairdressers & Barbershops",
    basePrice: 7500,
    baseFeatures: [
      "Online booking",
      "Customer profiles",
      "Payment integration",
      "Automated reminders",
      "Service menu",
      "Staff management",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with points redeemable for discounts or free services." },
      { id: "products", name: "Product Sales", price: 500, description: "Sell products directly through the app." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track appointments, loyalty points, and purchase history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for updates and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "petcare",
    name: "Pet Care Services",
    basePrice: 9000,
    baseFeatures: [
      "Booking system",
      "Pet profiles",
      "Client portal",
      "Service catalog",
      "Staff scheduling",
      "Payment processing",
      "Basic reports"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with points redeemable for discounts or free services." },
      { id: "products", name: "Product Sales", price: 500, description: "Sell pet food and supplies directly through the app." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Pet owners can track appointments, vaccination records, and purchase history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for updates and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "realestate",
    name: "Real Estate Agents",
    basePrice: 37500,
    baseFeatures: [
      "Property listings",
      "Virtual tours",
      "Client inquiry form",
      "Appointment scheduler",
      "Property comparisons",
      "Document storage",
      "Basic analytics"
    ],
    addOns: [
      { id: "mortgage", name: "Mortgage Calculator", price: 500, description: "Help clients estimate payments based on different down payments and terms." },
      { id: "neighborhood", name: "Neighborhood Analysis", price: 1000, description: "Provide data on schools, crime rates, and amenities in the listing area." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can save favorites, track viewings, and manage documents." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications for new listings and updates." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "cafe",
    name: "Cafés & Small Restaurants",
    basePrice: 6500,
    baseFeatures: [
      "Digital menu",
      "Order ahead",
      "Table reservations",
      "Payment gateway",
      "Inventory tracking",
      "Staff scheduling",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat customers with points for free items." },
      { id: "delivery", name: "Delivery Integration", price: 1000, description: "Connect with local delivery services or offer your own delivery." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Customers can track orders, favorite items, and redemption history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "Push notifications for specials and promotions." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track food costs, popular items, and revenue by time of day." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "fitness",
    name: "Fitness Trainers & Small Gyms",
    basePrice: 8000,
    baseFeatures: [
      "Class booking",
      "Client progress tracking",
      "Payment integration",
      "Basic video library",
      "Membership management",
      "Trainer scheduling",
      "Basic analytics"
    ],
    addOns: [
      { id: "workouts", name: "Workout Builder", price: 1000, description: "Create and assign custom workout plans to clients." },
      { id: "nutrition", name: "Nutrition Tracking", price: 1000, description: "Allow clients to log meals and track macros." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track progress, book classes, and view assigned workouts." },
      { id: "streaming", name: "Live Streaming", price: 1500, description: "Host virtual classes through the app." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track attendance patterns, retention rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "events",
    name: "Event Planners",
    basePrice: 10000,
    baseFeatures: [
      "Task checklists",
      "RSVP management",
      "Budget tracker",
      "Vendor management",
      "Timeline builder",
      "Client portal",
      "Basic analytics"
    ],
    addOns: [
      { id: "seating", name: "Seating Planner", price: 1000, description: "Interactive drag-and-drop seating chart creation." },
      { id: "vendors", name: "Vendor Marketplace", price: 1500, description: "Connect clients with florists, caterers, photographers, etc." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track progress, approve vendors, and manage guest lists." },
      { id: "communication", name: "Guest Communication", price: 500, description: "Send updates and collect information from attendees." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track budget allocation, attendance rates, and vendor performance." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "home",
    name: "Home Services",
    basePrice: 7500,
    baseFeatures: [
      "Service booking",
      "Customer profiles",
      "Quote generator",
      "Payment processing",
      "Job scheduling",
      "Staff management",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward repeat clients with discounts or free services." },
      { id: "materials", name: "Materials Inventory", price: 1000, description: "Track parts and materials used for jobs." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Clients can track appointments, view service history, and pay invoices." },
      { id: "communication", name: "Communication Tools", price: 500, description: "SMS notifications for appointment reminders and tech arrival times." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track service efficiency, customer satisfaction, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "retail",
    name: "Retail Shops",
    basePrice: 8500,
    baseFeatures: [
      "Product catalog",
      "Shopping cart",
      "Payment processing",
      "Order management",
      "Inventory tracking",
      "Customer accounts",
      "Basic analytics"
    ],
    addOns: [
      { id: "loyalty", name: "Loyalty Program", price: 500, description: "Reward customers with points for purchases." },
      { id: "wishlist", name: "Wishlist Feature", price: 500, description: "Allow customers to save items for later." },
      { id: "dashboard", name: "Customer Dashboard", price: 500, description: "Customers can track orders, returns, and redemption history." },
      { id: "communication", name: "Communication Tools", price: 500, description: "Push notifications for sales and new arrivals." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track purchase patterns, inventory turnover, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  },
  {
    id: "other",
    name: "Other",
    basePrice: 10000,
    baseFeatures: [
      "Basic user accounts",
      "Admin dashboard",
      "Content management",
      "Basic search",
      "Notification system",
      "Payment integration",
      "Basic analytics"
    ],
    addOns: [
      { id: "custom1", name: "Custom Feature 1", price: 1000, description: "Tailored to your specific business needs." },
      { id: "custom2", name: "Custom Feature 2", price: 1000, description: "Tailored to your specific business needs." },
      { id: "dashboard", name: "User Dashboard", price: 500, description: "Personalized user experience with account management." },
      { id: "communication", name: "Communication Tools", price: 500, description: "In-app messaging or email notifications." },
      { id: "analytics", name: "Advanced Analytics", price: 1000, description: "Track user behavior, conversion rates, and revenue trends." },
      { id: "multilingual", name: "Multilingual Support", price: 1000, description: "Offer the app in multiple languages (e.g., Spanish, English, French)." },
      { id: "branding", name: "Custom Branding", price: 500, description: "Match the app's design to your company's branding." }
    ]
  }
];

// Payment plans
export const PAYMENT_PLANS: PaymentPlan[] = [
  { id: "full", name: "Full Payment (5% discount)", description: "Pay the total upfront and get a 5% discount" },
  { id: "monthly", name: "Monthly Payments", description: "30% deposit to start, then monthly payments over 6-12 months" },
  { id: "milestone", name: "Milestone Payments", description: "30% deposit to start, then payments at key project stages" }
];
