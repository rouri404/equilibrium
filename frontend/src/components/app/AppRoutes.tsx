import { Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar, AppTopBar } from "./AppLayout";
import Dashboard from "../../pages/app/Dashboard";
import Allocation from "../../pages/app/Allocation";
import LiveEvents from "../../pages/app/LiveEvents";
import Settings from "../../pages/app/Settings";

export default function AppRoutes() {
  return (
    <div className="min-h-screen bg-[#030b10]">
      <AppSidebar />
      <AppTopBar />
      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/allocation" element={<Allocation />} />
          <Route path="/app/events" element={<LiveEvents />} />
          <Route path="/app/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
