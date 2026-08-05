"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Gas Level Normal",
      message: "Gas concentration has returned to a safe range.",
      type: "success",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Sensor Updated",
      message: "ESP32 uploaded new sensor readings.",
      type: "info",
      time: "15 mins ago",
      read: false,
    },
    {
      id: 3,
      title: "Temperature Warning",
      message: "Temperature exceeded 35°C earlier today.",
      type: "warning",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Notifications
          </h1>

          <p className="mt-2 text-slate-400">
            View recent alerts and system events.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <CheckCheck size={18} />
            Mark All Read
          </button>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
          >
            <Trash2 size={18} />
            Clear All
          </button>

        </div>

      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <Bell
            className="mx-auto mb-4 text-slate-500"
            size={50}
          />

          <h2 className="text-2xl font-semibold text-white">
            No Notifications
          </h2>

          <p className="mt-2 text-slate-400">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`rounded-2xl border p-6 transition ${
                item.read
                  ? "border-slate-800 bg-slate-900"
                  : "border-blue-500 bg-slate-900"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div>

                    {item.type === "success" && (
                      <CheckCircle2
                        className="text-green-500"
                        size={28}
                      />
                    )}

                    {item.type === "warning" && (
                      <AlertTriangle
                        className="text-yellow-500"
                        size={28}
                      />
                    )}

                    {item.type === "info" && (
                      <Info
                        className="text-cyan-400"
                        size={28}
                      />
                    )}

                  </div>

                  <div>

                    <h2 className="text-xl font-semibold text-white">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-slate-400">
                      {item.message}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      {item.time}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteNotification(item.id)
                  }
                  className="rounded-lg p-2 hover:bg-slate-800"
                >
                  <Trash2 className="text-red-500" />
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}