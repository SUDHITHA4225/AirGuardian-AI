"use client";

import { motion } from "framer-motion";
import {
  Wind,
  Thermometer,
  Droplets,
  Flame,
  ShieldCheck,
  Activity,
} from "lucide-react";

import type { Analytics } from "@/lib/analytics";

interface KPICardsProps {
  analytics: Analytics[];
  loading: boolean;
}

export default function KPICards({
  analytics,
  loading,
}: KPICardsProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-3xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  const latest =
    analytics.length > 0
      ? analytics[analytics.length - 1]
      : null;

  const cards = [
    {
      title: "Air Quality",
      value: latest ? latest.air_quality : "--",
      change: "Live",
      icon: Wind,
      iconColor: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      title: "Temperature",
      value: latest
        ? `${latest.temperature} °C`
        : "--",
      change: "Live",
      icon: Thermometer,
      iconColor: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Humidity",
      value: latest
        ? `${latest.humidity}%`
        : "--",
      change: "Live",
      icon: Droplets,
      iconColor: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Gas Level",
      value: latest
        ? `${latest.gas_level} ppm`
        : "--",
      change: "Live",
      icon: Flame,
      iconColor: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Zone",
      value: latest ? latest.zone : "--",
      change: latest ? latest.status : "--",
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Records",
      value: analytics.length,
      change: "Stored",
      icon: Activity,
      iconColor: "text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon
                  className={card.iconColor}
                  size={28}
                />
              </div>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
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
                Real Time
              </span>

              <span className="font-semibold text-emerald-400">
                {card.change}
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}