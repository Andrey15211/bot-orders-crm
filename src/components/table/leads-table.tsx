"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownUp,
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {useFormatter, useLocale, useTranslations} from "next-intl";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/table/status-badge";
import {Link} from "@/i18n/navigation";
import {
  businessTypes,
  leadStatuses,
  type Lead,
  type LeadStatus,
} from "@/types/lead";
import { downloadLeadsCsv } from "@/utils/exportCsv";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const t = useTranslations("Table");
  const labels = useTranslations("Labels");
  const csv = useTranslations("Csv");
  const locale = useLocale();
  const format = useFormatter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [business, setBusiness] = useState("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("ru");
    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.name.toLocaleLowerCase("ru").includes(query) ||
        lead.contact.toLocaleLowerCase("ru").includes(query);
      const matchesStatus = status === "all" || lead.status === status;
      const matchesBusiness =
        business === "all" || lead.businessType === business;
      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [business, leads, search, status]);

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("client"),
        cell: ({ row }) => (
          <div>
            <Link
              href={`/admin/leads/${row.original.id}`}
              className="font-semibold text-slate-900 hover:text-primary-600"
            >
              {row.original.name}
            </Link>
            <p className="mt-0.5 text-xs text-slate-400">{row.original.contact}</p>
          </div>
        ),
      },
      {
        accessorKey: "businessType",
        header: t("business"),
        cell: ({ row }) => (
          <span className="text-slate-600">
            {labels(`businessTypes.${row.original.businessType}`)}
          </span>
        ),
      },
      {
        accessorKey: "botType",
        header: t("solution"),
        cell: ({ row }) => (
          <span className="text-slate-700">
            {labels(`botTypes.${row.original.botType}`)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 hover:text-slate-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("date")}
            <ArrowDownUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-slate-500">
            {format.dateTime(new Date(row.original.createdAt), {dateStyle: "medium"})}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/admin/leads/${row.original.id}`}
            aria-label={t("openLead", {name: row.original.name})}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ),
      },
    ],
    [format, labels, t],
  );

  const table = useReactTable({
    data: filteredLeads,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const hasFilters = search || status !== "all" || business !== "all";

  return (
    <section id="leads" className="panel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">{t("title")}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {t("found", {filtered: filteredLeads.length, total: leads.length})}
          </p>
        </div>
        <button
          type="button"
          className="button-secondary"
          onClick={() =>
            downloadLeadsCsv(filteredLeads, {
              headers: [
                csv("date"),
                csv("name"),
                csv("contact"),
                csv("business"),
                csv("botType"),
                csv("features"),
                csv("budget"),
                csv("deadline"),
                csv("status"),
                csv("comment"),
                csv("estimate"),
              ],
              status: (key) => labels(`statuses.${key}`),
              botType: (key) => labels(`botTypes.${key}`),
              businessType: (key) => labels(`businessTypes.${key}`),
              feature: (key) => labels(`features.${key}`),
              budget: (key) => labels(`budgets.${key}`),
              locale,
            })
          }
          disabled={filteredLeads.length === 0}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {t("export")}
        </button>
      </div>

      <div className="grid gap-3 border-b border-line bg-slate-50/60 p-4 md:grid-cols-[minmax(240px,1fr)_190px_190px]">
        <label className="relative">
          <span className="sr-only">{t("search")}</span>
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            className="field pl-9"
            placeholder={t("search")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">{t("status")}</span>
          <select
            className="field"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as LeadStatus | "all")
            }
          >
            <option value="all">{t("allStatuses")}</option>
            {leadStatuses.map((value) => (
              <option key={value} value={value}>
                {labels(`statuses.${value}`)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">{t("business")}</span>
          <select
            className="field"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
          >
            <option value="all">{t("allBusinesses")}</option>
            {businessTypes.map((value) => (
              <option key={value} value={value}>
                {labels(`businessTypes.${value}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <SlidersHorizontal className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-semibold text-slate-900">{t("emptyTitle")}</h3>
          <p className="mt-1.5 max-w-sm text-sm text-slate-500">
            {t("emptyText")}
          </p>
          {hasFilters ? (
            <button
              type="button"
              className="button-secondary mt-5"
              onClick={() => {
                setSearch("");
                setStatus("all");
                setBusiness("all");
              }}
            >
              {t("resetFilters")}
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] border-collapse text-left text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-line">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="bg-white px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-line last:border-0 hover:bg-slate-50/70"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-4 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-line md:hidden">
            {table.getRowModel().rows.map((row) => {
              const lead = row.original;
              return (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block p-4 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {lead.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {lead.contact}
                      </p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-700">
                        {labels(`botTypes.${lead.botType}`)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {labels(`businessTypes.${lead.businessType}`)}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      {format.dateTime(new Date(lead.createdAt), {dateStyle: "medium"})}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
