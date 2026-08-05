"use client";

import { useMemo } from "react";
import {
  ShieldAlert,
  TriangleAlert,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/useDashboard";

export default function IncidentPanel() {
  const router = useRouter();

  const { data, loading } = useDashboard();

  const incident = useMemo(() => {
    const gas = Number(data?.latest_reading?.gas_level ?? 0);
    const temp = Number(data?.latest_reading?.temperature ?? 0);
    const humidity = Number(data?.latest_reading?.humidity ?? 0);

    if (gas > 300 || temp > 45) {
      return {
        level: "Critical",
        icon: (
          <TriangleAlert className="h-10 w-10 text-red-500" />
        ),
        color: "text-red-400",
        bg: "bg-red-500/10",
        message:
          "Critical environmental conditions detected. Immediate evacuation and ventilation inspection are recommended.",
      };
    }

    if (gas > 180 || temp > 35) {
      return {
        level: "Warning",
        icon: (
          <ShieldAlert className="h-10 w-10 text-yellow-500" />
        ),
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        message:
          "Sensor readings are approaching unsafe limits. Continue monitoring and improve ventilation.",
      };
    }

    return {
      level: "Normal",
      icon: (
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      ),
      color: "text-green-400",
      bg: "bg-green-500/10",
      message:
        "No critical industrial hazards detected. Environmental conditions remain stable.",
    };
  }, [data]);

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading latest incident...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Latest Incident Analysis
      </h2>

      <div
        className={`mb-5 flex items-center gap-4 rounded-xl p-4 ${incident.bg}`}
      >
        {incident.icon}

        <div>
          <h3
            className={`text-lg font-bold ${incident.color}`}
          >
            {incident.level}
          </h3>

          <p className="text-sm text-slate-400">
            AI Incident Classification
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-800 p-5">

        <p className="leading-7 text-slate-300">
          {incident.message}
        </p>

      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">

        <div className="rounded-lg bg-slate-800 p-3 text-center">
          <p className="text-xs text-slate-400">
            Temperature
          </p>

          <p className="mt-1 font-semibold text-white">
            {data?.latest_reading?.temperature ?? "--"}°C
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-3 text-center">
          <p className="text-xs text-slate-400">
            Humidity
          </p>

          <p className="mt-1 font-semibold text-white">
            {data?.latest_reading?.humidity ?? "--"}%
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-3 text-center">
          <p className="text-xs text-slate-400">
            Gas
          </p>

          <p className="mt-1 font-semibold text-white">
            {data?.latest_reading?.gas_level ?? "--"} ppm
          </p>
        </div>

      </div>

      <button
        onClick={() => router.push("/dashboard/reports")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
      >
        View Incident Reports

        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Last Updated: {new Date().toLocaleString()}
      </p>

    </div>
  );
}