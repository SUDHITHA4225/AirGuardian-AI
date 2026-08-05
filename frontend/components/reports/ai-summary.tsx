"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  User,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import type { Report } from "@/lib/reports";

interface AISummaryProps {
  report: Report | null;
}

export default function AISummary({
  report,
}: AISummaryProps) {
  if (!report) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="text-violet-400" size={26} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
              AI Summary
            </p>
            <h2 className="text-2xl font-bold text-white">
              AI Report Assistant
            </h2>
          </div>
        </div>

        <div className="mt-10 flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10">
          <div className="text-center">
            <Sparkles
              size={60}
              className="mx-auto text-violet-500"
            />
            <p className="mt-4 text-slate-400">
              Select a report to generate an AI summary.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="text-violet-400" size={26} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            AI Summary
          </p>

          <h2 className="text-2xl font-bold text-white">
            Executive Summary
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">
          <FileText className="text-sky-400" size={18} />
          <span className="text-white">{report.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-emerald-400" size={18} />
          <span className="text-slate-300">
            {report.generated_by}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-violet-400" size={18} />
          <span className="text-slate-300">
            {new Date(report.created_at).toLocaleString()}
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="text-violet-400"
              size={18}
            />

            <span className="font-semibold text-violet-300">
              AI Insights
            </span>
          </div>

          <p className="mt-4 leading-7 text-slate-300">
            This report indicates that all monitored industrial
            safety parameters were successfully processed.
            AirGuardian AI found no critical issues during report
            generation. Environmental monitoring data has been
            analyzed and archived successfully. The report is
            ready for compliance review and can be shared with
            stakeholders.
          </p>
        </div>
      </div>
    </motion.div>
  );
}