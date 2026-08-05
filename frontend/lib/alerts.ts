import { api } from "./api";

const API_URL =
  "http://localhost:8000";

export interface Alert {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  location: string;
  created_at: string;
}

export const AlertAPI = {
  getAll() {
    return api<Alert[]>(
      "/alerts/"
    );
  },

  resolve(id: number) {
    return api(
      `/alerts/${id}/resolve`,
      {
        method: "PUT",
      }
    );
  },

  delete(id: number) {
    return api(
      `/alerts/${id}`,
      {
        method: "DELETE",
      }
    );
  },

  exportCSV() {
    window.open(
      `${API_URL}/alerts/export/csv`,
      "_blank"
    );
  },

  exportJSON() {
    window.open(
      `${API_URL}/alerts/export/json`,
      "_blank"
    );
  },
};