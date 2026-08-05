"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { RefreshCw } from "lucide-react";
import { useSensors } from "@/hooks/useSensors";

export default function LiveChart() {
  const [deviceId, setDeviceId] = useState(1);

  const {
    history,
    loading,
    refresh,
  } = useSensors(deviceId);

  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(timer);
  }, [refresh]);

  if (loading && history.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading sensor history...
        </p>
      </div>
    );
  }

  const chartData = history.map((item: any) => ({
    ...item,
    time: new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <h2 className="text-xl font-bold text-white">
          Live Sensor History
        </h2>

        <div className="flex items-center gap-3">

          <select
            value={deviceId}
            onChange={(e) => setDeviceId(Number(e.target.value))}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
          >
            <option value={1}>Device 1</option>
          </select>

          <button
            onClick={refresh}
            className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
          >
            <RefreshCw
              className="h-5 w-5 text-white"
            />
          </button>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={340}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature (°C)"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity (%)"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="gas_level"
            name="Gas (ppm)"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}