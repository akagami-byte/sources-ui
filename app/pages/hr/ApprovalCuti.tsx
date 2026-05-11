import { useState } from "react";
import { Search, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { FilterChips } from "../../components/FilterChips";
import { Modal } from "../../components/Modal";
import { InfoRow } from "../../components/InfoRow";

type CutiStatus = "Pending" | "Approved" | "Rejected";

interface CutiData {
  id: number;
  nama: string;
  dept: string;
  nip: string;
  jenis: string;
  mulai: string;
  selesai: string;
  hari: number;
  catatan: string;
  status: CutiStatus;
  alasan?: string;
  tglProses?: string;
}

const initialData: CutiData[] = [
  { id: 1, nama: "Budi Santoso", dept: "Teknologi Informasi", nip: "KRY-2024-001", jenis: "Cuti Tahunan", mulai: "20 Mei 2026", selesai: "24 Mei 2026", hari: 5, catatan: "Liburan keluarga ke Bali.", status: "Pending" },
  { id: 2, nama: "Siti Rahayu", dept: "Marketing", nip: "KRY-2023-015", jenis: "Cuti Menikah", mulai: "15 Jun 2026", selesai: "22 Jun 2026", hari: 8, catatan: "Pernikahan saudara kandung.", status: "Pending" },
  { id: 3, nama: "Ahmad Fauzi", dept: "Finance", nip: "KRY-2022-008", jenis: "Cuti Sakit", mulai: "12 Mei 2026", selesai: "14 Mei 2026", hari: 3, catatan: "Sakit tifus, perlu istirahat.", status: "Pending" },
  { id: 4, nama: "Dewi Kusuma", dept: "HR", nip: "KRY-2021-003", jenis: "Cuti Tahunan", mulai: "01 Apr 2026", selesai: "05 Apr 2026", hari: 5, catatan: "Perjalanan ke Yogyakarta.", status: "Approved", tglProses: "28 Mar 2026" },
  { id: 5, nama: "Rian Pratama", dept: "Operations", nip: "KRY-2024-012", jenis: "Cuti Lainnya", mulai: "28 Mar 2026", selesai: "29 Mar 2026", hari: 2, catatan: "", status: "Rejected", alasan: "Saldo cuti tahunan sudah habis.", tglProses: "27 Mar 2026" },
];

const filterOptions = ["Semua", "Pending", "Approved", "Rejected"];

export function ApprovalCuti() {
  const [data, setData] = useState<CutiData[]>(initialData);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CutiData | null>(null);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [charCount, setCharCount] = useState(0);

  const filtered = data.filter((item) => {
    const matchFilter = filter === "Semua" || item.status === filter;
    const matchSearch =
      !search ||
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.jenis.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleApprove = () => {
    if (!selected) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, status: "Approved", tglProses: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) }
          : item
      )
    );
    setSelected(null);
  };

  const handleReject = () => {
    if (!selected || !rejectReason) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, status: "Rejected", alasan: rejectReason, tglProses: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) }
          : item
      )
    );
    setRejectModal(false);
    setSelected(null);
    setRejectReason("");
    setCharCount(0);
  };

  const pendingCount = data.filter((d) => d.status === "Pending").length;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #001A4D, #0052CC)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Approval Cuti</h2>
          {pendingCount > 0 && (
            <span className="px-2 py-1 rounded-full" style={{ background: "#4CAF50", color: "white", fontSize: 12, fontWeight: 700 }}>
              {pendingCount} Pending
            </span>
          )}
        </div>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
          Review dan setujui pengajuan cuti karyawan
        </p>

        {/* Search */}
        <div className="mt-4 relative">
          <Search size={16} color="#9E9E9E" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari karyawan atau jenis cuti..."
            style={{
              width: "100%",
              height: 40,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: 12,
              paddingLeft: 36,
              paddingRight: 12,
              fontSize: 13,
              color: "#001A4D",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-4 py-3 flex-shrink-0" style={{ background: "white", borderBottom: "1px solid #F0F0F0" }}>
        <FilterChips options={filterOptions} selected={filter} onChange={setFilter} />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Calendar size={48} color="#E0E0E0" />
            <p style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginTop: 12 }}>Tidak ada pengajuan cuti</p>
            <p style={{ fontSize: 13, color: "#9E9E9E", marginTop: 4 }}>Tidak ditemukan data dengan filter ini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setSelected(item)} className="w-full text-left">
                <div
                  className="p-4 rounded-2xl transition-all active:scale-[0.99]"
                  style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E3F2FD" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0052CC" }}>{item.nama.charAt(0)}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#001A4D" }}>{item.nama}</p>
                        <p style={{ fontSize: 11, color: "#9E9E9E" }}>{item.dept}</p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span style={{ fontSize: 12, color: "#616161" }}>Jenis: <strong style={{ color: "#001A4D" }}>{item.jenis}</strong></span>
                    <span style={{ fontSize: 12, color: "#0052CC", fontWeight: 600 }}>{item.hari} hari</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 4 }}>
                    📅 {item.mulai} — {item.selesai}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected && !rejectModal}
        onClose={() => setSelected(null)}
        title="Detail Pengajuan Cuti"
        footer={
          selected?.status === "Pending" ? (
            <>
              <button
                onClick={() => setRejectModal(true)}
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
                style={{ background: "#FFEBEE", color: "#EF5350", fontSize: 14, fontWeight: 600 }}
              >
                <XCircle size={16} />
                Tolak
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
                style={{ background: "#4CAF50", color: "white", fontSize: 14, fontWeight: 600 }}
              >
                <CheckCircle2 size={16} />
                Setujui
              </button>
            </>
          ) : (
            <button
              onClick={() => setSelected(null)}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Tutup
            </button>
          )
        }
      >
        {selected && (
          <div className="space-y-1">
            <InfoRow label="Nama Karyawan" value={selected.nama} />
            <InfoRow label="NIP" value={selected.nip} />
            <InfoRow label="Departemen" value={selected.dept} />
            <InfoRow label="Jenis Cuti" value={selected.jenis} />
            <InfoRow label="Tanggal Mulai" value={selected.mulai} />
            <InfoRow label="Tanggal Selesai" value={selected.selesai} />
            <InfoRow label="Durasi" value={`${selected.hari} hari kerja`} />
            <InfoRow label="Status" value={<StatusBadge status={selected.status} size="md" />} />
            {selected.catatan && (
              <div className="py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
                <p style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 6 }}>Catatan</p>
                <p style={{ fontSize: 14, color: "#001A4D", lineHeight: 1.6 }}>{selected.catatan}</p>
              </div>
            )}
            {selected.tglProses && (
              <InfoRow label="Tgl Diproses" value={selected.tglProses} noBorder />
            )}
            {selected.alasan && (
              <div className="mt-3 p-4 rounded-xl" style={{ background: "#FFEBEE", border: "1px solid #FFCDD2" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#EF5350", marginBottom: 6 }}>Alasan Penolakan</p>
                <p style={{ fontSize: 13, color: "#C62828", lineHeight: 1.6 }}>{selected.alasan}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModal}
        onClose={() => { setRejectModal(false); setRejectReason(""); setCharCount(0); }}
        title="Alasan Penolakan"
        footer={
          <>
            <button
              onClick={() => { setRejectModal(false); setRejectReason(""); setCharCount(0); }}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              onClick={handleReject}
              disabled={!rejectReason}
              className="flex-1 py-3 rounded-xl"
              style={{
                background: rejectReason ? "#EF5350" : "#E0E0E0",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Konfirmasi Tolak
            </button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: "#9E9E9E", marginBottom: 12 }}>
          Wajib isi alasan penolakan. <span style={{ color: "#EF5350" }}>*</span>
        </p>
        <textarea
          value={rejectReason}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setRejectReason(e.target.value);
              setCharCount(e.target.value.length);
            }
          }}
          placeholder="Jelaskan alasan penolakan..."
          rows={4}
          style={{
            width: "100%",
            minHeight: 100,
            background: "#F0F7FF",
            border: "1px solid #E0E0E0",
            borderRadius: 12,
            padding: 12,
            fontSize: 14,
            color: "#001A4D",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
            lineHeight: 1.5,
            boxSizing: "border-box",
          }}
        />
        <div className="flex justify-end mt-1">
          <span style={{ fontSize: 11, color: "#9E9E9E" }}>{charCount}/500</span>
        </div>
      </Modal>
    </div>
  );
}
