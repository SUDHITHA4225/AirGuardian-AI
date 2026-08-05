"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Play,
  Eye,
  Search,
  Trash2,
} from "lucide-react";

import {
  ReportAPI,
  type Report,
} from "@/lib/reports";

interface ReportLibraryProps {
  reports: Report[];
  loading: boolean;
  onSelect: (report: Report) => void;
}

export default function ReportLibrary({
  reports,
  loading,
  onSelect,
}: ReportLibraryProps) {

  const [search, setSearch] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const q = search.toLowerCase();

      return (
        report.title.toLowerCase().includes(q) ||
        report.report_type.toLowerCase().includes(q) ||
        report.generated_by.toLowerCase().includes(q)
      );
    });
  }, [reports, search]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-white">
          Loading reports...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Report Library
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Generated Reports
          </h2>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search reports..."
            className="w-full rounded-xl border border-white/10 bg-slate-800 py-2 pl-10 pr-4 text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />

        </div>

      </div>

      <div className="space-y-4">
                {filteredReports.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-800 p-8 text-center">
            <FileText
              size={42}
              className="mx-auto mb-4 text-slate-500"
            />

            <p className="text-slate-400">
              No matching reports found.
            </p>
          </div>
        ) : (
          filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-all"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-slate-700 p-3">
                    <FileText
                      className="text-sky-400"
                      size={26}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {report.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(report.created_at).toLocaleString()}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
                      {report.report_type}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">

                  {/* Preview */}
                  <button
                    onClick={() => {
                      onSelect(report);
                      ReportAPI.preview(report.id);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-700 px-4 py-2 text-sm text-white transition hover:border-sky-500"
                  >
                    <Eye size={16} />
                    Preview
                  </button>

                  {/* Download */}
                  <button
                    onClick={() =>
                      ReportAPI.download(report.id)
                    }
                    className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    <Play size={16} />
                    Download
                  </button>

                  {/* Delete */}
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this report?")) {
                        return;
                      }

                      try {
                        await ReportAPI.delete(report.id);

                        window.location.reload();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}