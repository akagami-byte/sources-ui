import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 flex items-end justify-center"
      style={{ zIndex: 100, background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full flex flex-col"
        style={{
          background: "white",
          borderRadius: "16px 16px 0 0",
          maxHeight: "90%",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.16)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid #F0F0F0" }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#001A4D" }}>{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "#F5F5F5" }}
          >
            <X size={16} color="#616161" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="flex-shrink-0 p-4 flex gap-2"
            style={{ borderTop: "1px solid #F0F0F0" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmColor?: string;
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Konfirmasi",
  confirmColor = "#0052CC",
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl"
            style={{ background: "#F5F5F5", color: "#001A4D", fontSize: 14, fontWeight: 600 }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl"
            style={{
              background: loading ? "#E0E0E0" : confirmColor,
              color: "white",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {loading ? "Memproses..." : confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ color: "#616161", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
    </Modal>
  );
}
