import { Alert } from "./alert";
import { SensorReading } from "./sensor";

export interface DashboardData {
  total_devices: number;
  total_readings: number;
  active_alerts: number;
  latest_reading: SensorReading | null;
}

export interface DashboardMetric {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}