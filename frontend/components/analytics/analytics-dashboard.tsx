"use client";

import AnalyticsHeader from "./analytics-header";
import KPICards from "./kpi-cards";
import TrendChart from "./trend-chart";
import PredictionPanel from "./prediction-panel";
import ZoneComparison from "./zone-comparison";
import AQIDistribution from "./aqi-distribution";
import AnalyticsTable from "./analytics-table";

import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsDashboard() {
  const {
    analytics,
    loading,
    refresh,
  } = useAnalytics();

  return (
    <div className="space-y-8">

      {/* Header */}
      <AnalyticsHeader refresh={refresh} />

      {/* KPI Cards */}
      <KPICards
        analytics={analytics}
        loading={loading}
      />

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <TrendChart
            analytics={analytics}
            loading={loading}
          />
        </div>

        <PredictionPanel
          analytics={analytics}
          loading={loading}
        />

      </div>

      {/* Zone Comparison + AQI */}
      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <ZoneComparison
            analytics={analytics}
            loading={loading}
          />
        </div>

        <AQIDistribution
          analytics={analytics}
          loading={loading}
        />

      </div>

      {/* Table */}
      <AnalyticsTable
        analytics={analytics}
        loading={loading}
      />

    </div>
  );
}