"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  AlertAPI,
} from "@/lib/alerts";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] =
    useState<Alert | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data =
        await AlertAPI.getAll();

      setAlerts(data);

      if (
        !selectedAlert &&
        data.length > 0
      ) {
        setSelectedAlert(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    const timer = setInterval(
      refresh,
      5000
    );

    return () =>
      clearInterval(timer);
  }, []);

  return {
    alerts,
    loading,
    refresh,
    selectedAlert,
    setSelectedAlert,
  };
}