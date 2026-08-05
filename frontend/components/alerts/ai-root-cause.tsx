"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TriangleAlert,
  ShieldCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

import type { Alert } from "@/lib/alerts";

interface AIRootCauseProps {
  alert: Alert | null;
  loading: boolean;
}

export default function AIRootCause({
  alert,
  loading,
}: AIRootCauseProps) {
  if (loading) {
    return (
      <div className="flex h-[720px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading AI analysis...
        </p>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="flex h-[720px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Select an alert to view AI analysis.
        </p>
      </div>
    );
  }

  const confidence =
    alert.severity === "Critical"
      ? 98
      : alert.severity === "Warning"
      ? 93
      : 88;

  const risk =
    alert.severity === "Critical"
      ? "High"
      : alert.severity === "Warning"
      ? "Medium"
      : "Low";

  const eta =
    alert.severity === "Critical"
      ? "~15 min"
      : alert.severity === "Warning"
      ? "~30 min"
      : "~45 min";

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              AI Analysis
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Root Cause Engine
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
              Analysis Confidence
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

        {/* Root Cause */}

        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-red-400" />

            <h3 className="font-semibold text-white">
              Probable Root Cause
            </h3>

          </div>

          <p className="mt-4 leading-7 text-slate-300">
            The alert <strong>{alert.title}</strong> was
            detected in <strong>{alert.location}</strong>.
            Based on severity (
            <span className="text-red-400">
              {alert.severity}
            </span>
            ), the AI believes this incident may be related to
            abnormal environmental sensor values or unsafe
            operating conditions.
          </p>

        </div>

        {/* Recommendation */}

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

          <div className="flex items-center gap-3">

            <Sparkles className="text-emerald-400" />

            <h3 className="font-semibold text-white">
              AI Recommendation
            </h3>

          </div>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">

            <li>
              • Inspect sensors in {alert.location}.
            </li>

            <li>
              • Verify ventilation and exhaust systems.
            </li>

            <li>
              • Check nearby equipment for abnormal
              operation.
            </li>

            <li>
              • Follow industrial safety procedures until
              the alert is resolved.
            </li>

          </ul>

        </div>

        {/* Metrics */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">

            <ShieldCheck className="mx-auto text-emerald-400" />

            <h4 className="mt-3 font-semibold text-white">
              {risk}
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              Risk Level
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-center">

            <Clock3 className="mx-auto text-sky-400" />

            <h4 className="mt-3 font-semibold text-white">
              {eta}
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              Resolution ETA
            </p>

          </div>

        </div>

        {/* Prediction */}

        <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-violet-400" />

            <h3 className="font-semibold text-white">
              Predicted Impact
            </h3>

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            If this alert remains unresolved, the AI predicts
            that environmental conditions may continue to
            deteriorate and increase operational risk in
            <strong> {alert.location}</strong>.
          </p>

        </div>

      </div>
    </motion.div>
  );
}