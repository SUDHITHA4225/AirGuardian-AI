export interface SensorReading {
  id: number;
  device_id: number;
  temperature: number;
  humidity: number;
  gas_level: number;
  created_at: string;
}

export interface DashboardData {
  total_devices: number;
  total_readings: number;
  active_alerts: number;
  latest_reading: SensorReading | null;
}