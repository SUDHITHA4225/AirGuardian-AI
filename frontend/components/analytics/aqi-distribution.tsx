"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

import type { Analytics } from "@/lib/analytics";

interface AQIDistributionProps {
  analytics: Analytics[];
  loading: boolean;
}

export default function AQIDistribution({
  analytics,
  loading,
}: AQIDistributionProps) {
  if (loading) {
    return (
      <div className="flex h-[540px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading AQI distribution...
        </p>
      </div>
    );
  }

  const counts = {
    good: 0,
    moderate: 0,
    poor: 0,
    critical: 0,
  };

  analytics.forEach((item) => {
    if (item.air_quality <= 50) {
      counts.good++;
    } else if (item.air_quality <= 100) {
      counts.moderate++;
    } else if (item.air_quality <= 150) {
      counts.poor++;
    } else {
      counts.critical++;
    }
  });

  const total =
    analytics.length === 0 ? 1 : analytics.length;

  const data = [
    {
      name: "Good",
      value: Math.round(
        (counts.good / total) * 100
      ),
      color: "#22c55e",
    },
    {
      name: "Moderate",
      value: Math.round(
        (counts.moderate / total) * 100
      ),
      color: "#facc15",
    },
    {
      name: "Poor",
      value: Math.round(
        (counts.poor / total) * 100
      ),
      color: "#fb923c",
    },
    {
      name: "Critical",
      value: Math.round(
        (counts.critical / total) * 100
      ),
      color: "#ef4444",
    },
  ];

  const averageAQI =
    analytics.length === 0
      ? 0
      : Math.round(
          analytics.reduce(
            (sum, item) =>
              sum + item.air_quality,
            0
          ) / analytics.length
        );

  let status = "Good";

  if (averageAQI > 150) {
    status = "Critical";
  } else if (averageAQI > 100) {
    status = "Poor";
  } else if (averageAQI > 50) {
    status = "Moderate";
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            AQI Distribution
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Air Quality Breakdown
          </h2>
        </div>

        <PieChartIcon
          className="text-sky-400"
          size={28}
        />
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="-mt-32 mb-14 text-center pointer-events-none">
        <p className="text-sm text-slate-400">
          Average AQI
        </p>

        <h3 className="text-4xl font-bold text-white">
          {averageAQI}
        </h3>

        <p className="mt-1 text-sm text-emerald-400">
          {status}
        </p>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    item.color,
                }}
              />

              <span className="font-medium text-white">
                {item.name}
              </span>
            </div>

            <span className="font-bold text-slate-300">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}