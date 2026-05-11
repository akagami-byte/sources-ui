import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value: ReactNode;
  noBorder?: boolean;
}

export function InfoRow({ label, value, noBorder }: InfoRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: noBorder ? "none" : "1px solid #F0F0F0" }}
    >
      <span style={{ fontSize: 12, color: "#9E9E9E", fontWeight: 400 }}>{label}</span>
      <span style={{ fontSize: 14, color: "#001A4D", fontWeight: 600, textAlign: "right", maxWidth: "60%" }}>
        {value}
      </span>
    </div>
  );
}
