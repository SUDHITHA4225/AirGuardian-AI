"use client";

import { motion } from "framer-motion";
import {
  Siren,
  TriangleAlert,
  CheckCircle2,
  Timer,
} from "lucide-react";

import type { Alert } from "@/lib/alerts";

interface AlertSummaryProps {
  alerts: Alert[];
  loading: boolean;
}

export default function AlertSummary({
  alerts,
  loading,
}: AlertSummaryProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-3xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  const critical = alerts.filter(
    (a) => a.severity === "Critical"
  ).length;

  const warning = alerts.filter(
    (a) => a.severity === "Warning"
  ).length;

  const resolved = alerts.filter(
    (a) => a.status === "Resolved"
  ).length;

  const active = alerts.length - resolved;

  const cards = [
    {
      title: "Critical Alerts",
      value: critical,
      change: `${critical} Active`,
      icon: Siren,
      color: "text-red-400",
      bg: "bg-red-500/10",
      progress:
        alerts.length === 0
          ? 0
          : (critical / alerts.length) * 100,
    },
    {
      title: "Warning Alerts",
      value: warning,
      change: `${warning} Active`,
      icon: TriangleAlert,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      progress:
        alerts.length === 0
          ? 0
          : (warning / alerts.length) * 100,
    },
    {
      title: "Resolved",
      value: resolved,
      change: `${resolved} Completed`,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      progress:
        alerts.length === 0
          ? 0
          : (resolved / alerts.length) * 100,
    },
    {
      title: "Active Alerts",
      value: active,
      change: "Live Monitoring",
      icon: Timer,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      progress:
        alerts.length === 0
          ? 0
          : (active / alerts.length) * 100,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-red-500/20"
          >
            <div className="flex items-center justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={28}
                />
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                LIVE
              </span>

            </div>

            <h3 className="mt-6 text-sm uppercase tracking-wide text-slate-400">
              {card.title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-white">
              {card.value}
            </p>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm text-slate-500">
                Current
              </span>

              <span className={card.color}>
                {card.change}
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${card.progress}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className={`h-full rounded-full ${card.bg.replace(
                  "/10",
                  ""
                )}`}
              />

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}