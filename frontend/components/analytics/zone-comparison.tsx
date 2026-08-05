"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldCheck,
} from "lucide-react";

import type { Analytics } from "@/lib/analytics";

interface ZoneComparisonProps {
  analytics: Analytics[];
  loading: boolean;
}

export default function ZoneComparison({
  analytics,
  loading,
}: ZoneComparisonProps) {
  if (loading) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading zone comparison...
        </p>
      </div>
    );
  }

  const zones =
    analytics.length > 0
      ? analytics
      : [
          {
            id: 0,
            zone: "Factory",
            air_quality: 0,
            temperature: 0,
            humidity: 0,
            gas_level: 0,
            status: "No Data",
            created_at: "",
          },
        ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Zone Comparison
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Factory Performance
          </h2>
        </div>

        <BarChart3
          className="text-sky-400"
          size={28}
        />
      </div>

      <div className="space-y-6">
        {zones.map((zone, index) => {
          const progress = Math.min(
            100,
            zone.air_quality
          );

          const trend =
            zone.air_quality < 50
              ? "up"
              : zone.air_quality < 100
              ? "flat"
              : "down";

          const color =
            zone.air_quality < 50
              ? "bg-emerald-500"
              : zone.air_quality < 100
              ? "bg-yellow-500"
              : "bg-red-500";

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className="rounded-2xl border border-white/10 bg-slate-800/50 p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {zone.zone}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {zone.status}
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {trend === "up" && (
                    <TrendingUp
                      className="text-emerald-400"
                      size={18}
                    />
                  )}

                  {trend === "flat" && (
                    <Minus
                      className="text-yellow-400"
                      size={18}
                    />
                  )}

                  {trend === "down" && (
                    <TrendingDown
                      className="text-red-400"
                      size={18}
                    />
                  )}

                  <span className="text-lg font-bold text-white">
                    AQI {zone.air_quality}
                  </span>

                </div>

              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full rounded-full ${color}`}
                />

              </div>

              <div className="mt-6 grid grid-cols-4 gap-4 text-center">

                <div>
                  <p className="text-xs text-slate-500">
                    Temp
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {zone.temperature}°C
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Humidity
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {zone.humidity}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Gas
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {zone.gas_level} ppm
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Safety
                  </p>

                  <div className="mt-1 flex items-center justify-center gap-1">

                    <ShieldCheck
                      className="text-emerald-400"
                      size={16}
                    />

                    <span className="font-semibold text-white">
                      {Math.max(
                        0,
                        100 - zone.air_quality
                      )}
                      %
                    </span>

                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}