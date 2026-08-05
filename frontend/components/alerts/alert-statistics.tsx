"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";

import type { Alert } from "@/lib/alerts";

interface AlertStatisticsProps {
  alerts: Alert[];
  loading: boolean;
}

export default function AlertStatistics({
  alerts,
  loading,
}: AlertStatisticsProps) {
  if (loading) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading statistics...
        </p>
      </div>
    );
  }

  const critical = alerts.filter(
    (a) => a.severity === "Critical"
  ).length;

  const warning = alerts.filter(
    (a) => a.severity === "Warning"
  ).length;

  const info = alerts.filter(
    (a) => a.severity === "Info"
  ).length;

  const resolved = alerts.filter(
    (a) => a.status === "Resolved"
  ).length;

  const severityData = [
    {
      name: "Critical",
      value: critical,
    },
    {
      name: "Warning",
      value: warning,
    },
    {
      name: "Info",
      value: info,
    },
  ];

  const responseTrend = alerts.map(
    (alert, index) => ({
      day: `#${index + 1}`,
      time:
        alert.status === "Resolved"
          ? 2
          : alert.status ===
            "Acknowledged"
          ? 4
          : 6,
    })
  );

  const resolutionRate =
    alerts.length === 0
      ? 0
      : Math.round(
          (resolved /
            alerts.length) *
            100
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Alert Statistics
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Incident Performance
          </h2>

        </div>

        <BarChart3
          className="text-sky-400"
          size={28}
        />

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Severity */}

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-4">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Alert Severity
          </h3>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={severityData}
              >

                <CartesianGrid
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0f172a",
                    border:
                      "1px solid #334155",
                    borderRadius: 12,
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#ef4444"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Response Trend */}

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-4">

          <h3 className="mb-4 text-lg font-semibold text-white">
            Response Trend
          </h3>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={responseTrend}
              >

                <CartesianGrid
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0f172a",
                    border:
                      "1px solid #334155",
                    borderRadius: 12,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 text-center">

          <p className="text-sm text-slate-400">
            Resolution Rate
          </p>

          <h3 className="mt-2 text-3xl font-bold text-emerald-400">
            {resolutionRate}%
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 text-center">

          <p className="text-sm text-slate-400">
            Active Alerts
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-400">
            {alerts.length - resolved}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 text-center">

          <p className="text-sm text-slate-400">
            Total Alerts
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {alerts.length}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 text-center">

          <p className="text-sm text-slate-400">
            AI Accuracy
          </p>

          <h3 className="mt-2 text-3xl font-bold text-violet-400">
            97%
          </h3>

        </div>

      </div>

    </motion.div>
  );
}