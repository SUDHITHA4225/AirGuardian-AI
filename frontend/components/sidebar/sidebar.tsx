"use client";

import SidebarItem from "./sidebar-item";
import { navigation } from "@/constants/navigation";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-white">
  AirGuardian AI
</h1>

<p className="mt-1 text-sm text-slate-400 leading-relaxed">
  AI-Powered Air Monitoring &
  <br />
  Industrial Safety Assistant
</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="rounded-xl bg-slate-900 p-4">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            System Status
          </p>

          <div className="mt-4 space-y-3 text-sm">

            <div className="flex justify-between">
              <span>ESP32</span>
              <span className="text-green-500">● Online</span>
            </div>

            <div className="flex justify-between">
              <span>AWS</span>
              <span className="text-green-500">● Connected</span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-500">● Healthy</span>
            </div>

          </div>

        </div>
      </div>

    </aside>
  );
}