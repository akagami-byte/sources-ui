import { useState } from "react";
import { Wallet, ChevronRight } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { InfoRow } from "../../components/InfoRow";

const penggajianData = [
  {
    periode: "Mei 2026",
    nominal: 8500000,
    status: "Diproses" as const,
    nip: "KRY-2024-001",
    dept: "Teknologi Informasi",
    noRek: "1234-5678-9012",
    bank: "Bank BCA",
    tglProses: "10 Mei 2026",
    potongan: 500000,
    tunjangan: 1000000,
    gajiPokok: 8000000,
  },
  {
    periode: "Apr 2026",
    nominal: 8500000,
    status: "Dibayar" as const,
    nip: "KRY-2024-001",
    dept: "Teknologi Informasi",
    noRek: "1234-5678-9012",
    bank: "Bank BCA",
    tglProses: "10 Apr 2026",
    potongan: 500000,
    tunjangan: 1000000,
    gajiPokok: 8000000,
  },
  {
    periode: "Mar 2026",
    nominal: 8500000,
    status: "Dibayar" as const,
    nip: "KRY-2024-001",
    dept: "Teknologi Informasi",
    noRek: "1234-5678-9012",
    bank: "Bank BCA",
    tglProses: "10 Mar 2026",
    potongan: 300000,
    tunjangan: 1000000,
    gajiPokok: 8000000,
  },
];

function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function KaryawanPenggajian() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  const [selectedPeriode, setSelectedPeriode] = useState<number | null>(null);

  const current = penggajianData[0];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Status Penggajian</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Informasi gaji dan pembayaran Anda
        </p>

        {/* Tabs */}
        <div className="mt-4 flex rounded-xl p-1" style={{ background: "rgba(255,255,255,0.15)" }}>
          {(["current", "history"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg transition-all"
              style={{
                background: activeTab === tab ? "white" : "transparent",
                color: activeTab === tab ? "#0052CC" : "rgba(255,255,255,0.7)",
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab === "current" ? "Bulan Ini" : "Riwayat"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "current" ? (
          <>
            {/* Main Salary Card */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #0052CC 0%, #003D99 60%, #001A4D 100%)",
                boxShadow: "0 8px 24px rgba(0,82,204,0.3)",
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet size={18} color="rgba(255,255,255,0.7)" />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                    Gaji Bulan {current.periode}
                  </span>
                </div>
                <p style={{ color: "white", fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                  {formatRupiah(current.nominal)}
                </p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={current.status} size="md" />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                    Diproses: {current.tglProses}
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 4 }}>
                Rincian Gaji
              </h3>
              <InfoRow label="Gaji Pokok" value={formatRupiah(current.gajiPokok)} />
              <InfoRow label="Tunjangan" value={<span style={{ color: "#4CAF50" }}>+{formatRupiah(current.tunjangan)}</span>} />
              <InfoRow label="Potongan" value={<span style={{ color: "#EF5350" }}>-{formatRupiah(current.potongan)}</span>} />
              <div className="flex items-center justify-between pt-3 mt-1" style={{ borderTop: "2px solid #E3F2FD" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#001A4D" }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#0052CC" }}>{formatRupiah(current.nominal)}</span>
              </div>
            </div>

            {/* Details */}
            <div className="rounded-2xl p-4" style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 4 }}>
                Informasi Pembayaran
              </h3>
              <InfoRow label="NIP" value={current.nip} />
              <InfoRow label="Departemen" value={current.dept} />
              <InfoRow label="Nomor Rekening" value={current.noRek} />
              <InfoRow label="Bank" value={current.bank} />
              <InfoRow label="Periode" value={current.periode} />
              <InfoRow label="Status" value={<StatusBadge status={current.status} size="md" />} noBorder />
            </div>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: "#9E9E9E", marginBottom: 8 }}>
              Riwayat penggajian 3 bulan terakhir
            </p>
            <div className="space-y-3">
              {penggajianData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPeriode(selectedPeriode === i ? null : i)}
                  className="w-full text-left"
                >
                  <div
                    className="rounded-2xl p-4 transition-all"
                    style={{
                      background: selectedPeriode === i ? "#E3F2FD" : "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      border: selectedPeriode === i ? "1px solid #90CAF9" : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#E3F2FD" }}>
                          <Wallet size={18} color="#0052CC" />
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#001A4D" }}>Gaji {item.periode}</p>
                          <p style={{ fontSize: 12, color: "#9E9E9E" }}>Diproses: {item.tglProses}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status={item.status} />
                        <ChevronRight size={14} color="#9E9E9E" style={{ transform: selectedPeriode === i ? "rotate(90deg)" : "none", transition: "transform 200ms" }} />
                      </div>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#0052CC" }}>
                      {formatRupiah(item.nominal)}
                    </p>

                    {selectedPeriode === i && (
                      <div className="mt-3 pt-3" style={{ borderTop: "1px solid #90CAF9" }}>
                        <InfoRow label="Gaji Pokok" value={formatRupiah(item.gajiPokok)} />
                        <InfoRow label="Tunjangan" value={<span style={{ color: "#4CAF50" }}>+{formatRupiah(item.tunjangan)}</span>} />
                        <InfoRow label="Potongan" value={<span style={{ color: "#EF5350" }}>-{formatRupiah(item.potongan)}</span>} noBorder />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}
