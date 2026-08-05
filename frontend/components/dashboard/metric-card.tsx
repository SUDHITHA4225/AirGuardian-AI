"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  status: string;
  icon: LucideIcon;
  color: string;
}

export default function MetricCard({
  title,
  value,
  status,
  icon: Icon,
  color,
}: Props) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {status}
          </span>
        </div>

        <div
          className={`rounded-xl bg-slate-800 p-3 ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
}