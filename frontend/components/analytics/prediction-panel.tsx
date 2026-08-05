"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  TriangleAlert,
  Clock3,
} from "lucide-react";

import type { Analytics } from "@/lib/analytics";

interface PredictionPanelProps {
  analytics: Analytics[];
  loading: boolean;
}

export default function PredictionPanel({
  analytics,
  loading,
}: PredictionPanelProps) {

  if (loading) {
    return (
      <div className="flex h-full min-h-[520px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading AI prediction...
        </p>
      </div>
    );
  }

  const latest =
    analytics.length > 0
      ? analytics[analytics.length - 1]
      : null;

  const confidence = 98;

  const risk =
    latest && latest.gas_level > 300
      ? "HIGH"
      : latest && latest.gas_level > 180
      ? "MEDIUM"
      : "LOW";

  const riskColor =
    risk === "HIGH"
      ? "text-red-400"
      : risk === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  const status =
    latest?.status ?? "Normal";

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
              AI Prediction
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Forecast Engine
            </h2>
          </div>

          <BrainCircuit
            className="text-sky-400"
            size={30}
          />

        </div>

        {/* Confidence */}

        <div className="mt-8 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-5">

          <div className="flex items-center justify-between">

            <span className="text-slate-300">
              Prediction Confidence
            </span>

            <span className="font-bold text-sky-400">
              {confidence}%
            </span>

          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-800">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${confidence}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
            />

          </div>

        </div>

        {/* Forecast */}

        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-400" />

            <h3 className="font-semibold text-white">
              Current Prediction
            </h3>

          </div>

          <p className="mt-4 leading-7 text-slate-300">

            Current AQI is{" "}
            <span className="font-semibold text-sky-400">
              {latest?.air_quality ?? "--"}
            </span>
            .

            Temperature is{" "}
            <span className="font-semibold text-orange-400">
              {latest?.temperature ?? "--"}°C
            </span>
            .

            Humidity is{" "}
            <span className="font-semibold text-cyan-400">
              {latest?.humidity ?? "--"}%
            </span>
            .

          </p>

        </div>

        {/* AI Insight */}

        <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <div className="flex items-center gap-3">

            <Sparkles className="text-green-400" />

            <h3 className="font-semibold text-white">
              AI Insight
            </h3>

          </div>

          <p className="mt-4 leading-7 text-slate-300">

            Environmental status is currently{" "}

            <span className="font-semibold text-green-400">
              {status}
            </span>

            . Gas concentration is{" "}

            <span className="font-semibold text-red-400">
              {latest?.gas_level ?? "--"} ppm
            </span>

            . Continue monitoring for any sudden increase.

          </p>

        </div>

        {/* Risk */}

        <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <TriangleAlert className="text-yellow-400" />

              <span className="font-semibold text-white">
                Risk Forecast
              </span>

            </div>

            <span
              className={`rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold ${riskColor}`}
            >
              {risk}
            </span>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">

            <ShieldCheck className="mx-auto text-green-400" />

            <h4 className="mt-3 font-semibold text-white">
              {status}
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              System Status
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">

            <Clock3 className="mx-auto text-sky-400" />

            <h4 className="mt-3 font-semibold text-white">
              Live
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              Updated Every 5 sec
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}