import { useCallback, useEffect, useState } from "react";

import { DeviceAPI } from "@/lib/devices";
import type { Device } from "@/types/device";

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await DeviceAPI.all();

      setDevices(data);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message || "Unable to load devices."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    devices,
    loading,
    error,
    refresh,
  };
}