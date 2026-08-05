"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  User,
  Tag,
  Download,
} from "lucide-react";

import { ReportAPI, type Report } from "@/lib/reports";

interface ReportPreviewProps {
  report: Report | null;
}

export default function ReportPreview({
  report,
}: ReportPreviewProps) {
  if (!report) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Preview
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Report Preview
        </h2>

        <div className="mt-8 flex h-80 items-center justify-center rounded-2xl border border-dashed border-white/10">
          <div className="text-center">
            <FileText
              size={60}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-slate-400">
              Select a report to preview
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
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
        Preview
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        {report.title}
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-slate-300">
          <Tag className="text-sky-400" size={18} />
          {report.report_type}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <User className="text-emerald-400" size={18} />
          {report.generated_by}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Calendar className="text-violet-400" size={18} />
          {new Date(report.created_at).toLocaleString()}
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-5">

        <FileText
          size={70}
          className="mx-auto text-sky-400"
        />

        <p className="mt-4 text-center text-slate-300">
          {report.file_name}
        </p>

      </div>

      <button
        onClick={() => ReportAPI.download(report.id)}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600"
      >
        <Download size={18} />
        Download Report
      </button>
    </motion.div>
  );
}