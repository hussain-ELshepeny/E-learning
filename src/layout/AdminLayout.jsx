import { Outlet } from "react-router-dom"
import DashboardHeader from "../components/dashboard-components/DashboardHeader"
import DashboardSidebar from "../components/dashboard-components/DashboardSideBar"
export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <DashboardHeader />
        {/* still needs responsive optimization */}
        <div className="overflow-y-auto px-8 py-6 space-y-8 pb-20">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
