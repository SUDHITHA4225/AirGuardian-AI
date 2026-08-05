"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await AuthAPI.login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        response.access_token
      );

      router.push("/dashboard");
    } catch (err: any) {
      try {
        const message = JSON.parse(err.message);
        alert(message.detail);
      } catch {
        alert("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

        <div className="mb-8 flex flex-col items-center">

          <div className="rounded-full bg-cyan-500/20 p-5">
            <ShieldCheck
              className="text-cyan-400"
              size={40}
            />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-white">
            AirGuardian AI
          </h1>

          <p className="mt-2 text-slate-400">
            Industrial Safety Platform
          </p>

        </div>

        <form
          onSubmit={login}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="relative">

              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3 text-slate-400"
              >
                {show ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-slate-400">

              <input
                type="checkbox"
                className="rounded"
              />

              Remember me

            </label>

            <Link
              href="/forgot-password"
              className="text-cyan-400 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Don't have an account?

          <Link
            href="/register"
            className="ml-2 text-cyan-400 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}