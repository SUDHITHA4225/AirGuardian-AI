"use client";

import AlertsHeader from "./alerts-header";
import AlertSummary from "./alert-summary";
import LiveAlerts from "./live-alerts";
import AIRootCause from "./ai-root-cause";
import AlertTimeline from "./alert-timeline";
import ResponseTeam from "./response-team";
import AlertStatistics from "./alert-statistics";

import { useAlerts } from "@/hooks/useAlerts";

export default function AlertsDashboard() {
  const {
    alerts,
    loading,
    refresh,
    selectedAlert,
    setSelectedAlert,
  } = useAlerts();

  return (
    <div className="space-y-8">

      {/* Header */}
      <AlertsHeader refresh={refresh} />

      {/* Summary */}
      <AlertSummary
        alerts={alerts}
        loading={loading}
      />

      {/* Live Alerts + AI */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <LiveAlerts
            alerts={alerts}
            loading={loading}
            selectedAlert={selectedAlert}
            onSelect={setSelectedAlert}
            refresh={refresh}
          />
        </div>

        <AIRootCause
          alert={selectedAlert}
          loading={loading}
        />

      </div>

      {/* Timeline + Response Team */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AlertTimeline
            alerts={alerts}
            loading={loading}
          />
        </div>

        <ResponseTeam
          alert={selectedAlert}
        />

      </div>

      {/* Statistics */}
      <AlertStatistics
        alerts={alerts}
        loading={loading}
      />

    </div>
  );
}