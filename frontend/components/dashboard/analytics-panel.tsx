"use client";

import { motion } from "framer-motion";
import {
  Wind,
  Thermometer,
  Droplets,
  Flame,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Average AQI",
    value: "41",
    icon: Wind,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    title: "Temperature",
    value: "27°C",
    icon: Thermometer,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Humidity",
    value: "61%",
    icon: Droplets,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Gas Level",
    value: "132 ppm",
    icon: Flame,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function AnalyticsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Analytics
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Environmental Summary
          </h2>
        </div>

        <TrendingUp className="text-sky-400" size={30} />

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-slate-800/60 p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">

                    {item.title}

                  </p>

                  <h3 className={`mt-3 text-3xl font-bold ${item.color}`}>

                    {item.value}

                  </h3>

                </div>

                <div className={`rounded-xl p-3 ${item.bg}`}>

                  <Icon
                    className={item.color}
                    size={24}
                  />

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>
    </motion.div>
  );
}