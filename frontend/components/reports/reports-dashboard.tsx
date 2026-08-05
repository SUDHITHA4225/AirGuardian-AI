"use client";

import { useState } from "react";

import ReportsHeader from "./reports-header";
import ReportOverview from "./report-overview";
import ReportLibrary from "./report-library";
import ReportPreview from "./report-preview";
import AISummary from "./ai-summary";
import ExportOptions from "./export-options";
import ReportHistory from "./report-history";

import { useReports } from "@/hooks/useReports";
import { ReportAPI, type Report } from "@/lib/reports";

export default function ReportsDashboard() {
  const {
    reports,
    loading,
    refresh,
  } = useReports();

  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);

  async function handleDelete(id: number) {
    try {
      await ReportAPI.delete(id);

      // Refresh reports from backend
      await refresh();

      // Clear preview if deleted report was selected
      if (selectedReport?.id === id) {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">

      <ReportsHeader refresh={refresh} />

      <ReportOverview
        reports={reports}
        loading={loading}
      />

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <ReportLibrary
            reports={reports}
            loading={loading}
            onSelect={setSelectedReport}
          />

        </div>

        <ReportPreview
          report={selectedReport}
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <AISummary
            report={selectedReport}
          />

        </div>

        <ExportOptions />

      </div>

      <ReportHistory
        reports={reports}
        loading={loading}
        onDelete={handleDelete}
      />

    </div>
  );
}