"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navigation = [
  { title: "Features", href: "#features" },
  { title: "Technology", href: "#technology" },
  { title: "Architecture", href: "#architecture" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function launchDashboard() {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-7 py-4 backdrop-blur-2xl">

        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 text-lg font-black text-white">
            AI
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              AirGuardian AI
            </h1>

            <p className="text-sm text-slate-400">
              Cloud-Native Intelligent Air Monitoring &
              <br />
               Industrial Safety Platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-sky-400"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            href="/login"
            className="text-slate-300 hover:text-sky-400"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="text-slate-300 hover:text-sky-400"
          >
            Register
          </Link>

          <button
            onClick={launchDashboard}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-700 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105 transition"
          >
            Launch Dashboard

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </button>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mx-5 mt-3 rounded-2xl border border-white/10 bg-slate-950/95 p-6 backdrop-blur-2xl lg:hidden"
          >

            <div className="flex flex-col gap-5">

              {navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300"
                >
                  {item.title}
                </Link>
              ))}

              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>

              <button
                onClick={() => {
                  setOpen(false);
                  launchDashboard();
                }}
                className="rounded-xl bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-700 px-5 py-3 text-white"
              >
                Launch Dashboard
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  );
}