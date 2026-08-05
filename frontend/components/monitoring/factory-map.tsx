"use client";

import { motion } from "framer-motion";
import {
  Factory,
  MapPin,
  Cpu,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const sensors = [
  {
    id: "ESP32-01",
    x: "18%",
    y: "25%",
    color: "bg-green-500",
    label: "Entrance",
  },
  {
    id: "ESP32-02",
    x: "42%",
    y: "42%",
    color: "bg-sky-500",
    label: "Production",
  },
  {
    id: "ESP32-03",
    x: "72%",
    y: "30%",
    color: "bg-yellow-500",
    label: "Storage",
  },
  {
    id: "ESP32-04",
    x: "80%",
    y: "72%",
    color: "bg-red-500",
    label: "Chemical Zone",
  },
];

export default function FactoryMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Factory Overview
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Industrial Monitoring Map
          </h2>
        </div>

        <Factory className="text-sky-400" size={30} />
      </div>

      {/* Factory Layout */}
      <div className="relative mt-8 h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-800">

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

        {/* Factory Blocks */}
        <div className="absolute left-8 top-10 h-28 w-40 rounded-2xl border border-slate-600 bg-slate-800/80" />
        <div className="absolute left-64 top-20 h-36 w-52 rounded-2xl border border-slate-600 bg-slate-800/80" />
        <div className="absolute right-10 top-12 h-28 w-36 rounded-2xl border border-slate-600 bg-slate-800/80" />
        <div className="absolute bottom-10 right-20 h-32 w-44 rounded-2xl border border-red-500/40 bg-red-500/10" />

        {/* Sensors */}
        {sensors.map((sensor) => (
          <motion.div
            key={sensor.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute"
            style={{
              left: sensor.x,
              top: sensor.y,
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
                className={`absolute inset-0 rounded-full ${sensor.color}`}
              />

              {/* Marker */}
              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full ${sensor.color}`}
              >
                <Cpu size={18} className="text-white" />
              </div>

              {/* Label */}
              <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-center">
                <p className="text-xs font-semibold text-white">
                  {sensor.id}
                </p>

                <p className="text-[11px] text-slate-400">
                  {sensor.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Safe Zone */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2">
          <ShieldCheck className="text-green-400" size={18} />
          <span className="text-sm text-green-400">
            Safe Zone
          </span>
        </div>

        {/* Hazard Zone */}
        <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2">
          <AlertTriangle className="text-red-400" size={18} />
          <span className="text-sm text-red-400">
            Chemical Zone
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Legend color="bg-green-500" text="Online Sensor" />
        <Legend color="bg-sky-500" text="Monitoring Area" />
        <Legend color="bg-yellow-500" text="Maintenance Area" />
        <Legend color="bg-red-500" text="High Risk Area" />
      </div>
    </motion.div>
  );
}

function Legend({
  color,
  text,
}: {
  color: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3">
      <div className={`h-4 w-4 rounded-full ${color}`} />
      <span className="text-sm text-slate-300">
        {text}
      </span>
    </div>
  );
}