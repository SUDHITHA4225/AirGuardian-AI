"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Wifi,
  BatteryCharging,
  CheckCircle2,
} from "lucide-react";

const sensors = [
  {
    id: "ESP32-01",
    location: "Entrance",
    aqi: 42,
    temp: "27°C",
    humidity: "61%",
    gas: "132 ppm",
    battery: "98%",
    status: "Online",
    updated: "2 sec ago",
  },
  {
    id: "ESP32-02",
    location: "Production",
    aqi: 45,
    temp: "28°C",
    humidity: "60%",
    gas: "136 ppm",
    battery: "94%",
    status: "Online",
    updated: "4 sec ago",
  },
  {
    id: "ESP32-03",
    location: "Warehouse",
    aqi: 38,
    temp: "26°C",
    humidity: "59%",
    gas: "126 ppm",
    battery: "91%",
    status: "Online",
    updated: "6 sec ago",
  },
  {
    id: "ESP32-04",
    location: "Chemical Zone",
    aqi: 55,
    temp: "29°C",
    humidity: "64%",
    gas: "158 ppm",
    battery: "89%",
    status: "Warning",
    updated: "3 sec ago",
  },
];

export default function SensorTable() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Device Status
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Sensor Network
        </h2>
      </div>

      <div className="space-y-5">
        {sensors.map((sensor) => (
          <motion.div
            key={sensor.id}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-slate-800/60 p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="text-sky-400" size={22} />

                <div>
                  <h3 className="font-semibold text-white">
                    {sensor.id}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {sensor.location}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  sensor.status === "Online"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {sensor.status}
              </span>
            </div>

            {/* Sensor Values */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Info title="AQI" value={sensor.aqi.toString()} />
              <Info title="Temp" value={sensor.temp} />
              <Info title="Humidity" value={sensor.humidity} />
              <Info title="Gas" value={sensor.gas} />
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4 text-slate-400">
                <div className="flex items-center gap-1">
                  <BatteryCharging size={16} />
                  {sensor.battery}
                </div>

                <div className="flex items-center gap-1">
                  <Wifi size={16} />
                  Connected
                </div>
              </div>

              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 size={16} />
                {sensor.updated}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-900/60 p-3">
      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value}
      </p>
    </div>
  );
}