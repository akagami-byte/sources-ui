import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Bell, Moon, Globe, ChevronRight, Shield, Users, FileCheck, BarChart2 } from "lucide-react";
import { ConfirmModal } from "../../components/Modal";
import { InfoRow } from "../../components/InfoRow";

export function HRProfile() {
  const navigate = useNavigate();
  const [notif, setNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    setLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Profile Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-6"
        style={{ background: "linear-gradient(135deg, #001A4D, #0052CC)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.3)" }}
          >
            <span style={{ color: "white", fontSize: 28, fontWeight: 700 }}>HP</span>
          </div>
          <div>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 700 }}>Hendra Pratama</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
              HRID: HR-2020-001
            </p>
            <div
              className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Shield size={11} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>HR Manager</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 48, label: "Total Karyawan", icon: Users, color: "#0052CC", bg: "#E3F2FD" },
            { value: 5, label: "Izin Pending", icon: FileCheck, color: "#FFA726", bg: "#FFF3E0" },
            { value: 42, label: "Hadir Hari Ini", icon: BarChart2, color: "#4CAF50", bg: "#E8F5E9" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: s.bg }}>
                  <Icon size={16} color={s.color} />
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</p>
                <p style={{ fontSize: 9, color: "#9E9E9E", marginTop: 2, lineHeight: 1.3 }}>{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Personal Info */}
        <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 4 }}>
            Informasi Pribadi
          </h3>
          <InfoRow label="Departemen" value="Human Resources" />
          <InfoRow label="Divisi" value="HR Management" />
          <InfoRow label="Email" value="hendra.p@nexaerp.com" />
          <InfoRow label="Telepon" value="0811-2233-4455" />
          <InfoRow label="Bergabung" value="15 Jan 2020" noBorder />
        </div>

        {/* Access Level */}
        <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Level Akses
          </h3>
          {[
            "Approval Izin Karyawan",
            "Approval Cuti Karyawan",
            "Management Penggajian",
            "Monitoring Absensi",
            "Laporan HR",
          ].map((perm) => (
            <div
              key={perm}
              className="flex items-center gap-3 py-2"
              style={{ borderBottom: "1px solid #F0F0F0" }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#E8F5E9" }}>
                <span style={{ color: "#4CAF50", fontSize: 11 }}>✓</span>
              </div>
              <span style={{ fontSize: 13, color: "#001A4D" }}>{perm}</span>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Pengaturan
          </h3>

          <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F0F7FF" }}>
                <Bell size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 14, color: "#001A4D", fontWeight: 500 }}>Notifikasi</span>
            </div>
            <button
              onClick={() => setNotif(!notif)}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: notif ? "#0052CC" : "#E0E0E0",
                position: "relative", border: "none", cursor: "pointer", transition: "background 200ms",
              }}
            >
              <div style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "white", top: 3, left: notif ? 23 : 3, transition: "left 200ms", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F0F7FF" }}>
                <Moon size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 14, color: "#001A4D", fontWeight: 500 }}>Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: darkMode ? "#0052CC" : "#E0E0E0",
                position: "relative", border: "none", cursor: "pointer", transition: "background 200ms",
              }}
            >
              <div style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "white", top: 3, left: darkMode ? 23 : 3, transition: "left 200ms", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F0F7FF" }}>
                <Globe size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 14, color: "#001A4D", fontWeight: 500 }}>Bahasa</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 13, color: "#616161" }}>Indonesia</span>
              <ChevronRight size={16} color="#9E9E9E" />
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="text-center">
          <p style={{ fontSize: 12, color: "#9E9E9E" }}>Nexa ERP v2.4.1 • © 2026</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-all active:scale-95"
          style={{
            background: "#EF5350",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          <LogOut size={18} />
          Keluar dari Akun
        </button>

        <div style={{ height: 8 }} />
      </div>

      <ConfirmModal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={handleLogout}
        title="Keluar"
        message="Apakah Anda yakin ingin keluar dari akun HR Manager? Semua sesi aktif akan dihentikan."
        confirmLabel="Ya, Keluar"
        confirmColor="#EF5350"
      />
    </div>
  );
}
