import type { BotFeature, BotType } from "@/types/lead";

export const basePrices: Record<BotType, number> = {
  booking_bot: 70000,
  order_bot: 85000,
  faq_bot: 45000,
  notification_bot: 40000,
  simple_crm_bot: 110000,
  telegram_shop_bot: 130000,
};

export const featurePrices: Record<BotFeature, number> = {
  payments: 25000,
  admin_panel: 30000,
  crm_integration: 35000,
  notifications: 12000,
  analytics: 18000,
  multilingual: 20000,
};

export function calculateEstimatedPrice(
  botType: BotType,
  features: BotFeature[],
): number {
  return features.reduce(
    (total, feature) => total + featurePrices[feature],
    basePrices[botType],
  );
}

export function formatCurrency(value: number, locale = "ru"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}
