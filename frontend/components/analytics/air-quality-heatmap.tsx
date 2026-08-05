"use client";

import { motion } from "framer-motion";
import {
  Factory,
  MapPin,
  Wind,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

const zones = [
  {
    name: "Entrance",
    aqi: 32,
    status: "Excellent",
    color: "bg-green-500",
    x: "15%",
    y: "22%",
  },
  {
    name: "Production",
    aqi: 46,
    status: "Good",
    color: "bg-sky-500",
    x: "45%",
    y: "38%",
  },
  {
    name: "Warehouse",
    aqi: 58,
    status: "Moderate",
    color: "bg-yellow-500",
    x: "72%",
    y: "28%",
  },
  {
    name: "Chemical Zone",
    aqi: 84,
    status: "Warning",
    color: "bg-red-500",
    x: "78%",
    y: "72%",
  },
];

export default function AirQualityHeatmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Air Quality Heatmap
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Factory Environmental Overview
          </h2>
        </div>

        <Factory className="text-sky-400" size={30} />
      </div>

      {/* Heatmap */}
      <div className="relative mt-8 h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-800">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Buildings */}
        <div className="absolute left-8 top-8 h-28 w-40 rounded-2xl border border-slate-600 bg-slate-800/70" />
        <div className="absolute left-60 top-20 h-36 w-52 rounded-2xl border border-slate-600 bg-slate-800/70" />
        <div className="absolute right-10 top-10 h-28 w-36 rounded-2xl border border-slate-600 bg-slate-800/70" />
        <div className="absolute bottom-10 right-16 h-32 w-44 rounded-2xl border border-red-500/40 bg-red-500/10" />

        {/* Zones */}
        {zones.map((zone) => (
          <motion.div
            key={zone.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute"
            style={{
              left: zone.x,
              top: zone.y,
            }}
          >
            <div className="relative">

              {/* Pulse */}
              <motion.div
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className={`absolute inset-0 rounded-full ${zone.color}`}
              />

              {/* Marker */}
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full ${zone.color}`}
              >
                <MapPin className="text-white" size={20} />
              </div>

              {/* Label */}
              <div className="mt-2 min-w-[120px] rounded-xl border border-white/10 bg-slate-900/95 p-3">
                <h4 className="font-semibold text-white">
                  {zone.name}
                </h4>

                <p className="mt-1 text-sm text-slate-400">
                  AQI:{" "}
                  <span className="font-semibold text-white">
                    {zone.aqi}
                  </span>
                </p>

                <p className="text-xs text-slate-500">
                  {zone.status}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
          <ShieldCheck className="text-green-400" />

          <h3 className="mt-3 text-lg font-semibold text-white">
            Safe Zones
          </h3>

          <p className="mt-2 text-slate-400">
            3 of 4 monitored zones are operating within safe AQI
            limits.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <Wind className="text-yellow-400" />

          <h3 className="mt-3 text-lg font-semibold text-white">
            Average AQI
          </h3>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            55
          </p>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
          <TriangleAlert className="text-red-400" />

          <h3 className="mt-3 text-lg font-semibold text-white">
            Attention Required
          </h3>

          <p className="mt-2 text-slate-400">
            Chemical Zone requires continuous monitoring due to
            elevated AQI.
          </p>
        </div>

      </div>
    </motion.div>
  );
}