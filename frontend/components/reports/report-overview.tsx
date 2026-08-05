"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  Users,
  ShieldCheck,
} from "lucide-react";

import type { Report } from "@/lib/reports";

interface ReportOverviewProps {
  reports: Report[];
  loading: boolean;
}

export default function ReportOverview({
  reports,
  loading,
}: ReportOverviewProps) {
  const totalReports = reports.length;

  const todayReports = reports.filter((report) => {
    const today = new Date().toDateString();
    return (
      new Date(report.created_at).toDateString() === today
    );
  }).length;

  const aiReports = reports.filter((report) =>
    report.generated_by.toLowerCase().includes("ai")
  ).length;

  const manualReports = totalReports - aiReports;

  const cards = [
    {
      title: "Total Reports",
      value: loading ? "..." : totalReports,
      icon: FileText,
      color: "text-sky-400",
    },
    {
      title: "Generated Today",
      value: loading ? "..." : todayReports,
      icon: Clock,
      color: "text-emerald-400",
    },
    {
      title: "AI Generated",
      value: loading ? "..." : aiReports,
      icon: ShieldCheck,
      color: "text-violet-400",
    },
    {
      title: "Manual Reports",
      value: loading ? "..." : manualReports,
      icon: Users,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-slate-800 p-3">
                <Icon
                  className={card.color}
                  size={26}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}