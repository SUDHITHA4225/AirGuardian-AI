"use client";

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

const data = [
  {
    time: "09:00",
    aqi: 32,
    temp: 25,
    humidity: 60,
    gas: 120,
  },
  {
    time: "09:30",
    aqi: 36,
    temp: 26,
    humidity: 61,
    gas: 126,
  },
  {
    time: "10:00",
    aqi: 39,
    temp: 27,
    humidity: 63,
    gas: 132,
  },
  {
    time: "10:30",
    aqi: 42,
    temp: 28,
    humidity: 61,
    gas: 136,
  },
  {
    time: "11:00",
    aqi: 40,
    temp: 27,
    humidity: 60,
    gas: 134,
  },
  {
    time: "11:30",
    aqi: 37,
    temp: 27,
    humidity: 59,
    gas: 130,
  },
  {
    time: "12:00",
    aqi: 35,
    temp: 26,
    humidity: 58,
    gas: 128,
  },
];

export default function MonitoringChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Live Trends
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Environmental Analytics
          </h2>
        </div>

        <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
          ● LIVE
        </span>
      </div>

      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#aqiGradient)"
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