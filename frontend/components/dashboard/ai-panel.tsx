"use client";

import { useEffect } from "react";
import {
  Bot,
  ShieldCheck,
  TriangleAlert,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useDashboard } from "@/hooks/useDashboard";

export default function AIPanel() {
  const router = useRouter();

  const {
    data,
    loading,
    error,
    refresh,
  } = useDashboard();

  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 10000);

    return () => clearInterval(timer);
  }, [refresh]);

  if (loading && !data) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading AI recommendations...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-700 bg-red-900/20 p-6">
        <h2 className="text-lg font-semibold text-red-400">
          AI Service Unavailable
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

  const gas = Number(data?.latest_reading?.gas_level ?? 0);
  const temperature = Number(data?.latest_reading?.temperature ?? 0);
  const humidity = Number(data?.latest_reading?.humidity ?? 0);

  let status = "SAFE";
  let color = "text-green-400";
  let bg = "bg-green-500/10";
  let icon = <CheckCircle2 className="h-9 w-9 text-green-500" />;

  let recommendation =
    "All environmental conditions are within acceptable industrial limits.";

  if (gas > 300 || temperature > 45) {
    status = "CRITICAL";
    color = "text-red-400";
    bg = "bg-red-500/10";

    icon = (
      <TriangleAlert className="h-9 w-9 text-red-500" />
    );

    recommendation =
      "Dangerous gas concentration detected. Evacuate personnel immediately, activate emergency ventilation and inspect the affected area.";
  } else if (gas > 180 || temperature > 35) {
    status = "WARNING";
    color = "text-yellow-400";
    bg = "bg-yellow-500/10";

    icon = (
      <ShieldCheck className="h-9 w-9 text-yellow-500" />
    );

    recommendation =
      "Sensor values are increasing. Improve ventilation and continue monitoring closely.";
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Bot className="h-7 w-7 text-cyan-400" />

          <h2 className="text-xl font-bold text-white">
            AI Safety Assistant
          </h2>

        </div>

        <button
          onClick={refresh}
          className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
        >
          <RefreshCw className="h-5 w-5 text-white" />
        </button>

      </div>

      <div className={`mb-6 rounded-xl p-4 ${bg}`}>

        <div className="flex items-center gap-4">

          {icon}

          <div>

            <h3 className={`text-xl font-bold ${color}`}>
              {status}
            </h3>

            <p className="text-slate-400">
              Industrial Safety Status
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-3 rounded-xl bg-slate-800 p-5">

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            Temperature
          </span>

          <span className="font-semibold text-white">
            {temperature}°C
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            Humidity
          </span>

          <span className="font-semibold text-white">
            {humidity}%
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            Gas
          </span>

          <span className="font-semibold text-white">
            {gas} ppm
          </span>

        </div>

      </div>

      <div className="mt-5 rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">

        <h3 className="mb-2 font-semibold text-cyan-300">
          AI Recommendation
        </h3>

        <p className="text-sm leading-7 text-slate-300">
          {recommendation}
        </p>

      </div>

      <button
        onClick={() => router.push("/dashboard/ai-center")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 font-medium text-white transition hover:bg-cyan-700"
      >
        Open AI Decision Engine

        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
}