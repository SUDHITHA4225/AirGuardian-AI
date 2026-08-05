"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Wrench,
  Radio,
  Phone,
  MapPin,
} from "lucide-react";

import type { Alert } from "@/lib/alerts";

interface ResponseTeamProps {
  alert: Alert | null;
}

const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Safety Officer",
    status: "Responding",
    online: true,
    icon: ShieldCheck,
    color: "text-red-400",
  },
  {
    id: 2,
    name: "Priya Reddy",
    role: "Maintenance Engineer",
    status: "On Site",
    online: true,
    icon: Wrench,
    color: "text-yellow-400",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    role: "Operations Lead",
    status: "Monitoring",
    online: true,
    icon: Radio,
    color: "text-sky-400",
  },
];

export default function ResponseTeam({
  alert,
}: ResponseTeamProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Response Team
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Active Personnel
          </h2>
        </div>

        <Users
          className="text-sky-400"
          size={28}
        />
      </div>

      {alert && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-slate-300">
            Assigned Incident
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            {alert.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
            <MapPin size={16} />
            {alert.location}
          </div>

          <span className="mt-4 inline-flex rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
            {alert.severity}
          </span>
        </div>
      )}

      <div className="space-y-4">
        {members.map((member, index) => {
          const Icon = member.icon;

          return (
            <motion.div
              key={member.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-slate-800/60 p-4"
            >
              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">

                    <Icon
                      className={member.color}
                      size={22}
                    />

                    {member.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
                    )}

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {member.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {member.role}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={15} />
                      {alert?.location ?? "Factory"}
                    </div>

                  </div>

                </div>

                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
                  {member.status}
                </span>

              </div>

              <div className="mt-4 flex gap-2">

                <button
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition hover:border-slate-500"
                >
                  View
                </button>

                <button
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  <Phone size={15} />
                  Contact
                </button>

              </div>

            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-emerald-400">
            {members.length} Teams
          </span>{" "}
          currently assigned to industrial safety monitoring.
        </p>
      </div>
    </motion.div>
  );
}