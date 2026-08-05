"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const value = search.toLowerCase();

    if (value.includes("dashboard") || value.includes("overview"))
      router.push("/dashboard");

    else if (value.includes("monitor"))
      router.push("/dashboard/monitoring");

    else if (value.includes("ai"))
      router.push("/dashboard/ai-center");

    else if (value.includes("alert"))
      router.push("/dashboard/alerts");

    else if (value.includes("report"))
      router.push("/dashboard/reports");

    else if (value.includes("analytic"))
      router.push("/dashboard/analytics");

    else if (value.includes("setting"))
      router.push("/dashboard/settings");

    else if (value.includes("profile"))
      router.push("/dashboard/profile");

    else if (value.includes("device"))
      router.push("/dashboard/devices");

    else
      alert("No matching page found.");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-8">

        <div className="flex items-center gap-4">

          <Search className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search dashboard pages..."
            className="w-72 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-blue-500"
          />

        </div>

        <div className="flex items-center gap-6">

          <button
            onClick={() => router.push("/dashboard/notifications")}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Bell className="text-slate-300" />
          </button>

          <button
            onClick={() => router.push("/dashboard/profile")}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <UserCircle
              size={34}
              className="text-slate-300"
            />
          </button>

        </div>

      </div>

    </header>
  );
}