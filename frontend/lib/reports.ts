import { api } from "./api";

const API_URL = "http://localhost:8000";

export interface Report {
  id: number;
  title: string;
  report_type: string;
  generated_by: string;
  file_name: string;
  created_at: string;
}

export const ReportAPI = {
  // Get all reports
  all() {
    return api<Report[]>("/reports/");
  },

  // Generate report
  generate(title: string, report_type: string) {
    return api<Report>("/reports/generate", {
      method: "POST",
      body: JSON.stringify({
        title,
        report_type,
      }),
    });
  },

  // Preview PDF
  preview(id: number) {
    window.open(
      `${API_URL}/reports/${id}/preview`,
      "_blank"
    );
  },

  // Download PDF
  download(id: number) {
    window.open(
      `${API_URL}/reports/${id}/download`,
      "_blank"
    );
  },

  // Delete report
  delete(id: number) {
    return api(`/reports/${id}`, {
      method: "DELETE",
    });
  },

  // Export CSV
  exportCSV() {
    window.open(
      `${API_URL}/reports/export/csv`,
      "_blank"
    );
  },

  // Export JSON
  exportJSON() {
    window.open(
      `${API_URL}/reports/export/json`,
      "_blank"
    );
  },

  // Export ZIP
  exportZIP() {
    window.open(
      `${API_URL}/reports/export/zip`,
      "_blank"
    );
  },
};