"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { NAV } from "@/lib/nav";
import { useAuth } from "@/lib/auth";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, can, logout } = useAuth();
  const items = NAV.filter((n) => can(n.permission));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-900 text-slate-200 transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <div className="text-lg font-bold tracking-tight text-white">TBO SmartERP</div>
            <div className="text-xs text-slate-400">The Brands Outlet</div>
          </div>
          <button className="lg:hidden" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {items.map(({ label, href, icon: Icon, phase }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-white text-navy-800 font-semibold" : "hover:bg-navy-800"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {phase > 1 && !active && <span className="h-1.5 w-1.5 rounded-full bg-slate-500" title="Not built yet" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-navy-800 p-4">
          <div className="truncate text-sm font-medium text-white">{user?.full_name}</div>
          <div className="mb-3 text-xs text-slate-400">{user?.role}</div>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
