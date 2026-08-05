"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Download,
  RefreshCw,
  Activity,
} from "lucide-react";

import { AnalyticsAPI } from "@/lib/analytics";

interface AnalyticsHeaderProps {
  refresh: () => Promise<void>;
}

export default function AnalyticsHeader({
  refresh,
}: AnalyticsHeaderProps) {
  async function handleRefresh() {
    await refresh();
  }

  function handleExport() {
    AnalyticsAPI.exportCSV();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <BarChart3
              className="text-sky-400"
              size={30}
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                Analytics
              </p>

              <h1 className="mt-1 text-3xl font-bold text-white">
                AirGuardian AI Analytics
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-400">
            Analyse historical air quality trends,
            environmental conditions,
            AI predictions and industrial safety insights
            generated from your IoT sensor network.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">

          {/* Date */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-5 py-3">

            <CalendarDays
              className="text-sky-400"
              size={20}
            />

            <div>
              <p className="text-xs text-slate-400">
                Date Range
              </p>

              <p className="font-semibold text-white">
                Last 30 Days
              </p>
            </div>

          </div>

          {/* Status */}
          <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">

            <Activity
              className="text-green-400"
              size={20}
            />

            <div>
              <p className="text-xs text-slate-400">
                Analytics
              </p>

              <p className="font-semibold text-green-400">
                Live Data
              </p>
            </div>

          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-2xl bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
            <Download size={18} />
            Export CSV
          </button>

        </div>
      </div>
    </motion.div>
  );
}