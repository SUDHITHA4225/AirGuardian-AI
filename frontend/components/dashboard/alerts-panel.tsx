"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useAlerts } from "@/hooks/useAlerts";

export default function AlertsPanel() {
  const router = useRouter();

  const {
    alerts,
    loading,
    error,
    refresh,
  } = useAlerts();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 10000);

    return () => clearInterval(timer);
  }, [refresh]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) =>
      `${alert.alert_type} ${alert.message} ${alert.severity}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [alerts, search]);

  if (loading && alerts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading alerts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-700 bg-red-900/20 p-6">
        <h2 className="text-lg font-semibold text-red-400">
          Unable to load alerts
        </h2>

        <p className="mt-2 text-slate-300">
          {error}
        </p>

        <button
          onClick={refresh}
          className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <AlertTriangle className="text-red-500" />
            Active Alerts
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {alerts.length} Active Alert(s)
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={refresh}
            className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
          >
            <RefreshCw className="h-5 w-5 text-white" />
          </button>

          <button
            onClick={() => router.push("/dashboard/alerts")}
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <ExternalLink className="h-5 w-5 text-white" />
          </button>

        </div>

      </div>

      <div className="relative mb-5">

        <Search
          className="absolute left-3 top-3 text-slate-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search alerts..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-3 text-white outline-none focus:border-blue-500"
        />

      </div>

      {filteredAlerts.length === 0 ? (
        <p className="text-center text-green-400">
          🎉 No active alerts
        </p>
      ) : (
        <div className="space-y-4">

          {filteredAlerts.map((alert) => (

            <div
              key={alert.id}
              className="rounded-xl border border-slate-800 bg-slate-800 p-4 transition hover:border-blue-500"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  {alert.alert_type}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    alert.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : alert.severity === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : alert.severity === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {alert.severity}
                </span>

              </div>

              <p className="mt-3 text-sm text-slate-300">
                {alert.message}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                {new Date(alert.created_at).toLocaleString()}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}