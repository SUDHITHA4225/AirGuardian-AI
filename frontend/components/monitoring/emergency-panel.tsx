"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Siren,
  Bot,
  Phone,
  Power,
} from "lucide-react";

export default function EmergencyPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            Emergency
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Safety Control
          </h2>
        </div>

        <Siren className="text-red-400" size={32} />
      </div>

      {/* Risk Level */}
      <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-400" />

            <div>
              <p className="text-sm text-slate-400">
                Current Risk
              </p>

              <h3 className="text-xl font-bold text-white">
                LOW
              </h3>
            </div>
          </div>

          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
            SAFE
          </span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-5">
        <div className="flex items-center gap-3">
          <Bot className="text-sky-400" />

          <h3 className="font-semibold text-white">
            AI Recommendation
          </h3>
        </div>

        <p className="mt-4 leading-7 text-slate-300">
          Air quality is within safe limits. Continue normal
          industrial operations. No hazardous gas concentration
          detected. Ventilation systems are operating normally.
        </p>
      </div>

      {/* Alarm Status */}
      <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-400" />

            <span className="font-semibold text-white">
              Alarm Status
            </span>
          </div>

          <span className="text-yellow-400 font-semibold">
            Standby
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-3 font-semibold text-white transition hover:scale-[1.02]">
          <Power size={18} />
          Emergency Stop
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-500/20 bg-sky-500/10 py-3 font-semibold text-sky-400 transition hover:bg-sky-500/20">
          <Phone size={18} />
          Contact Safety Team
        </button>
      </div>

      {/* Status Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">
          <p className="text-sm text-slate-400">
            Evacuation
          </p>

          <h4 className="mt-2 font-bold text-green-400">
            Not Required
          </h4>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">
          <p className="text-sm text-slate-400">
            Response Time
          </p>

          <h4 className="mt-2 font-bold text-sky-400">
            &lt; 2 sec
          </h4>
        </div>
      </div>
    </motion.div>
  );
}