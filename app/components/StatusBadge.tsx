type StatusType =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Hadir"
  | "Terlambat"
  | "Alpha"
  | "Pulang Cepat"
  | "Belum Diproses"
  | "Diproses"
  | "Dibayar";

interface StatusBadgeProps {
  status: StatusType | string;
  size?: "sm" | "md";
}

const statusConfig: Record<string, { bg: string; text: string; border?: string }> = {
  Pending: { bg: "#FFF3E0", text: "#FFA726", border: "#FFA726" },
  Approved: { bg: "#E8F5E9", text: "#fff", border: "transparent" },
  Rejected: { bg: "#FFEBEE", text: "#fff", border: "transparent" },
  Hadir: { bg: "#E8F5E9", text: "#fff", border: "transparent" },
  Terlambat: { bg: "#FFF3E0", text: "#FFA726", border: "#FFA726" },
  Alpha: { bg: "#FFEBEE", text: "#fff", border: "transparent" },
  "Pulang Cepat": { bg: "#E3F2FD", text: "#0052CC", border: "#0052CC" },
  "Belum Diproses": { bg: "#F5F5F5", text: "#616161", border: "#9E9E9E" },
  Diproses: { bg: "#E3F2FD", text: "#0052CC", border: "#0052CC" },
  Dibayar: { bg: "#E8F5E9", text: "#fff", border: "transparent" },
};

const solidBgConfig: Record<string, string> = {
  Approved: "#4CAF50",
  Rejected: "#EF5350",
  Hadir: "#4CAF50",
  Alpha: "#EF5350",
  Dibayar: "#4CAF50",
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: "#F5F5F5", text: "#616161", border: "#9E9E9E" };
  const solidBg = solidBgConfig[status];
  const paddingY = size === "md" ? "5px" : "3px";
  const paddingX = size === "md" ? "10px" : "7px";
  const fontSize = size === "md" ? 13 : 11;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: solidBg || config.bg,
        color: solidBg ? "#fff" : config.text,
        border: `1px solid ${config.border || "transparent"}`,
        borderRadius: 20,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        fontSize,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
