"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Siren,
  Info,
  MapPin,
  Clock3,
  User,
  CheckCircle2,
  Search,
  Trash2,
} from "lucide-react";

import {
  AlertAPI,
  type Alert,
} from "@/lib/alerts";

interface LiveAlertsProps {
  alerts: Alert[];
  loading: boolean;
  selectedAlert: Alert | null;
  onSelect: (alert: Alert) => void;
  refresh: () => Promise<void>;
}

const levelStyles = {
  Critical: {
    icon: Siren,
    badge: "bg-red-500/15 text-red-400",
    border: "border-red-500/30",
  },
  Warning: {
    icon: AlertTriangle,
    badge: "bg-yellow-500/15 text-yellow-400",
    border: "border-yellow-500/30",
  },
  Info: {
    icon: Info,
    badge: "bg-sky-500/15 text-sky-400",
    border: "border-sky-500/30",
  },
};

const statusStyles = {
  New: "bg-red-500/15 text-red-400",
  Acknowledged: "bg-yellow-500/15 text-yellow-400",
  Resolved: "bg-emerald-500/15 text-emerald-400",
};

export default function LiveAlerts({
  alerts,
  loading,
  selectedAlert,
  onSelect,
  refresh,
}: LiveAlertsProps) {

  const [search, setSearch] = useState("");

  const filteredAlerts = useMemo(() => {

    return alerts.filter((alert) => {

      const q = search.toLowerCase();

      return (
        alert.title.toLowerCase().includes(q) ||
        alert.location.toLowerCase().includes(q) ||
        alert.severity.toLowerCase().includes(q) ||
        alert.status.toLowerCase().includes(q)
      );

    });

  }, [alerts, search]);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70">
        <p className="text-slate-400">
          Loading alerts...
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
      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Live Alert Feed
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Active Incidents
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

          <span className="text-sm font-medium text-red-400">
            LIVE
          </span>
        </div>

      </div>

      <div className="relative mb-6">

        <Search
          className="absolute left-3 top-3 text-slate-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search alerts..."
          className="w-full rounded-xl border border-white/10 bg-slate-800 py-2 pl-10 pr-4 text-white outline-none focus:border-red-500"
        />

      </div>

      <div className="space-y-5">
                {filteredAlerts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-8 text-center">
            <AlertTriangle
              size={40}
              className="mx-auto mb-4 text-slate-500"
            />

            <p className="text-slate-400">
              No alerts found.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const style =
              levelStyles[
                (alert.severity in levelStyles
                  ? alert.severity
                  : "Info") as keyof typeof levelStyles
              ];

            const Icon = style.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{ scale: 1.01 }}
                className={`rounded-2xl border bg-slate-800/60 p-5 transition ${style.border}`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  {/* Left */}
                  <div className="flex items-start gap-4">

                    <div
                      className={`rounded-xl p-3 ${style.badge}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-semibold text-white">
                          {alert.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                        >
                          {alert.severity}
                        </span>

                      </div>

                      <p className="mt-1 text-sm text-slate-400">
                        Alert #{alert.id}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400">

                        <div className="flex items-center gap-2">
                          <MapPin size={15} />
                          {alert.location}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={15} />
                          {new Date(
                            alert.created_at
                          ).toLocaleString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <User size={15} />
                          AirGuardian AI
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-3">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        statusStyles[
                          (alert.status in statusStyles
                            ? alert.status
                            : "New") as keyof typeof statusStyles
                        ]
                      }`}
                    >
                      {alert.status}
                    </span>

                    <div className="flex flex-wrap gap-2">

                      {/* Details */}
                      <button
                        onClick={() =>
                          onSelect(alert)
                        }
                        className={`rounded-xl border px-4 py-2 text-sm transition ${
                          selectedAlert?.id === alert.id
                            ? "border-red-500 bg-red-500/10 text-red-400"
                            : "border-slate-700 bg-slate-800 text-white hover:border-slate-500"
                        }`}
                      >
                        Details
                      </button>

                      {/* Resolve */}
                      <button
                        onClick={async () => {
                          try {
                            await AlertAPI.resolve(
                              alert.id
                            );

                            await refresh();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                      >
                        <CheckCircle2 size={16} />
                        Resolve
                      </button>

                      {/* Delete */}
                      <button
                        onClick={async () => {
                          if (
                            !confirm(
                              "Delete this alert?"
                            )
                          )
                            return;

                          try {
                            await AlertAPI.delete(
                              alert.id
                            );

                            await refresh();
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

                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}