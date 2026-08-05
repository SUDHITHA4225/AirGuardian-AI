"use client";

import { motion } from "framer-motion";
import {
  Wind,
  Thermometer,
  Droplets,
  Flame,
  CloudFog,
  ShieldCheck,
} from "lucide-react";

const sensors = [
  {
    title: "Air Quality",
    value: "42 AQI",
    status: "Excellent",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    icon: Wind,
  },
  {
    title: "Temperature",
    value: "27°C",
    status: "Normal",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    icon: Thermometer,
  },
  {
    title: "Humidity",
    value: "61%",
    status: "Optimal",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    icon: Droplets,
  },
  {
    title: "Smoke Level",
    value: "Low",
    status: "Safe",
    color: "text-red-400",
    bg: "bg-red-500/10",
    icon: Flame,
  },
  {
    title: "Gas Level",
    value: "135 ppm",
    status: "Normal",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    icon: CloudFog,
  },
  {
    title: "Safety Score",
    value: "98%",
    status: "Protected",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    icon: ShieldCheck,
  },
];

export default function LiveSensors() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {sensors.map((sensor, index) => {
        const Icon = sensor.icon;

        return (
          <motion.div
            key={sensor.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/20"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${sensor.bg}`}
              >
                <Icon className={sensor.color} size={28} />
              </div>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                LIVE
              </span>
            </div>

            <h3 className="mt-6 text-sm uppercase tracking-wide text-slate-400">
              {sensor.title}
            </h3>

            <p className={`mt-2 text-3xl font-bold ${sensor.color}`}>
              {sensor.value}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Status
              </span>

              <span className="font-semibold text-white">
                {sensor.status}
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
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