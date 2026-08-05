import { useEffect, useState } from "react";
import { AnalyticsAPI, type Analytics } from "@/lib/analytics";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data = await AnalyticsAPI.all();

      setAnalytics(data);
    } catch (err) {
      console.error("Analytics Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    analytics,
    loading,
    refresh,
  };
}