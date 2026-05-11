import { useNavigate } from "react-router";
import { Users, FileText, Calendar, Clock, Bell, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const kpiData = [
  {
    label: "Total Karyawan",
    value: 48,
    icon: Users,
    bg: "#E3F2FD",
    color: "#0052CC",
    trend: "+2",
    trendUp: true,
  },
  {
    label: "Izin Pending",
    value: 5,
    icon: FileText,
    bg: "#FFF3E0",
    color: "#FFA726",
    trend: "+1",
    trendUp: false,
  },
  {
    label: "Cuti Pending",
    value: 3,
    icon: Calendar,
    bg: "#E8F5E9",
    color: "#4CAF50",
    trend: "-1",
    trendUp: true,
  },
  {
    label: "Hadir Hari Ini",
    value: 42,
    icon: Clock,
    bg: "#F3E5F5",
    color: "#9C27B0",
    trend: "87.5%",
    trendUp: true,
  },
];

const salaryUpdates = [
  { nama: "Budi Santoso", dept: "IT", nominal: 8500000, status: "Diproses" as const },
  { nama: "Siti Rahayu", dept: "Marketing", nominal: 7200000, status: "Dibayar" as const },
  { nama: "Ahmad Fauzi", dept: "Finance", nominal: 9100000, status: "Dibayar" as const },
  { nama: "Dewi Kusuma", dept: "HR", nominal: 7800000, status: "Belum Diproses" as const },
  { nama: "Rian Pratama", dept: "Operations", nominal: 6500000, status: "Diproses" as const },
];

export function HRDashboard() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #001A4D, #0052CC)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{today}</p>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 700, marginTop: 2 }}>
              Selamat Datang, Hendra! 👋
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>
              HR Manager • Nexa Corporation
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Bell size={20} color="white" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#FFA726" }} />
          </button>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* KPI Grid */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Ringkasan Hari Ini
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    minHeight: 100,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: kpi.bg }}
                    >
                      <Icon size={18} color={kpi.color} />
                    </div>
                    <div className="flex items-center gap-1">
                      {kpi.trendUp ? (
                        <TrendingUp size={12} color="#4CAF50" />
                      ) : (
                        <TrendingDown size={12} color="#EF5350" />
                      )}
                      <span style={{ fontSize: 11, color: kpi.trendUp ? "#4CAF50" : "#EF5350", fontWeight: 600 }}>
                        {kpi.trend}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: 26, fontWeight: 700, color: "#001A4D", lineHeight: 1 }}>
                    {kpi.value}
                  </p>
                  <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 4 }}>{kpi.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Actions */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Perlu Tindakan
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/hr/approval-izin")}
              className="w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all active:scale-[0.99]"
              style={{ background: "#FFF8E1", border: "1px solid #FFE082" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FFF3E0" }}>
                  <FileText size={18} color="#FFA726" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#001A4D" }}>5 Izin Pending</p>
                  <p style={{ fontSize: 11, color: "#9E9E9E" }}>Menunggu persetujuan Anda</p>
                </div>
              </div>
              <span style={{ fontSize: 12, color: "#FFA726", fontWeight: 600 }}>Review →</span>
            </button>

            <button
              onClick={() => navigate("/hr/approval-cuti")}
              className="w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all active:scale-[0.99]"
              style={{ background: "#E8F5E9", border: "1px solid #A5D6A7" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E8F5E9" }}>
                  <Calendar size={18} color="#4CAF50" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#001A4D" }}>3 Cuti Pending</p>
                  <p style={{ fontSize: 11, color: "#9E9E9E" }}>Menunggu persetujuan Anda</p>
                </div>
              </div>
              <span style={{ fontSize: 12, color: "#4CAF50", fontWeight: 600 }}>Review →</span>
            </button>
          </div>
        </div>

        {/* Salary Updates */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D" }}>Status Penggajian Terbaru</h3>
            <button
              onClick={() => navigate("/hr/penggajian")}
              style={{ fontSize: 12, color: "#0052CC", fontWeight: 500 }}
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-2">
            {salaryUpdates.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#E3F2FD" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0052CC" }}>
                      {item.nama.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#001A4D" }}>{item.nama}</p>
                    <p style={{ fontSize: 11, color: "#9E9E9E" }}>
                      {item.dept} • Rp {item.nominal.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
