"use client";

import { motion } from "framer-motion";
import {
  Siren,
  Activity,
  CalendarDays,
  RefreshCw,
  Download,
} from "lucide-react";

import { AlertAPI } from "@/lib/alerts";

interface AlertsHeaderProps {
  refresh: () => Promise<void>;
}

export default function AlertsHeader({
  refresh,
}: AlertsHeaderProps) {
  async function handleRefresh() {
    await refresh();
  }

  function handleExport() {
    AlertAPI.exportCSV();
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
            <div className="rounded-2xl bg-red-500/15 p-3">
              <Siren
                className="text-red-400"
                size={28}
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
                Incident Center
              </p>

              <h1 className="mt-1 text-3xl font-bold text-white">
                Alerts & Emergency Response
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-400">
            Monitor critical alerts, investigate incidents,
            and coordinate rapid responses across your
            industrial facility in real time.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">

          {/* Active Alerts */}
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3">
            <Activity
              className="text-red-400"
              size={20}
            />

            <div>
              <p className="text-xs text-slate-400">
                Active Alerts
              </p>

              <p className="font-semibold text-red-400">
                Live Monitoring
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-5 py-3">
            <CalendarDays
              className="text-sky-400"
              size={20}
            />

            <div>
              <p className="text-xs text-slate-400">
                Time Range
              </p>

              <p className="font-semibold text-white">
                Last 24 Hours
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
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
            <Download size={18} />
            Export CSV
          </button>

        </div>
      </div>
    </motion.div>
  );
}