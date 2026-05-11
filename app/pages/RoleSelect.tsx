import { useNavigate } from "react-router";
import { Building2, User, ChevronRight, Shield } from "lucide-react";

export function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(180deg, #0052CC 0%, #003D99 100%)" }}>
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
        {/* Logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
        >
          <Building2 size={40} color="white" />
        </div>
        <h1 className="text-white text-center mb-2" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
          Nexa ERP
        </h1>
        <p className="text-center mb-2" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
          HR Management System
        </p>
        <div
          className="px-3 py-1 rounded-full mb-12"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>v2.4.1</span>
        </div>

        {/* Role Cards */}
        <div className="w-full space-y-4">
          <p className="text-center mb-6" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            Pilih peran Anda untuk masuk
          </p>

          {/* Karyawan Card */}
          <button
            onClick={() => navigate("/karyawan")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#E3F2FD" }}
            >
              <User size={24} color="#0052CC" />
            </div>
            <div className="flex-1 text-left">
              <p style={{ fontSize: 16, fontWeight: 600, color: "#001A4D" }}>Karyawan</p>
              <p style={{ fontSize: 12, color: "#616161", marginTop: 2 }}>
                Absensi, Izin, Cuti & Penggajian
              </p>
            </div>
            <ChevronRight size={20} color="#9E9E9E" />
          </button>

          {/* HR Card */}
          <button
            onClick={() => navigate("/hr")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#E8F5E9" }}
            >
              <Shield size={24} color="#4CAF50" />
            </div>
            <div className="flex-1 text-left">
              <p style={{ fontSize: 16, fontWeight: 600, color: "#001A4D" }}>HR Manager</p>
              <p style={{ fontSize: 12, color: "#616161", marginTop: 2 }}>
                Approval, Penggajian & Monitoring
              </p>
            </div>
            <ChevronRight size={20} color="#9E9E9E" />
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="pb-8 pt-4 flex flex-col items-center gap-2">
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
          © 2026 Nexa ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
}
