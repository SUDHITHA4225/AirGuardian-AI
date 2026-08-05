"use client";

import { motion } from "framer-motion";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

import type { Analytics } from "@/lib/analytics";

interface AnalyticsTableProps {
  analytics: Analytics[];
  loading: boolean;
}

const statusStyles = {
  Safe: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  Good: {
    icon: CheckCircle2,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  Moderate: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  Warning: {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  Critical: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
};

export default function AnalyticsTable({
  analytics,
  loading,
}: AnalyticsTableProps) {
  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading sensor records...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Historical Records
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Sensor Log
          </h2>
        </div>

        <Database
          className="text-sky-400"
          size={28}
        />
      </div>

      {/* Empty State */}
      {analytics.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-slate-800/50 p-8 text-center">
          <Database
            className="mx-auto mb-4 text-slate-500"
            size={40}
          />

          <p className="text-slate-400">
            No analytics records available.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {analytics.map((record, index) => {
            const status =
              statusStyles[
                (record.status in statusStyles
                  ? record.status
                  : "Good") as keyof typeof statusStyles
              ];

            const Icon = status.icon;

            return (
              <motion.div
                key={record.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  scale: 1.01,
                }}
                className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 transition"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-semibold text-white">
                      {record.zone}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Record #{record.id}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 ${status.bg}`}
                  >
                    <Icon
                      className={status.color}
                      size={16}
                    />

                    <span
                      className={`text-sm font-medium ${status.color}`}
                    >
                      {record.status}
                    </span>
                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">

                  <div>
                    <p className="text-slate-500">
                      AQI
                    </p>

                    <p className="font-semibold text-white">
                      {record.air_quality}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Temperature
                    </p>

                    <p className="font-semibold text-white">
                      {record.temperature}°C
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Humidity
                    </p>

                    <p className="font-semibold text-white">
                      {record.humidity}%
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Gas Level
                    </p>

                    <p className="font-semibold text-white">
                      {record.gas_level} ppm
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-slate-400">

                  <Clock3 size={15} />

                  {new Date(
                    record.created_at
                  ).toLocaleString()}

                </div>

              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}