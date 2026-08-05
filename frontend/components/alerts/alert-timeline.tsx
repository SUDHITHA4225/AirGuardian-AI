"use client";

import { motion } from "framer-motion";
import {
  Siren,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import type { Alert } from "@/lib/alerts";

interface AlertTimelineProps {
  alerts: Alert[];
  loading: boolean;
}

export default function AlertTimeline({
  alerts,
  loading,
}: AlertTimelineProps) {
  if (loading) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading timeline...
        </p>
      </div>
    );
  }

  const timeline = alerts.map((alert) => {
    let Icon = Info;
    let color = "bg-sky-500";

    if (alert.severity === "Critical") {
      Icon = Siren;
      color = "bg-red-500";
    } else if (alert.severity === "Warning") {
      Icon = AlertTriangle;
      color = "bg-yellow-500";
    }

    if (alert.status === "Resolved") {
      Icon = CheckCircle2;
      color = "bg-emerald-500";
    }

    return {
      id: alert.id,
      title: alert.title,
      description: alert.description,
      time: new Date(
        alert.created_at
      ).toLocaleString(),
      icon: Icon,
      color,
      status: alert.status,
      location: alert.location,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Incident Timeline
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Event History
          </h2>
        </div>

        <Clock3
          className="text-sky-400"
          size={28}
        />
      </div>

      {timeline.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-8 text-center">
          <Clock3
            className="mx-auto mb-4 text-slate-500"
            size={40}
          />

          <p className="text-slate-400">
            No alert history available.
          </p>
        </div>
      ) : (
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-slate-700" />

          <div className="space-y-8">

            {timeline.map((event, index) => {
              const Icon = event.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${event.color}`}
                  >
                    <Icon
                      className="text-white"
                      size={20}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-white/10 bg-slate-800/60 p-5">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <h3 className="text-lg font-semibold text-white">
                        {event.title}
                      </h3>

                      <span className="rounded-full bg-slate-700 px-3 py-1 text-sm text-slate-300">
                        {event.time}
                      </span>

                    </div>

                    <p className="mt-3 leading-6 text-slate-400">
                      {event.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">

                      <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
                        {event.location}
                      </span>

                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                        {event.status}
                      </span>

                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>
      )}
    </motion.div>
  );
}