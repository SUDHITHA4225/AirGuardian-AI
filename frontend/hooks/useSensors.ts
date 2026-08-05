import { useCallback, useEffect, useState } from "react";

import { SensorAPI } from "@/lib/sensors";
import type { SensorReading } from "@/types/sensor";

export function useSensors(deviceId: number) {
  const [history, setHistory] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await SensorAPI.history(deviceId);

      setHistory(data);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message || "Unable to load sensor history."
      );
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    history,
    loading,
    error,
    refresh,
  };
}