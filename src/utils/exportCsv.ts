import type {Lead} from "@/types/lead";

export interface CsvDictionary {
  headers: string[];
  status: (key: Lead["status"]) => string;
  botType: (key: Lead["botType"]) => string;
  businessType: (key: Lead["businessType"]) => string;
  feature: (key: Lead["features"][number]) => string;
  budget: (key: Lead["budgetRange"]) => string;
  locale: string;
}

function escapeCell(value: string | number): string {
  const normalized = String(value).replaceAll('"', '""');
  return `"${normalized}"`;
}

export function leadsToCsv(leads: Lead[], dictionary: CsvDictionary): string {
  const rows = leads.map((lead) => [
    new Date(lead.createdAt).toLocaleDateString(dictionary.locale),
    lead.name,
    lead.contact,
    dictionary.businessType(lead.businessType),
    dictionary.botType(lead.botType),
    lead.features.map(dictionary.feature).join(", "),
    dictionary.budget(lead.budgetRange),
    new Date(`${lead.deadline}T00:00:00`).toLocaleDateString(dictionary.locale),
    dictionary.status(lead.status),
    lead.comment,
    lead.estimatedPrice ?? "",
  ]);

  return `\uFEFF${[dictionary.headers, ...rows]
    .map((row) => row.map(escapeCell).join(";"))
    .join("\r\n")}`;
}

export function downloadLeadsCsv(
  leads: Lead[],
  dictionary: CsvDictionary,
): void {
  const blob = new Blob([leadsToCsv(leads, dictionary)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `telegram-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
