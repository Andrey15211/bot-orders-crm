import type { Lead } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Анна Белова",
    contact: "@anna_nails_msk",
    businessType: "beauty",
    botType: "booking_bot",
    features: ["payments", "notifications", "admin_panel"],
    budgetRange: "100000_200000",
    deadline: "2026-07-10",
    comment: "Сеть из двух nail-студий. Нужна запись к мастерам, перенос визита и предоплата.",
    status: "new",
    createdAt: "2026-06-06T09:20:00.000Z",
    notes: [],
  },
  {
    id: "lead-002",
    name: "Илья Сафронов",
    contact: "+7 916 244-18-90",
    businessType: "food",
    botType: "order_bot",
    features: ["payments", "admin_panel", "notifications"],
    budgetRange: "100000_200000",
    deadline: "2026-07-01",
    comment: "Доставка обедов по бизнес-центрам. Меню меняется каждую неделю.",
    status: "contacted",
    createdAt: "2026-06-04T13:45:00.000Z",
    notes: [
      {
        id: "note-002-1",
        text: "Созвон назначен на 8 июня, запросить выгрузку текущего меню.",
        createdAt: "2026-06-05T08:30:00.000Z",
      },
    ],
  },
  {
    id: "lead-003",
    name: "Мария Жукова",
    contact: "@maria_english_pro",
    businessType: "education",
    botType: "notification_bot",
    features: ["notifications", "crm_integration", "analytics"],
    budgetRange: "50000_100000",
    deadline: "2026-06-28",
    comment: "Напоминания об уроках и домашней работе для онлайн-школы.",
    status: "in_progress",
    createdAt: "2026-05-29T10:10:00.000Z",
    estimatedPrice: 92000,
    notes: [
      {
        id: "note-003-1",
        text: "Получен доступ к тестовому аккаунту amoCRM.",
        createdAt: "2026-06-02T14:00:00.000Z",
      },
    ],
  },
  {
    id: "lead-004",
    name: "ООО «Северный дом»",
    contact: "@severdom_sales",
    businessType: "real_estate",
    botType: "simple_crm_bot",
    features: ["admin_panel", "crm_integration", "analytics"],
    budgetRange: "over_200000",
    deadline: "2026-07-25",
    comment: "Квалификация заявок на новостройки и распределение между менеджерами.",
    status: "paid",
    createdAt: "2026-05-21T07:55:00.000Z",
    estimatedPrice: 184000,
    notes: [
      {
        id: "note-004-1",
        text: "Аванс 50% получен. Согласован прототип анкеты.",
        createdAt: "2026-05-28T12:10:00.000Z",
      },
    ],
  },
  {
    id: "lead-005",
    name: "Виктор Ковалёв",
    contact: "+7 903 705-44-12",
    businessType: "retail",
    botType: "telegram_shop_bot",
    features: ["payments", "admin_panel", "analytics"],
    budgetRange: "100000_200000",
    deadline: "2026-05-30",
    comment: "Каталог локального бренда одежды, корзина и уведомления о заказе.",
    status: "completed",
    createdAt: "2026-04-18T15:30:00.000Z",
    estimatedPrice: 196000,
    notes: [
      {
        id: "note-005-1",
        text: "Проект передан, гарантийная поддержка до 30 июня.",
        createdAt: "2026-05-30T16:20:00.000Z",
      },
    ],
  },
  {
    id: "lead-006",
    name: "Клиника «МедЛайн»",
    contact: "@medline_admin",
    businessType: "healthcare",
    botType: "faq_bot",
    features: ["admin_panel", "multilingual"],
    budgetRange: "50000_100000",
    deadline: "2026-07-15",
    comment: "Ответы на частые вопросы и подготовка пациента к диагностике.",
    status: "new",
    createdAt: "2026-06-05T11:25:00.000Z",
    notes: [],
  },
  {
    id: "lead-007",
    name: "Денис Миронов",
    contact: "@dm_auto_service",
    businessType: "services",
    botType: "booking_bot",
    features: ["notifications"],
    budgetRange: "under_50000",
    deadline: "2026-06-20",
    comment: "Небольшой автосервис, нужна простая запись на свободное время.",
    status: "rejected",
    createdAt: "2026-05-27T17:40:00.000Z",
    notes: [
      {
        id: "note-007-1",
        text: "Бюджет ниже минимального для требуемой интеграции с расписанием.",
        createdAt: "2026-05-28T09:15:00.000Z",
      },
    ],
  },
  {
    id: "lead-008",
    name: "Ольга Романова",
    contact: "@romanova_cakes",
    businessType: "food",
    botType: "order_bot",
    features: ["payments", "notifications"],
    budgetRange: "50000_100000",
    deadline: "2026-07-05",
    comment: "Заказы тортов с выбором начинки, веса, даты и адреса доставки.",
    status: "contacted",
    createdAt: "2026-06-03T12:05:00.000Z",
    notes: [],
  },
];

const englishContent: Record<
  string,
  Pick<Lead, "name" | "comment" | "notes">
> = {
  "lead-001": {
    name: "Anna Belova",
    comment:
      "A two-location nail studio chain. They need specialist booking, rescheduling, and deposits.",
    notes: [],
  },
  "lead-002": {
    name: "Ilya Safronov",
    comment:
      "Business lunch delivery service. The menu changes every week.",
    notes: [
      {
        id: "note-002-1",
        text: "Call scheduled for June 8. Request an export of the current menu.",
        createdAt: "2026-06-05T08:30:00.000Z",
      },
    ],
  },
  "lead-003": {
    name: "Maria Zhukova",
    comment:
      "Lesson and homework reminders for an online language school.",
    notes: [
      {
        id: "note-003-1",
        text: "Received access to the amoCRM test account.",
        createdAt: "2026-06-02T14:00:00.000Z",
      },
    ],
  },
  "lead-004": {
    name: "North House LLC",
    comment:
      "Qualify new development inquiries and distribute them among sales managers.",
    notes: [
      {
        id: "note-004-1",
        text: "The 50% deposit was received. The questionnaire prototype was approved.",
        createdAt: "2026-05-28T12:10:00.000Z",
      },
    ],
  },
  "lead-005": {
    name: "Viktor Kovalev",
    comment:
      "Catalog for a local clothing brand with cart and order notifications.",
    notes: [
      {
        id: "note-005-1",
        text: "Project delivered. Warranty support runs through June 30.",
        createdAt: "2026-05-30T16:20:00.000Z",
      },
    ],
  },
  "lead-006": {
    name: "MedLine Clinic",
    comment:
      "Answers to common questions and preparation instructions for diagnostic procedures.",
    notes: [],
  },
  "lead-007": {
    name: "Denis Mironov",
    comment:
      "A small auto service needs a simple booking flow for available time slots.",
    notes: [
      {
        id: "note-007-1",
        text: "The budget is below the minimum for the requested schedule integration.",
        createdAt: "2026-05-28T09:15:00.000Z",
      },
    ],
  },
  "lead-008": {
    name: "Olga Romanova",
    comment:
      "Custom cake orders with filling, weight, date, and delivery address selection.",
    notes: [],
  },
};

export function getMockLeads(locale: string): Lead[] {
  if (locale !== "en") {
    return mockLeads;
  }

  return mockLeads.map((lead) => ({
    ...lead,
    ...englishContent[lead.id],
  }));
}
