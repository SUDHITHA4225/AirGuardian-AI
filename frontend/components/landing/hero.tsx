"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Cloud,
  Shield,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  function launchDashboard() {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#020617]">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute left-16 top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-[150px]" />

        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-slate-300/10 blur-[160px]" />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 text-sky-300 backdrop-blur-xl">

              <ShieldCheck size={18} />

              Cloud-Native Intelligent Industrial Monitoring Platform
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white lg:text-7xl">

              Monitor

              <span className="block bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">

                Predict

              </span>

              Prevent

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-slate-400">

              Intelligent Industrial Air Quality Monitoring powered by AI, IoT Sensors, Google Gemini, AWS Cloud, and Real-Time Analytics.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={launchDashboard}
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-700 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >

                Launch Dashboard

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>

              <button className="rounded-2xl border border-slate-700 bg-white/5 px-8 py-4 text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/10 hover:text-white">

                Learn More

              </button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: .85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden h-[620px] lg:block"
          >
                      {/* Main Dashboard Card */}

            <div className="absolute right-6 top-20 w-80 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-2xl shadow-blue-900/20">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-bold text-white">
                  Live Monitoring
                </h2>

                <Activity className="text-sky-400" />

              </div>

              <div className="space-y-6">

                <div>

                  <p className="text-slate-400">
                    Air Quality Index
                  </p>

                  <h2 className="text-5xl font-black text-sky-400">
                    42
                  </h2>

                </div>

                <div className="grid grid-cols-2 gap-6">

                  <div>

                    <p className="text-slate-400">
                      Temperature
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      27°C
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-400">
                      Humidity
                    </p>

                    <h3 className="text-2xl font-bold text-white">
                      61%
                    </h3>

                  </div>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-700">

                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />

                </div>

                <p className="text-sm text-slate-400">

                  Factory Safety Score

                  <span className="ml-2 font-bold text-sky-400">
                    92%
                  </span>

                </p>

              </div>

            </div>

            {/* ESP32 Card */}

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute left-0 top-12 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl"
            >

              <Cpu className="mb-3 text-sky-400" />

              <h3 className="font-semibold text-white">
                ESP32
              </h3>

              <p className="text-sky-400">
                Connected
              </p>

            </motion.div>

            {/* AWS Cloud */}

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-10 right-0 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl"
            >

              <Cloud className="mb-3 text-slate-300" />

              <h3 className="font-semibold text-white">
                AWS Cloud
              </h3>

              <p className="text-sky-400">
                Active
              </p>

            </motion.div> 
                        {/* AI Safety */}

            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute bottom-48 left-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl"
            >

              <Shield className="mb-3 text-sky-400" />

              <h3 className="font-semibold text-white">
                AI Safety
              </h3>

              <p className="text-sky-400">
                Normal
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}