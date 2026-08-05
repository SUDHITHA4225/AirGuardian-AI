"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Cloud,
  Cpu,
  BarChart3,
  BellRing,
} from "lucide-react";

const features = [
  {
    title: "AI Decision Engine",
    description:
      "Google Gemini powered predictions and intelligent safety recommendations.",
    icon: BrainCircuit,
  },
  {
    title: "Industrial IoT",
    description:
      "Real-time monitoring using ESP32 sensors for AQI, smoke, humidity and temperature.",
    icon: Cpu,
  },
  {
    title: "Cloud Platform",
    description:
      "Secure AWS infrastructure with scalable APIs and cloud data storage.",
    icon: Cloud,
  },
  {
    title: "Live Analytics",
    description:
      "Beautiful dashboards with historical trends and industrial insights.",
    icon: BarChart3,
  },
  {
    title: "Smart Alerts",
    description:
      "Instant notifications for hazardous environments and abnormal readings.",
    icon: BellRing,
  },
  {
    title: "Safety Intelligence",
    description:
      "AI continuously evaluates environmental conditions to improve workplace safety.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#020617] py-28"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-20 top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center"
        >

          <p className="text-sky-400 font-semibold tracking-[0.3em] uppercase">

            Platform Features

          </p>

          <h2 className="mt-4 text-5xl font-black text-white">

            Everything You Need For

            <span className="block bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

              Industrial Intelligence

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">

            A unified platform that combines Artificial Intelligence,
            Industrial IoT, Cloud Computing and Real-Time Analytics
            into one intelligent safety ecosystem.

          </p>

        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30">

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">

                  {feature.title}

                </h3>

                <p className="mt-5 leading-8 text-slate-400">

                  {feature.description}

                </p>

                <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500 group-hover:w-full" />

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}