import { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { FilterChips } from "../../components/FilterChips";
import { FormField, SelectField } from "../../components/FormField";

type AbsenStatus = "Hadir" | "Terlambat" | "Alpha" | "Pulang Cepat";

interface AbsenRecord {
  id: number;
  nama: string;
  nip: string;
  dept: string;
  divisi: string;
  jamMasuk: string;
  jamPulang: string;
  status: AbsenStatus;
  durasi: string;
}

const allData: AbsenRecord[] = [
  { id: 1, nama: "Budi Santoso", nip: "001", dept: "IT", divisi: "Frontend", jamMasuk: "08:02", jamPulang: "17:05", status: "Hadir", durasi: "9j 3m" },
  { id: 2, nama: "Siti Rahayu", nip: "015", dept: "Marketing", divisi: "Digital", jamMasuk: "09:15", jamPulang: "17:00", status: "Terlambat", durasi: "7j 45m" },
  { id: 3, nama: "Ahmad Fauzi", nip: "008", dept: "Finance", divisi: "Accounting", jamMasuk: "08:00", jamPulang: "17:10", status: "Hadir", durasi: "9j 10m" },
  { id: 4, nama: "Dewi Kusuma", nip: "003", dept: "HR", divisi: "Rekrutmen", jamMasuk: "--:--", jamPulang: "--:--", status: "Alpha", durasi: "--" },
  { id: 5, nama: "Rian Pratama", nip: "012", dept: "Operations", divisi: "Logistik", jamMasuk: "08:05", jamPulang: "14:30", status: "Pulang Cepat", durasi: "6j 25m" },
  { id: 6, nama: "Maya Putri", nip: "021", dept: "Legal", divisi: "Kontrak", jamMasuk: "07:55", jamPulang: "17:00", status: "Hadir", durasi: "9j 5m" },
  { id: 7, nama: "Doni Setiawan", nip: "034", dept: "IT", divisi: "Backend", jamMasuk: "08:10", jamPulang: "18:00", status: "Hadir", durasi: "9j 50m" },
  { id: 8, nama: "Rina Wati", nip: "028", dept: "Marketing", divisi: "Event", jamMasuk: "09:45", jamPulang: "17:00", status: "Terlambat", durasi: "7j 15m" },
  { id: 9, nama: "Fajar Nugroho", nip: "019", dept: "Finance", divisi: "Pajak", jamMasuk: "--:--", jamPulang: "--:--", status: "Alpha", durasi: "--" },
  { id: 10, nama: "Linda Susanti", nip: "041", dept: "Operations", divisi: "Gudang", jamMasuk: "08:00", jamPulang: "17:00", status: "Hadir", durasi: "9j 0m" },
];

const deptOptions = [
  { label: "Semua Departemen", value: "Semua" },
  { label: "IT", value: "IT" },
  { label: "Marketing", value: "Marketing" },
  { label: "Finance", value: "Finance" },
  { label: "HR", value: "HR" },
  { label: "Operations", value: "Operations" },
  { label: "Legal", value: "Legal" },
];

const divisiOptions: Record<string, { label: string; value: string }[]> = {
  Semua: [{ label: "Semua Divisi", value: "Semua" }],
  IT: [
    { label: "Semua Divisi", value: "Semua" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
  ],
  Marketing: [
    { label: "Semua Divisi", value: "Semua" },
    { label: "Digital", value: "Digital" },
    { label: "Event", value: "Event" },
  ],
  Finance: [
    { label: "Semua Divisi", value: "Semua" },
    { label: "Accounting", value: "Accounting" },
    { label: "Pajak", value: "Pajak" },
  ],
  HR: [{ label: "Semua Divisi", value: "Semua" }, { label: "Rekrutmen", value: "Rekrutmen" }],
  Operations: [
    { label: "Semua Divisi", value: "Semua" },
    { label: "Logistik", value: "Logistik" },
    { label: "Gudang", value: "Gudang" },
  ],
  Legal: [{ label: "Semua Divisi", value: "Semua" }, { label: "Kontrak", value: "Kontrak" }],
};

const statusFilterOptions = ["Semua", "Hadir", "Terlambat", "Alpha", "Pulang Cepat"];

function getSummary(records: AbsenRecord[]) {
  return {
    hadir: records.filter((r) => r.status === "Hadir").length,
    terlambat: records.filter((r) => r.status === "Terlambat").length,
    alpha: records.filter((r) => r.status === "Alpha").length,
    pulangCepat: records.filter((r) => r.status === "Pulang Cepat").length,
  };
}

export function MonitoringAbsensi() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [dept, setDept] = useState("Semua");
  const [divisi, setDivisi] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = allData.filter((item) => {
    const matchDept = dept === "Semua" || item.dept === dept;
    const matchDivisi = divisi === "Semua" || item.divisi === divisi;
    const matchStatus = statusFilter === "Semua" || item.status === statusFilter;
    return matchDept && matchDivisi && matchStatus;
  });

  const summary = getSummary(filtered);
  const displayDate = new Date(selectedDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #001A4D, #0052CC)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Monitoring Absensi</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Pantau kehadiran karyawan harian
        </p>

        {/* Date Picker */}
        <div className="mt-4 relative">
          <Calendar size={16} color="#9E9E9E" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: "100%",
              height: 44,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: 12,
              paddingLeft: 36,
              paddingRight: 12,
              fontSize: 14,
              color: "#001A4D",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              fontWeight: 500,
            }}
          />
        </div>

        {/* Summary chips */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { label: "Hadir", value: summary.hadir, color: "#4CAF50" },
            { label: "Terlambat", value: summary.terlambat, color: "#FFA726" },
            { label: "Alpha", value: summary.alpha, color: "#EF5350" },
            { label: "Pulang Cpt", value: summary.pulangCepat, color: "#87CEEB" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-2 text-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <p style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{s.value}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, marginTop: 1 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="flex-shrink-0 px-4 py-3" style={{ background: "white", borderBottom: "1px solid #F0F0F0" }}>
        <div className="flex items-center justify-between mb-3">
          <FilterChips options={statusFilterOptions} selected={statusFilter} onChange={setStatusFilter} />
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex-shrink-0 ml-2 flex items-center gap-1 px-3 py-2 rounded-xl"
            style={{
              background: showFilter ? "#0052CC" : "#F0F0F0",
              color: showFilter ? "white" : "#616161",
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            <Filter size={13} />
            Filter
          </button>
        </div>

        {showFilter && (
          <div className="grid grid-cols-2 gap-3 pt-2" style={{ borderTop: "1px solid #F0F0F0" }}>
            <FormField label="Departemen">
              <SelectField
                value={dept}
                onChange={(v) => { setDept(v); setDivisi("Semua"); }}
                options={deptOptions}
              />
            </FormField>
            <FormField label="Divisi">
              <SelectField
                value={divisi}
                onChange={setDivisi}
                options={divisiOptions[dept] || divisiOptions["Semua"]}
              />
            </FormField>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Table Header */}
        <div
          className="flex-shrink-0 flex px-4"
          style={{
            background: "#F0F7FF",
            borderBottom: "1px solid #E0E0E0",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span style={{ width: "28%", fontSize: 11, fontWeight: 700, color: "#001A4D" }}>Nama</span>
          <span style={{ width: "16%", fontSize: 11, fontWeight: 700, color: "#001A4D", textAlign: "center" }}>Masuk</span>
          <span style={{ width: "16%", fontSize: 11, fontWeight: 700, color: "#001A4D", textAlign: "center" }}>Pulang</span>
          <span style={{ width: "22%", fontSize: 11, fontWeight: 700, color: "#001A4D", textAlign: "center" }}>Status</span>
          <span style={{ width: "18%", fontSize: 11, fontWeight: 700, color: "#001A4D", textAlign: "right" }}>Durasi</span>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Calendar size={48} color="#E0E0E0" />
              <p style={{ fontSize: 14, fontWeight: 600, color: "#001A4D", marginTop: 12 }}>
                Tidak ada data absensi
              </p>
              <p style={{ fontSize: 12, color: "#9E9E9E", marginTop: 4, textAlign: "center", padding: "0 24px" }}>
                untuk tanggal/filter yang dipilih
              </p>
            </div>
          ) : (
            filtered.map((row, i) => (
              <div
                key={row.id}
                className="flex items-center px-4 py-3"
                style={{
                  background: i % 2 === 0 ? "white" : "#FAFAFA",
                  borderBottom: "1px solid #F0F0F0",
                }}
              >
                <div style={{ width: "28%" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#001A4D", lineHeight: 1.3 }}>
                    {row.nama.split(" ")[0]}
                  </p>
                  <p style={{ fontSize: 10, color: "#9E9E9E" }}>{row.dept}</p>
                </div>
                <span
                  style={{
                    width: "16%",
                    fontSize: 12,
                    color: row.jamMasuk === "--:--" ? "#9E9E9E" : "#001A4D",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {row.jamMasuk}
                </span>
                <span
                  style={{
                    width: "16%",
                    fontSize: 12,
                    color: row.jamPulang === "--:--" ? "#9E9E9E" : "#001A4D",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {row.jamPulang}
                </span>
                <div style={{ width: "22%", display: "flex", justifyContent: "center" }}>
                  <StatusBadge status={row.status} size="sm" />
                </div>
                <span
                  style={{
                    width: "18%",
                    fontSize: 11,
                    color: "#9E9E9E",
                    textAlign: "right",
                  }}
                >
                  {row.durasi}
                </span>
              </div>
            ))
          )}
          <div style={{ height: 8 }} />
        </div>
      </div>
    </div>
  );
}