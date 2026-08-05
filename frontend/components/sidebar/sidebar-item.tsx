"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface Props {
  item: {
    title: string;
    href: string;
    icon: LucideIcon;
  };
}

export default function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300",
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span>{item.title}</span>
    </Link>
  );
}