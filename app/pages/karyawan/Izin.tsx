import { useState } from "react";
import { FileText, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { FilterChips } from "../../components/FilterChips";
import { Modal } from "../../components/Modal";
import { FormField, SelectField, Textarea } from "../../components/FormField";
import { InfoRow } from "../../components/InfoRow";

type IzinStatus = "Approved" | "Pending" | "Rejected";

interface IzinItem {
  id: number;
  jenis: string;
  tanggal: string;
  keperluan: string;
  status: IzinStatus;
  alasan?: string;
}

const izinList: IzinItem[] = [
  { id: 1, jenis: "Sakit", tanggal: "12 Mei 2026", keperluan: "Demam tinggi dan flu, tidak dapat masuk kerja.", status: "Approved" },
  { id: 2, jenis: "Keperluan Pribadi", tanggal: "20 Apr 2026", keperluan: "Urusan keluarga mendesak.", status: "Pending" },
  { id: 3, jenis: "Telat", tanggal: "08 Apr 2026", keperluan: "Macet parah di jalan tol.", status: "Rejected", alasan: "Tidak ada keterangan yang cukup valid. Mohon berikan bukti foto atau surat keterangan." },
  { id: 4, jenis: "Izin Beberapa Jam", tanggal: "02 Mar 2026", keperluan: "Ke dokter gigi jam 10-11.", status: "Approved" },
];

const jenisOptions = [
  { label: "Sakit", value: "Sakit" },
  { label: "Keperluan Pribadi", value: "Keperluan Pribadi" },
  { label: "Telat", value: "Telat" },
  { label: "Izin Beberapa Jam", value: "Izin Beberapa Jam" },
];

const filterOptions = ["Semua", "Pending", "Approved", "Rejected"];

export function Izin() {
  const [activeTab, setActiveTab] = useState<"form" | "riwayat">("form");
  const [filter, setFilter] = useState("Semua");
  const [jenis, setJenis] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IzinItem | null>(null);

  const filteredList =
    filter === "Semua" ? izinList : izinList.filter((i) => i.status === filter);

  const canSubmit = jenis && tanggal && keperluan;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setJenis("");
      setTanggal("");
      setKeperluan("");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Pengajuan Izin</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Ajukan atau lihat riwayat izin Anda
        </p>

        {/* Tabs */}
        <div
          className="mt-4 flex rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
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
            <FormField label="Jenis Izin" required>
              <SelectField
                value={jenis}
                onChange={setJenis}
                options={jenisOptions}
                placeholder="Pilih jenis izin..."
              />
            </FormField>

            <FormField label="Tanggal Izin" required>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                style={{
                  height: 44,
                  background: "#F0F7FF",
                  border: "1px solid #E0E0E0",
                  borderRadius: 12,
                  padding: "0 12px",
                  fontSize: 14,
                  color: tanggal ? "#001A4D" : "#9E9E9E",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  appearance: "none",
                }}
              />
            </FormField>

            <FormField label="Keperluan" required>
              <Textarea
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                placeholder="Masukkan keperluan izin..."
                rows={4}
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
              {loading ? "Mengirim..." : "Ajukan Izin"}
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-4">
              <FilterChips
                options={filterOptions}
                selected={filter}
                onChange={setFilter}
              />
            </div>

            {filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <FileText size={48} color="#E0E0E0" />
                <p style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginTop: 12 }}>
                  Belum ada pengajuan izin
                </p>
                <p style={{ fontSize: 13, color: "#9E9E9E", marginTop: 4 }}>
                  Pengajuan dengan status "{filter}" tidak ditemukan
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="w-full text-left"
                  >
                    <div
                      className="p-4 rounded-2xl transition-all active:scale-[0.99]"
                      style={{
                        background: "#E8F0FE",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#001A4D" }}>
                          {item.jenis}
                        </span>
                        <StatusBadge status={item.status} />
                      </div>
                      <p style={{ fontSize: 12, color: "#616161" }}>📅 {item.tanggal}</p>
                      <p style={{ fontSize: 12, color: "#9E9E9E", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.keperluan}
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
            Izin Berhasil Diajukan!
          </p>
          <p style={{ fontSize: 13, color: "#616161" }}>
            Pengajuan izin Anda sedang diproses oleh HR. Anda akan mendapat notifikasi setelah disetujui.
          </p>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Detail Pengajuan Izin"
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
            <InfoRow label="Jenis Izin" value={selectedItem.jenis} />
            <InfoRow label="Tanggal" value={selectedItem.tanggal} />
            <InfoRow label="Status" value={<StatusBadge status={selectedItem.status} size="md" />} />
            <div className="py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
              <p style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 6 }}>Keperluan</p>
              <p style={{ fontSize: 14, color: "#001A4D", lineHeight: 1.6 }}>{selectedItem.keperluan}</p>
            </div>
            {selectedItem.alasan && (
              <div className="mt-3 p-4 rounded-xl" style={{ background: "#FFEBEE", border: "1px solid #FFCDD2" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#EF5350", marginBottom: 6 }}>
                  ✗ Alasan Penolakan
                </p>
                <p style={{ fontSize: 13, color: "#C62828", lineHeight: 1.6 }}>{selectedItem.alasan}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
