"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { Analytics } from "@/lib/analytics";

type Range = "daily" | "weekly" | "monthly";

interface TrendChartProps {
  analytics: Analytics[];
  loading: boolean;
}

export default function TrendChart({
  analytics,
  loading,
}: TrendChartProps) {
  const [range, setRange] =
    useState<Range>("daily");

  const chartData = useMemo(() => {
    if (analytics.length === 0) return [];

    return analytics.map((item) => ({
      name: new Date(
        item.created_at
      ).toLocaleDateString([], {
        month: "short",
        day: "numeric",
      }),

      aqi: item.air_quality,
      temp: item.temperature,
      humidity: item.humidity,
      gas: item.gas_level,
    }));
  }, [analytics]);

  if (loading) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Historical Trends
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Environmental Analytics
          </h2>

        </div>

        <div className="flex rounded-2xl bg-slate-800 p-1">

          {(
            [
              "daily",
              "weekly",
              "monthly",
            ] as Range[]
          ).map((item) => (
            <button
              key={item}
              onClick={() =>
                setRange(item)
              }
              className={`rounded-xl px-5 py-2 text-sm font-medium transition ${
                range === item
                  ? "bg-sky-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.charAt(0).toUpperCase() +
                item.slice(1)}
            </button>
          ))}

        </div>

      </div>

      <div className="h-[420px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
          >
            <defs>
              <linearGradient
                id="aqiGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#38bdf8"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#38bdf8"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
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
                background: "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#38bdf8"
              fill="url(#aqiGradient)"
              strokeWidth={3}
              name="AQI"
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#fb923c"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Temperature"
            />

            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Humidity"
            />

            <Line
              type="monotone"
              dataKey="gas"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Gas (ppm)"
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </motion.div>
  );
}