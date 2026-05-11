import { useNavigate } from "react-router";
import { QrCode, FileText, Calendar, Bell, Clock, Wallet, ChevronRight } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const recentActivity = [
  {
    id: 1,
    type: "Izin",
    desc: "Izin Sakit - 12 Mei 2026",
    status: "Approved",
    time: "2 hari lalu",
  },
  {
    id: 2,
    type: "Cuti",
    desc: "Cuti Tahunan - 1-5 Jun 2026",
    status: "Pending",
    time: "5 hari lalu",
  },
  {
    id: 3,
    type: "Absensi",
    desc: "Check-in Terlambat - 8 Mei 2026",
    status: "Terlambat",
    time: "1 minggu lalu",
  },
];

export function KaryawanDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Selamat Datang 👋</p>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 700, marginTop: 2 }}>
              Budi Santoso
            </h2>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Bell size={20} color="white" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: "#FFA726" }}
            />
          </button>
        </div>

        {/* Info Card */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <span style={{ color: "white", fontSize: 20, fontWeight: 700 }}>BS</span>
            </div>
            <div>
              <p style={{ color: "white", fontSize: 15, fontWeight: 600 }}>Budi Santoso</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>
                NIP: KRY-2024-001 • Teknologi Informasi
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 1 }}>
                Frontend Development
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-2xl p-4"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E3F2FD" }}>
                <Clock size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 11, color: "#9E9E9E", fontWeight: 500 }}>Status Hari Ini</span>
            </div>
            <StatusBadge status="Hadir" size="md" />
            <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 6 }}>Check-in: 08:02</p>
          </div>

          <div
            className="rounded-2xl p-4"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E3F2FD" }}>
                <Wallet size={16} color="#0052CC" />
              </div>
              <span style={{ fontSize: 11, color: "#9E9E9E", fontWeight: 500 }}>Gaji Bulan Ini</span>
            </div>
            <StatusBadge status="Diproses" size="md" />
            <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 6 }}>Mei 2026</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Menu Cepat
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Absensi", icon: QrCode, path: "/karyawan/absensi", color: "#0052CC", bg: "#E3F2FD" },
              { label: "Izin", icon: FileText, path: "/karyawan/izin", color: "#FFA726", bg: "#FFF3E0" },
              { label: "Cuti", icon: Calendar, path: "/karyawan/cuti", color: "#4CAF50", bg: "#E8F5E9" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all active:scale-95"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: item.bg }}
                  >
                    <Icon size={24} color={item.color} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#001A4D" }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D" }}>Aktivitas Terakhir</h3>
            <button style={{ fontSize: 12, color: "#0052CC", fontWeight: 500 }}>Lihat Semua</button>
          </div>

          <div className="space-y-2">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "#F0F7FF" }}
                  >
                    {item.type === "Izin" ? (
                      <FileText size={16} color="#0052CC" />
                    ) : item.type === "Cuti" ? (
                      <Calendar size={16} color="#0052CC" />
                    ) : (
                      <QrCode size={16} color="#0052CC" />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#001A4D" }}>{item.desc}</p>
                    <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 1 }}>{item.time}</p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
