import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, Bell, Moon, Globe, ChevronRight, User } from "lucide-react";
import { ConfirmModal } from "../../components/Modal";
import { InfoRow } from "../../components/InfoRow";

export function KaryawanProfile() {
  const navigate = useNavigate();
  const [notif, setNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [bahasa, setBahasa] = useState("Indonesia");
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
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.3)" }}
          >
            <span style={{ color: "white", fontSize: 28, fontWeight: 700 }}>BS</span>
          </div>
          <div>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 700 }}>Budi Santoso</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
              NIP: KRY-2024-001
            </p>
            <div
              className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <User size={11} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Karyawan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 12, label: "Cuti Tersisa" },
            { value: 5, label: "Izin Tersisa" },
            { value: 22, label: "Hadir/Bulan" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3 text-center"
              style={{ background: "#E3F2FD" }}
            >
              <p style={{ fontSize: 20, fontWeight: 700, color: "#0052CC" }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#616161", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Personal Info */}
        <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 4 }}>
            Informasi Pribadi
          </h3>
          <InfoRow label="Departemen" value="Teknologi Informasi" />
          <InfoRow label="Divisi" value="Frontend Development" />
          <InfoRow label="Email" value="budi.santoso@nexaerp.com" />
          <InfoRow label="Telepon" value="0812-3456-7890" />
          <InfoRow label="Bergabung" value="01 Jan 2024" noBorder />
        </div>

        {/* Settings */}
        <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Pengaturan
          </h3>

          {/* Notifikasi Toggle */}
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
                width: 44,
                height: 24,
                borderRadius: 12,
                background: notif ? "#0052CC" : "#E0E0E0",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background 200ms",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "white",
                  top: 3,
                  left: notif ? 23 : 3,
                  transition: "left 200ms",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>

          {/* Dark Mode Toggle */}
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
                width: 44,
                height: 24,
                borderRadius: 12,
                background: darkMode ? "#0052CC" : "#E0E0E0",
                position: "relative",
                border: "none",
                cursor: "pointer",
                transition: "background 200ms",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "white",
                  top: 3,
                  left: darkMode ? 23 : 3,
                  transition: "left 200ms",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>

          {/* Bahasa */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F0F7FF" }}>
                <Globe size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 14, color: "#001A4D", fontWeight: 500 }}>Bahasa</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 13, color: "#616161" }}>{bahasa}</span>
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
        message="Apakah Anda yakin ingin keluar dari akun? Semua sesi aktif akan dihentikan."
        confirmLabel="Ya, Keluar"
        confirmColor="#EF5350"
      />
    </div>
  );
}
