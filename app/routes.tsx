import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./pages/Root";
import { RoleSelect } from "./pages/RoleSelect";
import { KaryawanLayout } from "./pages/karyawan/KaryawanLayout";
import { KaryawanDashboard } from "./pages/karyawan/Dashboard";
import { Absensi } from "./pages/karyawan/Absensi";
import { Izin } from "./pages/karyawan/Izin";
import { Cuti } from "./pages/karyawan/Cuti";
import { KaryawanPenggajian } from "./pages/karyawan/Penggajian";
import { KaryawanProfile } from "./pages/karyawan/Profile";
import { HRLayout } from "./pages/hr/HRLayout";
import { HRDashboard } from "./pages/hr/Dashboard";
import { ApprovalIzin } from "./pages/hr/ApprovalIzin";
import { ApprovalCuti } from "./pages/hr/ApprovalCuti";
import { ManagementPenggajian } from "./pages/hr/ManagementPenggajian";
import { MonitoringAbsensi } from "./pages/hr/MonitoringAbsensi";
import { HRProfile } from "./pages/hr/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: RoleSelect },
      {
        path: "karyawan",
        Component: KaryawanLayout,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: KaryawanDashboard },
          { path: "absensi", Component: Absensi },
          { path: "izin", Component: Izin },
          { path: "cuti", Component: Cuti },
          { path: "penggajian", Component: KaryawanPenggajian },
          { path: "profile", Component: KaryawanProfile },
        ],
      },
      {
        path: "hr",
        Component: HRLayout,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: HRDashboard },
          { path: "approval-izin", Component: ApprovalIzin },
          { path: "approval-cuti", Component: ApprovalCuti },
          { path: "penggajian", Component: ManagementPenggajian },
          { path: "monitoring", Component: MonitoringAbsensi },
          { path: "profile", Component: HRProfile },
        ],
      },
    ],
  },
]);
