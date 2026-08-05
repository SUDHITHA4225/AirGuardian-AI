"use client";

import MonitoringHeader from "./monitoring-header";
import LiveSensors from "./live-sensors";
import FactoryMap from "./factory-map";
import EmergencyPanel from "./emergency-panel";
import MonitoringChart from "./monitoring-chart";
import SensorTable from "./sensor-table";

export default function MonitoringDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <MonitoringHeader />

      {/* Live Sensor Cards */}
      <LiveSensors />

      {/* Factory Map + Emergency */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FactoryMap />
        </div>

        <EmergencyPanel />
      </div>

      {/* Live Charts + Sensor Table */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MonitoringChart />
        </div>

        <SensorTable />
      </div>
    </div>
  );
}