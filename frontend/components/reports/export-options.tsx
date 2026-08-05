"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Table2,
  Share2,
  Mail,
  Cloud,
  CheckCircle2,
} from "lucide-react";

import { ReportAPI } from "@/lib/reports";

const exportOptions = [
  {
    title: "Export PDF",
    description: "Download the latest generated report.",
    icon: FileText,
    color: "text-red-400",
    bg: "bg-red-500/10",
    action: () => {
      alert(
        "Open a report from Report Library or Report History and click Download."
      );
    },
  },
  {
    title: "Export CSV",
    description: "Download all reports as CSV.",
    icon: Table2,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    action: () => ReportAPI.exportCSV(),
  },
  {
    title: "Export JSON",
    description: "Download all reports as JSON.",
    icon: FileSpreadsheet,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    action: () => ReportAPI.exportJSON(),
  },
  {
    title: "Export ZIP",
    description: "Download all reports as ZIP.",
    icon: Download,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    action: () => ReportAPI.exportZIP(),
  },
  {
    title: "Share Report",
    description: "Copy dashboard link.",
    icon: Share2,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    action: async () => {
      await navigator.clipboard.writeText(
        "http://localhost:3000/dashboard/reports"
      );

      alert("Dashboard link copied.");
    },
  },
  {
    title: "Email Report",
    description: "Open default email client.",
    icon: Mail,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    action: () => {
      window.location.href =
        "mailto:?subject=AirGuardian AI Report&body=Please find the generated report.";
    },
  },
];

export default function ExportOptions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Export Center
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Export & Share
          </h2>
        </div>

        <Download
          className="text-sky-400"
          size={28}
        />
      </div>

      {/* Export Cards */}
      <div className="mt-8 space-y-4">
        {exportOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <motion.button
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{ scale: 1.02 }}
              onClick={option.action}
              className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-left transition-all hover:border-sky-500/30"
            >
              <div
                className={`rounded-xl p-3 ${option.bg}`}
              >
                <Icon
                  className={option.color}
                  size={22}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {option.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {option.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Cloud Status */}
      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <div className="flex items-center gap-3">
          <Cloud className="text-emerald-400" />

          <div>
            <h3 className="font-semibold text-white">
              Cloud Backup
            </h3>

            <p className="text-sm text-slate-300">
              All generated reports are securely backed up.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-800/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="text-emerald-400"
              size={18}
            />

            <span className="text-sm text-slate-300">
              Last Sync
            </span>
          </div>

          <span className="text-sm font-semibold text-emerald-400">
            Just now
          </span>
        </div>
      </div>
    </motion.div>
  );
}