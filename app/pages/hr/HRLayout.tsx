import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileCheck,
  CalendarCheck,
  Wallet,
  BarChart2,
  User,
} from "lucide-react";

const tabs = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/hr/dashboard" },
  { label: "Izin", icon: FileCheck, path: "/hr/approval-izin" },
  { label: "Cuti", icon: CalendarCheck, path: "/hr/approval-cuti" },
  { label: "Gaji", icon: Wallet, path: "/hr/penggajian" },
  { label: "Monitor", icon: BarChart2, path: "/hr/monitoring" },
  { label: "Profil", icon: User, path: "/hr/profile" },
];

export function HRLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Page Content */}
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div
        className="flex-shrink-0 flex"
        style={{
          height: 64,
          background: "white",
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            (tab.path === "/hr/dashboard" && location.pathname === "/hr");
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1"
              style={{
                background: isActive ? "#F0F7FF" : "transparent",
                color: isActive ? "#0052CC" : "#9E9E9E",
                border: "none",
                cursor: "pointer",
                transition: "all 200ms ease-in-out",
                borderRadius: 8,
                margin: "4px 1px",
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: 1,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
