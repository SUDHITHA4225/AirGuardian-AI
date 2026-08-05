"use client";

import { useEffect } from "react";
import {
  Cpu,
  Wifi,
  WifiOff,
  BatteryCharging,
  RefreshCw,
  MapPin,
} from "lucide-react";

import { useDevices } from "@/hooks/useDevices";

export default function DeviceHealth() {
  const {
    devices,
    loading,
    error,
    refresh,
  } = useDevices();

  useEffect(() => {
    const timer = setInterval(() => {
      refresh();
    }, 10000);

    return () => clearInterval(timer);
  }, [refresh]);

  if (loading && devices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Loading devices...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-700 bg-red-900/20 p-6">
        <h2 className="text-lg font-semibold text-red-400">
          Unable to load devices
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

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Cpu className="text-cyan-400" />
            Device Health
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {devices.length} registered device(s)
          </p>
        </div>

        <button
          onClick={refresh}
          className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
        >
          <RefreshCw className="h-5 w-5 text-white" />
        </button>

      </div>

      {devices.length === 0 ? (
        <p className="text-slate-400">
          No registered devices.
        </p>
      ) : (
        <div className="space-y-4">

          {devices.map((device) => (

            <div
              key={device.id}
              className="rounded-xl border border-slate-800 bg-slate-800 p-4"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-white">
                    {device.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={14} />
                    {device.location}
                  </div>
                </div>

                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                    device.is_active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {device.is_active ? (
                    <Wifi size={14} />
                  ) : (
                    <WifiOff size={14} />
                  )}

                  {device.is_active ? "Online" : "Offline"}
                </span>

              </div>

              <div className="mt-5 flex items-center justify-between">

                <div className="flex items-center gap-2 text-slate-400">
                  <Wifi size={16} />
                  Strong Signal
                </div>

                <div className="flex items-center gap-2 text-green-400">
                  <BatteryCharging size={16} />
                  100%
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}