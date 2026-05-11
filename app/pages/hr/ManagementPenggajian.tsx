import { useState } from "react";
import { Search, Plus, Edit3, Wallet } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { FilterChips } from "../../components/FilterChips";
import { Modal } from "../../components/Modal";
import { FormField, SelectField, Input } from "../../components/FormField";
import { InfoRow } from "../../components/InfoRow";

type GajiStatus = "Belum Diproses" | "Diproses" | "Dibayar";

interface GajiData {
  id: number;
  nama: string;
  nip: string;
  dept: string;
  noRek: string;
  bank: string;
  nominal: number;
  status: GajiStatus;
  periode: string;
}

const initialData: GajiData[] = [
  { id: 1, nama: "Budi Santoso", nip: "KRY-2024-001", dept: "Teknologi Informasi", noRek: "1234-5678-9012", bank: "BCA", nominal: 8500000, status: "Diproses", periode: "Mei 2026" },
  { id: 2, nama: "Siti Rahayu", nip: "KRY-2023-015", dept: "Marketing", noRek: "9876-5432-1098", bank: "Mandiri", nominal: 7200000, status: "Dibayar", periode: "Mei 2026" },
  { id: 3, nama: "Ahmad Fauzi", nip: "KRY-2022-008", dept: "Finance", noRek: "1111-2222-3333", bank: "BNI", nominal: 9100000, status: "Dibayar", periode: "Mei 2026" },
  { id: 4, nama: "Dewi Kusuma", nip: "KRY-2021-003", dept: "HR", noRek: "4444-5555-6666", bank: "BRI", nominal: 7800000, status: "Belum Diproses", periode: "Mei 2026" },
  { id: 5, nama: "Rian Pratama", nip: "KRY-2024-012", dept: "Operations", noRek: "7777-8888-9999", bank: "BCA", nominal: 6500000, status: "Diproses", periode: "Mei 2026" },
  { id: 6, nama: "Maya Putri", nip: "KRY-2023-021", dept: "Legal", noRek: "3456-7890-1234", bank: "CIMB", nominal: 8200000, status: "Belum Diproses", periode: "Mei 2026" },
];

const statusOptions = [
  { label: "Belum Diproses", value: "Belum Diproses" },
  { label: "Diproses", value: "Diproses" },
  { label: "Dibayar", value: "Dibayar" },
];

const bankOptions = [
  { label: "BCA", value: "BCA" },
  { label: "Mandiri", value: "Mandiri" },
  { label: "BNI", value: "BNI" },
  { label: "BRI", value: "BRI" },
  { label: "CIMB", value: "CIMB" },
  { label: "BTN", value: "BTN" },
];

const filterOptions = ["Semua", "Belum Diproses", "Diproses", "Dibayar"];

function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function ManagementPenggajian() {
  const [data, setData] = useState<GajiData[]>(initialData);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<GajiData | null>(null);
  const [addModal, setAddModal] = useState(false);

  // Edit form state
  const [editNoRek, setEditNoRek] = useState("");
  const [editBank, setEditBank] = useState("");
  const [editNominal, setEditNominal] = useState("");
  const [editStatus, setEditStatus] = useState<GajiStatus>("Belum Diproses");

  // Add form state
  const [addNama, setAddNama] = useState("");
  const [addNip, setAddNip] = useState("");
  const [addDept, setAddDept] = useState("");
  const [addNoRek, setAddNoRek] = useState("");
  const [addBank, setAddBank] = useState("");
  const [addNominal, setAddNominal] = useState("");

  const openEdit = (item: GajiData) => {
    setEditItem(item);
    setEditNoRek(item.noRek);
    setEditBank(item.bank);
    setEditNominal(String(item.nominal));
    setEditStatus(item.status);
  };

  const handleSave = () => {
    if (!editItem) return;
    setData((prev) =>
      prev.map((d) =>
        d.id === editItem.id
          ? { ...d, noRek: editNoRek, bank: editBank, nominal: Number(editNominal.replace(/\D/g, "")), status: editStatus }
          : d
      )
    );
    setEditItem(null);
  };

  const handleAdd = () => {
    const newItem: GajiData = {
      id: data.length + 1,
      nama: addNama,
      nip: addNip,
      dept: addDept,
      noRek: addNoRek,
      bank: addBank,
      nominal: Number(addNominal.replace(/\D/g, "")),
      status: "Belum Diproses",
      periode: "Mei 2026",
    };
    setData((prev) => [newItem, ...prev]);
    setAddModal(false);
    setAddNama(""); setAddNip(""); setAddDept(""); setAddNoRek(""); setAddBank(""); setAddNominal("");
  };

  const filtered = data.filter((item) => {
    const matchFilter = filter === "Semua" || item.status === filter;
    const matchSearch =
      !search ||
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.dept.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalGaji = filtered.reduce((sum, d) => sum + d.nominal, 0);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #001A4D, #0052CC)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Management Penggajian</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Periode: Mei 2026 • {data.length} karyawan
        </p>

        {/* Total */}
        <div
          className="mt-4 p-4 rounded-2xl flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Total Penggajian</p>
            <p style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
              {formatRupiah(data.reduce((s, d) => s + d.nominal, 0))}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Wallet size={20} color="white" />
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <Search size={16} color="#9E9E9E" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari karyawan atau departemen..."
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

      {/* Filter + Add Button */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-3" style={{ background: "white", borderBottom: "1px solid #F0F0F0" }}>
        <div className="flex-1">
          <FilterChips options={filterOptions} selected={filter} onChange={setFilter} />
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-1 px-3 py-2 rounded-xl flex-shrink-0"
          style={{ background: "#0052CC", color: "white", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          <Plus size={14} />
          Tambah
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Wallet size={48} color="#E0E0E0" />
            <p style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginTop: 12 }}>Tidak ada data</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl"
                style={{ background: "white", border: "1px solid #F0F0F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E3F2FD" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0052CC" }}>{item.nama.charAt(0)}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#001A4D" }}>{item.nama}</p>
                      <p style={{ fontSize: 11, color: "#9E9E9E" }}>NIP: {item.nip} • {item.dept}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#0052CC" }}>{formatRupiah(item.nominal)}</p>
                    <p style={{ fontSize: 11, color: "#9E9E9E" }}>{item.bank} • {item.noRek}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg"
                      style={{
                        background: "#E3F2FD",
                        color: "#0052CC",
                        fontSize: 12,
                        fontWeight: 600,
                        border: "1px solid #90CAF9",
                        cursor: "pointer",
                      }}
                    >
                      <Edit3 size={12} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 8 }} />
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Data Penggajian"
        footer={
          <>
            <button
              onClick={() => setEditItem(null)}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#0052CC", color: "white", fontSize: 14, fontWeight: 600 }}
            >
              Simpan
            </button>
          </>
        }
      >
        {editItem && (
          <div className="space-y-4">
            <InfoRow label="Nama Karyawan" value={editItem.nama} />
            <InfoRow label="NIP" value={editItem.nip} />
            <div className="space-y-4 mt-2">
              <FormField label="Nomor Rekening">
                <Input
                  value={editNoRek}
                  onChange={(e) => setEditNoRek(e.target.value)}
                  placeholder="1234-5678-9012"
                />
              </FormField>
              <FormField label="Bank">
                <SelectField
                  value={editBank}
                  onChange={setEditBank}
                  options={bankOptions}
                  placeholder="Pilih bank..."
                />
              </FormField>
              <FormField label="Nominal Gaji (Rp)">
                <Input
                  value={editNominal}
                  onChange={(e) => setEditNominal(e.target.value)}
                  placeholder="8500000"
                  type="number"
                />
              </FormField>
              <FormField label="Status Penggajian">
                <SelectField
                  value={editStatus}
                  onChange={(v) => setEditStatus(v as GajiStatus)}
                  options={statusOptions}
                />
              </FormField>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Tambah Data Penggajian"
        footer={
          <>
            <button
              onClick={() => setAddModal(false)}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              onClick={handleAdd}
              disabled={!addNama || !addNip || !addNominal}
              className="flex-1 py-3 rounded-xl"
              style={{
                background: addNama && addNip && addNominal ? "#0052CC" : "#E0E0E0",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Tambah
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Nama Karyawan" required>
            <Input value={addNama} onChange={(e) => setAddNama(e.target.value)} placeholder="Nama lengkap..." />
          </FormField>
          <FormField label="NIP" required>
            <Input value={addNip} onChange={(e) => setAddNip(e.target.value)} placeholder="KRY-2026-..." />
          </FormField>
          <FormField label="Departemen">
            <Input value={addDept} onChange={(e) => setAddDept(e.target.value)} placeholder="Nama departemen..." />
          </FormField>
          <FormField label="Nomor Rekening">
            <Input value={addNoRek} onChange={(e) => setAddNoRek(e.target.value)} placeholder="1234-5678-9012" />
          </FormField>
          <FormField label="Bank">
            <SelectField value={addBank} onChange={setAddBank} options={bankOptions} placeholder="Pilih bank..." />
          </FormField>
          <FormField label="Nominal Gaji (Rp)" required>
            <Input value={addNominal} onChange={(e) => setAddNominal(e.target.value)} placeholder="0" type="number" />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
