import { Outlet } from "react-router";

export function Root() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #001A4D 0%, #0052CC 50%, #003D99 100%)" }}
    >
      {/* Desktop: Phone frame */}
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: "min(430px, 100vw)",
          height: "min(932px, 100dvh)",
          borderRadius: "clamp(0px, 2vw, 40px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
