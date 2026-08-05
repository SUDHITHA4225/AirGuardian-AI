import LiveChart from "./live-chart";
import AIPanel from "./ai-panel";
import AlertsPanel from "./alerts-panel";
import HealthPanel from "./device-health";
import IncidentPanel from "./incident-panel";

export default function DashboardGrid() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">

      {/* Left Column */}
      <div className="space-y-6 lg:col-span-2">
        <LiveChart />
        <IncidentPanel />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <AIPanel />
        <HealthPanel />
        <AlertsPanel />
      </div>

    </div>
  );
}