import { api } from "./api";
import type { Device } from "@/types/device";

export const DeviceAPI = {
  all() {
    return api<Device[]>("/devices");
  },
};