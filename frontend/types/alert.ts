export interface Alert {
  id: number;
  device_id: number;
  alert_type: string;
  message: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  is_resolved: boolean;
  created_at: string;
}