"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {useLocale} from "next-intl";
import {getMockLeads} from "@/data/mockLeads";
import type { Lead, LeadNote, LeadStatus } from "@/types/lead";

const customLeadsKey = "bot-orders-crm:custom-leads";
const overridesKey = "bot-orders-crm:overrides";

type LeadOverrides = Record<string, Partial<Lead>>;

interface LeadContextValue {
  leads: Lead[];
  isLoading: boolean;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  addNote: (id: string, text: string) => void;
  setStatus: (id: string, status: LeadStatus) => void;
  resetDemo: () => void;
}

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const mockLeads = useMemo(() => getMockLeads(locale), [locale]);
  const [customLeads, setCustomLeads] = useState<Lead[]>([]);
  const [overrides, setOverrides] = useState<LeadOverrides>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setCustomLeads(
        JSON.parse(window.localStorage.getItem(customLeadsKey) ?? "[]"),
      );
      setOverrides(
        JSON.parse(window.localStorage.getItem(overridesKey) ?? "{}"),
      );
    } catch {
      setCustomLeads([]);
      setOverrides({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  const leads = useMemo(
    () =>
      [...customLeads, ...mockLeads].map((lead) => ({
        ...lead,
        ...overrides[lead.id],
      })),
    [customLeads, mockLeads, overrides],
  );

  const updateLead = useCallback((id: string, patch: Partial<Lead>) => {
    setOverrides((current) => {
      const next = { ...current, [id]: { ...current[id], ...patch } };
      window.localStorage.setItem(overridesKey, JSON.stringify(next));
      return next;
    });
  }, []);

  const addNote = useCallback(
    (id: string, text: string) => {
      const lead = leads.find((item) => item.id === id);
      if (!lead) return;
      const note: LeadNote = {
        id: `note-${crypto.randomUUID()}`,
        text,
        createdAt: new Date().toISOString(),
      };
      updateLead(id, { notes: [note, ...lead.notes] });
    },
    [leads, updateLead],
  );

  const setStatus = useCallback(
    (id: string, status: LeadStatus) => updateLead(id, { status }),
    [updateLead],
  );

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(customLeadsKey);
    window.localStorage.removeItem(overridesKey);
    setCustomLeads([]);
    setOverrides({});
  }, []);

  return (
    <LeadContext.Provider
      value={{ leads, isLoading, updateLead, addNote, setStatus, resetDemo }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used inside LeadProvider");
  }
  return context;
}
