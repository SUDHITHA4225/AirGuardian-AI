"use client";

import { motion } from "framer-motion";
import {
  Activity,
  RefreshCw,
  Wifi,
  CalendarDays,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function MonitoringHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Live Monitoring
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            AirGuardian AI
          </h1>

          <p className="mt-2 text-slate-400">
            AI-Powered Air Monitoring & Industrial Safety Assistant
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3">
            <CalendarDays className="text-sky-400" size={20} />

            <div>
              <p className="text-xs text-slate-400">Date</p>
              <p className="font-semibold text-white">
                {time.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3">
            <Clock className="text-green-400" size={20} />

            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p className="font-semibold text-white">
                {time.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Connection */}
          <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3">
            <Wifi className="text-green-400" size={20} />

            <div>
              <p className="text-xs text-slate-400">Connection</p>
              <p className="font-semibold text-green-400">
                Connected
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3">
            <Activity className="text-sky-400" size={20} />

            <div>
              <p className="text-xs text-slate-400">Status</p>
              <p className="font-semibold text-sky-400">
                Live Monitoring
              </p>
            </div>
          </div>

          {/* Refresh */}
          <button
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 font-medium text-white transition hover:scale-105"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>
    </motion.div>
  );
}