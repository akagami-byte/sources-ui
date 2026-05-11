import { useState } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { FilterChips } from "../../components/FilterChips";
import { Modal } from "../../components/Modal";
import { FormField, SelectField, Textarea } from "../../components/FormField";
import { InfoRow } from "../../components/InfoRow";

type CutiStatus = "Approved" | "Pending" | "Rejected";

interface CutiItem {
  id: number;
  jenis: string;
  mulai: string;
  selesai: string;
  hari: number;
  catatan: string;
  status: CutiStatus;
  alasan?: string;
}

const cutiList: CutiItem[] = [
  { id: 1, jenis: "Cuti Tahunan", mulai: "01 Jun 2026", selesai: "05 Jun 2026", hari: 5, catatan: "Liburan keluarga ke Bali.", status: "Approved" },
  { id: 2, jenis: "Cuti Sakit", mulai: "15 Mar 2026", selesai: "17 Mar 2026", hari: 3, catatan: "Sakit tifus, istirahat di rumah.", status: "Approved" },
  { id: 3, jenis: "Cuti Menikah", mulai: "20 Jul 2026", selesai: "27 Jul 2026", hari: 8, catatan: "Pernikahan saudara kandung.", status: "Pending" },
];

const jenisOptions = [
  { label: "Cuti Tahunan", value: "Cuti Tahunan" },
  { label: "Cuti Menikah", value: "Cuti Menikah" },
  { label: "Cuti Sakit", value: "Cuti Sakit" },
  { label: "Cuti Lainnya", value: "Cuti Lainnya" },
];

const filterOptions = ["Semua", "Pending", "Approved", "Rejected"];

function calculateDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  if (e < s) return 0;
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}

export function Cuti() {
  const [activeTab, setActiveTab] = useState<"form" | "riwayat">("form");
  const [filter, setFilter] = useState("Semua");
  const [jenis, setJenis] = useState("");
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CutiItem | null>(null);

  const hari = calculateDays(mulai, selesai);
  const canSubmit = jenis && mulai && selesai && hari > 0;
  const filteredList =
    filter === "Semua" ? cutiList : cutiList.filter((i) => i.status === filter);

  const handleSubmit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setJenis(""); setMulai(""); setSelesai(""); setCatatan("");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Pengajuan Cuti</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Ajukan atau lihat riwayat cuti Anda
        </p>

        {/* Cuti balance chips */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <p style={{ color: "white", fontSize: 18, fontWeight: 700 }}>12</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>Cuti Tersisa</p>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <p style={{ color: "white", fontSize: 18, fontWeight: 700 }}>3</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>Digunakan</p>
          </div>
          <div className="flex-1 rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <p style={{ color: "white", fontSize: 18, fontWeight: 700 }}>1</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>Pending</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex rounded-xl p-1" style={{ background: "rgba(255,255,255,0.15)" }}>
          {(["form", "riwayat"] as const).map((tab) => (
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
              {tab === "form" ? "Buat Pengajuan" : "Riwayat"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "form" ? (
          <div className="p-4 space-y-4">
            <FormField label="Jenis Cuti" required>
              <SelectField
                value={jenis}
                onChange={setJenis}
                options={jenisOptions}
                placeholder="Pilih jenis cuti..."
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Tanggal Mulai" required>
                <input
                  type="date"
                  value={mulai}
                  onChange={(e) => setMulai(e.target.value)}
                  style={{
                    height: 44,
                    background: "#F0F7FF",
                    border: "1px solid #E0E0E0",
                    borderRadius: 12,
                    padding: "0 12px",
                    fontSize: 14,
                    color: mulai ? "#001A4D" : "#9E9E9E",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </FormField>
              <FormField label="Tanggal Selesai" required>
                <input
                  type="date"
                  value={selesai}
                  min={mulai}
                  onChange={(e) => setSelesai(e.target.value)}
                  style={{
                    height: 44,
                    background: "#F0F7FF",
                    border: "1px solid #E0E0E0",
                    borderRadius: 12,
                    padding: "0 12px",
                    fontSize: 14,
                    color: selesai ? "#001A4D" : "#9E9E9E",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </FormField>
            </div>

            {/* Jumlah Hari */}
            <div
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: hari > 0 ? "#E3F2FD" : "#F5F5F5", border: `1px solid ${hari > 0 ? "#90CAF9" : "#E0E0E0"}` }}
            >
              <span style={{ fontSize: 13, color: "#616161" }}>Jumlah Hari</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: hari > 0 ? "#0052CC" : "#9E9E9E" }}>
                {hari > 0 ? `${hari} hari` : "—"}
              </span>
            </div>

            <FormField label="Catatan Tambahan">
              <Textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Catatan opsional..."
                rows={3}
              />
            </FormField>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="w-full py-3 rounded-xl transition-all active:scale-95"
              style={{
                background: canSubmit && !loading ? "#0052CC" : "#E0E0E0",
                color: canSubmit && !loading ? "white" : "#9E9E9E",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: canSubmit && !loading ? "pointer" : "not-allowed",
                marginTop: 8,
              }}
            >
              {loading ? "Mengirim..." : "Ajukan Cuti"}
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-4">
              <FilterChips options={filterOptions} selected={filter} onChange={setFilter} />
            </div>

            {filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Calendar size={48} color="#E0E0E0" />
                <p style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginTop: 12 }}>
                  Tidak ada data cuti
                </p>
                <p style={{ fontSize: 13, color: "#9E9E9E", marginTop: 4 }}>
                  Belum ada pengajuan cuti "{filter}"
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredList.map((item) => (
                  <button key={item.id} onClick={() => setSelectedItem(item)} className="w-full text-left">
                    <div className="p-4 rounded-2xl" style={{ background: "#E8F0FE", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#001A4D" }}>{item.jenis}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      <p style={{ fontSize: 12, color: "#616161" }}>
                        📅 {item.mulai} — {item.selesai}
                      </p>
                      <p style={{ fontSize: 12, color: "#0052CC", fontWeight: 600, marginTop: 4 }}>
                        {item.hari} hari kerja
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={submitted}
        onClose={() => setSubmitted(false)}
        title="Berhasil!"
        footer={
          <button
            onClick={() => { setSubmitted(false); setActiveTab("riwayat"); }}
            className="flex-1 py-3 rounded-xl"
            style={{ background: "#0052CC", color: "white", fontSize: 14, fontWeight: 600 }}
          >
            Lihat Riwayat
          </button>
        }
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E8F5E9" }}>
            <CheckCircle2 size={36} color="#4CAF50" />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#001A4D", marginBottom: 8 }}>
            Cuti Berhasil Diajukan!
          </p>
          <p style={{ fontSize: 13, color: "#616161" }}>
            Pengajuan cuti Anda sedang menunggu persetujuan HR. Anda akan mendapat notifikasi segera.
          </p>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Detail Pengajuan Cuti"
        footer={
          <button
            onClick={() => setSelectedItem(null)}
            className="flex-1 py-3 rounded-xl"
            style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
          >
            Tutup
          </button>
        }
      >
        {selectedItem && (
          <div className="space-y-1">
            <InfoRow label="Jenis Cuti" value={selectedItem.jenis} />
            <InfoRow label="Tanggal Mulai" value={selectedItem.mulai} />
            <InfoRow label="Tanggal Selesai" value={selectedItem.selesai} />
            <InfoRow label="Durasi" value={`${selectedItem.hari} hari kerja`} />
            <InfoRow label="Status" value={<StatusBadge status={selectedItem.status} size="md" />} />
            {selectedItem.catatan && (
              <div className="py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
                <p style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 6 }}>Catatan</p>
                <p style={{ fontSize: 14, color: "#001A4D", lineHeight: 1.6 }}>{selectedItem.catatan}</p>
              </div>
            )}
            {selectedItem.alasan && (
              <div className="mt-3 p-4 rounded-xl" style={{ background: "#FFEBEE", border: "1px solid #FFCDD2" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#EF5350", marginBottom: 6 }}>✗ Alasan Penolakan</p>
                <p style={{ fontSize: 13, color: "#C62828", lineHeight: 1.6 }}>{selectedItem.alasan}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
