import { api } from "./api";
import type {
  SensorReading,
  DashboardData,
} from "@/types/sensor";

export const SensorAPI = {
  dashboard() {
    return api<DashboardData>("/sensors/dashboard");
  },

  latest(deviceId: number) {
    return api<SensorReading>(
      `/sensors/latest/${deviceId}`
    );
  },

  history(deviceId: number) {
    return api<SensorReading[]>(
      `/sensors/history/${deviceId}`
    );
  },
};