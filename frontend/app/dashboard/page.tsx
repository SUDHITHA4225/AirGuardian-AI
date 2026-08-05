import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricsGrid from "@/components/dashboard/metrics-grid";
import DashboardGrid from "@/components/dashboard/dashboard-grid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <MetricsGrid />
      <DashboardGrid />
    </div>
  );
}