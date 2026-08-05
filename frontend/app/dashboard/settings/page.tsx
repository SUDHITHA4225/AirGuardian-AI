"use client";

import {
  Bell,
  Cpu,
  Database,
  KeyRound,
  Save,
  Server,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure your AirGuardian AI platform.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Gemini */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <KeyRound className="h-5 w-5 text-cyan-400" />

              Gemini API

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <input
              type="password"
              placeholder="Gemini API Key"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
              Save API Key
            </Button>

          </CardContent>

        </Card>

        {/* Backend */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <Server className="h-5 w-5 text-green-400" />

              Backend Server

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <input
              defaultValue="http://localhost:8000"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-500"
            />

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Save URL
            </Button>

          </CardContent>

        </Card>

        {/* Database */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <Database className="h-5 w-5 text-blue-400" />

              PostgreSQL Database

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <input
              defaultValue="localhost"
              placeholder="Host"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />

            <input
              defaultValue="5432"
              placeholder="Port"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />

            <input
              defaultValue="airguardian"
              placeholder="Database"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Save Database
            </Button>

          </CardContent>

        </Card>

        {/* ESP32 */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <Cpu className="h-5 w-5 text-orange-400" />

              ESP32 Device

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <input
              placeholder="Device ID"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />

            <input
              placeholder="WiFi SSID"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />

            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Register Device
            </Button>

          </CardContent>

        </Card>

        {/* Notifications */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <Bell className="h-5 w-5 text-yellow-400" />

              Notifications

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <label className="flex items-center justify-between text-slate-200">

              Email Alerts

              <input type="checkbox" defaultChecked />

            </label>

            <label className="flex items-center justify-between text-slate-200">

              SMS Alerts

              <input type="checkbox" />

            </label>

            <label className="flex items-center justify-between text-slate-200">

              Critical Alerts

              <input type="checkbox" defaultChecked />

            </label>

          </CardContent>

        </Card>

        {/* Security */}

        <Card className="border-slate-800 bg-slate-900 shadow-xl">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-white">

              <Shield className="h-5 w-5 text-red-400" />

              Security

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <Button
              variant="secondary"
              className="w-full"
            >
              Change Password
            </Button>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">

              <Save className="mr-2 h-4 w-4" />

              Save All Settings

            </Button>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}