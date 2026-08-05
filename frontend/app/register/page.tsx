"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function register(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: form.full_name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Registration failed."
        );
      }

      alert("Registration successful!");

      router.push("/login");

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">

      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20">
            <ShieldCheck
              className="text-cyan-400"
              size={38}
            />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Register to access AirGuardian AI
          </p>

        </div>

        <form
          onSubmit={register}
          className="space-y-5"
        >

          <input
            required
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          <div className="relative">

            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3 text-slate-400"
            >
              {showPassword ? (
                <EyeOff />
              ) : (
                <Eye />
              )}
            </button>

          </div>

          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Already have an account?

          <Link
            href="/login"
            className="ml-2 text-cyan-400 hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
}