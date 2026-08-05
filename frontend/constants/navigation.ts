import {
  LayoutDashboard,
  Activity,
  BrainCircuit,
  BarChart3,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Live Monitoring",
    href: "/dashboard/monitoring",
    icon: Activity,
  },
  {
    title: "AI Decision Engine",
    href: "/dashboard/ai-center",
    icon: BrainCircuit,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];