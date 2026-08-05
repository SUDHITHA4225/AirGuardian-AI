"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FileText,
  Calendar,
  Download,
  Sparkles,
  Plus,
} from "lucide-react";

import { ReportAPI } from "@/lib/reports";

interface ReportsHeaderProps {
  refresh: () => Promise<void>;
}

export default function ReportsHeader({
  refresh,
}: ReportsHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function openAssistant() {
    router.push("/dashboard/ai-center");
  }

  function openDateFilter() {
    console.log("Date filter clicked");
  }

  function exportReport() {
    console.log("Export report");
  }

  async function handleGenerate() {
    try {
      setLoading(true);

      await ReportAPI.generate(
  `Factory_Report_${Date.now()}`,
  "Industrial Safety"
);

      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-500/10 p-3">
              <FileText className="text-sky-400" size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                Reports Center
              </p>
              <h1 className="mt-1 text-3xl font-bold text-white">
                Reports & Documentation
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-400">
            Generate operational reports, export historical analytics,
            and create AI-powered executive summaries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openAssistant}
            className="flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2"
          >
            <Sparkles size={18} className="text-violet-400" />
            <span className="text-sm font-medium text-violet-300">
              AI Report Assistant
            </span>
          </button>

          <button
            onClick={openDateFilter}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300"
          >
            <Calendar size={18} />
            Last 30 Days
          </button>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            <Plus size={18} />
            {loading ? "Generating..." : "Generate Report"}
          </button>

          <button
            onClick={exportReport}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-300"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </motion.div>
  );
}