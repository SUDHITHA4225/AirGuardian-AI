"use client";

import { useEffect, useState } from "react";

import {
  Mail,
  Shield,
  Calendar,
  Activity,
  Laptop,
  KeyRound,
  LogOut,
  Edit,
} from "lucide-react";

import { AuthAPI, User } from "@/lib/auth";

export default function ProfilePage() {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await AuthAPI.me();
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your AirGuardian AI account.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col items-center">

            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-5xl font-bold text-white">

              {user?.full_name.charAt(0).toUpperCase()}

            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">

              {user?.full_name}

            </h2>

            <p className="text-slate-400">
              AirGuardian User
            </p>

            <button
              className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >

              <Edit size={18} />

              Edit Profile

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-semibold text-white">
              Account Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                              <InfoCard
                icon={<Mail />}
                title="Email"
                value={user?.email ?? ""}
              />

              <InfoCard
                icon={<Shield />}
                title="Role"
                value="Administrator"
              />

              <InfoCard
                icon={<Calendar />}
                title="Joined"
                value="Recently Registered"
              />

              <InfoCard
                icon={<Activity />}
                title="Status"
                value="Active"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="mb-6 text-2xl font-semibold text-white">
              Connected Devices
            </h2>

            <div className="space-y-4">

              <DeviceCard
                name="ESP32 Air Sensor"
                status="Connected"
              />

              <DeviceCard
                name="AWS Backend"
                status="Connected"
              />

              <DeviceCard
                name="Gemini AI"
                status="Active"
              />

            </div>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              <KeyRound size={18} />
              Change Password
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}
function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">

      <div className="mb-3 flex items-center gap-3 text-cyan-400">

        {icon}

        <span className="font-medium">
          {title}
        </span>

      </div>

      <p className="break-all text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

function DeviceCard({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 p-5">

      <div className="flex items-center gap-3">

        <Laptop className="text-cyan-400" />

        <div>

          <h3 className="font-semibold text-white">
            {name}
          </h3>

          <p className="text-sm text-slate-400">
            Connected
          </p>

        </div>

      </div>

      <span
        className={`rounded-full px-4 py-2 text-sm font-medium ${
          status === "Active" || status === "Connected"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>

    </div>
  );
}