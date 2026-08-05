"use client";

import { Bell, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function DashboardHeader() {
  const { user, loading } = useAuth();

  const [connected, setConnected] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function refreshDashboard() {
    setRefreshing(true);

    try {
      await fetch("http://localhost:8000/sensors/dashboard");
    } catch (err) {
      console.error(err);
      setConnected(false);
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white">
          {loading
            ? "Loading..."
            : `Welcome, ${user?.full_name ?? "Guest"}`}
        </h1>

        <p className="mt-2 text-slate-400">
          AirGuardian AI Monitoring Dashboard
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            connected
              ? "bg-green-500/10"
              : "bg-red-500/10"
          }`}
        >
          {connected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}

          <span
            className={`text-sm ${
              connected
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <button
          onClick={refreshDashboard}
          className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700"
        >
          <RefreshCw
            className={`h-5 w-5 text-white ${
              refreshing ? "animate-spin" : ""
            }`}
          />
        </button>

        <button
          onClick={() => window.location.href = "/dashboard/alerts"}
          className="rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700"
        >
          <Bell className="h-5 w-5 text-white" />
        </button>

      </div>

    </div>
  );
}