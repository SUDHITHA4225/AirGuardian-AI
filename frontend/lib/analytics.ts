import { api } from "./api";

const API_URL = "http://localhost:8000";

export interface Analytics {
  id: number;
  temperature: number;
  humidity: number;
  gas_level: number;
  air_quality: number;
  zone: string;
  status: string;
  created_at: string;
}

export const AnalyticsAPI = {
  // Get all analytics data
  all() {
    return api<Analytics[]>("/analytics/");
  },

  // Refresh analytics
  refresh() {
    return api<Analytics[]>("/analytics/");
  },

  // Export analytics as CSV
  exportCSV() {
    window.open(
      `${API_URL}/analytics/export/csv`,
      "_blank"
    );
  },

  // Export analytics as JSON
  exportJSON() {
    window.open(
      `${API_URL}/analytics/export/json`,
      "_blank"
    );
  },

  // Export analytics as PDF
  exportPDF() {
    window.open(
      `${API_URL}/analytics/export/pdf`,
      "_blank"
    );
  },
};