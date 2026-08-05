"use client";

import DashboardHeader from "./dashboard-header";
import MetricsGrid from "./metrics-grid";
import DigitalTwin from "./digital-twin";
import AIPanel from "./ai-panel";
import LiveChart from "./live-chart";
import AnalyticsPanel from "./analytics-panel";
import DeviceHealth from "./device-health";
import AIChat from "./ai-chat";
import AlertsPanel from "./alerts-panel";

export default function DashboardLayout() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader />

      {/* Top Metrics */}
      <MetricsGrid />

      {/* Digital Twin + AI Recommendation */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DigitalTwin />
        </div>

        <div>
          <AIPanel />
        </div>
      </div>

      {/* Live Analytics + Summary */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LiveChart />
        </div>

        <div>
          <AnalyticsPanel />
        </div>
      </div>

      {/* Device Health + AI Chat */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <DeviceHealth />
        </div>

        <div className="xl:col-span-2">
          <AIChat />
        </div>
      </div>

      {/* Alerts */}
      <AlertsPanel />
    </div>
  );
}