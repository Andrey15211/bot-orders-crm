import { AdminShell } from "@/components/admin/admin-shell";
import { LeadProvider } from "@/components/providers/lead-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LeadProvider>
      <AdminShell>{children}</AdminShell>
    </LeadProvider>
  );
}
