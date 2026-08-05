"use client";

import Link from "next/link";
import {
  Cpu,
  Cloud,
  Database,
  BrainCircuit,
  Globe,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[160px]" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[160px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 text-xl font-black text-white shadow-xl shadow-blue-500/30">

                AI

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">

                  MerkelTree

                </h2>

                <p className="text-xs text-slate-400">

                  Industrial Safety Intelligence

                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-slate-400">

              AI-powered industrial air quality monitoring platform
              integrating IoT, FastAPI, Gemini AI and AWS Cloud for
              intelligent workplace safety.

            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="mb-5 font-semibold text-white">

              Navigation

            </h3>

            <div className="space-y-3">

              <Link href="#features" className="block text-slate-400 hover:text-sky-400">
                Features
              </Link>

              <Link href="#technology" className="block text-slate-400 hover:text-sky-400">
                Technology
              </Link>

              <Link href="/dashboard" className="block text-slate-400 hover:text-sky-400">
                Dashboard
              </Link>

            </div>

          </div>

          {/* Technology */}

          <div>

            <h3 className="mb-5 font-semibold text-white">

              Technology

            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-300">

                <Cpu size={18} />

                ESP32 + Sensors

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Database size={18} />

                PostgreSQL

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <BrainCircuit size={18} />

                Gemini AI

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Cloud size={18} />

                AWS Cloud

              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-5 font-semibold text-white">

              Connect

            </h3>

            <div className="flex gap-4">

              <button className="rounded-xl border border-white/10 bg-slate-900 p-3 transition hover:border-sky-500 hover:bg-slate-800">

                <Globe className="text-white" />

              </button>

              <button className="rounded-xl border border-white/10 bg-slate-900 p-3 transition hover:border-sky-500 hover:bg-slate-800">

                <Mail className="text-white" />

              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

            <p>

              © 2026 MerkelTree. All Rights Reserved.

            </p>

            <p>

              AI • IoT • FastAPI • PostgreSQL • Gemini • AWS

            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}