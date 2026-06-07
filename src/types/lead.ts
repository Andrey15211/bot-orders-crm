export const leadStatuses = [
  "new",
  "contacted",
  "in_progress",
  "paid",
  "completed",
  "rejected",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const botTypes = [
  "booking_bot",
  "order_bot",
  "faq_bot",
  "notification_bot",
  "simple_crm_bot",
  "telegram_shop_bot",
] as const;

export type BotType = (typeof botTypes)[number];

export const businessTypes = [
  "beauty",
  "food",
  "education",
  "retail",
  "services",
  "healthcare",
  "real_estate",
  "other",
] as const;

export type BusinessType = (typeof businessTypes)[number];

export const botFeatures = [
  "payments",
  "admin_panel",
  "crm_integration",
  "notifications",
  "analytics",
  "multilingual",
] as const;

export type BotFeature = (typeof botFeatures)[number];

export type BudgetRange =
  | "under_50000"
  | "50000_100000"
  | "100000_200000"
  | "over_200000";

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  businessType: BusinessType;
  botType: BotType;
  features: BotFeature[];
  budgetRange: BudgetRange;
  deadline: string;
  comment: string;
  status: LeadStatus;
  createdAt: string;
  estimatedPrice?: number;
  notes: LeadNote[];
}
