import { useCallback, useEffect, useState } from "react";
import { SensorAPI } from "@/lib/sensors";

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setError("");

      const response = await SensorAPI.dashboard();

      setData(response);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message || "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}