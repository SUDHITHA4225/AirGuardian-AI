"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  ArrowDown,
} from "lucide-react";

const stack = [
  {
    title: "ESP32 + Sensors",
    subtitle: "MQ135 • DHT22",
    icon: Cpu,
  },
  {
    title: "FastAPI",
    subtitle: "REST APIs",
    icon: Server,
  },
  {
    title: "PostgreSQL",
    subtitle: "Data Storage",
    icon: Database,
  },
  {
    title: "Gemini AI",
    subtitle: "AI + RAG",
    icon: BrainCircuit,
  },
  {
    title: "AWS Cloud",
    subtitle: "Deployment",
    icon: Cloud,
  },
];

export default function Technology() {
  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-[#020617] py-28"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/4 top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[180px]" />

        <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <p className="font-semibold uppercase tracking-[0.3em] text-sky-400">

            Technology Stack

          </p>

          <h2 className="mt-5 text-5xl font-black text-white">

            How The Platform Works

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">

            Every sensor reading flows through an intelligent pipeline
            where Artificial Intelligence analyzes environmental
            conditions and provides real-time industrial safety insights.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="mx-auto mt-24 flex max-w-xl flex-col items-center">

          {stack.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: .9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .15,
                }}
                className="flex w-full flex-col items-center"
              >

                {/* Card */}

                <div className="group flex w-full items-center gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-xl hover:shadow-blue-500/10">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30">

                    <Icon
                      size={30}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-white">

                      {item.title}

                    </h3>

                    <p className="mt-1 text-slate-400">

                      {item.subtitle}

                    </p>

                  </div>

                </div>

                {/* Connector */}

                {index < stack.length - 1 && (

                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="py-4"
                  >

                    <ArrowDown
                      size={34}
                      className="text-sky-400"
                    />

                  </motion.div>

                )}

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}