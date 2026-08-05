"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

interface Props {
  children: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1">
          <Navbar />

          <section className="p-8">
            {children}
          </section>
        </main>

      </div>
    </div>
  );
}