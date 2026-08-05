"use client";

import { useEffect } from "react";
import {
  Wind,
  Thermometer,
  Droplets,
  Cpu,
  ShieldCheck,
  Database,
} from "lucide-react";

import MetricCard from "./metric-card";
import { useDashboard } from "@/hooks/useDashboard";

export default function MetricsGrid() {
  const {
    data,
    loading,
    error,
    refresh,
  } = useDashboard();

  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(timer);
  }, [refresh]);

  if (loading && !data) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-700 bg-red-900/20 p-6">
        <h2 className="text-lg font-semibold text-red-400">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-slate-300">
          {error}
        </p>

        <button
          onClick={refresh}
          className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const metrics = [
    {
      title: "Devices",
      value: data?.total_devices ?? "--",
      status: "Registered",
      icon: Cpu,
      color: "text-blue-500",
    },
    {
      title: "Sensor Readings",
      value: data?.total_readings ?? "--",
      status: "Recorded",
      icon: Database,
      color: "text-indigo-500",
    },
    {
      title: "Active Alerts",
      value: data?.active_alerts ?? "--",
      status:
        (data?.active_alerts ?? 0) > 0
          ? "Attention"
          : "Normal",
      icon: ShieldCheck,
      color:
        (data?.active_alerts ?? 0) > 0
          ? "text-red-500"
          : "text-green-500",
    },
    {
      title: "Temperature",
      value:
        data?.latest_reading?.temperature != null
          ? `${data.latest_reading.temperature} °C`
          : "--",
      status: "Live",
      icon: Thermometer,
      color: "text-orange-500",
    },
    {
      title: "Humidity",
      value:
        data?.latest_reading?.humidity != null
          ? `${data.latest_reading.humidity}%`
          : "--",
      status: "Live",
      icon: Droplets,
      color: "text-cyan-500",
    },
    {
      title: "Gas Level",
      value:
        data?.latest_reading?.gas_level != null
          ? `${data.latest_reading.gas_level} ppm`
          : "--",
      status: "Live",
      icon: Wind,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          Auto refresh every 5 seconds
        </p>

        <button
          onClick={refresh}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          Refresh
        </button>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={String(metric.value)}
            status={metric.status}
            icon={metric.icon}
            color={metric.color}
          />
        ))}

      </div>

    </div>
  );
}