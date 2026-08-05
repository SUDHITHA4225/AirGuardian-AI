import { useCallback, useEffect, useState } from "react";
import { ReportAPI, Report } from "@/lib/reports";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await ReportAPI.all();
      setReports(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Unable to load reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    reports,
    loading,
    error,
    refresh,
    setReports,
  };
}