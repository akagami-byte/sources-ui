import { useState, useEffect } from "react";
import { CheckCircle2, Clock, MapPin, QrCode, Keyboard } from "lucide-react";
import { Modal } from "../../components/Modal";

const historyItems = [
  { type: "Check-in", time: "08:02", dept: "Teknologi Informasi", done: true },
  { type: "Check-out", time: "--:--", dept: "", done: false },
];

export function Absensi() {
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [scanType, setScanType] = useState<"Check-in" | "Check-out">("Check-out");
  const [manualOpen, setManualOpen] = useState(false);
  const [manualCode, setManualCode] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (scanActive) {
      interval = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setScanActive(false);
            setScanProgress(0);
            setModalOpen(true);
            return 0;
          }
          return p + 4;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [scanActive]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F7FA" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #0052CC, #003D99)" }}
      >
        <h2 style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Absensi</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>
          Scan QR untuk mencatat kehadiran
        </p>

        {/* Status Card */}
        <div
          className="mt-4 rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 4 }}>Check-in</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} color="#4CAF50" />
                <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>08:02</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>Tepat Waktu</p>
            </div>
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 4 }}>Check-out</p>
              <div className="flex items-center gap-2">
                <Clock size={16} color="rgba(255,255,255,0.4)" />
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, fontWeight: 700 }}>Belum</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>—</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* QR Scanner Simulation */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#0D1B2A",
            aspectRatio: "1",
            position: "relative",
            maxHeight: 280,
          }}
        >
          {/* Grid pattern background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,82,204,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Center scan box */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 180,
              height: 180,
            }}
          >
            {/* Corner markers */}
            {[
              { top: 0, left: 0, borderTop: "3px solid #0052CC", borderLeft: "3px solid #0052CC" },
              { top: 0, right: 0, borderTop: "3px solid #0052CC", borderRight: "3px solid #0052CC" },
              { bottom: 0, left: 0, borderBottom: "3px solid #0052CC", borderLeft: "3px solid #0052CC" },
              { bottom: 0, right: 0, borderBottom: "3px solid #0052CC", borderRight: "3px solid #0052CC" },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  ...style,
                }}
              />
            ))}

            {/* Scan line animation */}
            {scanActive && (
              <div
                style={{
                  position: "absolute",
                  left: 4,
                  right: 4,
                  top: `${scanProgress}%`,
                  height: 2,
                  background: "linear-gradient(90deg, transparent, #0052CC, transparent)",
                  boxShadow: "0 0 8px #0052CC",
                  transition: "top 60ms linear",
                }}
              />
            )}

            {/* QR Code placeholder */}
            {!scanActive && (
              <div className="absolute inset-4 flex items-center justify-center">
                <QrCode size={80} color="rgba(255,255,255,0.15)" />
              </div>
            )}
          </div>

          {/* Status overlay */}
          {scanActive && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 0,
                right: 0,
                textAlign: "center",
              }}
            >
              <span style={{ color: "#87CEEB", fontSize: 13 }}>Memindai QR Code...</span>
            </div>
          )}

          {confirmed && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "rgba(76,175,80,0.9)" }}
            >
              <CheckCircle2 size={64} color="white" />
              <p style={{ color: "white", fontSize: 16, fontWeight: 600, marginTop: 12 }}>
                Berhasil!
              </p>
            </div>
          )}
        </div>

        {/* Location */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "#E3F2FD" }}
        >
          <MapPin size={16} color="#0052CC" />
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#001A4D" }}>Lokasi Terdeteksi</p>
            <p style={{ fontSize: 11, color: "#616161" }}>Kantor Pusat - Jl. Sudirman No. 123, Jakarta</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setScanType("Check-out");
              setScanActive(true);
            }}
            disabled={scanActive}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all active:scale-95"
            style={{
              background: scanActive ? "#E0E0E0" : "#0052CC",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              cursor: scanActive ? "not-allowed" : "pointer",
            }}
          >
            <QrCode size={18} />
            {scanActive ? "Memindai..." : "Scan QR"}
          </button>
          <button
            onClick={() => setManualOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all active:scale-95"
            style={{
              background: "white",
              color: "#0052CC",
              fontSize: 14,
              fontWeight: 600,
              border: "2px solid #0052CC",
              cursor: "pointer",
            }}
          >
            <Keyboard size={18} />
            Manual
          </button>
        </div>

        {/* Today's History */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#001A4D", marginBottom: 12 }}>
            Riwayat Hari Ini
          </h3>
          <div className="space-y-2">
            {historyItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: item.done ? "#E8F5E9" : "#F5F5F5" }}
                >
                  {item.done ? (
                    <CheckCircle2 size={20} color="#4CAF50" />
                  ) : (
                    <Clock size={20} color="#9E9E9E" />
                  )}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 14, fontWeight: 600, color: item.done ? "#001A4D" : "#9E9E9E" }}>
                    {item.type}
                  </p>
                  {item.dept && (
                    <p style={{ fontSize: 11, color: "#9E9E9E", marginTop: 1 }}>{item.dept}</p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: item.done ? "#001A4D" : "#9E9E9E",
                  }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* Confirm Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Konfirmasi Absensi"
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
                setConfirmed(true);
                setTimeout(() => setConfirmed(false), 2000);
              }}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#0052CC", color: "white", fontSize: 14, fontWeight: 600 }}
            >
              Konfirmasi
            </button>
          </>
        }
      >
        <div className="text-center py-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#E3F2FD" }}
          >
            <QrCode size={32} color="#0052CC" />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#001A4D", marginBottom: 8 }}>
            {scanType} pada {timeStr}?
          </p>
          <p style={{ fontSize: 13, color: "#616161" }}>
            Konfirmasi absensi {scanType.toLowerCase()} Anda sekarang
          </p>
        </div>
      </Modal>

      {/* Manual Input Modal */}
      <Modal
        isOpen={manualOpen}
        onClose={() => setManualOpen(false)}
        title="Input Kode Manual"
        footer={
          <>
            <button
              onClick={() => setManualOpen(false)}
              className="flex-1 py-3 rounded-xl"
              style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
            >
              Batal
            </button>
            <button
              onClick={() => {
                if (manualCode.length >= 4) {
                  setManualOpen(false);
                  setModalOpen(true);
                  setManualCode("");
                }
              }}
              className="flex-1 py-3 rounded-xl"
              style={{
                background: manualCode.length >= 4 ? "#0052CC" : "#E0E0E0",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Lanjutkan
            </button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: "#616161", marginBottom: 16 }}>
          Masukkan kode absensi yang diberikan oleh HR/Admin.
        </p>
        <input
          type="text"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value.toUpperCase())}
          placeholder="Contoh: ABS-2026-001"
          maxLength={15}
          style={{
            width: "100%",
            height: 48,
            background: "#F0F7FF",
            border: "1px solid #E0E0E0",
            borderRadius: 12,
            padding: "0 12px",
            fontSize: 16,
            color: "#001A4D",
            textAlign: "center",
            letterSpacing: 2,
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </Modal>
    </div>
  );
}
